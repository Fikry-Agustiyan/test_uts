const usersService = require('./users-service');
const { errorResponder, errorTypes } = require('../../../core/errors');
const { hashPassword, passwordMatched } = require('../../../utils/password');
const logger = require('../../../core/logger')('app');

const validRoles = ['user', 'staff', 'admin'];

async function getUsers(request, response, next) {
  try {
    logger.info('Request untuk mendapatkan daftar seluruh pengguna');
    const users = await usersService.getUsers();

    return response.status(200).json(users);
  } catch (error) {
    return next(error);
  }
}

async function getUser(request, response, next) {
  try {
    logger.info(
      `Request untuk mendapatkan detail pengguna dengan ID: ${request.params.id}`
    );
    const user = await usersService.getUser(request.params.id);

    if (!user) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'User not found');
    }

    return response.status(200).json(user);
  } catch (error) {
    return next(error);
  }
}

async function createUser(request, response, next) {
  try {
    const allowedFields = [
      'id',
      'full_name',
      'email',
      'password',
      'confirm_password',
    ];

    const incomingFields = Object.keys(request.body);

    const extraFields = incomingFields.filter(
      (field) => !allowedFields.includes(field)
    );

    if (extraFields.length > 0) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        `Invalid fields in request body: ${extraFields.join(', ')}`
      );
    }
    // logger.info('Request untuk membuat pengguna baru');

    // 1. Ekstrak body, perhatikan penggunaan alias (: fullName) agar cocok dengan nama variabel di bawah
    const {
      id,
      full_name: fullName,
      email,
      password,
      confirm_password: confirmPassword,
    } = request.body;

    // 2. Lakukan semua validasi yang diperlukan
    if (!id) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'ID is required');
    }
    if (!fullName) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Full name is required'
      );
    }

    if (!email) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Email is required');
    }

    if (password.length < 8) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Password must be at least 8 characters long'
      );
    }
    if (password !== confirmPassword) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Password and confirm password do not match'
      );
    }
    if (await usersService.emailExists(email)) {
      throw errorResponder(
        errorTypes.EMAIL_ALREADY_TAKEN,
        'Email already exists'
      );
    }

    // 3. Hash password dan simpan
    const hashedPassword = await hashPassword(password);

    const success = await usersService.createUser(
      id,
      fullName,
      email,
      hashedPassword,
      'user' // Set default role to 'user'
    );

    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to create user'
      );
    }

    return response.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    return next(error);
  }
}

async function updateUser(request, response, next) {
  try {
    const allowedFields = ['full_name', 'email', 'role'];

    const incomingFields = Object.keys(request.body);

    const extraFields = incomingFields.filter(
      (field) => !allowedFields.includes(field)
    );

    if (extraFields.length > 0) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        `Invalid fields in request body: ${extraFields.join(', ')}`
      );
    }

    logger.info(
      `Request untuk memperbarui pengguna dengan ID: ${request.params.id}`
    );
    const { full_name: fullName, email, role } = request.body;
    const { id } = request.params;

    if (role && !validRoles.includes(role)) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        `Invalid role. Allowed roles: ${validRoles.join(', ')}`
      );
    }

    const user = await usersService.getUser(request.params.id);
    if (!user) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'User not found');
    }

    if (!email) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Email is required');
    }

    if (!fullName) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Full name is required'
      );
    }

    if (email !== user.email && (await usersService.emailExists(email))) {
      throw errorResponder(
        errorTypes.EMAIL_ALREADY_TAKEN,
        'Email already exists'
      );
    }

    const success = await usersService.updateUser(id, fullName, email, role);

    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to update user'
      );
    }

    return response.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    return next(error);
  }
}

async function changePassword(request, response, next) {
  try {
    logger.info(
      `Request untuk mengubah password pengguna dengan ID: ${request.params.id}`
    );
    const { id } = request.params;
    const {
      old_password: oldPassword,
      new_password: newPassword,
      confirm_new_password: confirmNewPassword,
    } = request.body;

    const user = await usersService.getUser(id);
    if (!user) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'User not found');
    }

    const isOldPasswordMatch = await passwordMatched(
      oldPassword,
      user.password
    );
    if (!isOldPasswordMatch) {
      throw errorResponder(
        errorTypes.INVALID_CREDENTIALS,
        'Old password is not correct'
      );
    }

    if (newPassword.length < 8) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'New password must be at least 8 characters long'
      );
    }

    if (newPassword === oldPassword) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'New password must be different from old password'
      );
    }

    if (newPassword !== confirmNewPassword) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'New password and confirm new password do not match'
      );
    }

    const hashedNewPassword = await hashPassword(newPassword);
    const success = await usersService.changePassword(id, hashedNewPassword);

    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to change password'
      );
    }

    return response
      .status(200)
      .json({ message: 'Password changed successfully' });
  } catch (error) {
    return next(error);
  }
}

async function deleteUser(request, response, next) {
  try {
    logger.info(
      `Request untuk menghapus pengguna dengan ID: ${request.params.id}`
    );
    const success = await usersService.deleteUser(request.params.id);

    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to delete user'
      );
    }

    return response.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  changePassword,
  deleteUser,
};

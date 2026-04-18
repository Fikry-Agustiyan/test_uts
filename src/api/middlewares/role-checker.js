const { errorResponder, errorTypes } = require('../../core/errors');

/**
 * Middleware factory: only allows requests from users with one of the given roles.
 * @param {...string} roles - allowed roles, e.g. roleChecker('admin', 'staff')
 */
const roleChecker =
  (...roles) =>
  (request, response, next) => {
    const { user } = request;

    if (!user) {
      return next(
        errorResponder(errorTypes.AUTHENTICATION_FAILED, 'Unauthenticated.')
      );
    }

    if (!roles.includes(user.role)) {
      return next(
        errorResponder(
          errorTypes.FORBIDDEN,
          'You do not have permission to perform this action.'
        )
      );
    }

    return next();
  };

module.exports = roleChecker;

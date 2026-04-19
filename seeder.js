const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const { Users } = require('./src/models');
const { hashPassword } = require('./src/utils/password');
const logger = require('./src/core/logger')('seeder');
const config = require('./src/core/config');

async function runSeeder() {
  try {
    logger.info('Memulai koneksi ke database untuk seeder...');
    await mongoose.connect(config.database.connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info('Berhasil terhubung ke database.');

    logger.info('Menghapus data pengguna lama...');
    await Users.deleteMany({});

    logger.info('Membuat data pengguna baru...');
    const usersData = [];
    const defaultPassword = await hashPassword('password123');

    // Membuat 1 admin
    usersData.push({
      full_name: 'Super Admin',
      email: 'admin@test.com',
      password: defaultPassword,
      role: 'admin',
    });

    // Membuat 10 user random dengan faker
    for (let i = 0; i < 10; i += 1) {
      usersData.push({
        full_name: faker.person.fullName(),
        email: faker.internet.email(),
        password: defaultPassword,
        role: 'user',
      });
    }

    await Users.insertMany(usersData);
    logger.info(`Berhasil memasukkan ${usersData.length} data pengguna.`);

    process.exit(0);
  } catch (error) {
    logger.error('Terjadi kesalahan saat menjalankan seeder:', error);
    process.exit(1);
  }
}

runSeeder();

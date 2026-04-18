/**
 * Idempotent seeder — safe to run multiple times.
 * Uses the same database config as the main app.
 * Usage: node seeder.js
 */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('./src/core/config');

const SALT_ROUNDS = 10;

// Build Mongo URI from existing app config
const connectionString = new URL(config.database.connection);
connectionString.pathname = `/${config.database.name}`;
const MONGO_URI = connectionString.toString();

async function hashPassword(plain) {
  return bcrypt.hash(plain, SALT_ROUNDS);
}

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB.');

  // ── Schemas ─────────────────────────────────────────────
  const UserSchema = new mongoose.Schema(
    {
      full_name: String,
      email: { type: String, unique: true },
      password: String,
      role: {
        type: String,
        enum: ['user', 'staff', 'admin'],
        default: 'user',
      },
    },
    { timestamps: true }
  );

  const TicketSchema = new mongoose.Schema(
    {
      title: String,
      description: String,
      category: String,
      location: String,
      priority: String,
      status: { type: String, default: 'open' },
      submittedBy: mongoose.Schema.Types.ObjectId,
      assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
      },
    },
    { timestamps: true }
  );

  const HistorySchema = new mongoose.Schema(
    {
      ticketId: mongoose.Schema.Types.ObjectId,
      changedBy: mongoose.Schema.Types.ObjectId,
      changes: Object,
      note: String,
    },
    { timestamps: true }
  );

  // Prevent OverwriteModelError
  const User = mongoose.models.User || mongoose.model('User', UserSchema);
  const Ticket =
    mongoose.models.Ticket || mongoose.model('Ticket', TicketSchema);
  const History =
    mongoose.models.History || mongoose.model('History', HistorySchema);

  // ── Seed Users ──────────────────────────────────────────
  const userSeeds = [
    {
      full_name: 'Admin Utama',
      email: 'admin@campus.ac.id',
      password: 'Admin1234!',
      role: 'admin',
    },
    {
      full_name: 'Staff Helpdesk',
      email: 'staff@campus.ac.id',
      password: 'Staff1234!',
      role: 'staff',
    },
    {
      full_name: 'Budi Santoso',
      email: 'budi@campus.ac.id',
      password: 'User1234!',
      role: 'user',
    },
    {
      full_name: 'Ani Rahayu',
      email: 'ani@campus.ac.id',
      password: 'User1234!',
      role: 'user',
    },
  ];

  const users = {};

  for (const item of userSeeds) {
    const hashed = await hashPassword(item.password);

    const doc = await User.findOneAndUpdate(
      { email: item.email },
      {
        full_name: item.full_name,
        email: item.email,
        password: hashed,
        role: item.role,
      },
      { upsert: true, new: true }
    );

    users[item.email] = doc._id;

    console.log(`Upserted user: ${item.email}`);
  }

  // ── Seed Tickets ────────────────────────────────────────
  const PRIORITY_MAP = {
    network: 'high',
    hardware: 'medium',
    software: 'medium',
    facility: 'low',
  };

  const ticketSeeds = [
    {
      title: 'Wi-Fi di Gedung A tidak berfungsi',
      description:
        'Seluruh lantai 3 Gedung A tidak dapat terhubung ke jaringan Wi-Fi kampus.',
      category: 'network',
      location: 'Gedung A, Lantai 3',
      submittedBy: users['budi@campus.ac.id'],
    },
    {
      title: 'Proyektor Ruang 204 rusak',
      description:
        'Proyektor tidak menyala meskipun sudah dicoba di beberapa stop kontak.',
      category: 'hardware',
      location: 'Ruang Kelas 204',
      submittedBy: users['ani@campus.ac.id'],
    },
    {
      title: 'Error login SIAKAD',
      description: 'Sistem menampilkan error 500 saat login menggunakan NIM.',
      category: 'software',
      location: 'Portal SIAKAD',
      submittedBy: users['budi@campus.ac.id'],
      assignedTo: users['staff@campus.ac.id'],
      status: 'in_progress',
    },
    {
      title: 'AC Ruang Dosen bocor',
      description: 'Air menetes dari unit AC dan membasahi meja.',
      category: 'facility',
      location: 'Ruang Dosen Lt.2',
      submittedBy: users['ani@campus.ac.id'],
      status: 'resolved',
    },
  ];

  for (const item of ticketSeeds) {
    const priority = PRIORITY_MAP[item.category];

    const ticket = await Ticket.findOneAndUpdate(
      {
        title: item.title,
        submittedBy: item.submittedBy,
      },
      {
        ...item,
        priority,
        status: item.status || 'open',
      },
      { upsert: true, new: true }
    );

    await History.findOneAndUpdate(
      {
        ticketId: ticket._id,
        note: 'Ticket created by seeder.',
      },
      {
        ticketId: ticket._id,
        changedBy: item.submittedBy,
        changes: {
          status: item.status || 'open',
          priority,
        },
        note: 'Ticket created by seeder.',
      },
      { upsert: true }
    );

    console.log(`Upserted ticket: ${item.title}`);
  }

  await mongoose.disconnect();
  console.log('Seeding complete. Connection closed.');
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});

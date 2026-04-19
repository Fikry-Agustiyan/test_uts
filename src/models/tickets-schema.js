const crypto = require('crypto');

const generateShortId = () => crypto.randomBytes(4).toString('hex');

module.exports = (db) =>
  db.model(
    'Tickets',
    new db.Schema(
      {
        _id: {
          type: String,
          default: generateShortId,
        },
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true },
        status: {
          type: String,
          enum: ['open', 'in_progress', 'resolved', 'closed'],
          default: 'open',
        },
        priority: {
          type: String,
          enum: ['low', 'medium', 'high', 'urgent'],
          default: 'low',
        },
        user_id: {
          type: String,
          ref: 'Users',
          required: true,
        },
      },
      { timestamps: true }
    )
  );

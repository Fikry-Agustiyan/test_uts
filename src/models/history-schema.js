const crypto = require('crypto');

const generateShortId = () => crypto.randomBytes(4).toString('hex');

module.exports = (db) =>
  db.model(
    'History',
    new db.Schema(
      {
        _id: {
          type: String,
          default: generateShortId,
        },
        ticket_id: {
          type: String,
          ref: 'Tickets',
          required: true,
        },
        user_id: {
          type: String,
          ref: 'Users',
          required: true,
        },
        action: { type: String, required: true }, // e.g., 'created', 'updated', 'closed'
        details: { type: String },
      },
      { timestamps: true }
    )
  );

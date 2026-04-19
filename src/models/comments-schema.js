const crypto = require('crypto');

const generateShortId = () => crypto.randomBytes(4).toString('hex');

module.exports = (db) =>
  db.model(
    'Comments',
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
        content: { type: String, required: true },
      },
      { timestamps: true }
    )
  );

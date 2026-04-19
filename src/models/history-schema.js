module.exports = (db) =>
  db.model(
    'History',
    new db.Schema(
      {
        ticket_id: {
          type: db.Schema.Types.ObjectId,
          ref: 'Tickets',
          required: true,
        },
        user_id: {
          type: db.Schema.Types.ObjectId,
          ref: 'Users',
          required: true,
        },
        action: { type: String, required: true }, // e.g., 'created', 'updated', 'closed'
        details: { type: String },
      },
      { timestamps: true }
    )
  );

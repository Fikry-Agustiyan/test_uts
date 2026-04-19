module.exports = (db) =>
  db.model(
    'Comments',
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
        content: { type: String, required: true },
      },
      { timestamps: true }
    )
  );

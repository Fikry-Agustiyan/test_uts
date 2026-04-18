module.exports = (db) =>
  db.model(
    'History',
    new db.Schema(
      {
        ticketId: {
          type: db.Schema.Types.ObjectId,
          ref: 'Ticket',
          required: true,
        },
        changedBy: {
          type: db.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        changes: { type: Object, required: true },
        note: { type: String, default: '' },
      },
      { timestamps: true }
    )
  );

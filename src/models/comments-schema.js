module.exports = (db) =>
  db.model(
    'Comment',
    new db.Schema(
      {
        ticketId: {
          type: db.Schema.Types.ObjectId,
          ref: 'Ticket',
          required: true,
        },
        author: {
          type: db.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        body: { type: String, required: true, trim: true },
      },
      { timestamps: true }
    )
  );

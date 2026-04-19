module.exports = (db) =>
  db.model(
    'Tickets',
    new db.Schema(
      {
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
          type: db.Schema.Types.ObjectId,
          ref: 'Users',
          required: true,
        },
      },
      { timestamps: true }
    )
  );

module.exports = (db) =>
  db.model(
    'Ticket',
    new db.Schema(
      {
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        category: {
          type: String,
          required: true,
          enum: ['network', 'hardware', 'software', 'facility'],
        },
        location: { type: String, required: true, trim: true },
        priority: {
          type: String,
          enum: ['low', 'medium', 'high'],
          default: 'low',
        },
        status: {
          type: String,
          enum: ['open', 'in_progress', 'waiting_user', 'resolved', 'closed'],
          default: 'open',
        },
        submittedBy: {
          type: db.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        assignedTo: {
          type: db.Schema.Types.ObjectId,
          ref: 'User',
          default: null,
        },
      },
      { timestamps: true }
    )
  );

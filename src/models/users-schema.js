module.exports = (db) =>
  db.model(
    'Users',
    new db.Schema(
      {
        _id: { type: String, required: true },
        full_name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, trim: true },
        password: { type: String, required: true },
        role: {
          type: String,
          enum: ['user', 'staff', 'admin'],
          default: 'user',
        },
      },
      { timestamps: true }
    )
  );

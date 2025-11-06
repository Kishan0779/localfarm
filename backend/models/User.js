const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['farmer', 'customer', 'admin'], default: 'customer' },
  farmName: String,
  location: String
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

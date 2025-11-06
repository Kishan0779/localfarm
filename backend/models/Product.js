const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  category: String,
  price: { type: Number, required: true },
  quantity: { type: Number, default: 0 },
  unit: { type: String, default: 'kg' },
  images: [String],
  description: String,
  isAvailable: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);

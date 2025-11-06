const express = require('express');
const Order = require('../models/Order');
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const router = express.Router();

// Place order
router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'customer') return res.status(403).json({ message: 'Only customers can place orders' });
  const { items, deliveryAddress } = req.body;
  try {
    let total = 0;
    for (const i of items) {
      const p = await Product.findById(i.productId);
      if (!p || p.quantity < i.quantity) return res.status(400).json({ message: `Insufficient stock for ${p?.name}` });
      total += p.price * i.quantity;
      p.quantity -= i.quantity;
      await p.save();
    }
    const order = await Order.create({ customerId: req.user._id, items, totalAmount: total, deliveryAddress });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get orders
router.get('/', auth, async (req, res) => {
  if (req.user.role === 'customer') {
    const orders = await Order.find({ customerId: req.user._id }).populate('items.productId');
    return res.json(orders);
  }
  if (req.user.role === 'farmer') {
    const farmerProducts = await Product.find({ farmerId: req.user._id }).select('_id');
    const ids = farmerProducts.map(p => p._id);
    const orders = await Order.find({ 'items.productId': { $in: ids } }).populate('items.productId');
    return res.json(orders);
  }
  const all = await Order.find().populate('items.productId');
  res.json(all);
});

module.exports = router;

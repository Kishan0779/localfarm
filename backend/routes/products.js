const express = require('express');
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const router = express.Router();

// Add product
router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'farmer') return res.status(403).json({ message: 'Only farmers can add products' });
  const p = await Product.create({ ...req.body, farmerId: req.user._id });
  res.json(p);
});

// Update product
router.put('/:id', auth, async (req, res) => {
  const p = await Product.findById(req.params.id);
  if (!p) return res.status(404).json({ message: 'Not found' });
  if (p.farmerId.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Not allowed' });
  await p.updateOne(req.body);
  res.json({ message: 'Updated' });
});

// Delete product
router.delete('/:id', auth, async (req, res) => {
  const p = await Product.findById(req.params.id);
  if (!p) return res.status(404).json({ message: 'Not found' });
  if (p.farmerId.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Not allowed' });
  await p.deleteOne();
  res.json({ message: 'Deleted' });
});

// List products
router.get('/', async (req, res) => {
  const { q, category, farmerId } = req.query;
  const filter = {};
  if (q) filter.name = { $regex: q, $options: 'i' };
  if (category) filter.category = category;
  if (farmerId) filter.farmerId = farmerId;
  const list = await Product.find(filter).populate('farmerId', 'name farmName');
  res.json(list);
});

// Single product
router.get('/:id', async (req, res) => {
  const p = await Product.findById(req.params.id).populate('farmerId', 'name');
  if (!p) return res.status(404).json({ message: 'Not found' });
  res.json(p);
});

module.exports = router;

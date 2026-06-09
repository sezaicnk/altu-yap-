const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Get all products (with optional category filter)
router.get('/', async (req, res) => {
  try {
    const query = {};
    if (req.query.category) {
      query.category = req.query.category;
    }
    const products = await Product.find(query).populate('category', 'name');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
});

// Create product (Admin)
router.post('/', [auth, admin], async (req, res) => {
  try {
    const { name, description, price, category, imageUrl } = req.body;
    const product = new Product({ name, description, price, category, imageUrl });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Ürün eklenirken hata oluştu.' });
  }
});

// Delete product (Admin)
router.delete('/:id', [auth, admin], async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Ürün bulunamadı.' });
    }
    res.json({ message: 'Ürün silindi.' });
  } catch (error) {
    res.status(500).json({ message: 'Ürün silinirken hata oluştu.' });
  }
});

// Update product (Admin)
router.put('/:id', [auth, admin], async (req, res) => {
  try {
    const { name, description, price, category, imageUrl } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, category, imageUrl },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: 'Ürün bulunamadı.' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Ürün güncellenirken hata oluştu.' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
});

// Create category (Admin)
router.post('/', [auth, admin], async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = new Category({ name, description });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Kategori eklenirken hata oluştu.' });
  }
});

// Delete category (Admin)
router.delete('/:id', [auth, admin], async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Kategori bulunamadı.' });
    }
    res.json({ message: 'Kategori silindi.' });
  } catch (error) {
    res.status(500).json({ message: 'Kategori silinirken hata oluştu.' });
  }
});

// Update category (Admin)
router.put('/:id', [auth, admin], async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    );
    if (!category) {
      return res.status(404).json({ message: 'Kategori bulunamadı.' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: 'Kategori güncellenirken hata oluştu.' });
  }
});

module.exports = router;

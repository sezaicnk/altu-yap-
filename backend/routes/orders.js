const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Create order (User)
router.post('/', auth, async (req, res) => {
  try {
    const { products, totalAmount, shippingAddress, fullName } = req.body;
    
    if (!products || products.length === 0) {
      return res.status(400).json({ message: 'Sipariş için ürün bulunamadı.' });
    }

    const order = new Order({
      user: req.user.id,
      products,
      totalAmount,
      shippingAddress,
      fullName
    });

    await order.save();
    res.status(201).json({ message: 'Sipariş başarıyla oluşturuldu.', order });
  } catch (error) {
    res.status(500).json({ message: 'Sipariş oluşturulurken hata oluştu.' });
  }
});

// Get all orders (Admin)
router.get('/', [auth, admin], async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'email')
      .populate('products.product', 'name price')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Siparişler getirilirken hata oluştu.' });
  }
});

module.exports = router;

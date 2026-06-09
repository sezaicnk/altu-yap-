const User = require('../models/User');

const admin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Erişim reddedildi. Yönetici yetkisi gerekli.' });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
};

module.exports = admin;

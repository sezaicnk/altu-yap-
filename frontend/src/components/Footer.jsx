import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-brand-dark text-white py-8 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <h3 className="text-2xl font-bold text-brand-yellow mb-4">Altuğ Yapı</h3>
        <p className="text-gray-400 mb-4">Kaliteli inşaat malzemeleri ve boya çözümleri.</p>
        <div className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Altuğ Yapı. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

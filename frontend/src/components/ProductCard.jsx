import React, { useContext } from 'react';
import { ShoppingCart } from 'lucide-react';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 overflow-hidden bg-gray-100 flex items-center justify-center">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} className="object-contain w-full h-full p-2 bg-white" />
        ) : (
          <span className="text-gray-400">Görsel Yok</span>
        )}
      </div>
      <div className="p-4">
        <div className="text-xs text-gray-500 mb-1">{product.category?.name || 'Kategori Yok'}</div>
        <h3 className="font-semibold text-lg text-brand-dark mb-2 truncate">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-xl font-bold text-brand-dark">{product.price} ₺</span>
          <button 
            onClick={() => addToCart(product)}
            className="btn btn-primary flex items-center gap-2 px-3 py-1.5"
          >
            <ShoppingCart size={18} />
            Ekle
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

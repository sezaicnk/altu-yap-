import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { CartContext } from '../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useContext(CartContext);

  if (cart.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Sepetiniz Boş</h2>
        <p className="text-gray-600 mb-8">Hemen alışverişe başlayın!</p>
        <Link to="/magaza" className="btn btn-primary">Mağazaya Git</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 border-b-4 border-brand-yellow pb-2 inline-block">Sepetim</h1>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-4 font-semibold text-gray-700">Ürün</th>
                <th className="p-4 font-semibold text-gray-700">Fiyat</th>
                <th className="p-4 font-semibold text-gray-700">Adet</th>
                <th className="p-4 font-semibold text-gray-700">Toplam</th>
                <th className="p-4 font-semibold text-gray-700 text-center">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.product._id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center overflow-hidden flex-shrink-0">
                        {item.product.imageUrl ? (
                          <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-xs text-gray-400">Görsel Yok</span>
                        )}
                      </div>
                      <span className="font-medium text-brand-dark">{item.product.name}</span>
                    </div>
                  </td>
                  <td className="p-4">{item.product.price} ₺</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 border rounded-md w-max">
                      <button onClick={() => updateQuantity(item.product._id, -1)} className="p-1 hover:bg-gray-100 transition-colors"><Minus size={16}/></button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product._id, 1)} className="p-1 hover:bg-gray-100 transition-colors"><Plus size={16}/></button>
                    </div>
                  </td>
                  <td className="p-4 font-semibold">{(item.product.price * item.quantity).toFixed(2)} ₺</td>
                  <td className="p-4 text-center">
                    <button onClick={() => removeFromCart(item.product._id)} className="text-red-500 hover:text-red-700 transition-colors p-2 rounded-full hover:bg-red-50">
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-end">
        <div className="bg-white p-6 rounded-lg shadow-sm w-full md:w-1/3">
          <div className="flex justify-between items-center mb-4 text-xl">
            <span className="font-semibold text-gray-700">Genel Toplam:</span>
            <span className="font-bold text-brand-dark">{cartTotal.toFixed(2)} ₺</span>
          </div>
          <Link to="/odeme" className="btn btn-primary w-full flex items-center justify-center gap-2">
            Ödemeye Geç <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;

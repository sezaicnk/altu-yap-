import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Wrench } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-brand-dark text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-brand-yellow font-bold text-2xl">
          <Wrench size={28} />
          <span>Altuğ Yapı</span>
        </Link>

        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-brand-yellow transition-colors">Anasayfa</Link>
          <Link to="/magaza" className="hover:text-brand-yellow transition-colors">Mağaza</Link>
          <Link to="/hakkimizda" className="hover:text-brand-yellow transition-colors">Hakkımızda</Link>
          <Link to="/iletisim" className="hover:text-brand-yellow transition-colors">İletişim</Link>
        </div>

        <div className="flex items-center space-x-4">
          <Link to="/sepet" className="relative hover:text-brand-yellow transition-colors">
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-brand-yellow text-brand-dark text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center space-x-4">
              {user.role === 'admin' && (
                <Link to="/admin" className="text-sm font-semibold text-brand-yellow border border-brand-yellow px-2 py-1 rounded hover:bg-brand-yellow hover:text-brand-dark transition-colors">
                  Admin
                </Link>
              )}
              <button onClick={handleLogout} className="flex items-center gap-1 hover:text-red-400 transition-colors">
                <LogOut size={20} />
                <span className="hidden md:inline">Çıkış</span>
              </button>
            </div>
          ) : (
            <Link to="/login" className="flex items-center gap-1 hover:text-brand-yellow transition-colors">
              <User size={20} />
              <span className="hidden md:inline">Giriş / Kayıt</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

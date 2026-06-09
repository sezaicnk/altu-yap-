import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { ArrowRight } from 'lucide-react';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:3001/api/products');
        // Just take the first 3 or 4 for the homepage
        setFeaturedProducts(res.data.slice(0, 4));
        setLoading(false);
      } catch (error) {
        console.error("Ürünler yüklenirken hata:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-brand-dark text-white rounded-2xl p-8 md:p-16 mb-12 relative overflow-hidden flex items-center min-h-[400px]">
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0ibm9uZSIvPgo8Y2lyY2xlIGN4PSIyIiBjeT0iMiIgcj0iMSIgZmlsbD0iI2ZmZiIvPgo8L3N2Zz4=')]"></div>
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-brand-yellow">
            Projeleriniz İçin Sağlam Temeller
          </h1>
          <p className="text-lg text-gray-300 mb-8">
            Altuğ Yapı olarak yılların tecrübesiyle en kaliteli inşaat malzemelerini ve boya çeşitlerini kapınıza kadar getiriyoruz.
          </p>
          <Link to="/magaza" className="btn btn-primary inline-flex items-center gap-2 text-lg">
            Hemen Alışverişe Başla <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-2xl font-bold border-b-4 border-brand-yellow pb-2 inline-block">Öne Çıkan Ürünler</h2>
          <Link to="/magaza" className="text-brand-dark hover:text-brand-yellow font-semibold flex items-center gap-1 transition-colors">
            Tümünü Gör <ArrowRight size={16} />
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-10">Yükleniyor...</div>
        ) : featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-gray-500 bg-white rounded-lg shadow-sm">Henüz ürün bulunmamaktadır.</div>
        )}
      </section>
    </div>
  );
};

export default Home;

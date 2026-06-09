import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch categories
    axios.get('http://127.0.0.1:3001/api/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.error("Kategoriler yüklenirken hata:", err));
  }, []);

  useEffect(() => {
    // Fetch products based on category
    setLoading(true);
    let url = 'http://127.0.0.1:3001/api/products';
    if (selectedCategory) {
      url += `?category=${selectedCategory}`;
    }

    axios.get(url)
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Ürünler yüklenirken hata:", err);
        setLoading(false);
      });
  }, [selectedCategory]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 border-b-4 border-brand-yellow pb-2 inline-block">Mağaza</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-1/4">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </aside>

        <main className="w-full md:w-3/4">
          {loading ? (
            <div className="text-center py-10 bg-white rounded-lg shadow-sm">Ürünler Yükleniyor...</div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-white rounded-lg shadow-sm text-gray-500">
              Bu kategoride ürün bulunamadı.
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Shop;

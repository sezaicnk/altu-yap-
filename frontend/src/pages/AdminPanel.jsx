import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Plus, Edit2, X } from 'lucide-react';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('orders'); // 'orders', 'products', 'categories'

  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // Form states
  const [catName, setCatName] = useState('');
  const [catDesc, setCatDesc] = useState('');
  const [editCatId, setEditCatId] = useState(null);

  const [prodName, setProdName] = useState('');
  const [prodDesc, setProdDesc] = useState('');
  const [prodPrice, setProdPrice] = useState('');
  const [prodCat, setProdCat] = useState('');
  const [prodImageBase64, setProdImageBase64] = useState('');
  const [editProdId, setEditProdId] = useState(null);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      if (activeTab === 'orders') {
        const res = await axios.get('http://127.0.0.1:3001/api/orders');
        setOrders(res.data);
      } else if (activeTab === 'products') {
        const res = await axios.get('http://127.0.0.1:3001/api/products');
        setProducts(res.data);
        const catRes = await axios.get('http://127.0.0.1:3001/api/categories');
        setCategories(catRes.data);
      } else if (activeTab === 'categories') {
        const res = await axios.get('http://127.0.0.1:3001/api/categories');
        setCategories(res.data);
      }
    } catch (error) {
      console.error("Veri çekme hatası:", error);
    }
  };

  // --- Categories ---
  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      if (editCatId) {
        await axios.put(`http://127.0.0.1:3001/api/categories/${editCatId}`, { name: catName, description: catDesc });
      } else {
        await axios.post('http://127.0.0.1:3001/api/categories', { name: catName, description: catDesc });
      }
      resetCatForm();
      fetchData();
    } catch (error) {
      alert("Kategori kaydedilemedi.");
    }
  };

  const handleEditCategory = (cat) => {
    setCatName(cat.name);
    setCatDesc(cat.description || '');
    setEditCatId(cat._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetCatForm = () => {
    setCatName('');
    setCatDesc('');
    setEditCatId(null);
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm('Emin misiniz?')) return;
    try {
      await axios.delete(`http://127.0.0.1:3001/api/categories/${id}`);
      fetchData();
    } catch (error) {
      alert("Kategori silinemedi.");
    }
  };

  // --- Products ---
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProdImageBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: prodName,
        description: prodDesc,
        price: Number(prodPrice),
        category: prodCat,
        imageUrl: prodImageBase64 || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII='
      };

      if (editProdId) {
        await axios.put(`http://127.0.0.1:3001/api/products/${editProdId}`, payload);
      } else {
        await axios.post('http://127.0.0.1:3001/api/products', payload);
      }
      resetProdForm();
      fetchData();
    } catch (error) {
      alert("Ürün kaydedilemedi.");
    }
  };

  const handleEditProduct = (prod) => {
    setProdName(prod.name);
    setProdDesc(prod.description);
    setProdPrice(prod.price);
    setProdCat(prod.category?._id || '');
    setProdImageBase64(prod.imageUrl);
    setEditProdId(prod._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetProdForm = () => {
    setProdName('');
    setProdDesc('');
    setProdPrice('');
    setProdCat('');
    setProdImageBase64('');
    setEditProdId(null);
    document.getElementById('image-upload').value = '';
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Emin misiniz?')) return;
    try {
      await axios.delete(`http://127.0.0.1:3001/api/products/${id}`);
      fetchData();
    } catch (error) {
      alert("Ürün silinemedi.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 border-b-4 border-brand-yellow pb-2 inline-block">Yönetici Paneli</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-1/4">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full text-left px-4 py-3 border-b transition-colors ${activeTab === 'orders' ? 'bg-brand-yellow font-bold text-brand-dark' : 'hover:bg-gray-50'}`}
            >
              Siparişleri Görüntüle
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`w-full text-left px-4 py-3 border-b transition-colors ${activeTab === 'products' ? 'bg-brand-yellow font-bold text-brand-dark' : 'hover:bg-gray-50'}`}
            >
              Ürünleri Yönet
            </button>
            <button
              onClick={() => setActiveTab('categories')}
              className={`w-full text-left px-4 py-3 transition-colors ${activeTab === 'categories' ? 'bg-brand-yellow font-bold text-brand-dark' : 'hover:bg-gray-50'}`}
            >
              Kategorileri Yönet
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="w-full md:w-3/4">
          {/* ORDERS TAB */}
          {activeTab === 'orders' && (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-4">Siparişler</h2>
              {orders.length === 0 ? <p className="text-gray-500">Henüz sipariş bulunmamaktadır.</p> : (
                <div className="space-y-4">
                  {orders.map(order => (
                    <div key={order._id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold">{order.fullName}</p>
                          <p className="text-sm text-gray-600">{order.shippingAddress}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-brand-dark">{order.totalAmount.toFixed(2)} ₺</p>
                          <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString('tr-TR')}</p>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="text-sm font-semibold mb-2">Ürünler:</p>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {order.products.map(item => (
                            <li key={item._id}>- {item.product?.name || 'Silinmiş Ürün'} (x{item.quantity})</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* PRODUCTS TAB */}
          {activeTab === 'products' && (
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">{editProdId ? 'Ürün Düzenle' : 'Yeni Ürün Ekle'}</h2>
                  {editProdId && (
                    <button onClick={resetProdForm} className="text-gray-500 hover:text-red-500 flex items-center gap-1 text-sm">
                      <X size={16} /> İptal
                    </button>
                  )}
                </div>
                <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Ürün Adı</label>
                    <input type="text" required className="input-field" value={prodName} onChange={e => setProdName(e.target.value)} />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Açıklama</label>
                    <textarea required className="input-field" value={prodDesc} onChange={e => setProdDesc(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Fiyat (₺)</label>
                    <input type="number" required className="input-field" value={prodPrice} onChange={e => setProdPrice(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Kategori</label>
                    <select required className="input-field" value={prodCat} onChange={e => setProdCat(e.target.value)}>
                      <option value="">Seçiniz...</option>
                      {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Görsel</label>
                    <input type="file" id="image-upload" accept="image/*" onChange={handleImageUpload} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-brand-yellow file:text-brand-dark hover:file:bg-yellow-400" />
                  </div>
                  <div className="md:col-span-2 mt-2">
                    <button type="submit" className="btn btn-primary flex items-center justify-center gap-2 w-full md:w-auto">
                      {editProdId ? <Edit2 size={18} /> : <Plus size={18} />} {editProdId ? 'Güncelle' : 'Ekle'}
                    </button>
                  </div>
                </form>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold mb-4">Mevcut Ürünler</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="p-3">Adı</th>
                        <th className="p-3">Fiyat</th>
                        <th className="p-3">İşlem</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(p => (
                        <tr key={p._id} className="border-b last:border-0">
                          <td className="p-3">{p.name}</td>
                          <td className="p-3">{p.price} ₺</td>
                          <td className="p-3">
                            <button onClick={() => handleEditProduct(p)} className="text-blue-500 hover:text-blue-700 p-1 mr-2"><Edit2 size={18} /></button>
                            <button onClick={() => handleDeleteProduct(p._id)} className="text-red-500 hover:text-red-700 p-1"><Trash2 size={18} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* CATEGORIES TAB */}
          {activeTab === 'categories' && (
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">{editCatId ? 'Kategori Düzenle' : 'Yeni Kategori Ekle'}</h2>
                  {editCatId && (
                    <button onClick={resetCatForm} className="text-gray-500 hover:text-red-500 flex items-center gap-1 text-sm">
                      <X size={16} /> İptal
                    </button>
                  )}
                </div>
                <form onSubmit={handleAddCategory} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Kategori Adı</label>
                    <input type="text" required className="input-field" value={catName} onChange={e => setCatName(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Açıklama</label>
                    <input type="text" className="input-field" value={catDesc} onChange={e => setCatDesc(e.target.value)} />
                  </div>
                  <div>
                    <button type="submit" className="btn btn-primary flex items-center justify-center gap-2">
                      {editCatId ? <Edit2 size={18} /> : <Plus size={18} />} {editCatId ? 'Güncelle' : 'Ekle'}
                    </button>
                  </div>
                </form>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold mb-4">Mevcut Kategoriler</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="p-3">Adı</th>
                        <th className="p-3">Açıklama</th>
                        <th className="p-3">İşlem</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map(c => (
                        <tr key={c._id} className="border-b last:border-0">
                          <td className="p-3 font-semibold">{c.name}</td>
                          <td className="p-3 text-gray-600">{c.description}</td>
                          <td className="p-3">
                            <button onClick={() => handleEditCategory(c)} className="text-blue-500 hover:text-blue-700 p-1 mr-2"><Edit2 size={18} /></button>
                            <button onClick={() => handleDeleteCategory(c._id)} className="text-red-500 hover:text-red-700 p-1"><Trash2 size={18} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AdminPanel;

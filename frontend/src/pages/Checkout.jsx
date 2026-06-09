import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CreditCard, Lock, ShieldCheck } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const Checkout = () => {
  const [step, setStep] = useState('form'); // 'form', '3ds', 'success'
  
  // Shipping info
  const [fullName, setFullName] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  
  // Card info
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  
  // 3DS info
  const [smsCode, setSmsCode] = useState('');
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { cart, cartTotal, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (cart.length === 0 && step !== 'success') {
    navigate('/sepet');
    return null;
  }

  // Format card number to add spaces
  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
    if (formatted.length <= 19) setCardNumber(formatted);
  };

  // Format expiry MM/YY
  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    if (value.length <= 5) setExpiry(value);
  };

  const handleInitialSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (cardNumber.length < 19 || expiry.length < 5 || cvv.length < 3) {
      return setError('Lütfen geçerli kart bilgileri giriniz.');
    }
    
    setLoading(true);
    // Simulate payment processing delay before 3DS
    setTimeout(() => {
      setLoading(false);
      setStep('3ds');
    }, 1500);
  };

  const handle3DSSubmit = async (e) => {
    e.preventDefault();
    if (smsCode.length !== 6) {
      return setError('Lütfen 6 haneli doğrulama kodunu giriniz.');
    }

    setError('');
    setLoading(true);

    try {
      const orderData = {
        products: cart.map(item => ({
          product: item.product._id,
          quantity: item.quantity
        })),
        totalAmount: cartTotal,
        shippingAddress,
        fullName
      };

      await axios.post('http://127.0.0.1:3001/api/orders', orderData);
      
      // Simulate final bank verification delay
      setTimeout(() => {
        setLoading(false);
        setStep('success');
        clearCart();
      }, 2000);

    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Sipariş oluşturulurken bir hata meydana geldi.');
    }
  };

  if (step === 'success') {
    return (
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md mt-10 text-center">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldCheck size={48} />
        </div>
        <h2 className="text-2xl font-bold mb-4 text-brand-dark">Ödeme Başarılı!</h2>
        <p className="text-gray-600 mb-8">Siparişiniz başarıyla alındı ve onaylandı. Bizi tercih ettiğiniz için teşekkür ederiz.</p>
        <button onClick={() => navigate('/')} className="btn btn-primary w-full">Anasayfaya Dön</button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 border-b-4 border-brand-yellow pb-2 inline-block">Güvenli Ödeme</h1>
      
      {error && <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6 shadow-sm border border-red-200">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Main Form Area */}
        <div className="md:col-span-2">
          {step === 'form' && (
            <form onSubmit={handleInitialSubmit} className="space-y-8">
              {/* Shipping Details */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="bg-brand-yellow text-brand-dark w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span>
                  Teslimat Bilgileri
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ad Soyad</label>
                    <input 
                      type="text" 
                      required
                      className="input-field bg-gray-50 focus:bg-white"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Teslim alacak kişinin adı soyadı"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Teslimat Adresi</label>
                    <textarea 
                      required
                      rows="3"
                      className="input-field bg-gray-50 focus:bg-white resize-none"
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                      placeholder="Mahalle, sokak, bina no, daire, ilçe, il..."
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="bg-brand-yellow text-brand-dark w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span>
                  Kart Bilgileri
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Kart Üzerindeki İsim</label>
                    <input 
                      type="text" 
                      required
                      className="input-field font-mono"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value.toUpperCase())}
                      placeholder="AD SOYAD"
                    />
                  </div>
                  
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Kart Numarası</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        required
                        className="input-field pl-10 font-mono tracking-widest"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        placeholder="0000 0000 0000 0000"
                      />
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Son Kullanma (AY/YIL)</label>
                      <input 
                        type="text" 
                        required
                        className="input-field font-mono text-center"
                        value={expiry}
                        onChange={handleExpiryChange}
                        placeholder="AA/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CVC / CVV</label>
                      <div className="relative">
                        <input 
                          type="password" 
                          required
                          maxLength="4"
                          className="input-field pl-10 font-mono text-center tracking-widest"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                          placeholder="***"
                        />
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary w-full py-4 text-lg font-bold disabled:opacity-70 disabled:cursor-wait flex justify-center items-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-brand-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Ödeme İşleniyor...
                  </>
                ) : 'Ödemeyi Tamamla'}
              </button>
            </form>
          )}

          {step === '3ds' && (
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-brand-yellow"></div>
              
              <div className="flex justify-center mb-6">
                <div className="bg-gray-100 p-4 rounded-full border border-gray-200">
                  <ShieldCheck size={32} className="text-brand-dark" />
                </div>
              </div>
              
              <h2 className="text-2xl font-bold mb-2">3D Secure Doğrulama</h2>
              <p className="text-gray-600 mb-6 text-sm">
                İşleminizi tamamlamak için bankanız tarafından <span className="font-semibold">+90 5** *** ** 99</span> numaralı telefonunuza gönderilen 6 haneli SMS şifresini giriniz.
              </p>
              
              <form onSubmit={handle3DSSubmit} className="max-w-xs mx-auto space-y-6">
                <div>
                  <input 
                    type="text" 
                    required
                    maxLength="6"
                    className="w-full text-center text-2xl tracking-[0.5em] font-mono p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/50 transition-all"
                    value={smsCode}
                    onChange={(e) => setSmsCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="------"
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="btn bg-green-600 hover:bg-green-700 text-white w-full py-3 font-bold disabled:opacity-70 flex justify-center items-center"
                  disabled={loading}
                >
                  {loading ? 'Doğrulanıyor...' : 'Onayla'}
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 sticky top-4">
            <h3 className="font-bold text-lg mb-4 border-b border-gray-200 pb-2">Sipariş Özeti</h3>
            
            <div className="space-y-3 mb-6 max-h-60 overflow-y-auto pr-2">
              {cart.map(item => (
                <div key={item.product._id} className="flex justify-between text-sm">
                  <span className="text-gray-600 line-clamp-1 pr-2">{item.quantity}x {item.product.name}</span>
                  <span className="font-semibold whitespace-nowrap">{(item.product.price * item.quantity).toFixed(2)} ₺</span>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Ara Toplam</span>
                <span>{cartTotal.toFixed(2)} ₺</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Kargo</span>
                <span className="text-green-600 font-semibold">Ücretsiz</span>
              </div>
              <div className="flex justify-between text-xl font-bold mt-4 pt-4 border-t border-gray-200">
                <span>Toplam</span>
                <span className="text-brand-dark">{cartTotal.toFixed(2)} ₺</span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
              <Lock size={12} />
              <span>256-bit SSL ile güvenli ödeme</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;

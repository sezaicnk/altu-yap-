import React, { useState } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send an API request
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 border-b-4 border-brand-yellow pb-2 inline-block">İletişim</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Info & Form */}
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold mb-6 text-brand-dark">Bize Ulaşın</h2>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3">
              <MapPin className="text-brand-yellow mt-1" />
              <div>
                <h4 className="font-semibold">Adres</h4>
                <p className="text-gray-600">Örnek Mahallesi, İnşaat Caddesi No:123<br/>Kadıköy, İstanbul</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-brand-yellow" />
              <div>
                <h4 className="font-semibold">Telefon</h4>
                <p className="text-gray-600">+90 216 123 45 67</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="text-brand-yellow" />
              <div>
                <h4 className="font-semibold">E-Posta</h4>
                <p className="text-gray-600">info@altugyapi.com</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ad Soyad</label>
              <input 
                type="text" 
                required
                className="input-field"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">E-Posta</label>
              <input 
                type="email" 
                required
                className="input-field"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mesajınız</label>
              <textarea 
                required
                rows="4"
                className="input-field resize-none"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary w-full">Gönder</button>
            {submitted && <div className="text-green-600 text-sm mt-2">Mesajınız başarıyla gönderildi!</div>}
          </form>
        </div>

        {/* Map */}
        <div className="bg-gray-200 rounded-lg overflow-hidden h-full min-h-[400px]">
          {/* Using a random location in Turkey (Istanbul) for the iframe */}
          <iframe 
            src="https://maps.google.com/maps?q=40.979514334495505,29.062987441926218&t=&z=15&ie=UTF8&iwloc=&output=embed" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;

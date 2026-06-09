import React from 'react';
import { CheckCircle } from 'lucide-react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 border-b-4 border-brand-yellow pb-2 inline-block">Hakkımızda</h1>
      
      <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
        <h2 className="text-2xl font-bold mb-4 text-brand-dark">Altuğ Yapı'ya Hoşgeldiniz</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          Sektördeki yılların getirdiği tecrübe ile Altuğ Yapı, bölgenin en güvenilir inşaat malzemeleri ve boya tedarikçilerinden biridir. Amacımız, hem bireysel müşterilerimizin hem de profesyonel inşaat firmalarının ihtiyaçlarını en kaliteli ürünler ve en uygun fiyatlarla karşılamaktır.
        </p>
        <p className="text-gray-700 leading-relaxed mb-6">
          Müşteri memnuniyetini her zaman ön planda tutarak, dürüstlük, kalite ve güven ilkelerinden taviz vermeden yolumuza devam ediyoruz. Evinizi yenilemek veya yeni bir projeye başlamak istiyorsanız, doğru adrestesiniz.
        </p>

        <h3 className="text-xl font-bold mb-4 mt-8">Neden Bizi Seçmelisiniz?</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            'Geniş Ürün Yelpazesi',
            'Kaliteli ve Bilinen Markalar',
            'Uygun Fiyat Garantisi',
            'Uzman Kadro ve Danışmanlık',
            'Hızlı ve Güvenilir Teslimat',
            'Müşteri Odaklı Hizmet Anlayışı'
          ].map((item, index) => (
            <li key={index} className="flex items-center gap-2 text-gray-700">
              <CheckCircle className="text-brand-yellow" size={20} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default About;

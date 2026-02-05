import React, { useState } from 'react';
import './App.css';

function App() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="main-wrapper">
      <div className="feedback-card">
        
        {/* الشعار العلوي - تأكد أن الصورة موجودة في مجلد public باسم logo.png */}
        <div style={{ marginBottom: '15px' }}>
          <img 
            src="/logo.png" 
            alt="HEMA.SA" 
            style={{ width: '90px', height: 'auto' }}
            onError={(e) => { e.target.src = "https://via.placeholder.com/90x40?text=HEMA.SA" }}
          />
        </div>
        
        <h2 style={{ fontSize: '18px', margin: '5px 0', position: 'relative', z-index: 1 }}>
          تقييمك يهمنا في HEMA.SA
        </h2>
        <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '20px', position: 'relative', z-index: 1 }}>
          ساعدنا لنكون أفضل دائماً
        </p>

        {/* النجوم */}
        <div className="stars-row">
          {[1, 2, 3, 4, 5].map((star) => (
            <span 
              key={star} 
              className={`star-box ${star <= (hover || rating) ? 'active' : ''}`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            >
              ★
            </span>
          ))}
        </div>

        {/* المدخلات */}
        <input type="text" placeholder="اكتب اسمك (اختياري)" className="styled-input" />
        <textarea placeholder="رأيك يساعدنا على التطوير..." className="styled-input" rows="3"></textarea>
        
        <button className="submit-btn" onClick={() => alert('شكراً لتقييمك!')}>
          إرسال التقييم
        </button>

        {/* رابط الواتساب السفلي */}
        <a href="https://wa.me/972595972039" target="_blank" rel="noreferrer" className="whatsapp-btn-link">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
            className="whatsapp-icon-small" 
            alt="wa" 
          />
          <span>هل تواجه مشكلة؟ تواصل معنا</span>
        </a>

      </div>
    </div>
  );
}

export default App;
import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './App.css';

function App() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [isSent, setIsSent] = useState(false); // حالة جديدة لمعرفة هل تم الإرسال بنجاح
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    if (rating === 0) {
      alert("يرجى اختيار تقييم بالنجوم أولاً");
      return;
    }

    const SERVICE_ID = "service_daj9zpp";
    const TEMPLATE_ID = "template_ej1u947";
    const PUBLIC_KEY = "ckzhN_erADx_csnor";

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then(() => {
          setIsSent(true); // إخفاء النموذج وإظهار رسالة الشكر
          setRating(0);
          e.target.reset();
      }, (error) => {
          alert('عذراً، حدث خطأ أثناء الإرسال.');
          console.log('FAILED...', error.text);
      });
  };

  return (
    <div className="main-wrapper">
      <div className="feedback-card">
        
        {/* الشعار العلوي */}
        <div style={{ marginBottom: '15px', position: 'relative', zIndex: 2 }}>
          <img 
            src="https://hema-sa.com/logo.png" 
            alt="HEMA.SA" 
            style={{ width: '100px', height: 'auto' }}
            onError={(e) => { e.target.src = "https://via.placeholder.com/100x50?text=HEMA.SA" }}
          />
        </div>

        {!isSent ? (
          // --- الجزء الأول: استمارة التقييم (تختفي بعد الإرسال) ---
          <>
            <h2 style={{ fontSize: '18px', margin: '5px 0', position: 'relative', zIndex: 2 }}>
              تقييمك يهمنا في HEMA.SA
            </h2>
            <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '20px', position: 'relative', zIndex: 2 }}>
              رأيك يساعدنا لنكون الأفضل دائماً
            </p>

            <form ref={form} onSubmit={sendEmail}>
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
              
              <input type="hidden" name="rating" value={rating} />
              <input type="text" name="from_name" placeholder="اكتب اسمك (اختياري)" className="styled-input" required />
              <textarea name="message" placeholder="رأيك يساعدنا على التطوير..." className="styled-input" rows="3" required></textarea>
              
              <button type="submit" className="submit-btn">إرسال التقييم</button>
            </form>
          </>
        ) : (
          // --- الجزء الثاني: رسالة الشكر التفاعلية (تظهر بعد الإرسال) ---
          <div style={{ padding: '40px 0', animation: 'fadeIn 0.5s ease' }}>
            <div style={{ fontSize: '60px', color: '#16a34a', marginBottom: '20px' }}>✓</div>
            <h2 style={{ fontSize: '22px', marginBottom: '10px' }}>شكراً لك!</h2>
            <p style={{ color: '#64748b' }}>تم إرسال تقييمك بنجاح إلى الإدارة.</p>
            <button 
              onClick={() => setIsSent(false)} 
              style={{ marginTop: '20px', background: 'none', border: 'none', color: '#4facfe', cursor: 'pointer', textDecoration: 'underline' }}
            >
              إرسال تقييم آخر
            </button>
          </div>
        )}

        <a href="https://wa.me/972595972039" target="_blank" rel="noreferrer" className="whatsapp-btn-link">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
            className="whatsapp-icon-small" 
            alt="wa" 
          />
          <span>تواصل معنا مباشرة</span>
        </a>

      </div>
    </div>
  );
}

export default App;
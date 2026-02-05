import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './App.css';

function App() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    if (rating === 0) {
      alert("يرجى اختيار تقييم بالنجوم أولاً");
      return;
    }

    // الرموز الخاصة بك من الصور التي أرفقتها
    const SERVICE_ID = "service_daj9zpp"; // من صورة Email Services
    const TEMPLATE_ID = "template_ej1u947"; // من صورة Email Templates
    const PUBLIC_KEY = "ckzhN_erADx_csnor"; // من صورة API Keys

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then(() => {
          alert('شكراً لك! تم إرسال تقييمك بنجاح.');
          setRating(0);
          e.target.reset();
      }, (error) => {
          alert('عذراً، حدث خطأ أثناء الإرسال. يرجى المحاولة لاحقاً.');
          console.log('FAILED...', error.text);
      });
  };

  return (
    <div className="main-wrapper">
      <div className="feedback-card">
        <div style={{ marginBottom: '15px', position: 'relative', zIndex: 2 }}>
          <img 
            src="https://hema-sa.com/logo.png" 
            alt="HEMA.SA" 
            style={{ width: '100px', height: 'auto' }}
            onError={(e) => { e.target.src = "https://via.placeholder.com/100x50?text=HEMA.SA" }}
          />
        </div>
        
        <h2 style={{ fontSize: '18px', margin: '5px 0', position: 'relative', zIndex: 2 }}>
          تقييمك يهمنا في HEMA.SA
        </h2>
        
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
          
          {/* حقول الإرسال */}
          <input type="hidden" name="rating" value={rating} />
          <input type="text" name="from_name" placeholder="اكتب اسمك (اختياري)" className="styled-input" required />
          <textarea name="message" placeholder="رأيك يساعدنا على التطوير..." className="styled-input" rows="3" required></textarea>
          
          <button type="submit" className="submit-btn">إرسال التقييم</button>
        </form>

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
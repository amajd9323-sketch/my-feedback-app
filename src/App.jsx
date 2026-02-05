import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './App.css';

function App() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [isSent, setIsSent] = useState(false);
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    // التقييم بالنجوم هو الوحيد الإلزامي لضمان جودة البيانات
    if (rating === 0) {
      alert("يرجى اختيار تقييم بالنجوم أولاً");
      return;
    }

    const SERVICE_ID = "service_daj9zpp";
    const TEMPLATE_ID = "template_ej1u947";
    const PUBLIC_KEY = "ckzhN_erADx_csnor";

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then(() => {
          setIsSent(true);
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
        
        {/* شعار المتجر العلوي */}
        <div className="logo-section">
          <img 
            src="https://hema-sa.com/logo.png" 
            alt="HEMA.SA" 
            className="main-logo"
            onError={(e) => { e.target.src = "https://via.placeholder.com/100x50?text=HEMA.SA" }}
          />
        </div>

        {!isSent ? (
          /* واجهة إدخال التقييم */
          <div className="form-container">
            <h2 className="main-title">تقييمك يهمنا في HEMA.SA</h2>
            <p className="sub-title">رأيك يساعدنا لنكون الأفضل دائماً</p>

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
              
              {/* حقول اختيارية تماماً (لا يوجد required) */}
              <input type="hidden" name="rating" value={rating} />
              <input type="text" name="from_name" placeholder="الاسم (اختياري)" className="styled-input" />
              <textarea name="message" placeholder="رأيك (اختياري)..." className="styled-input" rows="3"></textarea>
              
              <button type="submit" className="submit-btn">إرسال التقييم</button>
            </form>
          </div>
        ) : (
          /* واجهة رسالة الشكر التفاعلية */
          <div className="success-screen">
            <div className="check-mark">✓</div>
            <h2 className="success-title">شكراً لك!</h2>
            <p className="success-text">تم استلام تقييمك بنجاح ونحن نقدر وقتك.</p>
            <button onClick={() => setIsSent(false)} className="re-send-btn">
              إرسال تقييم آخر
            </button>
          </div>
        )}

        {/* رابط الواتساب الثابت */}
        <a href="https://wa.me/972595972039" target="_blank" rel="noreferrer" className="whatsapp-footer">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
            alt="wa" 
          />
          <span>تواصل معنا مباشرة</span>
        </a>

      </div>
    </div>
  );
}

export default App;
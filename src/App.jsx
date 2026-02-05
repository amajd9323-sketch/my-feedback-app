import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './App.css';

function App() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [isSent, setIsSent] = useState(false);
  const form = useRef();

  // ميزة التفاعلات الجديدة
  const getReaction = (val) => {
    const reactions = {
      0: "كيف كانت تجربتك؟",
      1: "سيء جداً 😠",
      2: "سيء 😕",
      3: "جيد نوعاً ما 🙂",
      4: "رائع! 😊",
      5: "ممتاز، أحببت ذلك! 😍"
    };
    return reactions[val] || reactions[0];
  };

  const sendEmail = (e) => {
    e.preventDefault();
    if (rating === 0) { alert("من فضلك اختر النجوم أولاً"); return; }

    emailjs.sendForm('service_daj9zpp', 'template_ej1u947', form.current, 'ckzhN_erADx_csnor')
      .then(() => setIsSent(true))
      .catch(() => alert('عذراً، حاول مرة أخرى'));
  };

  return (
    <div className="main-wrapper">
      <div className="feedback-card">
        <div className="header-section">
           <img src="https://hema-sa.com/logo.png" alt="HEMA.SA" className="main-logo" />
        </div>

        {!isSent ? (
          <form ref={form} onSubmit={sendEmail} className="fade-in">
            <h2 className="main-title">رأيك يهمنا</h2>
            
            {/* عرض التفاعل فوق النجوم */}
            <div className="reaction-text">{getReaction(hover || rating)}</div>
            
            <div className="stars-container">
              {[1, 2, 3, 4, 5].map((s) => (
                <span key={s} 
                  className={`star-node ${s <= (hover || rating) ? 'active' : ''}`}
                  onClick={() => setRating(s)} 
                  onMouseEnter={() => setHover(s)} 
                  onMouseLeave={() => setHover(0)}>
                  ★
                </span>
              ))}
            </div>

            <input type="hidden" name="rating" value={rating} />
            <div className="inputs-group">
               <input type="text" name="from_name" placeholder="الاسم (اختياري)" className="premium-input" />
               <textarea name="message" placeholder="ما الذي يمكننا تحسينه؟ (اختياري)" className="premium-input" rows="3"></textarea>
            </div>
            
            <button type="submit" className="glow-submit-btn">إرسال التقييم الآن</button>
          </form>
        ) : (
          <div className="success-container bounce-in">
            <div className="success-icon">✨</div>
            <h2>شكراً لثقتك!</h2>
            <p>كلماتك تسعدنا وتساعدنا على التطور.</p>
            <button onClick={() => setIsSent(false)} className="retry-btn">إرسال تقييم آخر</button>
          </div>
        )}

        {/* زر الواتساب الضخم والجديد */}
        <div className="whatsapp-section">
            <p className="wa-text">هل لديك استفسار سريع؟</p>
            <a href="https://wa.me/972595972039" target="_blank" rel="noreferrer" className="big-wa-btn">
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="wa" />
              تحدث معنا عبر واتساب
            </a>
        </div>
      </div>
    </div>
  );
}

export default App;
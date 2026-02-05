import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './App.css';
// --- استيراد الشعار الخاص بك من المجلد المحلي ---
import logoImg from './logo.png'; 

function App() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [isSent, setIsSent] = useState(false);
  const form = useRef();

  const getEmoji = (val) => {
    const emojis = { 
      0: "كيف كانت تجربتك؟", 
      1: "سيء جداً 😠", 
      2: "سيء 😕", 
      3: "جيد 🙂", 
      4: "رائع! 😊", 
      5: "ممتاز! 😍" 
    };
    return emojis[val] || emojis[0];
  };

  const sendEmail = (e) => {
    e.preventDefault();
    if (rating === 0) { alert("من فضلك قيمنا بالنجوم أولاً"); return; }
    
    emailjs.sendForm('service_daj9zpp', 'template_ej1u947', form.current, 'ckzhN_erADx_csnor')
      .then(() => {
        setIsSent(true);
        window.scrollTo(0, 0);
      })
      .catch(() => alert('عذراً، حاول مرة أخرى'));
  };

  return (
    <div className="main-wrapper">
      {/* خلفية تقنية متحركة (الجماليات) */}
      <div className="bg-pattern"></div>
      
      <div className="feedback-card">
        <div className="logo-container">
          <img src={logoImg} alt="HEMA.SA" className="main-logo" />
        </div>

        {!isSent ? (
          <form ref={form} onSubmit={sendEmail} className="fade-in">
            <div className="reaction-text">{getEmoji(hover || rating)}</div>
            
            <div className="stars-row">
              {[1, 2, 3, 4, 5].map((s) => (
                <span key={s} 
                  className={`star-item ${s <= (hover || rating) ? 'active' : ''}`}
                  onClick={() => setRating(s)} 
                  onMouseEnter={() => setHover(s)} 
                  onMouseLeave={() => setHover(0)}>
                  ★
                </span>
              ))}
            </div>

            <input type="hidden" name="rating" value={rating} />
            <div className="inputs-wrapper">
              <input type="text" name="from_name" placeholder="الاسم (اختياري)" className="tech-input" />
              <textarea name="message" placeholder="ملاحظاتك الإضافية..." className="tech-input" rows="3"></textarea>
            </div>
            
            <button type="submit" className="glow-btn">إرسال التقييم الآن</button>
          </form>
        ) : (
          <div className="success-msg bounce-in">
            <div className="success-icon">✨</div>
            <h2>تم الإرسال بنجاح!</h2>
            <p>شكراً لك، رأيك يساعد HEMA.SA على التطور.</p>
            <button onClick={() => setIsSent(false)} className="reset-btn">إرسال تقييم جديد</button>
          </div>
        )}

        <div className="wa-footer">
          <p className="wa-help-text">هل تحتاج مساعدة فورية؟</p>
          <a href="https://wa.me/972595972039" target="_blank" rel="noreferrer" className="massive-wa-btn">
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="wa" />
            <span>تواصل معنا عبر واتساب</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './App.css';

function App() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [isSent, setIsSent] = useState(false);
  const form = useRef();

  // نظام التفاعلات الذكي فوق النجوم
  const getReaction = (val) => {
    const reactions = {
      0: "كيف كانت تجربتك معنا؟",
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
    if (rating === 0) { 
      alert("من فضلك اختر النجوم أولاً لتقييمنا"); 
      return; 
    }

    // الرموز الخاصة بك التي تعمل بنجاح
    emailjs.sendForm('service_daj9zpp', 'template_ej1u947', form.current, 'ckzhN_erADx_csnor')
      .then(() => {
          setIsSent(true);
          window.scrollTo(0, 0);
      })
      .catch(() => alert('عذراً، حدث خطأ أثناء الإرسال. حاول مجدداً'));
  };

  return (
    <div className="main-wrapper">
      <div className="feedback-card">
        
        {/* قسم الشعار مع حل مشكلة عدم الظهور */}
        <div className="logo-area">
          <img 
            src="https://hema-sa.com/logo.png" 
            alt="HEMA.SA" 
            className="main-logo"
            onError={(e) => { e.target.src = "https://via.placeholder.com/150x60?text=HEMA.SA"; }} 
          />
        </div>

        {!isSent ? (
          <form ref={form} onSubmit={sendEmail} className="fade-in">
            <h2 className="title">تقييمك يهمنا</h2>
            
            {/* التفاعلات المتحركة */}
            <div className="reaction-box">
              {getReaction(hover || rating)}
            </div>
            
            <div className="stars-wrapper">
              {[1, 2, 3, 4, 5].map((s) => (
                <span key={s} 
                  className={`star-unit ${s <= (hover || rating) ? 'active' : ''}`}
                  onClick={() => setRating(s)} 
                  onMouseEnter={() => setHover(s)} 
                  onMouseLeave={() => setHover(0)}>
                  ★
                </span>
              ))}
            </div>

            <input type="hidden" name="rating" value={rating} />
            <div className="input-fields">
               <input type="text" name="from_name" placeholder="الاسم (اختياري)" className="custom-input" />
               <textarea name="message" placeholder="اكتب ملاحظاتك هنا (اختياري)..." className="custom-input" rows="3"></textarea>
            </div>
            
            <button type="submit" className="submit-action-btn">إرسال التقييم الآن</button>
          </form>
        ) : (
          <div className="success-view bounce-in">
            <div className="check-circle">✨</div>
            <h2>تم الإرسال بنجاح!</h2>
            <p>شكراً لك على وقتك ورأيك الذي نعتز به.</p>
            <button onClick={() => setIsSent(false)} className="back-btn">إرسال تقييم جديد</button>
          </div>
        )}

        {/* زر الواتساب الضخم المحدث */}
        <div className="wa-section">
            <p className="wa-title">تحتاج مساعدة فورية؟</p>
            <a href="https://wa.me/972595972039" target="_blank" rel="noreferrer" className="massive-wa-button">
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="whatsapp" />
              <span>تحدث معنا عبر واتساب</span>
            </a>
        </div>
      </div>
    </div>
  );
}

export default App;
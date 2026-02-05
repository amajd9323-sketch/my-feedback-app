import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './App.css';

function App() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [isSent, setIsSent] = useState(false);
  const form = useRef();

  const getEmoji = (val) => {
    const emojis = { 0: "كيف كانت تجربتك؟", 1: "😠 سيء جداً", 2: "😕 سيء", 3: "🙂 جيد", 4: "😊 رائع", 5: "😍 ممتاز!" };
    return emojis[val] || emojis[0];
  };

  const sendEmail = (e) => {
    e.preventDefault();
    if (rating === 0) { alert("من فضلك قيمنا بالنجوم أولاً"); return; }
    
    emailjs.sendForm('service_daj9zpp', 'template_ej1u947', form.current, 'ckzhN_erADx_csnor')
      .then(() => {
        setIsSent(true);
        window.scrollTo(0,0);
      })
      .catch(() => alert('عذراً، حاول مرة أخرى'));
  };

  return (
    <div className="main-wrapper">
      <div className="feedback-card">
        {/* رابط مباشر للشعار لضمان الظهور */}
        <img src="https://i.ibb.co/Vp8pXpL/logo.jpg" alt="HEMA.SA" className="main-logo" />

        {!isSent ? (
          <form ref={form} onSubmit={sendEmail}>
            <div className="reaction-text">{getEmoji(hover || rating)}</div>
            
            <div style={{marginBottom: '25px'}}>
              {[1, 2, 3, 4, 5].map((s) => (
                <span key={s} className={`star-unit ${s <= (hover || rating) ? 'active' : ''}`}
                  onClick={() => setRating(s)} onMouseEnter={() => setHover(s)} onMouseLeave={() => setHover(0)}>★</span>
              ))}
            </div>

            <input type="hidden" name="rating" value={rating} />
            <input type="text" name="from_name" placeholder="الاسم (اختياري)" className="premium-input" />
            <textarea name="message" placeholder="ملاحظاتك الإضافية (اختياري)..." className="premium-input" rows="3"></textarea>
            
            <button type="submit" className="submit-btn">إرسال التقييم الآن</button>
          </form>
        ) : (
          <div style={{padding: '30px 0'}}>
            <h1 style={{fontSize: '60px'}}>✨</h1>
            <h2 style={{color: '#0f172a'}}>شكراً لثقتك!</h2>
            <p style={{color: '#64748b'}}>رأيك يساعدنا لنكون الأفضل دائماً.</p>
            <button onClick={() => setIsSent(false)} style={{background:'none', border:'none', color:'#00d2ff', cursor:'pointer', textDecoration:'underline', marginTop: '15px'}}>إرسال مرة أخرى</button>
          </div>
        )}

        <div className="wa-container">
          <a href="https://wa.me/972595972039" target="_blank" rel="noreferrer" className="big-wa-button">
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="wa" />
            <span>تواصل معنا عبر واتساب</span>
          </a>
        </div>
      </div>
    </div>
  );
}
export default App;
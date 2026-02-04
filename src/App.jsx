import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import confetti from 'canvas-confetti';
import './App.css';

function App() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [userName, setUserName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const labels = ["", "سيء جداً 😞", "مقبول 😐", "جيد 🙂", "رائع جداً 😊", "ممتاز! 😍"];

  const handleSendFeedback = () => {
    if (rating === 0) return alert("من فضلك اختر النجوم أولاً!");
    setLoading(true);

    const params = { 
      rating, 
      message: feedback, 
      user_name: userName || "عميل مجهول",
      user_email: 'amajd9323@gmail.com' 
    };

    emailjs.send('service_daj9zpp', 'template_ej1u947', params, 'ckzhN_erADx_csnor')
      .then(() => { 
        setSubmitted(true); 
        setLoading(false);
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00e5ff', '#00b8d4', '#1a1a1a']
        });
      })
      .catch(() => { alert("فشل الإرسال"); setLoading(false); });
  };

  return (
    <div className="main-wrapper">
      <div className="feedback-card">
        {!submitted ? (
          <>
           <div className="logo-container">
  <img src="/logo.png" alt="HEMA.SA" className="site-logo" />
</div>
            <h2 className="header-title">تقييمك يهمنا في HEMA.SA</h2>
            <p className="dynamic-text">{labels[hover || rating] || "ساعدنا لنكون الأفضل"}</p>

            <div className="stars-row">
              {[1, 2, 3, 4, 5].map((num) => (
                <span
                  key={num}
                  className={`star-box ${num <= (hover || rating) ? 'active' : ''}`}
                  onClick={() => setRating(num)}
                  onMouseEnter={() => setHover(num)}
                  onMouseLeave={() => setHover(0)}
                >
                  ★
                </span>
              ))}
            </div>

            <input 
              type="text" 
              className="styled-input-small" 
              placeholder="اكتب اسمك (اختياري)" 
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />

            <textarea
              className="styled-input"
              placeholder="رأيك يساعدنا على التطوير..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />

            <button className="submit-btn" onClick={handleSendFeedback} disabled={loading}>
              {loading ? "جاري الإرسال..." : "إرسال التقييم"}
            </button>
          </>
        ) : (
          <div className="success-state">
            <div className="success-icon">🎊</div>
            <h2>شكراً لك {userName}!</h2>
            <p>تم استلام تقييمك بنجاح في HEMA.SA</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
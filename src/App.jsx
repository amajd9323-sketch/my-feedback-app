import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import confetti from 'canvas-confetti'; // استيراد مكتبة القصاصات
import './App.css';

function App() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [userName, setUserName] = useState(""); // خانة الاسم الجديدة
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
      user_name: userName || "عميل مجهول", // إرسال الاسم
      user_email: 'amajd9323@gmail.com' 
    };

    emailjs.send('service_daj9zpp', 'template_ej1u947', params, 'ckzhN_erADx_csnor')
      .then(() => { 
        setSubmitted(true); 
        setLoading(false);
        // تشغيل تأثير القصاصات الملونة عند النجاح
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 }
        });
      })
      .catch(() => { alert("فشل الإرسال"); setLoading(false); });
  };

  return (
    <div className="main-wrapper">
      <div className="feedback-card">
        {!submitted ? (
          <>
            <div className="top-icon">⭐</div>
            <h2 className="header-title">ما هو تقييمك لخدمتنا؟</h2>
            <p className="dynamic-text">{labels[hover || rating] || "رأيك يساعدنا على التطوير"}</p>

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
              placeholder="هل لديك ملاحظات إضافية؟"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />

            <button className="submit-btn" onClick={handleSendFeedback} disabled={loading}>
              {loading ? "جاري الإرسال..." : "إرسال التقييم"}
            </button>
          </>
        ) : (
          <div className="success-state">
            <div className="success-icon">🎉</div>
            <h2>شكراً لك {userName}!</h2>
            <p>تم استلام تقييمك بنجاح.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
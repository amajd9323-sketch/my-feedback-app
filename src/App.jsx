import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import './App.css';

function App() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // مصفوفة النصوص التفاعلية بناءً على عدد النجوم
  const feedbackTexts = [
    "رأيك يساعدنا على التطوير",
    "نعتذر عن تجربتك السيئة 😞",
    "سنعمل بجد للتحسن 😐",
    "شكراً، نطمح للأفضل دائماً 🙂",
    "سعداء لأننا أعجبناك 😊",
    "أنت رائع! شكراً لثقتك 😍"
  ];

  const handleSendFeedback = () => {
    if (rating === 0) return alert("من فضلك اختر النجوم أولاً!");
    setLoading(true);

    const params = { 
      rating, 
      message: feedback, 
      user_email: 'amajd9323@gmail.com' //
    };

    emailjs.send(
      'service_daj9zpp', //
      'template_ej1u947', //
      params, 
      'ckzhN_erADx_csnor' //
    )
      .then(() => { setSubmitted(true); setLoading(false); })
      .catch(() => { alert("عذراً، فشل الإرسال"); setLoading(false); });
  };

  return (
    <div className="main-wrapper">
      <div className="feedback-card">
        {!submitted ? (
          <>
            <div className="floating-star">⭐</div>
            <h2 className="title">ما هو تقييمك لخدمتنا؟</h2>
            
            {/* النص الذي يتغير فوراً مع حركة الماوس أو النقر */}
            <p className="dynamic-subtext">
              {feedbackTexts[hover || rating]}
            </p>

            <div className="stars-row">
              {[1, 2, 3, 4, 5].map((num) => (
                <span
                  key={num}
                  className={`star-unit ${num <= (hover || rating) ? 'active' : ''}`}
                  onClick={() => setRating(num)}
                  onMouseEnter={() => setHover(num)}
                  onMouseLeave={() => setHover(0)}
                >
                  ★
                </span>
              ))}
            </div>

            <textarea
              className="feedback-area"
              placeholder="هل لديك ملاحظات إضافية؟ (اختياري)"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />

            <button className="submit-btn" onClick={handleSendFeedback} disabled={loading}>
              {loading ? "جاري الإرسال..." : "إرسال التقييم"}
            </button>
          </>
        ) : (
          <div className="success-container">
            <div className="success-badge">{rating === 5 ? "🏆" : "✅"}</div>
            <h2>{rating === 5 ? "تقييم ملكي!" : "تم الاستلام!"}</h2>
            <p>شكراً لكونك جزءاً من عائلتنا.</p>
            <button className="retry-btn" onClick={() => {setSubmitted(false); setRating(0); setFeedback("");}}>
              إرسال تقييم آخر
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
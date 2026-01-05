"use client";

import React, { useState, useEffect } from 'react';

/**
 * @title صرح نور الوحي - أكاديمية نفرتيتي الملكية
 * @version 1.1.0
 * @description واجهة تفاعلية ملكية مصممة خصيصاً لتناسب رؤية الملكة نفرتيتي
 */

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // محاكاة تحميل الأبعاد المعمارية للصرح الملكي
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-[#d4af37] font-serif overflow-hidden selection:bg-[#d4af37] selection:text-black">
      {/* استايلات مخصصة للهوية الملكية */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Reem+Kufi:wght@400;700&display=swap');
        
        body {
          font-family: 'Amiri', serif;
          background-color: #050505;
        }

        .gold-shadow {
          text-shadow: 0 0 20px rgba(212, 175, 55, 0.3);
        }

        .royal-gradient {
          background: radial-gradient(circle at center, #1a1a1a 0%, #000000 100%);
        }

        .animate-royal-glow {
          animation: glow 3s infinite alternate;
        }

        @keyframes glow {
          from { opacity: 0.6; transform: scale(1); }
          to { opacity: 1; transform: scale(1.05); }
        }
      `}</style>

      <div className="royal-gradient min-h-screen flex flex-col items-center justify-center p-4 relative">
        {/* النقوش الخلفية البسيطة */}
        <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
             <svg width="80%" height="80%" viewBox="0 0 100 100">
                <path d="M50 5 L95 95 L5 95 Z" fill="none" stroke="#d4af37" strokeWidth="0.5" />
             </svg>
        </div>

        {/* الشعار والعنوان */}
        <header className="mb-12 text-center z-10">
          <h1 className="text-5xl md:text-8xl font-bold gold-shadow mb-4" style={{ fontFamily: "'Reem Kufi', sans-serif" }}>
            أكاديمية نفرتيتي الملكية
          </h1>
          <div className="flex items-center justify-center gap-4">
            <span className="h-[1px] w-12 bg-[#d4af37] opacity-50"></span>
            <p className="text-lg md:text-2xl tracking-[0.4em] text-gray-400 uppercase italic">
              صرح نور الوحي
            </p>
            <span className="h-[1px] w-12 bg-[#d4af37] opacity-50"></span>
          </div>
        </header>

        {/* الكرت الرئيسي المحاكي */}
        <main className="z-10 w-full max-w-2xl">
          <div className="bg-black/60 backdrop-blur-xl border border-[#d4af37]/30 p-8 md:p-16 rounded-[2.5rem] shadow-2xl text-center relative overflow-hidden">
            
            {/* أيقونة الصرح */}
            <div className="mb-8 relative inline-block">
               <div className="absolute inset-0 bg-[#d4af37] blur-2xl opacity-10 animate-pulse"></div>
               <svg className="w-24 h-24 mx-auto text-[#d4af37] relative" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
               </svg>
            </div>

            <h2 className="text-3xl font-bold mb-6 text-white" style={{ fontFamily: "'Reem Kufi', sans-serif" }}>
              نظام المحاكاة الرقمي
            </h2>
            
            <p className="text-gray-400 leading-relaxed mb-10 text-lg">
              يتم الآن تهيئة الأروقة الملكية والمعايير الفلسفية للأكاديمية. 
              هذا النظام يعمل بذكاء اصطناعي فائق لضمان تجربة تليق بمقام جلالتكم.
            </p>

            {loading ? (
              <div className="flex flex-col items-center">
                <div className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden mb-4">
                  <div className="h-full bg-[#d4af37] animate-[loading_2s_infinite]" style={{ width: '60%' }}></div>
                </div>
                <span className="text-xs uppercase tracking-widest opacity-50">جاري استدعاء البيانات الملكية...</span>
              </div>
            ) : (
              <button 
                onClick={() => window.location.reload()}
                className="bg-gradient-to-br from-[#d4af37] to-[#aa8928] text-black px-12 py-4 rounded-full font-bold text-xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[#d4af37]/20 border-none cursor-pointer"
                style={{ fontFamily: "'Reem Kufi', sans-serif" }}
              >
                دخول الصرح
              </button>
            )}
          </div>
        </main>

        {/* التذييل الملكي */}
        <footer className="absolute bottom-8 text-gray-600 text-[10px] md:text-xs tracking-[0.5em] uppercase z-10">
          © 2026 Nefertiti Royal Academy • Sacred Light Domain
        </footer>

        {/* تأثيرات الجزيئات (Particles) */}
        <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
                <div 
                    key={i}
                    className="absolute bg-[#d4af37] rounded-full opacity-20 animate-pulse"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        width: `${Math.random() * 3}px`,
                        height: `${Math.random() * 3}px`,
                        animationDelay: `${Math.random() * 5}s`
                    }}
                />
            ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
}

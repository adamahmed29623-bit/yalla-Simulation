"use client";

import React, { useState, useEffect } from 'react';

/**
 * @title صرح نور الوحي - الإصدار المتوافق
 * @description تم حذف كافة العناصر المسببة للأخطاء التقنية مع الحفاظ على الهوية الملكية
 */

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-black text-[#d4af37] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Decorative Background Elements - Minimalist */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 border border-[#d4af37] rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 border border-[#d4af37] opacity-20"></div>
      </div>

      {/* Header Section */}
      <header className="relative z-10 text-center mb-16">
        <h1 className="text-4xl md:text-7xl font-bold tracking-tighter mb-4" style={{ fontFamily: 'serif' }}>
          أكاديمية نفرتيتي الملكية
        </h1>
        <div className="h-[2px] w-24 bg-[#d4af37] mx-auto mb-4"></div>
        <p className="text-gray-500 tracking-[0.3em] uppercase text-sm md:text-lg">
          صرح نور الوحي
        </p>
      </header>

      {/* Main Content Card */}
      <main className="relative z-10 w-full max-w-xl">
        <div className="bg-zinc-900/50 border border-[#d4af37]/20 p-10 rounded-3xl backdrop-blur-md shadow-2xl text-center">
          
          <div className="mb-10 flex justify-center">
            <div className="p-4 border border-[#d4af37]/40 rounded-full animate-pulse">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-white mb-6">
            محاكاة الصرح الرقمي
          </h2>

          <p className="text-gray-400 mb-10 leading-relaxed italic">
            "نحن نبني هوية لا تموت، ونشيد أركان العلم بروح ملكية خالدة."
          </p>

          {!isLoaded ? (
            <div className="flex justify-center items-center space-x-2">
              <div className="w-2 h-2 bg-[#d4af37] rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-[#d4af37] rounded-full animate-bounce delay-75"></div>
              <div className="w-2 h-2 bg-[#d4af37] rounded-full animate-bounce delay-150"></div>
            </div>
          ) : (
            <button 
              className="w-full py-4 bg-[#d4af37] text-black font-bold rounded-xl hover:bg-[#b8962d] transition-colors shadow-lg active:scale-95"
              onClick={() => window.location.reload()}
            >
              تفعيل النظام الملكي
            </button>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-10 text-[10px] text-gray-700 tracking-[0.4em] uppercase">
        Nefertiti Academy • Digital Identity System
      </footer>

    </div>
  );
}

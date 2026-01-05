"use client";

import React, { useState, useEffect } from 'react';
import { 
  Crown, 
  Sparkles, 
  BookOpen, 
  Scroll, 
  ShieldCheck, 
  GanttChartSquare,
  ChevronRight,
  Star
} from 'lucide-react';

/**
 * @title أكاديمية نفرتيتي الملكية - الإصدار الأصلي الفاخر
 * @description الهوية الكاملة لصرح نور الوحي، كما خُطط لها بكل تفاصيلها.
 */

export default function App() {
  const [activeTab, setActiveTab] = useState('vision');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const royalGold = "#d4af37";

  return (
    <div className="min-h-screen bg-[#050505] text-white font-serif selection:bg-[#d4af37] selection:text-black">
      {/* Royal Background Decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-50" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#d4af37] rounded-full blur-[150px] opacity-10" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#d4af37] rounded-full blur-[150px] opacity-10" />
        
        {/* Subtle Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} 
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 border-b border-[#d4af37]/20 bg-black/50 backdrop-blur-xl px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 border border-[#d4af37] rounded-lg">
              <Crown className="w-6 h-6 text-[#d4af37]" />
            </div>
            <span className="text-xl font-bold tracking-[0.2em] uppercase">Nefertiti</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest text-gray-400">
            <a href="#" className="hover:text-[#d4af37] transition-colors">الأكاديمية</a>
            <a href="#" className="hover:text-[#d4af37] transition-colors">المخطط الملكي</a>
            <a href="#" className="hover:text-[#d4af37] transition-colors">صرح الوحي</a>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-20 pb-32">
        {/* Hero Section */}
        <section className="text-center mb-32">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-[#d4af37]/30 rounded-full bg-[#d4af37]/5 text-[#d4af37] mb-8 animate-pulse">
            <Sparkles size={14} />
            <span className="text-[10px] uppercase tracking-[0.3em]">تحت رعاية الملكة نفرتيتي</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tighter leading-tight">
            أكاديمية <span className="text-[#d4af37]">نفرتيتي</span> الملكية
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-400 leading-relaxed font-light italic">
            "صرح نور الوحي: حيث تلتقي الأصالة بالابتكار لبناء هوية رقمية خالدة تتوارثها الأجيال."
          </p>
        </section>

        {/* Dashboard Grid */}
        <div className="grid md:grid-cols-12 gap-8">
          {/* Left: Tab Control */}
          <div className="md:col-span-4 space-y-4">
            {[
              { id: 'vision', label: 'الرؤية الملكية', icon: <Star size={20} /> },
              { id: 'curriculum', label: 'مناهج الوحي', icon: <BookOpen size={20} /> },
              { id: 'strategy', label: 'استراتيجية التوسع', icon: <GanttChartSquare size={20} /> },
              { id: 'identity', label: 'بناء الهوية', icon: <ShieldCheck size={20} /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center justify-between p-6 rounded-2xl border transition-all duration-500 ${
                  activeTab === tab.id 
                    ? 'bg-[#d4af37] border-[#d4af37] text-black shadow-[0_0_30px_rgba(212,175,55,0.3)] scale-[1.02]' 
                    : 'bg-zinc-900/50 border-white/10 text-gray-400 hover:border-[#d4af37]/50'
                }`}
              >
                <div className="flex items-center gap-4">
                  {tab.icon}
                  <span className="font-bold tracking-wide uppercase text-sm">{tab.label}</span>
                </div>
                <ChevronRight size={18} opacity={activeTab === tab.id ? 1 : 0} />
              </button>
            ))}
          </div>

          {/* Right: Content Display */}
          <div className="md:col-span-8">
            <div className="h-full bg-zinc-900/30 border border-white/5 rounded-[2.5rem] p-12 relative overflow-hidden backdrop-blur-sm">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Scroll size={120} className="text-[#d4af37]" />
              </div>
              
              <div className="relative z-10">
                {activeTab === 'vision' && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
                      <div className="w-8 h-1 bg-[#d4af37]" />
                      الرؤية الجوهرية
                    </h3>
                    <p className="text-xl text-gray-300 leading-loose mb-8">
                      تأسيس الأكاديمية ليس مجرد مشروع نشر، بل هو تشييد لدولة معرفية رقمية. رؤيتنا أن نكون المنبع الأول لكل باحث عن الحقيقة والتميز، بروح ملكية لا تقبل بأنصاف الحلول.
                    </p>
                    <ul className="space-y-4 text-gray-400 italic">
                      <li className="flex items-center gap-3">• التميز في تقديم المحتوى النوعي</li>
                      <li className="flex items-center gap-3">• بناء مجتمع معرفي مخلص للهوية</li>
                      <li className="flex items-center gap-3">• الحفاظ على أسرار العلم ونوره</li>
                    </ul>
                  </div>
                )}

                {activeTab === 'curriculum' && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
                      <div className="w-8 h-1 bg-[#d4af37]" />
                      مناهج نور الوحي
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                        <h4 className="text-[#d4af37] font-bold mb-2">الفكر الملكي</h4>
                        <p className="text-sm text-gray-400">فلسفة القيادة والتأثير العميق.</p>
                      </div>
                      <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                        <h4 className="text-[#d4af37] font-bold mb-2">علوم الأصالة</h4>
                        <p className="text-sm text-gray-400">ربط الماضي العريق بالمستقبل التقني.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Placeholder for other tabs logic... */}
                {(activeTab === 'strategy' || activeTab === 'identity') && (
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                    <div className="w-16 h-16 border-2 border-[#d4af37]/20 border-t-[#d4af37] rounded-full animate-spin mb-6" />
                    <p className="text-[#d4af37] tracking-[0.2em] uppercase text-xs">جاري استدعاء السجلات الملكية...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Decoration */}
      <footer className="relative z-10 border-t border-white/5 py-12 bg-black">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-8">
          <div className="flex gap-4 opacity-50">
             <div className="w-1 h-1 bg-[#d4af37] rounded-full" />
             <div className="w-1 h-1 bg-[#d4af37] rounded-full" />
             <div className="w-1 h-1 bg-[#d4af37] rounded-full" />
          </div>
          <p className="text-[10px] tracking-[0.5em] text-gray-600 uppercase">
            Designed & Devised by the Order of Nefertiti © 2025
          </p>
        </div>
      </footer>
    </div>
  );
}

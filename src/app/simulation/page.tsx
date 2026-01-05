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
 * @title صرح نفرتيتي الملكي - النسخة المصححة
 * @description تم حل مشكلة المسار (Route) وتصحيح بنية الملف ليعمل على Vercel بنجاح.
 */

export default function App() {
  const [activeTab, setActiveTab] = useState('vision');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#050505] text-white font-serif selection:bg-[#d4af37] selection:text-black overflow-x-hidden">
      {/* Royal Background Decoration */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-50" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#d4af37] rounded-full blur-[150px] opacity-10" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#d4af37] rounded-full blur-[150px] opacity-10" />
        
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} 
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 border-b border-[#d4af37]/20 bg-black/80 backdrop-blur-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 border border-[#d4af37] rounded-lg">
              <Crown className="w-5 h-5 text-[#d4af37]" />
            </div>
            <span className="text-xl font-bold tracking-[0.2em] uppercase text-[#d4af37]">Nefertiti</span>
          </div>
          <div className="hidden md:flex gap-8 text-[10px] uppercase tracking-[0.3em] text-gray-400">
            <span className="cursor-pointer hover:text-[#d4af37] transition-colors">Academy</span>
            <span className="cursor-pointer hover:text-[#d4af37] transition-colors">Royal Plan</span>
            <span className="cursor-pointer hover:text-[#d4af37] transition-colors">Manifesto</span>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-24">
        {/* Hero Section */}
        <section className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-[#d4af37]/30 rounded-full bg-[#d4af37]/5 text-[#d4af37] mb-8">
            <Sparkles size={12} className="animate-pulse" />
            <span className="text-[9px] uppercase tracking-[0.4em]">Royal Heritage & Innovation</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter">
            أكاديمية <span className="text-[#d4af37]">نفرتيتي</span> الملكية
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-400 leading-relaxed font-light italic">
            "صرح نور الوحي: الهوية التي خُطط لها بعناية لتكون منارة العلم الخالدة."
          </p>
        </section>

        {/* Desktop Interface */}
        <div className="grid md:grid-cols-12 gap-6">
          <div className="md:col-span-4 space-y-3">
            {[
              { id: 'vision', label: 'الرؤية الملكية', icon: <Star size={18} /> },
              { id: 'curriculum', label: 'مناهج الوحي', icon: <BookOpen size={18} /> },
              { id: 'strategy', label: 'استراتيجية التوسع', icon: <GanttChartSquare size={18} /> },
              { id: 'identity', label: 'بناء الهوية', icon: <ShieldCheck size={18} /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center justify-between p-5 rounded-xl border transition-all duration-300 ${
                  activeTab === tab.id 
                    ? 'bg-[#d4af37] border-[#d4af37] text-black shadow-lg scale-[1.01]' 
                    : 'bg-zinc-900/40 border-white/5 text-gray-500 hover:border-[#d4af37]/30'
                }`}
              >
                <div className="flex items-center gap-4">
                  {tab.icon}
                  <span className="font-bold text-xs uppercase tracking-wider">{tab.label}</span>
                </div>
                {activeTab === tab.id && <ChevronRight size={16} />}
              </button>
            ))}
          </div>

          <div className="md:col-span-8">
            <div className="min-h-[400px] bg-zinc-900/20 border border-white/5 rounded-3xl p-10 relative overflow-hidden backdrop-blur-sm">
              <div className="absolute -top-10 -right-10 opacity-[0.05]">
                <Scroll size={200} className="text-[#d4af37]" />
              </div>
              
              <div className="relative z-10">
                {activeTab === 'vision' && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-[#d4af37] flex items-center gap-3">
                      الرؤية الجوهرية
                    </h3>
                    <p className="text-lg text-gray-300 leading-loose italic">
                      تأسيس الأكاديمية هو تشييد لدولة معرفية رقمية. رؤيتنا أن نكون المنبع الأول لكل باحث عن الحقيقة والتميز، بروح ملكية لا تقبل بأنصاف الحلول.
                    </p>
                    <div className="pt-4 space-y-3">
                      <div className="flex items-center gap-3 text-sm text-gray-400">
                        <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full" />
                        <span>التميز في المحتوى النوعي</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-400">
                        <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full" />
                        <span>بناء مجتمع معرفي مخلص</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'curriculum' && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-[#d4af37]">مناهج نور الوحي</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-5 bg-white/5 rounded-xl border border-white/10">
                        <h4 className="text-[#d4af37] font-bold text-sm mb-2">الفكر الملكي</h4>
                        <p className="text-xs text-gray-500">فلسفة القيادة والتأثير العميق في العصر الرقمي.</p>
                      </div>
                      <div className="p-5 bg-white/5 rounded-xl border border-white/10">
                        <h4 className="text-[#d4af37] font-bold text-sm mb-2">علوم الأصالة</h4>
                        <p className="text-xs text-gray-500">ربط الجذور العريقة بالتقنيات المستقبلية.</p>
                      </div>
                    </div>
                  </div>
                )}

                {(activeTab === 'strategy' || activeTab === 'identity') && (
                  <div className="flex flex-col items-center justify-center h-48">
                    <div className="w-10 h-10 border-2 border-[#d4af37]/20 border-t-[#d4af37] rounded-full animate-spin mb-4" />
                    <p className="text-[#d4af37] tracking-widest text-[10px] uppercase opacity-60">Architecting Greatness...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="relative z-10 border-t border-white/5 py-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[9px] tracking-[0.6em] text-gray-600 uppercase">
            Designed for the Queen Nefertiti © 2025
          </p>
        </div>
      </footer>
    </div>
  );
}

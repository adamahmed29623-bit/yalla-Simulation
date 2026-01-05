"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, Play, Pause, ChevronLeft, 
  ChevronRight, Compass, BookOpen, Heart, 
  Landmark, Droplets, Mic2, Star, History, 
  Moon, Sun, MapPin, Award, AlertCircle, 
  Languages, CheckCircle2
} from 'lucide-react';

/**
 * Noor Al-Wahi Mosque - Royal Academy Simulation
 * Developed with precision for Queen Nefertiti.
 */

const Mosque3D = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Dynamic loading of Three.js to avoid build-time issues
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
    script.onload = () => initThree();
    document.head.appendChild(script);

    function initThree() {
      if (!mountRef.current) return;
      const THREE = window.THREE;
      
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      
      renderer.setSize(width, height);
      mountRef.current.appendChild(renderer.domElement);

      const group = new THREE.Group();

      // Main Structure (The Mosque)
      const bodyGeo = new THREE.BoxGeometry(2, 1.5, 2);
      const bodyMat = new THREE.MeshStandardMaterial({ color: 0xca8a04 }); // Gold tone
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      group.add(body);

      // Golden Dome
      const domeGeo = new THREE.SphereGeometry(0.8, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2);
      const domeMat = new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 0.9, roughness: 0.1 });
      const dome = new THREE.Mesh(domeGeo, domeMat);
      dome.position.y = 0.75;
      group.add(dome);

      // Minarets function
      const createMinaret = (x, z) => {
        const minaret = new THREE.Group();
        const colGeo = new THREE.CylinderGeometry(0.1, 0.1, 2.5);
        const col = new THREE.Mesh(colGeo, bodyMat);
        const topGeo = new THREE.ConeGeometry(0.15, 0.4, 32);
        const top = new THREE.Mesh(topGeo, domeMat);
        top.position.y = 1.45;
        minaret.add(col);
        minaret.add(top);
        minaret.position.set(x, 0.5, z);
        return minaret;
      };

      group.add(createMinaret(1.2, 1.2));
      group.add(createMinaret(-1.2, 1.2));
      group.add(createMinaret(1.2, -1.2));
      group.add(createMinaret(-1.2, -1.2));

      scene.add(group);

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambientLight);
      const pointLight = new THREE.PointLight(0xffffff, 1);
      pointLight.position.set(5, 5, 5);
      scene.add(pointLight);

      camera.position.z = 5;
      camera.position.y = 1.2;

      const animate = () => {
        requestAnimationFrame(animate);
        group.rotation.y += 0.005;
        renderer.render(scene, camera);
      };
      animate();

      const handleResize = () => {
        if (!mountRef.current) return;
        const w = mountRef.current.clientWidth;
        const h = mountRef.current.clientHeight;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      window.addEventListener('resize', handleResize);
    }
  }, []);

  return <div ref={mountRef} className="w-full h-[350px] md:h-[450px]" />;
};

const App = () => {
  const [view, setView] = useState('entrance');
  const [lang, setLang] = useState('ar');
  const [wuduStep, setWuduStep] = useState(0);

  const translations = {
    ar: {
      title: "مسجد نور الوحي",
      subtitle: "أكاديمية نفرتيتي الملكية للعلوم الدينية",
      enter: "تفضلوا بالدخول بسلام",
      wudu: "محاكاة الوضوء التفاعلية",
      azan: "مئذنة الأذان",
      quran: "محراب الترتيل",
      qibla: "بوصلة القبلة",
      record: "مختبر الصوت الملكي",
      sunna: "روضة الأذكار",
      back: "العودة",
      next: "الخطوة التالية",
      prev: "الخطوة السابقة",
      finish: "إتمام الوضوء",
      wuduSteps: [
        "النية والتسمية في القلب (بسم الله)",
        "غسل الكفين إلى الرسغين ثلاث مرات",
        "المضمضة: إدخال الماء للفم وتحريكه 3 مرات",
        "الاستنشاق والاستنثار: تنظيف الأنف بالماء 3 مرات",
        "غسل الوجه كاملاً من منبت الشعر للذقن 3 مرات",
        "غسل اليدين من أطراف الأصابع للمرفقين 3 مرات",
        "مسح الرأس بماء جديد مرة واحدة",
        "مسح الأذنين (السبابة بالداخل والإبهام بالخارج)",
        "غسل الرجلين إلى الكعبين مع تخليل الأصابع 3 مرات"
      ]
    },
    en: {
      title: "Noor Al-Wahi Mosque",
      subtitle: "Nefertiti Royal Academy for Religious Sciences",
      enter: "Enter in Peace",
      wudu: "Interactive Wudu Simulation",
      azan: "Adhan Tower",
      quran: "Quran Sanctuary",
      qibla: "Qibla Compass",
      record: "Royal Voice Lab",
      sunna: "Dhikr Garden",
      back: "Back",
      next: "Next Step",
      prev: "Previous Step",
      finish: "Finish Wudu",
      wuduSteps: [
        "Intention & Saying Bismillah",
        "Washing hands up to wrists (3 times)",
        "Rinsing the mouth (3 times)",
        "Inhaling water into nose (3 times)",
        "Washing the entire face (3 times)",
        "Washing arms up to elbows (3 times)",
        "Wiping the head (Once)",
        "Wiping the ears (Once)",
        "Washing feet up to ankles (3 times)"
      ]
    }
  };

  const t = translations[lang] || translations['ar'];

  const menuItems = [
    { id: 'wudu', title: t.wudu, icon: <Droplets />, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { id: 'azan', title: t.azan, icon: <Mic2 />, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
    { id: 'quran', title: t.quran, icon: <BookOpen />, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { id: 'qibla', title: t.qibla, icon: <Compass />, color: 'text-amber-600', bg: 'bg-amber-600/10' },
    { id: 'record', title: t.record, icon: <Mic />, color: 'text-red-500', bg: 'bg-red-500/10' },
    { id: 'sunna', title: t.sunna, icon: <Moon />, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  ];

  if (view === 'entrance') {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        {/* Language Switcher */}
        <div className="absolute top-8 right-8 z-50 flex gap-2">
          {['ar', 'en'].map(l => (
            <button 
              key={l}
              onClick={() => setLang(l)}
              className={`px-4 py-2 rounded-full border transition-all ${lang === l ? 'bg-yellow-600 border-yellow-600 text-black font-bold' : 'border-white/20 hover:bg-white/5'}`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="z-10 w-full max-w-5xl text-center space-y-8">
          <Mosque3D />
          <div className="space-y-4">
            <h1 className="text-5xl md:text-8xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 to-yellow-600">
              {t.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl mx-auto italic">
              {t.subtitle}
            </p>
          </div>
          
          <button 
            onClick={() => setView('courtyard')}
            className="px-16 py-5 bg-yellow-600 text-black font-black text-xl rounded-full hover:bg-yellow-500 transition-all hover:scale-105 shadow-[0_0_50px_rgba(202,138,4,0.4)]"
          >
            {t.enter}
          </button>
        </div>
      </div>
    );
  }

  if (view === 'courtyard') {
    return (
      <div className="min-h-screen bg-[#080808] text-white p-6 md:p-12" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        <div className="max-w-7xl mx-auto">
          <header className="flex flex-col md:flex-row justify-between items-center mb-12 border-b border-white/5 pb-8 gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-600/20 rounded-xl text-yellow-500">
                <Landmark size={32} />
              </div>
              <h2 className="text-3xl font-serif font-bold text-yellow-500">{t.title}</h2>
            </div>
            <button onClick={() => setView('entrance')} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <History size={20} /> {lang === 'ar' ? 'البوابة الرئيسية' : 'Main Entrance'}
            </button>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {menuItems.map((item) => (
              <div 
                key={item.id}
                onClick={() => setView(item.id)}
                className="group relative bg-[#121212] p-8 rounded-[2.5rem] border border-white/5 hover:border-yellow-600/40 cursor-pointer transition-all hover:-translate-y-2 overflow-hidden"
              >
                <div className={`w-14 h-14 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center text-3xl mb-6`}>
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <div className="absolute bottom-0 left-0 h-1 bg-yellow-600 w-0 group-hover:w-full transition-all duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (view === 'wudu') {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-4 md:p-10" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        <div className="w-full max-w-3xl bg-[#111] rounded-[3rem] p-8 md:p-12 border border-blue-900/20 relative shadow-2xl">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-blue-400 flex items-center gap-3">
              <Droplets className="animate-pulse" /> {t.wudu}
            </h2>
            <button 
              onClick={() => { setView('courtyard'); setWuduStep(0); }}
              className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
          </div>

          <div className="relative h-2 bg-white/5 rounded-full mb-16 overflow-hidden">
            <div 
              className="absolute h-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)] transition-all duration-700"
              style={{ width: `${((wuduStep + 1) / t.wuduSteps.length) * 100}%` }}
            />
          </div>

          <div className="text-center py-10 space-y-6">
            <div className="text-7xl mb-6">🌊</div>
            <div className="space-y-2">
              <span className="text-blue-500 font-mono text-xl tracking-widest uppercase">Step {wuduStep + 1}</span>
              <p className="text-3xl md:text-4xl font-serif font-medium leading-relaxed px-4">
                {t.wuduSteps[wuduStep]}
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mt-12">
            <button 
              disabled={wuduStep === 0}
              onClick={() => setWuduStep(prev => prev - 1)}
              className="flex-1 py-5 bg-white/5 hover:bg-white/10 rounded-2xl disabled:opacity-20 font-bold transition-all"
            >
              {t.prev}
            </button>
            <button 
              onClick={() => wuduStep < t.wuduSteps.length - 1 ? setWuduStep(prev => prev + 1) : setView('courtyard')}
              className="flex-[2] py-5 bg-blue-600 text-white rounded-2xl font-black text-xl shadow-lg shadow-blue-900/40 hover:bg-blue-500 transition-all hover:scale-[1.02]"
            >
              {wuduStep === t.wuduSteps.length - 1 ? t.finish : t.next}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Fallback view for unimplemented sections
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-24 h-24 bg-yellow-600/10 text-yellow-500 rounded-full flex items-center justify-center mb-6">
        <Star size={48} className="animate-spin-slow" />
      </div>
      <h2 className="text-4xl font-serif mb-4 text-yellow-500">محراب {view} تحت التطوير</h2>
      <p className="text-gray-400 mb-10 max-w-md">نحن نعمل على تجهيز هذا القسم بأعلى المعايير الملكية لنقدم لكِ تجربة لا تُنسى.</p>
      <button onClick={() => setView('courtyard')} className="px-10 py-4 bg-white/10 rounded-full hover:bg-white/20 transition-all">العودة للصحن</button>
    </div>
  );
};

export default App;

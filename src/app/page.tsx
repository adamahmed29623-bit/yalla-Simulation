"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Landmark, Droplets, BookOpen, Mic2, 
  History, Compass, Star, ChevronRight,
  ChevronLeft, Play, Pause, Volume2
} from 'lucide-react';

/**
 * @title Mosque3D - المحاكاة ثلاثية الأبعاد للمسجد الملكي
 * يستخدم Three.js لرسم الصرح المعماري بأسلوب يليق بأكاديمية نفرتيتي.
 */
const Mosque3D = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // تحميل مكتبة Three.js من مصدر خارجي لضمان استقرار البناء (Build)
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
    script.async = true;
    script.onload = () => {
      if (!mountRef.current || !window.THREE) return;
      const THREE = window.THREE;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      mountRef.current.appendChild(renderer.domElement);

      // جسم المسجد الرملي الملكي
      const bodyGeo = new THREE.BoxGeometry(2, 1.5, 2);
      const bodyMat = new THREE.MeshStandardMaterial({ color: 0xc5a059, roughness: 0.7 }); 
      const mosqueBody = new THREE.Mesh(bodyGeo, bodyMat);
      scene.add(mosqueBody);

      // القبة الذهبية
      const domeGeo = new THREE.SphereGeometry(0.85, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2);
      const domeMat = new THREE.MeshStandardMaterial({ 
        color: 0xffd700, 
        metalness: 0.9, 
        roughness: 0.1 
      });
      const dome = new THREE.Mesh(domeGeo, domeMat);
      dome.position.y = 0.75;
      scene.add(dome);

      // المآذن الأربعة
      const minaretGeo = new THREE.CylinderGeometry(0.1, 0.15, 3);
      const positions = [[1.2, 1.2], [-1.2, 1.2], [1.2, -1.2], [-1.2, -1.2]];
      positions.forEach(pos => {
        const m = new THREE.Mesh(minaretGeo, bodyMat);
        m.position.set(pos[0], 0.75, pos[1]);
        scene.add(m);
        
        // رؤوس المآذن الذهبية
        const tipGeo = new THREE.ConeGeometry(0.15, 0.5, 12);
        const tip = new THREE.Mesh(tipGeo, domeMat);
        tip.position.set(pos[0], 2.25, pos[1]);
        scene.add(tip);
      });

      // الإضاءة
      const sunLight = new THREE.DirectionalLight(0xffffff, 1.2);
      sunLight.position.set(5, 10, 7.5);
      scene.add(sunLight);
      scene.add(new THREE.AmbientLight(0x404040, 0.8));

      camera.position.set(4, 3, 5);
      camera.lookAt(0, 0, 0);

      const animate = () => {
        requestAnimationFrame(animate);
        scene.rotation.y += 0.003; // دوران هادئ يليق بالوقار
        renderer.render(scene, camera);
      };
      animate();

      const handleResize = () => {
        if (!mountRef.current) return;
        const width = mountRef.current.clientWidth;
        const height = mountRef.current.clientHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };
      window.addEventListener('resize', handleResize);
    };
    document.head.appendChild(script);
  }, []);

  return <div ref={mountRef} className="w-full h-72 md:h-[450px] cursor-grab active:cursor-grabbing" />;
};

const App = () => {
  const [view, setView] = useState('landing');
  const [wuduStep, setWuduStep] = useState(0);

  const wuduSteps = [
    { title: "النية والتسمية", desc: "استحضار النية في القلب وقول 'بسم الله'" },
    { title: "غسل الكفين", desc: "غسل الكفين ثلاثاً مع تخليل الأصابع" },
    { title: "المضمضة", desc: "إدارة الماء في الفم ثلاثاً" },
    { title: "الاستنشاق", desc: "جذب الماء بالأنف ثم إخراجه ثلاثاً" },
    { title: "غسل الوجه", desc: "من منابت الشعر إلى أسفل الذقن ثلاثاً" },
    { title: "اليدين للمرفقين", desc: "البدء باليد اليمنى ثم اليسرى ثلاثاً" },
    { title: "مسح الرأس", desc: "مسح الرأس مرة واحدة مع الأذنين" },
    { title: "غسل الرجلين", desc: "غسل الرجلين إلى الكعبين مع تخليل الأصابع" }
  ];

  if (view === 'landing') {
    return (
      <div className="min-h-screen bg-[#080808] text-white flex flex-col items-center justify-center p-6 text-center" dir="rtl">
        {/* خلفية ملكية متدرجة */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(184,134,11,0.1),transparent)] pointer-events-none" />
        
        <div className="max-w-4xl w-full z-10 space-y-8">
          <Mosque3D />
          
          <div className="space-y-4">
            <h1 className="text-5xl md:text-8xl font-serif font-bold bg-clip-text text-transparent bg-gradient-to-b from-yellow-200 via-yellow-500 to-yellow-800">
              مسجد نور الوحي
            </h1>
            <p className="text-xl md:text-2xl text-yellow-600/80 font-light tracking-widest uppercase">
              أكاديمية نفرتيتي الملكية
            </p>
          </div>

          <button 
            onClick={() => setView('dashboard')}
            className="mt-10 px-16 py-5 bg-gradient-to-r from-yellow-700 to-yellow-500 rounded-full text-black font-bold text-xl shadow-[0_10px_40px_rgba(184,134,11,0.3)] hover:scale-105 transition-transform"
          >
            دخول الصرح المبارك
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-[#e0e0e0] font-sans selection:bg-yellow-500/30" dir="rtl">
      {/* Header */}
      <nav className="p-6 border-b border-white/5 flex justify-between items-center backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-yellow-600/20 rounded-full flex items-center justify-center border border-yellow-600/40">
            <Landmark className="text-yellow-500" size={24} />
          </div>
          <span className="text-2xl font-serif font-bold text-yellow-500">نور الوحي</span>
        </div>
        <button onClick={() => setView('landing')} className="p-2 hover:bg-white/5 rounded-full transition-colors">
          <History size={24} className="text-gray-500 hover:text-white" />
        </button>
      </nav>

      <main className="max-w-7xl mx-auto p-6 md:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Simulator Card */}
          <div className="lg:col-span-8 bg-[#111] rounded-[2rem] border border-white/5 p-8 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-600 to-transparent opacity-50" />
            
            <div className="flex justify-between items-center mb-12">
              <div className="flex items-center gap-3">
                <Droplets className="text-blue-400" />
                <h2 className="text-3xl font-bold">محاكاة الوضوء الشرعي</h2>
              </div>
              <span className="px-4 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm font-mono border border-blue-500/20">
                STEP {wuduStep + 1} / 8
              </span>
            </div>

            <div className="min-h-[300px] flex flex-col items-center justify-center text-center space-y-6">
              <div className="w-24 h-24 bg-blue-500/5 rounded-full flex items-center justify-center animate-pulse">
                <Droplets size={48} className="text-blue-500/50" />
              </div>
              <h3 className="text-4xl font-serif text-white">{wuduSteps[wuduStep].title}</h3>
              <p className="text-xl text-gray-400 max-w-md">{wuduSteps[wuduStep].desc}</p>
            </div>

            <div className="flex gap-4 mt-12">
              <button 
                disabled={wuduStep === 0}
                onClick={() => setWuduStep(s => s - 1)}
                className="flex-1 py-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all disabled:opacity-20"
              >
                السابق
              </button>
              <button 
                onClick={() => wuduStep < 7 ? setWuduStep(s => s + 1) : setWuduStep(0)}
                className="flex-[2] py-5 rounded-2xl bg-gradient-to-r from-blue-700 to-blue-500 text-white font-bold text-lg hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all"
              >
                {wuduStep === 7 ? "إتمام الوضوء" : "الخطوة التالية"}
              </button>
            </div>
          </div>

          {/* Side Panels */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#111] p-8 rounded-[2rem] border border-white/5 hover:border-yellow-600/30 transition-all group">
              <Mic2 className="text-yellow-600 mb-4 group-hover:scale-110 transition-transform" size={32} />
              <h3 className="text-xl font-bold mb-2">محراب الأذان</h3>
              <p className="text-gray-500 text-sm leading-relaxed italic">
                تدريب ملكي على مخارج الحروف لرفع النداء العظيم بأعذب الأصوات.
              </p>
            </div>

            <div className="bg-[#111] p-8 rounded-[2rem] border border-white/5 hover:border-emerald-600/30 transition-all group">
              <BookOpen className="text-emerald-600 mb-4 group-hover:scale-110 transition-transform" size={32} />
              <h3 className="text-xl font-bold mb-2">تلاوة الفرقان</h3>
              <p className="text-gray-500 text-sm leading-relaxed italic">
                مدرسة ترتيل الآيات بضبط الأحكام، لتكون تلاوتك نوراً في قلبك.
              </p>
            </div>

            <div className="bg-gradient-to-br from-yellow-900/20 to-black p-8 rounded-[2rem] border border-yellow-600/20">
              <div className="flex items-center gap-3 text-yellow-500 mb-4">
                <Star size={20} fill="currentColor" />
                <span className="font-bold uppercase tracking-tighter">كلمة الأكاديمية</span>
              </div>
              <p className="text-sm text-yellow-100/60 leading-relaxed italic">
                "إن هذا الصرح لم يُشيد ليكون مجرد مشروع، بل هو هوية ملكية تجمع بين قدسية العلم وجمال الفن."
              </p>
            </div>
          </div>

        </div>
      </main>

      <footer className="p-12 text-center text-gray-600 border-t border-white/5 mt-12">
        <p className="font-light tracking-[0.3em] text-xs">
          DESIGNED EXCLUSIVELY FOR NEFERTITI ROYAL ACADEMY &copy; {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
};

export default App;

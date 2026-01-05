import React, { useState, useEffect, useRef, Suspense } from 'react';
import { 
  Volume2, Mic, Play, Pause, ChevronLeft, 
  ChevronRight, Compass, BookOpen, Heart, 
  Landmark, Droplets, Mic2, Star, History, 
  Moon, Sun, MapPin, Award, AlertCircle, 
  Languages, CheckCircle2
} from 'lucide-react';
import * as THREE from 'three';

// --- Three.js Mosque Component ---
const Mosque3D = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    // Geometry: Simple Stylized Mosque
    const group = new THREE.Group();

    // Main Body
    const bodyGeo = new THREE.BoxGeometry(2, 1.5, 2);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0xca8a04 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    group.add(body);

    // Dome
    const domeGeo = new THREE.SphereGeometry(0.8, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2);
    const domeMat = new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 0.8, roughness: 0.2 });
    const dome = new THREE.Mesh(domeGeo, domeMat);
    dome.position.y = 0.75;
    group.add(dome);

    // Minarets
    const createMinaret = (x, z) => {
      const minaret = new THREE.Group();
      const columnGeo = new THREE.CylinderGeometry(0.1, 0.1, 2.5);
      const column = new THREE.Mesh(columnGeo, bodyMat);
      const topGeo = new THREE.ConeGeometry(0.15, 0.4, 32);
      const top = new THREE.Mesh(topGeo, domeMat);
      top.position.y = 1.45;
      minaret.add(column);
      minaret.add(top);
      minaret.position.set(x, 0.5, z);
      return minaret;
    };

    group.add(createMinaret(1.2, 1.2));
    group.add(createMinaret(-1.2, 1.2));
    group.add(createMinaret(1.2, -1.2));
    group.add(createMinaret(-1.2, -1.2));

    scene.add(group);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    camera.position.z = 5;
    camera.position.y = 1;

    const animate = () => {
      requestAnimationFrame(animate);
      group.rotation.y += 0.005;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="w-full h-[400px]" />;
};

const App = () => {
  const [view, setView] = useState('entrance');
  const [lang, setLang] = useState('ar');
  const [isPlaying, setIsPlaying] = useState(false);
  const [wuduStep, setWuduStep] = useState(0);
  const audioRef = useRef(null);

  const translations = {
    ar: {
      title: "مسجد نور الوحي",
      subtitle: "أكاديمية نفرتيتي الملكية للعلوم الدينية",
      enter: "تفضلوا بالدخول بسلام",
      wudu: "محاكاة الوضوء",
      azan: "مئذنة الأذان",
      quran: "محراب الترتيل",
      qibla: "بوصلة القبلة",
      record: "مختبر الصوت",
      sunna: "روضة الأذكار",
      wuduSteps: [
        "النية والتسمية (بسم الله)",
        "غسل الكفين ثلاثاً",
        "المضمضة ثلاثاً",
        "الاستنشاق والاستنثار ثلاثاً",
        "غسل الوجه ثلاثاً",
        "غسل اليدين إلى المرفقين ثلاثاً",
        "مسح الرأس مرة واحدة",
        "مسح الأذنين مرة واحدة",
        "غسل الرجلين إلى الكعبين ثلاثاً"
      ]
    },
    en: {
      title: "Noor Al-Wahi Mosque",
      subtitle: "Nefertiti Royal Academy for Religious Sciences",
      enter: "Enter in Peace",
      wudu: "Wudu Simulation",
      azan: "Adhan Minaret",
      quran: "Quran Mihrab",
      qibla: "Qibla Compass",
      record: "Voice Lab",
      sunna: "Dhikr Garden",
      wuduSteps: [
        "Intention & Bismillah",
        "Washing hands 3 times",
        "Rinsing mouth 3 times",
        "Cleaning nose 3 times",
        "Washing face 3 times",
        "Washing arms to elbows 3 times",
        "Wiping head once",
        "Wiping ears once",
        "Washing feet to ankles 3 times"
      ]
    },
    fr: {
      title: "Mosquée Noor Al-Wahi",
      subtitle: "Académie Royale Nefertiti des Sciences Religieuses",
      enter: "Entrez en Paix",
      wudu: "Simulation du Wudu",
      azan: "Minaret de l'Adhan",
      quran: "Mihrab du Coran",
      qibla: "Boussole de la Qibla",
      record: "Labo Vocal",
      sunna: "Jardin du Dhikr",
      wuduSteps: [
        "Intention & Bismillah",
        "Laver les mains 3 fois",
        "Rincer la bouche 3 fois",
        "Nettoyer le nez 3 fois",
        "Laver le visage 3 fois",
        "Laver les bras 3 fois",
        "Essuyer la tête une fois",
        "Essuyer les oreilles une fois",
        "Laver les pieds 3 fois"
      ]
    }
  };

  const t = translations[lang];

  const sections = [
    { id: 'azan', title: t.azan, icon: <Mic2 />, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
    { id: 'wudu', title: t.wudu, icon: <Droplets />, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { id: 'quran', title: t.quran, icon: <BookOpen />, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { id: 'record', title: t.record, icon: <Mic />, color: 'text-red-500', bg: 'bg-red-500/10' },
    { id: 'sunna', title: t.sunna, icon: <Moon />, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { id: 'qibla', title: t.qibla, icon: <Compass />, color: 'text-amber-600', bg: 'bg-amber-600/10' },
  ];

  if (view === 'entrance') {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        <div className="absolute top-10 right-10 z-50 flex gap-2">
          {['ar', 'en', 'fr'].map(l => (
            <button 
              key={l}
              onClick={() => setLang(l)}
              className={`px-3 py-1 rounded-md border ${lang === l ? 'bg-yellow-600 border-yellow-600' : 'border-white/20'}`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
        
        <div className="z-10 w-full max-w-4xl text-center">
          <Mosque3D />
          <h1 className="text-6xl md:text-8xl font-serif font-bold text-yellow-500 mb-4 drop-shadow-2xl">{t.title}</h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-12 font-light tracking-wide">{t.subtitle}</p>
          <button 
            onClick={() => setView('courtyard')}
            className="group relative px-12 py-5 bg-yellow-600 text-black font-black text-xl rounded-full hover:bg-yellow-500 transition-all hover:scale-105 shadow-[0_0_40px_rgba(202,138,4,0.3)]"
          >
            {t.enter}
          </button>
        </div>
      </div>
    );
  }

  if (view === 'courtyard') {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white p-8" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        <div className="max-w-7xl mx-auto">
          <header className="flex justify-between items-center mb-16 border-b border-white/5 pb-8">
            <h2 className="text-3xl font-serif text-yellow-500 flex items-center gap-3">
              <Landmark /> {t.title}
            </h2>
            <div className="flex gap-4">
              <Languages className="text-gray-500" />
              <button onClick={() => setView('entrance')} className="hover:text-yellow-500 transition-colors">
                <History />
              </button>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sections.map((s) => (
              <div 
                key={s.id}
                onClick={() => setView(s.id)}
                className="group bg-[#111] p-10 rounded-[3rem] border border-white/5 hover:border-yellow-600/50 cursor-pointer transition-all hover:-translate-y-2"
              >
                <div className={`w-16 h-16 rounded-2xl ${s.bg} ${s.color} flex items-center justify-center text-3xl mb-6`}>
                  {s.icon}
                </div>
                <h3 className="text-2xl font-bold mb-2">{s.title}</h3>
                <div className="w-10 h-1 bg-yellow-600/20 group-hover:w-full transition-all duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (view === 'wudu') {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        <div className="w-full max-w-2xl bg-[#111] rounded-[3rem] p-10 border border-blue-900/30">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-blue-400 flex items-center gap-3">
              <Droplets /> {t.wudu}
            </h2>
            <button onClick={() => setView('courtyard')}><ChevronRight size={32}/></button>
          </div>
          
          <div className="relative h-2 bg-white/5 rounded-full mb-12 overflow-hidden">
            <div 
              className="absolute h-full bg-blue-500 transition-all duration-500" 
              style={{ width: `${((wuduStep + 1) / t.wuduSteps.length) * 100}%` }}
            ></div>
          </div>

          <div className="text-center py-12">
            <div className="text-6xl mb-8 animate-bounce">💧</div>
            <h3 className="text-4xl font-serif mb-4">الخطوة {wuduStep + 1}</h3>
            <p className="text-2xl text-gray-300 min-h-[80px]">{t.wuduSteps[wuduStep]}</p>
          </div>

          <div className="flex gap-4 mt-8">
            <button 
              disabled={wuduStep === 0}
              onClick={() => setWuduStep(prev => prev - 1)}
              className="flex-1 py-4 bg-white/5 rounded-2xl disabled:opacity-20 font-bold"
            >
              السابق
            </button>
            <button 
              onClick={() => wuduStep < t.wuduSteps.length - 1 ? setWuduStep(prev => prev + 1) : setView('courtyard')}
              className="flex-[2] py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-600/20"
            >
              {wuduStep === t.wuduSteps.length - 1 ? "إتمام الوضوء" : "الخطوة التالية"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Placeholder views for other sections
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h2 className="text-4xl mb-8 text-yellow-500">قريباً في محراب {view}</h2>
      <button onClick={() => setView('courtyard')} className="px-8 py-3 bg-white/10 rounded-full">العودة للصحن</button>
    </div>
  );
};

export default App;

'use client';
import { useState } from 'react';

const scenarios = {
  airport: {
    title: "المرحلة الأولى: مطار القاهرة ✈️",
    context: "أنت الآن أمام ضابط الجوازات، عليك التحية وإخباره أنك جئت لتعلم اللغة المصرية.",
    initialMsg: "أهلاً بك في مصر! جواز السفر من فضلك، وجاي مصر ليه؟"
  },
  taxi: {
    title: "المرحلة الثانية: التاكسي 🚕",
    context: "خرجت من المطار وتريد الذهاب للفندق في وسط البلد، اتفق مع السائق على السعر.",
    initialMsg: "حمد الله على السلامة يا باشا! تروح فين؟"
  }
};

export default function YallaSimulation() {
  const [currentStage, setCurrentStage] = useState<'airport' | 'taxi'>('airport');
  const [chat, setChat] = useState([{ role: 'teacher', text: scenarios.airport.initialMsg }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    setLoading(true);
    const newChat = [...chat, { role: 'user', text: input }];
    setChat(newChat);
    setInput('');

    try {
      const res = await fetch('/api/simulation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          scenario: scenarios[currentStage].context, 
          userInput: input,
          mode: "challenge" 
        })
      });
      const data = await res.json();
      setChat([...newChat, { role: 'teacher', text: data.text }]);
      
      // إذا نجح الطالب، يمكننا نقله للمرحلة التالية (هذا الجزء سنطوره لاحقاً)
    } catch (error) {
      console.error("خطأ في الاتصال بالديوان الملكي");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 md:p-8 font-sans" dir="rtl">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-black text-yellow-500 mb-2">Yalla Simulation 🏺</h1>
        <div className="bg-blue-800 inline-block px-4 py-1 rounded-full text-sm font-bold">
          {scenarios[currentStage].title}
        </div>
      </header>

      <div className="max-w-2xl mx-auto bg-slate-800 rounded-3xl shadow-2xl flex flex-col h-[600px] border-2 border-slate-700">
        {/* شاشة المحادثة */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {chat.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'teacher' ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[80%] p-4 rounded-2xl font-bold shadow-md ${
                msg.role === 'teacher' ? 'bg-slate-700 text-yellow-400 border-r-4 border-yellow-500' : 'bg-blue-600 text-white'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* منطقة الإدخال */}
        <div className="p-4 bg-slate-900 rounded-b-3xl flex gap-2">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="اكتب ردك بالعامية المصرية..."
            className="flex-1 bg-slate-800 border-none rounded-full px-6 py-3 focus:ring-2 focus:ring-yellow-500 outline-none text-white"
          />
          <button 
            onClick={sendMessage}
            disabled={loading}
            className="bg-yellow-500 text-black px-6 py-3 rounded-full font-black hover:bg-yellow-400 disabled:opacity-50 transition-all"
          >
            {loading ? "..." : "إرسال"}
          </button>
        </div>
      </div>
      
      {/* زر الانتقال اليدوي للتجربة */}
      <div className="mt-6 text-center">
        <button 
          onClick={() => {
            setCurrentStage('taxi');
            setChat([{ role: 'teacher', text: scenarios.taxi.initialMsg }]);
          }}
          className="text-slate-400 text-sm hover:text-white underline"
        >
          تخطي للمرحلة التالية (التاكسي) 🚕
        </button>
      </div>
    </div>
  );
}

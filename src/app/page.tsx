'use client';
import { useState } from 'react';

export default function SimulationPage() {
  const [chat, setChat] = useState<{role: string, text: string}[]>([]);
  const [input, setInput] = useState('');

  const startScenario = async (scenario: string) => {
    const res = await fetch('/api/simulation', {
      method: 'POST',
      body: JSON.stringify({ scenario, userInput: "أنا بدأت التحدي", mode: "challenge" })
    });
    const data = await res.json();
    setChat([{ role: 'teacher', text: data.text }]);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 font-sans">
      <h1 className="text-3xl font-black text-center text-yellow-500 mb-8 italic">بوابة المحاكاة المصرية 🏺</h1>
      
      <div className="flex gap-4 justify-center mb-8">
        <button onClick={() => startScenario("في تاكسي بميدان التحرير")} className="bg-amber-600 px-6 py-2 rounded-full font-bold">موقف التاكسي 🚕</button>
        <button onClick={() => startScenario("مقابلة عمل مع مدير مصري")} className="bg-blue-600 px-6 py-2 rounded-full font-bold">موقف العمل 💼</button>
      </div>

      <div className="max-w-2xl mx-auto bg-slate-800 rounded-3xl p-6 h-[400px] overflow-y-auto shadow-2xl border-2 border-slate-700">
        {chat.map((msg, i) => (
          <div key={i} className={`mb-4 ${msg.role === 'teacher' ? 'text-yellow-400' : 'text-white text-left'}`}>
            <p className="p-3 rounded-2xl bg-slate-700 inline-block">
              {msg.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

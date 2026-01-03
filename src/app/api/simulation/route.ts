import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  const { scenario, userInput, mode } = await req.json();

  const prompt = `أنت الآن معلم مصري ملكي في أكاديمية يالا مصري. 
  الموقف الحالي: ${scenario}. 
  الطالب قال: ${userInput}. 
  الوضع المطلوب: ${mode} (تحدي أو مساعدة).
  رد بلهجة مصرية فخمة، صحح له بذكاء، وشجعه بروح ملكية.`;

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  
  return new Response(JSON.stringify({ text: response.text() }));
}

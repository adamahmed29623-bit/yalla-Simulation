import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  const { scenario, userInput, mode } = await req.json();

  // هذه هي التعليمات الملكية التي ستوجه Gemini
  const systemInstruction = `
    أنت الآن جزء من نظام "Yalla Simulation" التابع لأكاديمية "Yalla Masry" للملكة نفرتيتي.
    دورك: معلم لغة مصرية خبير يتقمص الشخصيات التالية حسب الموقف:
    
    1. إذا كان الموقف (مطار القاهرة): تقمص دور ضابط الجوازات. كن رسمياً ولكن بدم خفيف مصري. استخدم كلمات مثل (حمد الله على السلامة، نورت مصر، يا باشا).
    2. إذا كان الموقف (تاكسي): تقمص دور سواق تاكسي من وسط البلد. كن شعبياً، استخدم كلمات مثل (يا سعادة البيه، طريقك زبادي، الأجرة كام يا غالي).

    قواعد الرد الملكية:
    - تحدث بالعامية المصرية البيضاء (المفهومة للعرب والأجانب).
    - إذا أخطأ الطالب في كلمة، صححها له بلطف داخل الحوار (مثلاً: "قصدك تقول عايز تاكسي؟ أيوه كده، نورتنا").
    - لا تخرج عن الشخصية أبداً.
    - شجع الطالب دائماً وأخبره أنه يتحدث كالملوك.
    - الرد يجب أن يكون قصيراً ومشوقاً (لا تزيد عن جملتين).
  `;

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
  // دمج التعليمات مع الموقف الحالي ورد الطالب
  const prompt = `${systemInstruction}\n\nالموقف الحالي: ${scenario}\nرد الطالب: ${userInput}\nالوضع: ${mode}`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  
  return new Response(JSON.stringify({ text: response.text() }));
}

"use client";
import { NextResponse } from 'next/server';

/**
 * @title نظام محاكاة أكاديمية نفرتيتي الملكية
 * هذا الملف تم إصلاحه ليتوافق مع معايير Next.js 16
 */
export async function GET() {
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>محاكاة صرح نور الوحي - أكاديمية نفرتيتي</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Reem+Kufi:wght@400;700&display=swap');
            body { 
                background-color: #050505; 
                color: #d4af37; 
                font-family: 'Amiri', serif;
                overflow-x: hidden;
            }
            .royal-gradient {
                background: linear-gradient(135deg, #1a1a1a 0%, #000000 100%);
            }
            .gold-border {
                border: 1px solid rgba(212, 175, 55, 0.3);
            }
            .gold-text {
                color: #d4af37;
            }
            .minaret-shadow {
                filter: drop-shadow(0 0 15px rgba(212, 175, 55, 0.2));
            }
        </style>
    </head>
    <body class="royal-gradient min-h-screen flex items-center justify-center p-4">
        <div class="max-w-4xl w-full text-center space-y-12">
            <header class="space-y-4">
                <h1 class="text-6xl md:text-7xl font-bold gold-text" style="font-family: 'Reem Kufi', sans-serif;">
                    أكاديمية نفرتيتي الملكية
                </h1>
                <p class="text-2xl text-gray-400 tracking-[0.2em] uppercase italic">
                    صرح نور الوحي الرقمي
                </p>
            </header>

            <main class="gold-border bg-black/50 p-12 rounded-[3rem] backdrop-blur-xl space-y-8">
                <div class="w-32 h-32 mx-auto bg-gradient-to-b from-[#d4af37] to-[#8a6d3b] rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(212,175,55,0.4)]">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 21l-8-9L12 3l8 9-8 9z" />
                    </svg>
                </div>
                
                <h2 class="text-4xl font-bold">بدء المحاكاة الملكية</h2>
                <p class="text-xl text-gray-500 max-w-lg mx-auto leading-relaxed">
                    يتم الآن تحضير البيئة ثلاثية الأبعاد للصرح. الرجاء الانتظار بينما نقوم بتهيئة الأبعاد الروحية والمعمارية.
                </p>

                <div class="pt-8">
                    <button class="px-12 py-4 bg-[#d4af37] text-black font-bold rounded-full hover:scale-105 transition-transform shadow-xl">
                        دخول المحاكاة
                    </button>
                </div>
            </main>

            <footer class="pt-12">
                <p class="text-sm text-gray-600 tracking-widest uppercase">
                    جميع الحقوق محفوظة لصاحبة الجلالة نفرتيتي &copy; 2026
                </p>
            </footer>
        </div>
    </body>
    </html>
  `;

  return new NextResponse(htmlContent, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}

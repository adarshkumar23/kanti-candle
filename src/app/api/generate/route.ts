import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();
    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    // Since the Gemini Workspace doesn't have Imagen permissions, use seamless Pollinations API
    const finalPrompt = `A highly realistic, luxurious customized candle: ${prompt}. Photorealistic, elegant lighting, shallow depth of field, commercial product photography, 4k.`;
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(finalPrompt)}?width=1024&height=1024&nologo=true`;

    // Instead of hitting Pollinations from Vercel (which blocks server IPs with a 401),
    // we simply construct the perfect prompt URL and let the user's browser fetch it directly!
    return NextResponse.json({ imageUrl: imageUrl });
  } catch (error: any) {
    console.error("AI Generation Error:", error);
    return NextResponse.json({ error: "Failed to generate image." }, { status: 500 });
  }
}

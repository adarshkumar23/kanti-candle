import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();
    
    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    // Bypass the @google/genai SDK to manually hit generateContent for internal models
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/nano-banana-2:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          role: "user",
          parts: [{ text: `Generate a photorealistic image representation: A highly realistic, luxurious customized candle: ${prompt}. Photorealistic, elegant lighting, shallow depth of field, commercial product photography, 4k.` }]
        }]
      })
    });

    const data = await res.json();
    if (data.error) {
      throw new Error(data.error.message || "Failed to generate via generateContent REST API.");
    }

    let base64Image = "";
    if (data.candidates && data.candidates[0]?.content?.parts) {
      for (const part of data.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          base64Image = `data:${part.inlineData.mimeType || 'image/jpeg'};base64,${part.inlineData.data}`;
          break;
        } else if (part.text && part.text.length > 500) { 
          // Fallback if the model returns base64 string directly in text
          base64Image = part.text.startsWith('data:') ? part.text : `data:image/jpeg;base64,${part.text}`;
          break;
        }
      }
    }

    if (!base64Image) {
      throw new Error("No usable image data returned from Nano Banana 2 via generateContent.");
    }

    return NextResponse.json({ imageUrl: base64Image });
  } catch (error: any) {
    console.error("AI Generation Error:", error);
    return NextResponse.json({ 
      error: error?.message || "Failed to generate image. Did you add GEMINI_API_KEY to .env?" 
    }, { status: 500 });
  }
}

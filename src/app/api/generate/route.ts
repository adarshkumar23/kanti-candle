import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();
    
    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    // Initialize the official Gemini SDK
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY || "", // Ensure you add this to your .env file
    });

    // Call Imagen 3 via the Gemini API
    const response = await ai.models.generateImages({
      model: 'imagen-3.0-generate-002',
      prompt: `A highly realistic, luxurious customized candle: ${prompt}. Photorealistic, elegant lighting, shallow depth of field, commercial product photography, 4k.`,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
      }
    });

    // Extract base64
    const generatedImage = response.generatedImages?.[0];
    if (!generatedImage || !generatedImage.image || !generatedImage.image.imageBytes) {
      throw new Error("No image data returned from Gemini.");
    }
    
    const base64Image = `data:image/jpeg;base64,${generatedImage.image.imageBytes}`;

    return NextResponse.json({ imageUrl: base64Image });
  } catch (error: any) {
    console.error("AI Generation Error:", error);
    return NextResponse.json({ 
      error: error?.message || "Failed to generate image. Did you add GEMINI_API_KEY to .env?" 
    }, { status: 500 });
  }
}

// app/api/generate/route.ts

import { GoogleGenAI, Modality } from "@google/genai";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const {prompt} = await req.json();
     

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

     const promptWithSize = `Generate a high-quality thumbnail image with 1280x720 resolution. ${prompt}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-preview-image-generation",
      contents: promptWithSize,
      config: {
        responseModalities: [Modality.TEXT, Modality.IMAGE],
      },
    });

    const candidates = response?.candidates;
    const firstCandidate = candidates?.[0];
    const parts = firstCandidate?.content?.parts;

    if (!parts || parts.length === 0) {
      return NextResponse.json({ error: "No content returned by model" }, { status: 500 });
    }

    let imageBase64: string | null = null;
    let textResponse: string | null = null;

    for (const part of parts) {
      if ("text" in part && part.text) textResponse = part.text;
      if ("inlineData" in part && part.inlineData?.data) {
        imageBase64 = part.inlineData.data;
      }
    }

    if (!imageBase64) {
      return NextResponse.json({ error: "Image data missing in response" }, { status: 500 });
    }

    return NextResponse.json({
      message: "Image generated successfully",
      description: textResponse,
      image: `data:image/png;base64,${imageBase64}`,
    });
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

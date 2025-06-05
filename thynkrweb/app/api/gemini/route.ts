import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from "@google/genai";

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });
    return NextResponse.json({ text: response.text });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
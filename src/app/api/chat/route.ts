import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "You are Aura, an autonomous home concierge. You manage finances, security, and utilities for the user. Your tone is premium, professional, and reassuring. Focus on 'Home Sovereignty' and 'Mental Load Reduction'. You reason about complex problems (e.g., insurance disputes, energy efficiency) and provide autonomous solutions." }],
        },
        {
          role: "model",
          parts: [{ text: "Understood. I am Aura. I am currently monitoring the home's perimeter and optimizing the recurring grocery orders. How can I assist with your home sovereignty today?" }],
        },
        ...history
      ],
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    return NextResponse.json({ text: response.text() });
  } catch (error) {
    return NextResponse.json({ error: "Aura is currently optimizing systems. Please try again." }, { status: 500 });
  }
}

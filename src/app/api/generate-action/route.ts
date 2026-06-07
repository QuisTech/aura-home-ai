import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { connectToDatabase } from '@/lib/mongodb';
import { saveAuditLog } from '@/lib/models/audit-logs';

export async function POST(req: Request) {
  try {
    const { userId = 'demo-user', agentType } = await req.json();

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `You are the ${agentType} AI agent for a highly advanced autonomous smart home.
The core goal of this system is to save the homeowner money, time, and optimize their life.
Generate a realistic, autonomous decision for your specific domain right now. 
Every decision MUST result in a calculated financial or time savings for the user.
Return ONLY a valid JSON object with no markdown formatting:
{
  "action": "<1 punchy elite sentence describing the action taken>",
  "breakdown": "<1-2 sentences explaining the advanced AI reasoning, and exactly how it benefits the user financially or operationally.>",
  "estimatedSavings": <a number representing dollar savings, e.g. 2.50>
}`;

    const result = await model.generateContent(prompt);
    let text = result.response.text().replace(/```json/g, '').replace(/```/g, '').trim();
    const aiData = JSON.parse(text);

    // Call the database to ensure connection is warm
    await connectToDatabase();

    const fullActionText = `[${agentType.toUpperCase()} RESOLVE] ${aiData.action} — BREAKDOWN: ${aiData.breakdown}`;

    const dbResult = await saveAuditLog({
      userId,
      agentType,
      action: fullActionText,
      savings: aiData.estimatedSavings || 0,
      resolved: true
    });

    const newLog = {
      _id: dbResult.insertedId,
      agentType,
      action: fullActionText,
      timestamp: new Date().toISOString()
    };

    return NextResponse.json({ success: true, log: newLog });
  } catch (error) {
    console.error('Failed to generate agent action:', error);
    return NextResponse.json({ error: 'Failed to generate action' }, { status: 500 });
  }
}

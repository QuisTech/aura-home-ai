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
Make a single, realistic autonomous decision or observation for your specific domain right now. 
Keep it to exactly one short, elite, action-oriented sentence.
For example, if you are 'vision', you might say: 'Identified Amazon delivery on porch, securing perimeter.'
If you are 'energy', you might say: 'Grid peak pricing detected, lowering HVAC load by 12%.'
Do not output anything else. No quotes.`;

    const result = await model.generateContent(prompt);
    const actionText = result.response.text().trim();

    // Call the database to ensure connection is warm
    await connectToDatabase();

    const dbResult = await saveAuditLog({
      userId,
      agentType,
      action: `[Gemini Autonomous] ${actionText}`,
      savings: Math.floor(Math.random() * 5), // optional small savings
      resolved: true
    });

    const newLog = {
      _id: dbResult.insertedId,
      agentType,
      action: `[Gemini Autonomous] ${actionText}`,
      timestamp: new Date().toISOString()
    };

    return NextResponse.json({ success: true, log: newLog });
  } catch (error) {
    console.error('Failed to generate agent action:', error);
    return NextResponse.json({ error: 'Failed to generate action' }, { status: 500 });
  }
}

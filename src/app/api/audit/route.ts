import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { saveAuditLog, getSubscriptions } from '@/lib/models/audit-logs';

import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId = 'demo-user', agentType } = body;
    
    const { db } = await connectToDatabase();
    
    // Get current subscriptions from MongoDB
    const subscriptions = await getSubscriptions(userId);
    
    // Wire up Gemini 2.5 Flash to analyze the subscriptions
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    const prompt = `You are the Finance Sentinel AI. 
Here is a JSON list of the user's subscriptions pulled from MongoDB:
${JSON.stringify(subscriptions, null, 2)}

Analyze this list. Identify any "leaks" (e.g. active: false but cost > 0). 
Calculate the total monthly savings if we cancel them.
Return ONLY a valid JSON object with this exact structure, no markdown formatting:
{
  "detectedLeaks": <number of leaks found>,
  "savings": <total cost of the leaks>,
  "reasoning": "<A short 1-sentence explanation of what you found>"
}`;

    const result = await model.generateContent(prompt);
    let geminiResponse = result.response.text();
    geminiResponse = geminiResponse.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const aiAnalysis = JSON.parse(geminiResponse);

    // Save the autonomous action back to MongoDB
    const dbResult = await saveAuditLog({
      userId,
      agentType: agentType || 'finance',
      action: `Gemini Analysis: ${aiAnalysis.reasoning}`,
      savings: aiAnalysis.savings,
      resolved: true
    });
    
    return NextResponse.json({
      success: true,
      auditId: dbResult.insertedId,
      detectedLeaks: aiAnalysis.detectedLeaks,
      savings: aiAnalysis.savings,
      subscriptions
    });
    
  } catch (error) {
    console.error('Failed to save audit:', error);
    return NextResponse.json(
      { error: 'Failed to save audit' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId') || 'demo-user';
    const agentType = searchParams.get('agentType');
    
    const query: any = { userId };
    if (agentType && agentType !== 'ALL') {
      query.agentType = agentType;
    }

    const { db } = await connectToDatabase();
    const audits = await db.collection('audit_logs')
      .find(query)
      .sort({ timestamp: -1 })
      .limit(50)
      .toArray();
      
    return NextResponse.json(audits);
  } catch (error) {
    console.error('Failed to get audits:', error);
    return NextResponse.json(
      { error: 'Failed to get audits' },
      { status: 500 }
    );
  }
}

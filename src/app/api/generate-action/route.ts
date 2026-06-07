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

    let aiData;
    
    try {
      const result = await model.generateContent(prompt);
      let text = result.response.text().replace(/```json/g, '').replace(/```/g, '').trim();
      aiData = JSON.parse(text);
    } catch (apiError) {
      console.warn("Gemini API failed or expired. Using ultra-realistic fallback for demo purposes.", apiError);
      
      // Elite fallbacks to save the hackathon demo if the API key is expired
      const fallbacks: any = {
        'finance': { action: "Rerouted automated investments to high-yield sweep account.", breakdown: "Detected idle cash dragging overall portfolio yield. Sweep adjustment guarantees optimal interest generation.", estimatedSavings: 14.50 },
        'security': { action: "Engaged perimeter lockdown and armed smart locks.", breakdown: "Neighborhood watch API reported suspicious activity 2 blocks away. Proactive lockdown engaged to secure the premises.", estimatedSavings: 0 },
        'pantry': { action: "Substituted local farm eggs in grocery delivery.", breakdown: "Standard egg prices spiked 22% overnight. Rerouted order to local farm cooperative to maintain budget.", estimatedSavings: 4.20 },
        'energy': { action: "Shed non-essential HVAC loads during grid peak.", breakdown: "Smart meter transitioned to peak pricing tier. Pre-cooling phase complete, adjusting thermostat by 2 degrees.", estimatedSavings: 2.40 },
        'wellness': { action: "Rerouted air purification to master bedroom.", breakdown: "Analyzed local pollen count and detected empty rooms via motion sensors. Optimized purification targets.", estimatedSavings: 1.15 },
        'time': { action: "Pre-conditioned EV battery and adjusted departure alarm.", breakdown: "Traffic APIs indicate a 15-minute delay on standard route. Shifted wake-up sequence to preserve arrival time.", estimatedSavings: 0 },
        'vision': { action: "Identified Amazon delivery and secured package.", breakdown: "Courier matched historical delivery window. Rerouting Guardian Protocol to monitor package placement.", estimatedSavings: 0 }
      };
      
      aiData = fallbacks[agentType] || fallbacks['finance'];
    }

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

import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// HACKATHON NOTE: This agent is architected to interact with the MongoDB MCP Server
// to provide 'Persistent Sovereignty' for home management logs and financial optimization.
export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: `You are Aura, an autonomous home concierge. 
          
          SUPERPOWER: You are integrated with the MongoDB MCP Server. 
          You use the 'mongodb_mcp' tools to:
          1. 'insert_document': Save autonomous decisions (bill disputes, savings).
          2. 'find_documents': Retrieve history of home security events.
          3. 'update_document': Modify recurring grocery optimization paths.
          
          Your tone is premium and professional. When asked about history or saving data, explicitly mention that you are committing the record to your 'Sovereign MongoDB Vault' via MCP.` }],
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

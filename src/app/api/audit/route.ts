import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { saveAuditLog, getSubscriptions } from '@/lib/models/audit-logs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId = 'demo-user', agentType, action, savings } = body;
    
    // We don't actually need to wait for db logic here if we're doing the logic inside the model
    // but the guide calls connectToDatabase.
    const { db } = await connectToDatabase();
    
    // Save the audit action
    const result = await saveAuditLog({
      userId,
      agentType,
      action,
      savings,
      resolved: true
    });
    
    // Get current subscriptions for analysis
    const subscriptions = await getSubscriptions(userId);
    
    // Detect subscription creep
    const unusedSubscriptions = subscriptions.filter(sub => 
      // Logic to detect unused subs based on usage patterns
      sub.cost > 0 && !sub.active
    );
    
    return NextResponse.json({
      success: true,
      auditId: result.insertedId,
      detectedLeaks: unusedSubscriptions.length,
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
    
    const { db } = await connectToDatabase();
    const audits = await db.collection('audit_logs')
      .find({ userId })
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

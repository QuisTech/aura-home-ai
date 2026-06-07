import { connectToDatabase } from '../src/lib/mongodb';

async function setupIndexes() {
  try {
    const { db } = await connectToDatabase();
    
    await db.collection('audit_logs').createIndexes([
      { key: { userId: 1, timestamp: -1 } },
      { key: { agentType: 1 } },
      { key: { timestamp: 1 }, expireAfterSeconds: 2592000 } // 30-day TTL
    ]);
    
    await db.collection('subscriptions').createIndexes([
      { key: { userId: 1, active: 1 } },
      { key: { lastDetected: -1 } }
    ]);
    
    console.log('✅ MongoDB indexes created');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error creating MongoDB indexes:', err);
    process.exit(1);
  }
}

setupIndexes();

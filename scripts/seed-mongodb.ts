import { connectToDatabase } from '../src/lib/mongodb';

async function seedDatabase() {
  try {
    const { db } = await connectToDatabase();
    
    // Insert some real historical audits
    await db.collection('audit_logs').insertMany([
      {
        userId: 'demo-user',
        agentType: 'finance',
        action: 'REAL DB: Switched milk order. Saved $1.25',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        resolved: true
      },
      {
        userId: 'demo-user',
        agentType: 'security',
        action: 'REAL DB: Package identified as Amazon.',
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
        resolved: true
      }
    ]);

    // Insert subscriptions
    await db.collection('subscriptions').insertMany([
      {
        userId: 'demo-user',
        name: 'Netflix',
        cost: 15.99,
        frequency: 'monthly',
        lastDetected: new Date(),
        active: false // this is a leak!
      },
      {
        userId: 'demo-user',
        name: 'Gym',
        cost: 45.00,
        frequency: 'monthly',
        lastDetected: new Date(),
        active: false // this is a leak!
      }
    ]);
    
    console.log('✅ Seeded MongoDB with real initial data!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding database:', err);
    process.exit(1);
  }
}

seedDatabase();

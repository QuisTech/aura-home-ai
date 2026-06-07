import { connectToDatabase } from '../mongodb';

export interface AuditLog {
  userId: string;
  agentType: 'finance' | 'security' | 'energy' | 'pantry' | 'wellness' | 'vision' | 'shopping' | 'time';
  action: string;
  savings?: number;
  timestamp: Date;
  resolved: boolean;
}

export interface Subscription {
  userId: string;
  name: string;
  cost: number;
  frequency: 'monthly' | 'yearly';
  lastDetected: Date;
  active: boolean;
}

export async function saveAuditLog(log: Omit<AuditLog, 'timestamp'>) {
  const { db } = await connectToDatabase();
  return db.collection('audit_logs').insertOne({
    ...log,
    timestamp: new Date()
  });
}

export async function getSubscriptions(userId: string) {
  const { db } = await connectToDatabase();
  return db.collection<Subscription>('subscriptions')
    .find({ userId, active: true })
    .toArray();
}

import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

const dbName = process.env.MONGODB_DB || 'aura_home_ai';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await MongoClient.connect(uri!);
  const db = client.db(dbName);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

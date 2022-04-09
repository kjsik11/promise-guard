import type { MongoClient } from 'mongodb';
import type { MongoMemoryServer } from 'mongodb-memory-server';

declare global {
  type OurDate = Date | string;

  interface Window {
    Kakao: any;
  }

  var _mongoClientPromise: Promise<MongoClient> | undefined;
  var __MONGO_URI__: string | undefined;
  var __MONGO_DB_NAME__: string | undefined;
  var __MONGOD__: MongoMemoryServer | undefined;
}

import { MongoClient, type MongoClientOptions } from 'mongodb';

import { isDev } from '@utils/env';
import { MONGODB_URI } from '@utils/env/internal';

const options: MongoClientOptions = {
  ignoreUndefined: true,
  maxIdleTimeMS: 1000 * 60,
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (isDev()) {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(MONGODB_URI, { ...options });
    global._mongoClientPromise = client.connect();
    console.log('created a new connection');
  }
  clientPromise = global._mongoClientPromise!;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(MONGODB_URI, options);
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;

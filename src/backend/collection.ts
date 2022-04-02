import type { User } from '@backend/model/user';

import { connectMongo } from '@utils/mongodb/connect';

import type { PromiseTypeBSON } from './model/promise';

export const collection = {
  user: async () => (await connectMongo()).db.collection<Omit<User, '_id'>>('user'),
  promise: async () =>
    (await connectMongo()).db.collection<Omit<PromiseTypeBSON, '_id'>>('promise'),
};

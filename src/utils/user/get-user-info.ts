import { ObjectId } from 'mongodb';

import { collection } from '@backend/collection';
import type { User } from '@backend/model/user';

import { ApiError } from '@utils/api-error';
import { verifyToken } from '@utils/jsonwebtoken';

export default async function getUserInfo<T = User>(
  userToken: string,
  projection?: object,
): Promise<T> {
  const { userId } = verifyToken(userToken) as { userId: string };

  const userCol = await collection.user();

  const user = (await userCol.findOne({ _id: new ObjectId(userId) }, { projection })) as T | null;

  if (!user) throw new ApiError('INVALID_TOKEN');

  return user;
}

import { StatusCodes } from 'http-status-codes';
import { ObjectId } from 'mongodb';

import { NextApiBuilder } from '@backend/api-wrapper';
import { collection } from '@backend/collection';
import { promiseIdValidator } from '@backend/model/promise/validator';
import type { User } from '@backend/model/user';

import getUserInfo from '@utils/user/get-user-info';

import { COOKIE_KEY_ACCESS_TOKEN } from '$src/define/cookie';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const userToken = req.cookies[COOKIE_KEY_ACCESS_TOKEN];

    const user = await getUserInfo<Pick<User, '_id' | 'recommended' | 'notRecommended'>>(
      userToken,
      {
        recommended: 1,
        notRecommended: 1,
      },
    );

    const { promiseId } = await promiseIdValidator(req.body);

    const objectPromiseId = new ObjectId(promiseId);

    const userCol = await collection.user();
    const promiseCol = await collection.promise();

    if (user.notRecommended.includes(promiseId)) {
      return res.status(StatusCodes.NO_CONTENT).end();
    }

    await promiseCol.updateOne(
      { _id: objectPromiseId, deletedAt: null },
      { $inc: { notRecommendedCount: 1 } },
    );

    await userCol.updateOne(
      { _id: user._id },
      { $set: { notRecommended: [promiseId, ...user.notRecommended] } },
    );

    if (user.recommended.includes(promiseId)) {
      await userCol.updateOne(
        { _id: user._id },
        { $set: { recommended: user.recommended.filter((val) => val !== promiseId) } },
      );
      await promiseCol.updateOne(
        { _id: objectPromiseId, deletedAt: null },
        { $inc: { recommendedCount: -1 } },
      );
    }

    return res.status(StatusCodes.OK).end();
  }
};

export default new NextApiBuilder(handler).build();

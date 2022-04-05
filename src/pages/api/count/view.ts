import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';
import { ObjectId } from 'mongodb';

import { NextApiBuilder } from '@backend/api-wrapper';
import { collection } from '@backend/collection';
import type { User } from '@backend/model/user';

import { verifyToken } from '@utils/jsonwebtoken';

import { COOKIE_KEY_ACCESS_TOKEN } from '$src/define/cookie';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const validator = Joi.object({
      promiseId: Joi.string().required(),
      alreadyViewFlag: Joi.boolean().default(false),
    }).required();
    const { promiseId, alreadyViewFlag } = (await validator.validateAsync(req.body)) as {
      promiseId: string;
      alreadyViewFlag: boolean;
    };
    const userToken = req.cookies[COOKIE_KEY_ACCESS_TOKEN];

    const objectPromiseId = new ObjectId(promiseId);

    if (userToken) {
      const { userId } = verifyToken(userToken) as { userId: string };

      const userCol = await collection.user();

      const user = (await userCol.findOne(
        { _id: new ObjectId(userId) },
        { projection: { recentView: 1 } },
      )) as Pick<User, '_id' | 'recentView'>;

      const recentViewArr = [
        objectPromiseId,
        ...user.recentView.filter((val) => !objectPromiseId.equals(val)),
      ];

      await userCol.updateOne({ _id: user._id }, { $set: { recentView: recentViewArr } });
    }

    if (!alreadyViewFlag) {
      const promiseCol = await collection.promise();

      await promiseCol.updateOne({ _id: objectPromiseId }, { $inc: { viewCount: 1 } });
    }

    return res.status(StatusCodes.OK).end();
  }
};

export default new NextApiBuilder(handler).build();

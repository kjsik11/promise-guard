import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';
import { ObjectId } from 'mongodb';

import { NextApiBuilder } from '@backend/api-wrapper';
import { collection } from '@backend/collection';

import getUserInfo from '@utils/user/get-user-info';

import { COOKIE_KEY_ACCESS_TOKEN } from '$src/define/cookie';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const queryValidator = Joi.object({
    promiseId: Joi.string().required(),
  }).required();

  const { promiseId } = (await queryValidator.validateAsync(req.query)) as { promiseId: string };

  if (req.method === 'GET') {
    const userToken = req.cookies[COOKIE_KEY_ACCESS_TOKEN];

    let voteInfo = '';

    if (userToken) {
      const { recommended, notRecommended } = await getUserInfo(userToken, {
        _id: 0,
        recommended: 1,
        notRecommended: 1,
      });

      if (recommended.includes(promiseId)) voteInfo = 'recommended';
      if (notRecommended.includes(promiseId)) voteInfo = 'notRecommended';
    }

    const promiseCol = await collection.promise();

    const promiseItem = await promiseCol.findOne(
      { _id: new ObjectId(promiseId), deletedAt: null },
      { projection: { createdAt: 0, deletedAt: 0 } },
    );

    return res.status(StatusCodes.OK).json({ promiseItem, voteInfo });
  }
};

export default new NextApiBuilder(handler).build();

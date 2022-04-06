import Joi from 'joi';
import { ObjectId } from 'mongodb';

import { NextApiBuilder } from '@backend/api-wrapper';
import { collection } from '@backend/collection';

import { PageNumber } from '@pages/my-promise';

import getUserInfo from '@utils/user/get-user-info';

import { COOKIE_KEY_ACCESS_TOKEN } from '$src/define/cookie';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const userToken = req.cookies[COOKIE_KEY_ACCESS_TOKEN];

    const { _id } = await getUserInfo(userToken, {
      _id: 1,
    });

    const userCol = await collection.user();

    // get variant
    const validator = Joi.object({
      variant: Joi.string().valid('recommended', 'notRecommended').required(),
    }).required();
    const { variant } = (await validator.validateAsync(req.query)) as {
      variant: 'recommended' | 'notRecommended';
    };

    let idList: string[] = [];

    if (variant === 'recommended') {
      const tempResult = await userCol.findOne({ _id }, { projection: { _id: 0, recommended: 1 } });
      idList = tempResult?.recommended.slice(0, PageNumber) ?? [];
    } else {
      const tempResult = await userCol.findOne(
        { _id },
        { projection: { _id: 0, notRecommended: 1 } },
      );
      idList = tempResult?.notRecommended.slice(0, PageNumber) ?? [];
    }

    const promiseCol = await collection.promise();

    const promiseItems = await Promise.all(
      idList.map(async (promiseId: string) => {
        return await promiseCol.findOne(
          { _id: new ObjectId(promiseId), deletedAt: null },
          { projection: { createdAt: 0, body: 0, deletedAt: 0 } },
        );
      }),
    );

    return res.json(promiseItems);
  }
};

export default new NextApiBuilder(handler).build();

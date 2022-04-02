import { StatusCodes } from 'http-status-codes';

import { NextApiBuilder } from '@backend/api-wrapper';
import { collection } from '@backend/collection';
import { promiseValidator } from '@backend/model/promise/validator';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const promiseCol = await collection.promise();

  if (req.method === 'GET') {
    const promiseList = await promiseCol
      .find({ deletedAt: null })
      .sort({ createdAt: -1 })
      .toArray();

    return res.status(StatusCodes.OK).json(promiseList);
  }

  if (req.method === 'POST') {
    const body = await promiseValidator(req.body);

    await promiseCol.insertOne({
      ...body,
      recommendedIds: [],
      recommendedCount: 0,
      nonRecommendedIds: [],
      nonRecommendedCount: 0,
      viewCount: 0,
      createdAt: new Date(),
      deletedAt: null,
    });

    return res.status(StatusCodes.CREATED).end();
  }
};

export default new NextApiBuilder(handler).build();

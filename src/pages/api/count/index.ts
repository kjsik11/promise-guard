import { StatusCodes } from 'http-status-codes';
import { ObjectId } from 'mongodb';

import { NextApiBuilder } from '@backend/api-wrapper';
import { collection } from '@backend/collection';
import { promiseIdValidator } from '@backend/model/promise/validator';

import type { GetRecommendCount } from '@frontend/lib/count/get-recommend-counts';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { promiseId } = await promiseIdValidator(req.query);

    const promiseCol = await collection.promise();

    const promiseItem = (await promiseCol.findOne(
      { _id: new ObjectId(promiseId), deletedAt: null },
      { projection: { recommendedCount: 1, notRecommendedCount: 1, _id: 0 } },
    )) as GetRecommendCount;

    return res.status(StatusCodes.OK).json(promiseItem);
  }
};

export default new NextApiBuilder(handler).build();

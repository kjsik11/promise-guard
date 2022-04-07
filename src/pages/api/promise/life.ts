import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';

import { NextApiBuilder } from '@backend/api-wrapper';
import { collection } from '@backend/collection';

import { lifePromiseTags } from '@frontend/define/life-promise';

import { ApiError } from '@utils/api-error';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const categoryValidator = Joi.object({ category: Joi.string() }).required();

    const { category } = await categoryValidator.validateAsync(req.query);

    const promiseCol = await collection.promise();

    if (!lifePromiseTags.includes(category)) throw new ApiError('INTERNAL_SERVER_ERROR');

    const lifePromiseList = await promiseCol
      .find({ categories: category, deletedAt: null })
      .sort({ viewCount: -1 })
      .toArray();

    return res.status(StatusCodes.OK).json(lifePromiseList);
  }
};

export default new NextApiBuilder(handler).build();

import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';

import { NextApiBuilder } from '@backend/api-wrapper';
import { collection } from '@backend/collection';

import { tenPromiseTags } from '@frontend/define/ten-promise-arr';

import { ApiError } from '@utils/api-error';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const categoryValidator = Joi.object({ category: Joi.string() }).required();

    const { category } = await categoryValidator.validateAsync(req.query);

    const promiseCol = await collection.promise();

    if (!tenPromiseTags.includes(category)) throw new ApiError('INTERNAL_SERVER_ERROR');

    const tenPromiseList = await promiseCol
      .find({ categories: category, deletedAt: null })
      .sort({ viewCount: -1 })
      .toArray();

    return res.status(StatusCodes.OK).json(tenPromiseList);
  }
};

export default new NextApiBuilder(handler).build();

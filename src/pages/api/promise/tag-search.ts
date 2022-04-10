import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';

import { NextApiBuilder } from '@backend/api-wrapper';
import { collection } from '@backend/collection';

import { tagWhiteList } from '@frontend/define/tag-white-list';

import { ApiError } from '@utils/api-error';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const queryValidator = Joi.object({
    tagKey: Joi.string().max(100).required(),
  }).required();

  const { tagKey } = (await queryValidator.validateAsync(req.query)) as { tagKey: string };

  if (req.method === 'GET') {
    if (!tagWhiteList.includes(tagKey)) throw new ApiError('INTERNAL_SERVER_ERROR');

    const promiseCol = await collection.promise();

    const promiseItem = await promiseCol
      .find(
        { tags: tagKey, deletedAt: null },
        { projection: { body: 0, createdAt: 0, deletedAt: 0 } },
      )
      .toArray();

    return res.status(StatusCodes.OK).json(promiseItem);
  }
};

export default new NextApiBuilder(handler).build();

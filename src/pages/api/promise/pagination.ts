import Joi from 'joi';

import { NextApiBuilder } from '@backend/api-wrapper';
import { collection } from '@backend/collection';
import type { PromiseTypeFront } from '@backend/model/promise';

import { PopulatePageNumber } from '@pages/populate';
import { BooleanPageNumber } from '@pages/pros-and-cons';

import { ApiError } from '@utils/api-error';

import type { NextApiRequest, NextApiResponse } from 'next';

type SelectedVariant = 'populate' | 'boolean';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const validator = Joi.object({
      variant: Joi.string().valid('populate', 'boolean').required(),
      page: Joi.number().min(0).required(),
    }).required();
    const { page, variant } = (await validator.validateAsync(req.query)) as {
      page: number;
      variant: SelectedVariant;
    };

    if (variant === 'boolean' && page > 4) return res.json([]);

    const promiseCol = await collection.promise();

    let promiseItems = null;

    if (variant === 'populate') {
      promiseItems = await promiseCol
        .find({ deletedAt: null }, { projection: { createdAt: 0, body: 0, deletedAt: 0 } })
        .sort({ viewCount: -1 })
        .skip(PopulatePageNumber * page)
        .limit(PopulatePageNumber)
        .toArray();
    } else {
      const tempPromiseItems = (await promiseCol
        .find({ deletedAt: null }, { projection: { createdAt: 0, body: 0, deletedAt: 0 } })
        .toArray()) as PromiseTypeFront[];

      promiseItems = tempPromiseItems
        .slice()
        .sort((prev, next) => {
          return (
            next.recommendedCount +
            next.notRecommendedCount -
            (prev.recommendedCount + prev.notRecommendedCount)
          );
        })
        .slice(0, 50)
        .sort((prev, next) => {
          return (
            Math.abs(prev.recommendedCount - prev.notRecommendedCount) -
            Math.abs(next.recommendedCount - next.notRecommendedCount)
          );
        })
        .slice(page * BooleanPageNumber, (page + 1) * BooleanPageNumber);
    }

    if (promiseItems === null) throw new ApiError('INTERNAL_SERVER_ERROR');

    return res.json(promiseItems);
  }
};

export default new NextApiBuilder(handler).build();

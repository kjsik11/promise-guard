import { ObjectId } from 'mongodb';

import { NextApiBuilder } from '@backend/api-wrapper';
import { collection } from '@backend/collection';
import type { MyPromiseType } from '@backend/model/promise';

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

    const [result] = await userCol
      .aggregate([
        { $match: { _id } },
        {
          $project: {
            _id: 0,
            recentView: { $slice: ['$recentView', PageNumber] },
            viewCount: { $size: '$recentView' },
            recommendedCount: { $size: '$recommended' },
            notRecommendedCount: { $size: '$notRecommended' },
          },
        },
      ])
      .toArray();

    const promiseCol = await collection.promise();

    const viewPromiseItems = await Promise.all(
      result.recentView.map(async (promiseId: string) => {
        return await promiseCol.findOne(
          { _id: new ObjectId(promiseId), deletedAt: null },
          { projection: { createdAt: 0, body: 0, deletedAt: 0 } },
        );
      }),
    );

    const builtPromiseItems: MyPromiseType = {
      view: {
        items: viewPromiseItems,
        count: result.viewCount,
      },
      recommended: {
        items: [],
        count: result.recommendedCount,
      },
      notRecommended: {
        items: [],
        count: result.notRecommendedCount,
      },
    };

    return res.json(builtPromiseItems);
  }
};

export default new NextApiBuilder(handler).build();

import Joi from 'joi';

import { NextApiBuilder } from '@backend/api-wrapper';

import getUserInfo from '@utils/user/get-user-info';

import { COOKIE_KEY_ACCESS_TOKEN } from '$src/define/cookie';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const validator = Joi.object({ promiseId: Joi.string().required() }).required();
    const { promiseId } = (await validator.validateAsync(req.query)) as { promiseId: string };

    const userToken = req.cookies[COOKIE_KEY_ACCESS_TOKEN];

    const { recommended, notRecommended } = await getUserInfo(userToken, {
      _id: 0,
      recommended: 1,
      notRecommended: 1,
    });

    let voteInfo = '';
    if (recommended.includes(promiseId)) voteInfo = 'recommended';
    if (notRecommended.includes(promiseId)) voteInfo = 'notRecommended';

    return res.status(200).json({ voteInfo });
  }
};

export default new NextApiBuilder(handler).build();

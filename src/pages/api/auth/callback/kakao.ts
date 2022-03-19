import got from 'got';
import Joi from 'joi';
import qs from 'qs';

import { NextApiBuilder } from '@backend/api-wrapper';

import {
  KAKAO_CLIENT_ID,
  KAKAO_CLIENT_SECTET,
  KAKAO_HOST,
  KAKAO_REDIRECT_URI,
  KAKAO_USER_HOST,
} from '@utils/env/internal';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const validateQuery = Joi.object({
      code: Joi.string().required(),
      state: Joi.string().required(),
    }).required();
    const { code, state } = await validateQuery.validateAsync(req.query);

    const body = qs.stringify({
      grant_type: 'authorization_code',
      client_id: KAKAO_CLIENT_ID,
      client_secret: KAKAO_CLIENT_SECTET,
      redirect_uri: KAKAO_REDIRECT_URI,
      code,
    });

    const kakaoAccount = await got
      .post(`${KAKAO_HOST}/oauth/token`, {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
        body,
      })
      .json<{ access_token: string }>();

    const userInfo = await got(`${KAKAO_USER_HOST}/v2/user/me`, {
      headers: {
        Authorization: `Bearer ${kakaoAccount.access_token}`,
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    }).json();

    console.log('user', userInfo);
    return res.json(userInfo);
  }
};

export default new NextApiBuilder(handler).build();

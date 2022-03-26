import { serialize } from 'cookie';
import got from 'got';
import Joi from 'joi';
import qs from 'qs';

import { NextApiBuilder } from '@backend/api-wrapper';
import {
  COOKIE_KEY_ACCESS_TOKEN,
  COOKIE_KEY_REDIRECT_URL,
  defaultCookieOptions,
} from '@backend/define/cookie';

import {
  KAKAO_CLIENT_ID,
  KAKAO_CLIENT_SECTET,
  KAKAO_HOST,
  KAKAO_REDIRECT_URI,
  KAKAO_USER_HOST,
} from '@utils/env/internal';
import { signToken } from '@utils/jsonwebtoken';
import { connectMongo } from '@utils/mongodb/connect';

import type { NextApiRequest, NextApiResponse } from 'next';

const expiresIn = '7D';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const validateQuery = Joi.object({
      code: Joi.string().required(),
    }).required();

    const { code } = await validateQuery.validateAsync(req.query);

    const body = qs.stringify({
      grant_type: 'authorization_code',
      client_id: KAKAO_CLIENT_ID,
      client_secret: KAKAO_CLIENT_SECTET,
      redirect_uri: KAKAO_REDIRECT_URI,
      code,
    });

    // get token
    const kakaoAccount = await got
      .post(`${KAKAO_HOST}/oauth/token`, {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
        body,
      })
      .json<{ access_token: string }>();

    // get userinfo
    const userInfo = await got(`${KAKAO_USER_HOST}/v2/user/me`, {
      headers: {
        Authorization: `Bearer ${kakaoAccount.access_token}`,
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    }).json<{ id: string; connected_at: string; properties: { nickname: string } }>();

    const { db } = await connectMongo();

    const existingUser = await db.collection('user').findOne(
      {
        user_id: userInfo.id,
      },
      {
        projection: { _id: 1 },
      },
    );

    let userId = '';

    if (existingUser) {
      await db.collection('user').updateOne(
        { _id: existingUser._id },
        {
          $set: {
            connectedAt: new Date(),
            info: userInfo.properties,
          },
        },
      );

      userId = String(existingUser._id);
    } else {
      const { insertedId } = await db.collection('user').insertOne({
        user_id: userInfo.id,
        connectedAt: new Date(),
        info: userInfo.properties,
        createdAt: new Date(),
      });

      userId = String(insertedId);
    }

    const accessToken = signToken({ userId }, { expiresIn });

    // set cookie
    res.setHeader('Set-Cookie', [
      serialize(COOKIE_KEY_ACCESS_TOKEN, accessToken, {
        expires: new Date('2099-01-01'),
        ...defaultCookieOptions,
      }),
    ]);
    res.redirect(req.cookies[COOKIE_KEY_REDIRECT_URL] || '/');
  }
};

export default new NextApiBuilder(handler).build();

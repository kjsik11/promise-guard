import { serialize } from 'cookie';
import got from 'got';
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';
import qs from 'qs';

import { NextApiBuilder } from '@backend/api-wrapper';
import { collection } from '@backend/collection';
import type { KakaoUserResponse } from '@backend/model/user';

import { ApiError } from '@utils/api-error';
import {
  KAKAO_CLIENT_ID,
  KAKAO_CLIENT_SECTET,
  KAKAO_HOST,
  KAKAO_REDIRECT_URI,
  KAKAO_USER_HOST,
} from '@utils/env/internal';
import { signToken } from '@utils/jsonwebtoken';

import {
  COOKIE_KEY_ACCESS_TOKEN,
  COOKIE_KEY_REDIRECT_URL,
  defaultCookieOptions,
} from '$src/define/cookie';

import type { NextApiRequest, NextApiResponse } from 'next';

const expiresIn = '365D';

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

    const userCol = await collection.user();

    // Get user info
    const userInfo = await got(`${KAKAO_USER_HOST}/v2/user/me`, {
      headers: {
        Authorization: `Bearer ${kakaoAccount.access_token}`,
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    }).json<KakaoUserResponse>();

    const existingUser = await userCol.findOne(
      {
        user_id: userInfo.id,
      },
      {
        projection: { _id: 1 },
      },
    );

    let userId = '';

    if (existingUser) {
      await userCol.updateOne(
        { _id: existingUser._id },
        {
          $set: {
            lastLogin: new Date(),
          },
        },
      );
      userId = String(existingUser._id);
    } else {
      // Check kakaotalk user
      await got(`${KAKAO_USER_HOST}/v1/api/talk/profile`, {
        headers: {
          Authorization: `Bearer ${kakaoAccount.access_token}`,
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      }).catch(async () => {
        await got.post(`${KAKAO_USER_HOST}/v1/user/unlink`, {
          headers: {
            Authorization: `Bearer ${kakaoAccount.access_token}`,
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        });

        res.status(StatusCodes.FORBIDDEN).redirect('/401');

        throw new ApiError('INTERNAL_SERVER_ERROR');
      });

      const { insertedId } = await userCol.insertOne({
        user_id: userInfo.id,
        info: userInfo.properties,
        recentView: [],
        recommended: [],
        notRecommended: [],
        lastLogin: new Date(),
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
    return;
  }
};

export default new NextApiBuilder(handler).build();

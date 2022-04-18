import { serialize } from 'cookie';
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';

import { NextApiBuilder } from '@backend/api-wrapper';

import checkAdmin from '@utils/check-admin';
import { ADMIN_KEY } from '@utils/env/internal';
import { signToken } from '@utils/jsonwebtoken';

import { COOKIE_ADMIN_ACESS_TOKEN, defaultCookieOptions } from '$src/define/cookie';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    return res.status(StatusCodes.OK).json({ status: checkAdmin(req) });
  }

  if (req.method === 'POST') {
    const validator = Joi.object({ adminKey: Joi.string().required() }).required();

    const { adminKey } = (await validator.validateAsync(req.body)) as { adminKey: string };

    if (adminKey !== ADMIN_KEY) throw new Error('잘못된 키 입력');

    const accessToken = signToken({ adminKey }, { expiresIn: '365d' });

    res.setHeader('Set-Cookie', [
      serialize(COOKIE_ADMIN_ACESS_TOKEN, accessToken, {
        expires: new Date('2099-01-01'),
        ...defaultCookieOptions,
      }),
    ]);

    return res.status(StatusCodes.OK).end();
  }
};

export default new NextApiBuilder(handler).build();

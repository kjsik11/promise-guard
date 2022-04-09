import { serialize } from 'cookie';

import { NextApiBuilder } from '@backend/api-wrapper';
import { collection } from '@backend/collection';

import { ApiError } from '@utils/api-error';
import getUserInfo from '@utils/user/get-user-info';

import { COOKIE_KEY_ACCESS_TOKEN, defaultCookieOptions } from '$src/define/cookie';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'DELETE') {
    const userToken = req.cookies[COOKIE_KEY_ACCESS_TOKEN];
    if (!userToken) throw new ApiError('INTERNAL_SERVER_ERROR');
    const { _id } = await getUserInfo(userToken, { _id: 1 });

    const userCol = await collection.user();

    await userCol.deleteOne({ deletedAt: null, _id });

    res.setHeader('Set-Cookie', [
      serialize(COOKIE_KEY_ACCESS_TOKEN, '', {
        maxAge: 0,
        ...defaultCookieOptions,
      }),
    ]);

    return res.status(204).end();
  }
};

export default new NextApiBuilder(handler).build();

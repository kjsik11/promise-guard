import { serialize } from 'cookie';

import { NextApiBuilder } from '@backend/api-wrapper';

import getUserInfo from '@utils/user/get-user-info';

import { COOKIE_KEY_ACCESS_TOKEN, defaultCookieOptions } from '$src/define/cookie';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const userToken = req.cookies[COOKIE_KEY_ACCESS_TOKEN];

    const info = await getUserInfo(userToken, { _id: 0, info: 1, recentView: 1 });

    return res.status(200).json(info);
  }

  if (req.method === 'DELETE') {
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

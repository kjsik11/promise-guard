import { serialize } from 'cookie';
import { ObjectId } from 'mongodb';

import { NextApiBuilder } from '@backend/api-wrapper';
import { collection } from '@backend/collection';
import type { UserInfo } from '@backend/model/user';

import { verifyToken } from '@utils/jsonwebtoken';

import { COOKIE_KEY_ACCESS_TOKEN, defaultCookieOptions } from '$src/define/cookie';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const user = req.cookies[COOKIE_KEY_ACCESS_TOKEN];

    const { userId } = verifyToken(user) as { userId: string };

    const userCol = await collection.user();

    const { info } = (await userCol.findOne(
      { _id: new ObjectId(userId) },
      { projection: { _id: 0, info: 1 } },
    )) as {
      info: UserInfo;
    };

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

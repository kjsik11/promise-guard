import { COOKIE_ADMIN_ACESS_TOKEN } from '$src/define/cookie';

import { ADMIN_KEY } from './env/internal';
import { verifyToken } from './jsonwebtoken';

import type { NextApiRequest } from 'next';

export default function checkAdmin(req: NextApiRequest) {
  const adminAccessToken = req.cookies[COOKIE_ADMIN_ACESS_TOKEN];

  if (!adminAccessToken) return false;

  const { adminKey } = verifyToken<{ adminKey: string }>(adminAccessToken);

  if (adminKey !== ADMIN_KEY) return false;

  return true;
}

import { isProd } from '@utils/env';

export const COOKIE_KEY_ACCESS_TOKEN = 'may10.accessToken';
export const COOKIE_KEY_REDIRECT_URL = 'may10.redirectUrl';
export const defaultCookieOptions = {
  path: '/',
  sameSite: 'lax',
  httpOnly: true,
  secure: isProd(),
} as const;

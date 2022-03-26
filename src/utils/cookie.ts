import cookie from 'cookie';

export const getCookie = (cookieName: string, fallbackData?: string) => {
  if (typeof window === 'undefined') throw new Error('cannot get cookie in server-side.');

  const value = cookie.parse(document.cookie)[cookieName] || fallbackData;

  if (value === undefined) throw new Error(`No cookie with name '${cookieName}'`);

  return value;
};

export const setCookie = (cookieName: string, value: string) => {
  if (typeof window === 'undefined') throw new Error('cannot set cookie in server-side.');

  document.cookie = `${cookieName}=${value}; Path=/`;
};

export const clearCookie = (cookieName: string) => {
  setCookie(cookieName, '');
};

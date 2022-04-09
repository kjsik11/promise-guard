const envList = [
  'NEXT_PUBLIC_AWS_CDN_URL',
  'NEXT_PUBLIC_GTM_ID',
  'NEXT_PUBLIC_KAKAO_JS_KEY',
] as const;

export const PUBLIC_ENV = {
  NEXT_PUBLIC_AWS_CDN_URL: process.env.NEXT_PUBLIC_AWS_CDN_URL,
  NEXT_PUBLIC_GTM_ID: process.env.NEXT_PUBLIC_GTM_ID,
  NEXT_PUBLIC_KAKAO_JS_KEY: process.env.NEXT_PUBLIC_KAKAO_JS_KEY,
} as { [key in typeof envList[number]]: string };

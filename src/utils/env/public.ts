const envList = ['NEXT_PUBLIC_AWS_CDN_URL', 'NEXT_PUBLIC_GTM_ID'] as const;

export const PUBLIC_ENV = {
  NEXT_PUBLIC_AWS_CDN_URL: process.env.NEXT_PUBLIC_AWS_CDN_URL,
  NEXT_PUBLIC_GTM_ID: process.env.NEXT_PUBLIC_GTM_ID,
} as { [key in typeof envList[number]]: string };

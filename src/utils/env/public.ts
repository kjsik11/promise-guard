const envList = ['NEXT_PUBLIC_AWS_CDN_URL'] as const;

export const PUBLIC_ENV = {
  NEXT_PUBLIC_AWS_CDN_URL: process.env.NEXT_PUBLIC_AWS_CDN_URL,
} as { [key in typeof envList[number]]: string };

import { ApiError } from '@utils/api-error';

const ENV_LIST = [
  'AWS_KEY_ID',
  'AWS_S3_REGION',
  'AWS_SECRET',
  'AWS_BUCKET_NAME',
  'MONGODB_URI',
  'MONGODB_NAME',
  'KAKAO_CLIENT_ID',
  'KAKAO_CLIENT_SECTET',
  'KAKAO_REDIRECT_URI',
  'KAKAO_HOST',
  'HASHIDS_KEY',
  'JWT_SECRET',
  'KAKAO_USER_HOST',
] as const;
const PUBLIC_ENV_LIST = ['MY_PUBLIC_ENV'] as const;

type EnvironmentVariable = typeof ENV_LIST[number];
type PublicEnvironmentVariable = `NEXT_PUBLIC_${typeof PUBLIC_ENV_LIST[number]}`;

export const isTest: () => boolean = () => {
  return process.env.NODE_ENV === 'test';
};

export const isDev: () => boolean = () => {
  return process.env.NODE_ENV === 'development';
};

export const isProd: () => boolean = () => {
  return process.env.NODE_ENV === 'production';
};

export const getEnv = (name: EnvironmentVariable) => {
  const val = process.env[name];

  if (val !== undefined) {
    return val;
  }

  if (!isTest()) {
    throw new ApiError(
      'INTERNAL_SERVER_ERROR',
      `Check 'env.local'. Missing environment variable ${name}`,
    );
  }

  return '';
};

export const getPublicEnv = (name: PublicEnvironmentVariable) => {
  return getEnv(name as never);
};

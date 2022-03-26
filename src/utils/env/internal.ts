import { getEnv } from '.';

export const AWS_BUCKET_NAME = getEnv('AWS_BUCKET_NAME');
export const AWS_KEY_ID = getEnv('AWS_KEY_ID');
export const AWS_S3_REGION = getEnv('AWS_S3_REGION');
export const AWS_SECRET = getEnv('AWS_SECRET');
export const JWT_SECRET = getEnv('JWT_SECRET');
export const MONGODB_URI = getEnv('MONGODB_URI');
export const MONGODB_NAME = getEnv('MONGODB_NAME');
export const KAKAO_CLIENT_ID = getEnv('KAKAO_CLIENT_ID');
export const KAKAO_CLIENT_SECTET = getEnv('KAKAO_CLIENT_SECTET');
export const KAKAO_REDIRECT_URI = getEnv('KAKAO_REDIRECT_URI');
export const KAKAO_HOST = getEnv('KAKAO_HOST');
export const KAKAO_USER_HOST = getEnv('KAKAO_USER_HOST');
export const HASHIDS_KEY = getEnv('HASHIDS_KEY');

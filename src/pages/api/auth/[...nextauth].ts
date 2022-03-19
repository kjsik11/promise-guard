import NextAuth from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';

import { JWT_SECRET, KAKAO_CLIENT_ID, KAKAO_CLIENT_SECTET } from '@utils/env/internal';

export default NextAuth({
  secret: JWT_SECRET,
  providers: [
    KakaoProvider({
      clientId: KAKAO_CLIENT_ID,
      clientSecret: KAKAO_CLIENT_SECTET,
    }),
  ],
});

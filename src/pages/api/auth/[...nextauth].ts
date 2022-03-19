import NextAuth from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';
import { v4 as uuid_v4 } from 'uuid';

export default NextAuth({
  secret: uuid_v4(),
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID ?? '',
      clientSecret: process.env.KAKAO_CLIENT_SECTET ?? '',
    }),
  ],
});

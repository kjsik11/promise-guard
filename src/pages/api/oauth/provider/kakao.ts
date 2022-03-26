import qs from 'qs';

import { NextApiBuilder } from '@backend/api-wrapper';

import { KAKAO_CLIENT_ID, KAKAO_REDIRECT_URI } from '@utils/env/internal';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const requestOptions = {
      client_id: KAKAO_CLIENT_ID,
      redirect_uri: KAKAO_REDIRECT_URI,
      response_type: 'code',
    };

    res.redirect(302, `https://kauth.kakao.com/oauth/authorize?${qs.stringify(requestOptions)}`);
  }
};

export default new NextApiBuilder(handler).build();

import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import useSWRImmutable from 'swr/immutable';

import { viewArrayKey } from '@frontend/define/session-key';
import signout from '@frontend/lib/auth/signout';
import getUserInfo from '@frontend/lib/user/get-user-info';

import { setCookie } from '@utils/cookie';

import { COOKIE_KEY_REDIRECT_URL } from '$src/define/cookie';
import { SWR_KEY } from '$src/define/swr-keys';

import { useNoti } from './use-noti';

export default function useUser() {
  const [viewArray, setViewArray] = useState<string[]>([]);

  const router = useRouter();

  const { showAlert } = useNoti();

  const { data: user, error, mutate } = useSWRImmutable(SWR_KEY.USER_PROFILE, getUserInfo);

  useEffect(() => {
    const tempViewArray = JSON.parse(
      window.sessionStorage.getItem(viewArrayKey) ?? '[]',
    ) as string[];

    if (user?.recentView) {
      tempViewArray.concat(user?.recentView);
    }
    setViewArray(tempViewArray);
  }, [user?.recentView]);

  const handleSignin = useCallback(
    async (ishome: boolean = false) => {
      setCookie(COOKIE_KEY_REDIRECT_URL, ishome ? '/' : router.asPath);

      await router
        .push('/signin/kakao')
        .then(() => mutate())
        .catch(showAlert);
    },
    [showAlert, mutate, router],
  );

  const handleSignout = useCallback(async () => {
    await signout()
      .then(() => mutate())
      .catch(showAlert);
  }, [showAlert, mutate]);

  return {
    handleSignin,
    handleSignout,
    mutate,
    loading: !user && !error,
    user: error ? undefined : user?.info,
    viewArray,
    error,
  };
}

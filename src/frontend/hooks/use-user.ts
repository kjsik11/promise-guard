import { useRouter } from 'next/router';
import { useCallback } from 'react';
import useSWRImmutable from 'swr/immutable';

import signout from '@frontend/lib/auth/signout';
import getUserInfo from '@frontend/lib/user/get-user-info';

import { setCookie } from '@utils/cookie';

import { COOKIE_KEY_REDIRECT_URL } from '$src/define/cookie';
import { SWR_KEY } from '$src/define/swr-keys';

import { useNoti } from './use-noti';

export default function useUser() {
  const router = useRouter();

  const { showAlert } = useNoti();

  const { data: user, error, mutate } = useSWRImmutable(SWR_KEY.USER_PROFILE, getUserInfo);

  const handleSignin = useCallback(async () => {
    setCookie(COOKIE_KEY_REDIRECT_URL, router.asPath);

    await router
      .push('/signin/kakao')
      .then(() => mutate())
      .catch(showAlert);
  }, [showAlert, mutate, router]);

  const handleSignout = useCallback(async () => {
    await signout()
      .then(() => mutate())
      .catch(showAlert);
  }, [showAlert, mutate]);

  return {
    handleSignin,
    handleSignout,
    loading: !user && !error,
    user: error ? undefined : user,
    error,
    mutate,
  };
}

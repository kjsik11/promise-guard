import useSWRImmutable from 'swr/immutable';

import getUserInfo from '@frontend/lib/user/get-user-info';

import { SWR_KEY } from '$src/define/swr-keys';

export default function useUser() {
  const { data: user, error, mutate } = useSWRImmutable(SWR_KEY.USER_PROFILE, getUserInfo);

  return { loading: !user && !error, user: error ? undefined : user, error, mutate };
}

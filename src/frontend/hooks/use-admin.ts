import { useCallback, useMemo } from 'react';
import useSWRImmutable from 'swr/immutable';

import checkAdmin from '@frontend/lib/admin/check-admin';
import { fetcher } from '@frontend/lib/fetcher';

import { SWR_KEY } from '$src/define/swr-keys';

import { useNoti } from './use-noti';

export default function useAdmin() {
  const { showAlert } = useNoti();

  const { data: adminFlag, error, mutate } = useSWRImmutable(SWR_KEY.ADMIN_CHECK, checkAdmin);

  const loading = useMemo(() => {
    return adminFlag === undefined;
  }, [adminFlag]);

  const handleAdminSignin = useCallback(
    async (adminKey: string) => {
      await fetcher
        .post('/admin/signin', { json: { adminKey } })
        .then(() => {
          mutate();
        })
        .catch(showAlert);
    },
    [showAlert, mutate],
  );

  return {
    handleAdminSignin,
    adminFlag,
    loading,
    error,
    mutate,
  };
}

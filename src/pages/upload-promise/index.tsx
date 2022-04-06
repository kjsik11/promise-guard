import NextLink from 'next/link';
import { useEffect, useState } from 'react';

import type { PromiseTypeBSON } from '@backend/model/promise';

import Loading from '@frontend/components/core/Loading';
import PromiseListCard from '@frontend/components/custom/PromiseListCard';
import AdminLayout from '@frontend/components/layout/Admin';
import { Button } from '@frontend/components/ui';
import useAdmin from '@frontend/hooks/use-admin';
import { useNoti } from '@frontend/hooks/use-noti';
import getPromiseList from '@frontend/lib/promise/get-promise-list';

export default function PromiseList() {
  const [loading, setLoading] = useState(false);
  const [promiseList, setPromiseList] = useState<PromiseTypeBSON[] | null>(null);
  const { showNoti } = useNoti();
  const { adminFlag } = useAdmin();

  useEffect(() => {
    if (adminFlag) {
      getPromiseList().then(setPromiseList).catch(showNoti);
    }
  }, [showNoti, adminFlag]);

  if (promiseList === null) return <Loading />;

  return (
    <div className="py-4">
      <div className="flex justify-end space-x-4">
        <Button
          onClick={() => {
            if (promiseList) {
              const reverseArray = promiseList.reverse();
              setPromiseList([...reverseArray]);
            }
          }}
        >
          반대로보기
        </Button>
        <NextLink passHref href="/upload-promise/upload">
          <Button as="a">Upload</Button>
        </NextLink>
      </div>
      <div className="mt-4 space-y-2">
        {promiseList.length > 0 &&
          promiseList.map((promise, idx) => (
            <PromiseListCard
              loading={loading}
              setLoading={setLoading}
              refetch={() => {
                getPromiseList().then(setPromiseList).catch(showNoti);
              }}
              key={`card-${idx}`}
              data={promise}
            />
          ))}
      </div>
    </div>
  );
}

PromiseList.Layout = AdminLayout;

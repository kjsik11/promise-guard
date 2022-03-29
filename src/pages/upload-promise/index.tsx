import NextLink from 'next/link';
import { useEffect, useState } from 'react';

import type { PromiseTypeBSON } from '@backend/model/promise';

import Loading from '@frontend/components/core/Loading';
import PromiseListCard from '@frontend/components/custom/PromiseListCard';
import NoneLayout from '@frontend/components/layout/None';
import { Button } from '@frontend/components/ui';
import { useNoti } from '@frontend/hooks/use-noti';
import getPromiseList from '@frontend/lib/promise/get-promise-list';

export default function PromiseList() {
  const [loading, setLoading] = useState(false);
  const [promiseList, setPromiseList] = useState<PromiseTypeBSON[]>([]);
  const [pageLoading, setPageLoading] = useState(false);
  const { showNoti } = useNoti();

  useEffect(() => {
    setPageLoading(true);
    getPromiseList()
      .then(setPromiseList)
      .catch(showNoti)
      .finally(() => setPageLoading(false));
  }, [showNoti]);

  if (pageLoading) return <Loading />;

  return (
    <div className="py-4">
      <div className="flex justify-end">
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

PromiseList.Layout = NoneLayout;

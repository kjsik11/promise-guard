import NextLink from 'next/link';
import { useEffect, useState } from 'react';

import type { PromiseTypeBSON } from '@backend/model/promise';

import PromiseListCard from '@frontend/components/custom/PromiseListCard';
import { Button } from '@frontend/components/ui';
import { useNoti } from '@frontend/hooks/use-noti';
import getPromiseList from '@frontend/lib/promise/get-promise-list';

export default function PromiseList() {
  const [promiseList, setPromiseList] = useState<PromiseTypeBSON[]>([]);
  const { showNoti } = useNoti();

  useEffect(() => {
    getPromiseList().then(setPromiseList).catch(showNoti);
  }, [showNoti]);

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

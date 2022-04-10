import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import type { PromiseTypeFront } from '@backend/model/promise';

import PromiseCard from '@frontend/components/custom/promise/PromiseCard';
import SkeletonPromiseCard from '@frontend/components/custom/promise/SkeletonPromiseCard';
import { fetcher } from '@frontend/lib/fetcher';

export default function PromiseDetailPage() {
  const router = useRouter();
  const [promiseItems, setPromiseItems] = useState<PromiseTypeFront[] | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const tagKey = router.query.tagKey;

    if (tagKey && typeof tagKey === 'string') {
      fetcher(`/api/promise/tag-search?tagKey=${tagKey}`)
        .json<PromiseTypeFront[]>()
        .then(setPromiseItems)
        .catch((err) => {
          setError(err.message);
        });
    }
  }, [router.query.tagKey]);

  if (error)
    return (
      <div className="py-20 text-center text-3xl font-bold">
        <p>
          페이지를 찾을 수 없거나 <br />
          찾는 중 문제가 발생했습니다.
        </p>
      </div>
    );

  if (promiseItems === null)
    return (
      <div className="min-h-[500px] pt-12">
        <div className="mb-4 h-10 w-40 animate-pulse rounded-md bg-gray-300 px-4" />
        <div className="space-y-4 bg-gray-100 p-4 pb-12">
          {Array.from({ length: 5 }, (_, idx) => (
            <SkeletonPromiseCard key={`skeleton-${idx}`} />
          ))}
        </div>
      </div>
    );

  return (
    <div className="pt-12">
      <p className="px-4 text-3xl font-bold text-PC-800">#{router.query.tagKey}</p>
      <section className="mt-4 min-h-[500px] space-y-4 bg-gray-100 p-4">
        {promiseItems.map((item, idx) => (
          <PromiseCard
            tagPrefix={`tagpromise-tag-${idx}`}
            promiseItem={item}
            key={`tagpromise-card-${idx}`}
          />
        ))}
      </section>
    </div>
  );
}

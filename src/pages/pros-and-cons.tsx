import clsx from 'clsx';
import { useCallback, useEffect, useState } from 'react';

import { collection } from '@backend/collection';
import type { PromiseTypeFront } from '@backend/model/promise';

import DynamicLoading from '@frontend/components/core/DynamicLoading';
import BooleanPromise from '@frontend/components/custom/promise/BooleanPromise';
import { useNoti } from '@frontend/hooks/use-noti';
import { fetcher } from '@frontend/lib/fetcher';

import type { GetStaticProps } from 'next';

interface Props {
  booleanPromiseItems: PromiseTypeFront[];
  promiseCount: number;
}

export const BooleanPageNumber = 10;

export default function BooleanPromisePage({ promiseCount, booleanPromiseItems }: Props) {
  const [loading, setLoading] = useState(false);
  const [renderedBooleanItems, setRenderedBooleanItems] = useState<PromiseTypeFront[] | null>(null);

  const { showAlert } = useNoti();

  useEffect(() => {
    setRenderedBooleanItems(booleanPromiseItems);
  }, [booleanPromiseItems]);

  const handleMoreLoad = useCallback(() => {
    if (!loading && renderedBooleanItems && renderedBooleanItems.length < promiseCount) {
      const currentPage = Math.floor(renderedBooleanItems.length / BooleanPageNumber);

      setLoading(true);

      fetcher(`/api/promise/pagination?variant=boolean&page=${currentPage}`)
        .json<PromiseTypeFront[]>()
        .then((promiseItems) => {
          setRenderedBooleanItems((prev) => (prev ? [...prev, ...promiseItems] : null));
        })
        .catch(showAlert)
        .finally(() => {
          setLoading(false);
        });
    }
  }, [showAlert, loading, promiseCount, renderedBooleanItems]);

  if (!renderedBooleanItems) return <DynamicLoading />;

  return (
    <div className="pt-12">
      <BooleanPromise isDetailPage booleanPromiseItems={renderedBooleanItems} />
      {loading ? (
        <DynamicLoading />
      ) : (
        <button
          disabled={loading}
          onClick={handleMoreLoad}
          className={clsx(
            'mx-auto my-4 flex w-full max-w-sm justify-center rounded-md border-gray-300 bg-PC-400 px-4 py-2 text-white',
            { hidden: renderedBooleanItems.length === promiseCount },
          )}
        >
          더 보기
        </button>
      )}
    </div>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const promiseCol = await collection.promise();

    const promiseItems = (await promiseCol
      .find({ deletedAt: null }, { projection: { createdAt: 0, body: 0, deletedAt: 0 } })
      .toArray()) as PromiseTypeFront[];

    const promiseCount = 50;

    if (promiseItems.length === 0 || !promiseCount)
      throw new Error('[getStaticProps]: failed to fetch');
    ``;
    const booleanPromiseItems = promiseItems
      .slice()
      .sort((prev, next) => {
        return (
          next.recommendedCount +
          next.notRecommendedCount -
          (prev.recommendedCount + prev.notRecommendedCount)
        );
      })
      .slice(0, 50)
      .sort((prev, next) => {
        return (
          Math.abs(prev.recommendedCount - prev.notRecommendedCount) -
          Math.abs(next.recommendedCount - next.notRecommendedCount)
        );
      })
      .slice(0, 10);
    return {
      props: JSON.parse(
        JSON.stringify({
          promiseCount,
          booleanPromiseItems,
        }),
      ),
      revalidate: 10,
    };
  } catch (err) {
    return {
      props: [],
      notFound: true,
    };
  }
};

import clsx from 'clsx';
import { NextSeo } from 'next-seo';
import { useCallback, useEffect, useState } from 'react';

import { collection } from '@backend/collection';
import type { PromiseTypeFront } from '@backend/model/promise';

import DynamicLoading from '@frontend/components/core/DynamicLoading';
import PopulatePromise from '@frontend/components/custom/promise/PopulatePromise.tsx';
import { useNoti } from '@frontend/hooks/use-noti';
import { fetcher } from '@frontend/lib/fetcher';

import type { GetStaticProps } from 'next';

interface Props {
  populateItems: PromiseTypeFront[];
  promiseCount: number;
}

export const PopulatePageNumber = 10;

export default function PopulatePromisePage({ promiseCount, populateItems }: Props) {
  const [loading, setLoading] = useState(false);
  const [renderedPopulateItems, setRenderedPopulateItems] = useState<PromiseTypeFront[] | null>(
    null,
  );

  const { showAlert } = useNoti();

  useEffect(() => {
    setRenderedPopulateItems(populateItems);
  }, [populateItems]);

  const handleMoreLoad = useCallback(() => {
    if (!loading && renderedPopulateItems && renderedPopulateItems.length < promiseCount) {
      const currentPage = Math.floor(renderedPopulateItems.length / PopulatePageNumber);

      setLoading(true);

      fetcher(`/api/promise/pagination?variant=populate&page=${currentPage}`)
        .json<PromiseTypeFront[]>()
        .then((promiseItems) => {
          setRenderedPopulateItems((prev) => (prev ? [...prev, ...promiseItems] : null));
        })
        .catch(showAlert)
        .finally(() => {
          setLoading(false);
        });
    }
  }, [showAlert, loading, promiseCount, renderedPopulateItems]);

  if (!renderedPopulateItems) return <DynamicLoading />;

  return (
    <>
      <NextSeo
        title="인기 공약ㅣ오월 십일"
        openGraph={{
          title: '인기 공약ㅣ오월 십일',
        }}
      />
      <div className="pt-12">
        <PopulatePromise isDetailPage populateItems={renderedPopulateItems} />
        {loading ? (
          <DynamicLoading />
        ) : (
          <button
            disabled={loading}
            onClick={handleMoreLoad}
            className={clsx(
              'mx-auto my-4 flex w-full max-w-sm justify-center rounded-md border-gray-300 bg-PC-400 px-4 py-2 text-white',
              { hidden: renderedPopulateItems.length === promiseCount },
            )}
          >
            더 보기
          </button>
        )}
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const promiseCol = await collection.promise();

    const promiseItems = (await promiseCol
      .find({ deletedAt: null }, { projection: { createdAt: 0, body: 0, deletedAt: 0 } })
      .sort({ viewCount: -1 })
      .limit(10)
      .toArray()) as PromiseTypeFront[];

    const promiseCount = await promiseCol.find({ deletedAt: null }).count();

    if (promiseItems.length === 0 || !promiseCount)
      throw new Error('[getStaticProps]: failed to fetch');

    return {
      props: JSON.parse(
        JSON.stringify({
          populateItems: promiseItems,
          promiseCount,
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

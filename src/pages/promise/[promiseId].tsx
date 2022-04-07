import { ChevronRightIcon, XIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import { ObjectId } from 'mongodb';
import { useCallback, useState } from 'react';
import useSWR from 'swr';

import { collection } from '@backend/collection';
import type { PromiseTypeFront } from '@backend/model/promise';

import KakaoChannel from '@frontend/components/custom/KakaoChannel';
import PromiseSections from '@frontend/components/custom/promise/PromiseSections';
import EmptyCircle from '@frontend/components/vector/EmptyCircle';
import useIncreaseView from '@frontend/hooks/count/use-increase-view';
import { useNoti } from '@frontend/hooks/use-noti';
import useUser from '@frontend/hooks/use-user';
import getRecommendCounts, { GetRecommendCount } from '@frontend/lib/count/get-recommend-counts';
import increaseNotRecommendCount from '@frontend/lib/count/increase-not-recommend-count';
import increaseRecommendCount from '@frontend/lib/count/increase-recommend-count';

import buildBreadcrumbs from '@utils/build-breadcrumbs';
import markdownToHtml from '@utils/markdownToHtml';

import { SWR_KEY } from '$src/define/swr-keys';

import type { GetStaticPaths, GetStaticProps } from 'next';

interface Props {
  breadcrumbs: string[];
  promiseItem: PromiseTypeFront & { body: string };
  booleanPromiseItems: PromiseTypeFront[];
  populatePromiseItems: PromiseTypeFront[];
}

export default function PromiseDetailPage({
  breadcrumbs,
  promiseItem,
  booleanPromiseItems,
  populatePromiseItems,
}: Props) {
  const [loading, setLoading] = useState(false);

  const { data, mutate } = useSWR<GetRecommendCount>(
    SWR_KEY.GET_RECOMMEND_COUNTS,
    () => getRecommendCounts(promiseItem._id as string),
    {
      fallbackData: {
        recommendedCount: promiseItem.recommendedCount,
        notRecommendedCount: promiseItem.notRecommendedCount,
      },
    },
  );

  const { user } = useUser();

  const { showAlert, showNoti } = useNoti();

  useIncreaseView(promiseItem._id as string);

  const handleRecommend = useCallback(async () => {
    setLoading(true);
    if (!user) return showNoti({ variant: 'alert', title: '로그인 후 이용해주세요.' });

    await increaseRecommendCount(promiseItem._id as string)
      .then(async (status) => {
        if (status === 204) showNoti({ title: '이미 투표하였습니다.' });
        await mutate();
      })
      .catch(showAlert)
      .finally(() => setLoading(false));
  }, [user, showAlert, mutate, showNoti, promiseItem._id]);

  const handleNotRecommend = useCallback(async () => {
    setLoading(true);
    if (!user) return showNoti({ variant: 'alert', title: '로그인 후 이용해주세요.' });

    await increaseNotRecommendCount(promiseItem._id as string)
      .then(async (status) => {
        if (status === 204) showNoti({ title: '이미 투표하였습니다.' });
        await mutate();
      })
      .catch(showAlert)
      .finally(() => setLoading(false));
  }, [user, showAlert, mutate, showNoti, promiseItem._id]);

  return (
    <div className="bg-gray-100">
      <section className="bg-white px-4 py-10">
        <div className="flex items-center text-sm font-semibold text-PC-400">
          {breadcrumbs.map((val, idx) => (
            <div key={`breadcrumbs-${idx}`} className="flex items-center">
              {idx !== 0 && <ChevronRightIcon className="h-4 w-4" />}
              <span>{val}</span>
            </div>
          ))}
        </div>
        <p className="py-2 text-3xl font-bold">{promiseItem.title}</p>
        {promiseItem.tags.length > 0 && (
          <div className="flex space-x-1 text-sm font-semibold text-PC-400">
            {promiseItem.tags.map((tag, idx) => (
              <span key={`detail-tag-${tag}-${idx}`}>#{tag}</span>
            ))}
          </div>
        )}
        <div className="pt-10 pb-4">
          <div
            className={clsx(
              'prose prose-lg',
              'prose-h3:text-xl prose-h3:font-bold prose-h3:text-black',
              'prose-p:text-base prose-p:font-normal prose-p:text-gray-900',
              'prose-li:text-base prose-li:font-normal prose-li:text-gray-900 prose-li:marker:text-xs prose-li:marker:text-black',
              'prose-img:w-full',
            )}
            dangerouslySetInnerHTML={{
              __html: markdownToHtml(promiseItem.body),
            }}
          />
        </div>
        <div className="flex justify-center space-x-6 py-10">
          <div>
            <button
              disabled={loading}
              onClick={handleRecommend}
              className="flex h-20 w-20 flex-col items-center justify-center rounded-full bg-red-400 text-white"
            >
              <EmptyCircle />
              <p className="pt-1 text-xs font-medium">지지해요</p>
            </button>
            <p className="pt-1 text-center font-semibold text-red-400">
              {data?.recommendedCount ?? promiseItem.recommendedCount.toLocaleString()}
            </p>
          </div>
          <div>
            <button
              disabled={loading}
              onClick={handleNotRecommend}
              className="flex h-20 w-20 flex-col items-center justify-center rounded-full bg-blue-400 text-white"
            >
              <XIcon className="h-9 w-9" />
              <p className="pt-1 text-xs font-medium">반대해요</p>
            </button>
            <p className="pt-1 text-center font-semibold text-blue-400">
              {data?.notRecommendedCount ?? promiseItem.notRecommendedCount.toLocaleString()}
            </p>
          </div>
        </div>
      </section>
      <section>
        <KakaoChannel className="my-4 bg-white" />
      </section>
      <section>
        <div className="my-4 bg-white py-8 text-center">태그 자리</div>
      </section>
      <section>
        <PromiseSections
          booleanPromiseItems={booleanPromiseItems}
          populatePromiseItems={populatePromiseItems}
        />
      </section>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = () => {
  return { fallback: 'blocking', paths: [] };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  try {
    if (!params || typeof params.promiseId !== 'string') throw new Error('No such page params');

    const promiseId = new ObjectId(params.promiseId);

    const promiseCol = await collection.promise();

    const promiseItems = (await promiseCol
      .find({ deletedAt: null }, { projection: { createdAt: 0, body: 0, deletedAt: 0 } })
      .sort({ viewCount: -1 })
      .toArray()) as PromiseTypeFront[];

    if (promiseItems.length === 0) throw new Error('[getStaticProps]: failed to fetch');

    const promiseItem = await promiseCol.findOne(
      { deletedAt: null, _id: promiseId },
      { projection: { createdAt: 0, deletedAt: 0 } },
    );
    if (!promiseItem) throw new Error('[getStaticProps]: failed to fetch');

    const breadcrumbs = buildBreadcrumbs(promiseItem.categories);

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
          prev.recommendedCount -
          prev.notRecommendedCount -
          (next.recommendedCount - next.notRecommendedCount)
        );
      })
      .slice(0, 5);

    //TODO:

    return {
      props: JSON.parse(
        JSON.stringify({
          breadcrumbs,
          promiseItem,
          populatePromiseItems: promiseItems.slice(0, 5),
          booleanPromiseItems,
        }),
      ),
    };
  } catch (err) {
    console.log('[promise detail page]', (err as any).message);

    return { props: [], notFound: true };
  }
};

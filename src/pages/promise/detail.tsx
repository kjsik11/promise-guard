import { ShareIcon, XIcon } from '@heroicons/react/outline';
import { ChevronRightIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import { collection } from '@backend/collection';
import type { PromiseTypeFront } from '@backend/model/promise';

import KakaoChannel from '@frontend/components/custom/KakaoChannel';
import PromiseSections from '@frontend/components/custom/promise/PromiseSections';
import TagSlider from '@frontend/components/custom/TagSlider';
import VoteNotification from '@frontend/components/custom/VoteNotification';
import LoginModal from '@frontend/components/ui/LoginModal';
import VoteModal from '@frontend/components/ui/VoteModal';
import EmptyCircle from '@frontend/components/vector/EmptyCircle';
import { localVoteModalFlag } from '@frontend/define/session-key';
import { tagWhiteList } from '@frontend/define/tag-white-list';
import useIncreaseView from '@frontend/hooks/count/use-increase-view';
import { useNoti } from '@frontend/hooks/use-noti';
import useUser from '@frontend/hooks/use-user';
import increaseNotRecommendCount from '@frontend/lib/count/increase-not-recommend-count';
import increaseRecommendCount from '@frontend/lib/count/increase-recommend-count';
import { fetcher } from '@frontend/lib/fetcher';

import buildBreadcrumbs from '@utils/build-breadcrumbs';
import markdownToHtml from '@utils/markdownToHtml';
import { removeDuplicatedTags } from '@utils/remove-duplicated-tags';
import shareLogic from '@utils/share-logic';

import type { GetStaticProps } from 'next';

interface Props {
  pureTags: string[];
  booleanPromiseItems: PromiseTypeFront[];
  populatePromiseItems: PromiseTypeFront[];
}

export default function PromiseDetailPage({
  pureTags,
  booleanPromiseItems,
  populatePromiseItems,
}: Props) {
  const router = useRouter();

  // for seperate promise true or false button loading
  const [loading, setLoading] = useState<'true' | 'false' | ''>('');
  const [notiText, setNotiTest] = useState<{ title: string; content: string; url: string }>({
    title: '',
    content: '',
    url: '',
  });
  const [initialLoading, setInitialLoading] = useState(false);
  const [showVoteNoti, setShowVoteNoti] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [userVoteFlag, setUserVoteFlag] = useState<'recommended' | 'notRecommended' | ''>('');
  const [isVote, setIsVote] = useState<'recommended' | 'notRecommended' | ''>('');
  const [showVoteModal, setShowVoteModal] = useState(false);
  const [promiseItem, setPromiseItem] = useState<null | (PromiseTypeFront & { body: string })>(
    null,
  );
  const [breadcrumbs, setBreadcrumbs] = useState<string[] | null>(null);
  const [error, setError] = useState('');

  const { user, handleSignin } = useUser();

  const { showAlert, showNoti } = useNoti();

  useEffect(() => {
    const promiseId = router.query.promiseId;

    if (promiseId && typeof promiseId === 'string') {
      setInitialLoading(true);
      fetcher(`/api/promise/detail/${promiseId}`)
        .json<{
          promiseItem: PromiseTypeFront & { body: string };
          voteInfo: 'recommended' | 'notRecommended' | '';
        }>()
        .then(({ promiseItem, voteInfo }) => {
          setPromiseItem(promiseItem);
          setBreadcrumbs(buildBreadcrumbs(promiseItem.categories));
          setIsVote(voteInfo);
        })
        .catch((err) => {
          setError(err.message);
        })
        .finally(() => setInitialLoading(false));
    }
  }, [router.query.promiseId, showAlert]);

  useIncreaseView(promiseItem?._id as string);

  useEffect(() => {
    const showVoteModalFlag = window.localStorage.getItem(localVoteModalFlag);

    if (!showVoteModalFlag) {
      setShowVoteModal(true);
    }
  }, []);

  const handleRecommend = useCallback(async () => {
    if (!promiseItem) return;

    setLoading('true');
    if (!user) {
      setLoading('');
      return showNoti({ variant: 'alert', title: '로그인 후 이용해주세요.' });
    }

    await increaseRecommendCount(promiseItem._id as string)
      .then(async (status) => {
        if (status === 204) showNoti({ title: '이미 투표하였습니다.' });
      })
      .catch(showAlert)
      .finally(() => {
        setIsVote('recommended');
        setUserVoteFlag('recommended');
        setShowVoteNoti(true);
        if (promiseItem)
          setNotiTest({
            url: `${window.location.origin}/promise/detail?promiseId=${promiseItem._id}`,
            title: '지지 투표되었습니다.',
            content: '지인들에게도 공약을 소개해주세요!',
          });
        setTimeout(() => {
          setShowVoteNoti(false);
        }, 10000);
        setLoading('');
      });
  }, [user, showAlert, showNoti, promiseItem]);

  const handleNotRecommend = useCallback(async () => {
    if (!promiseItem) return;
    setLoading('false');
    if (!user) {
      setLoading('');
      return showNoti({ variant: 'alert', title: '로그인 후 이용해주세요.' });
    }

    await increaseNotRecommendCount(promiseItem._id as string)
      .then(async (status) => {
        if (status === 204) showNoti({ title: '이미 투표하였습니다.' });
      })
      .catch(showAlert)
      .finally(() => {
        setIsVote('notRecommended');
        setUserVoteFlag('notRecommended');
        setShowVoteNoti(true);
        if (promiseItem)
          setNotiTest({
            url: `${window.location.origin}/promise/detail?promiseId=${promiseItem._id}`,
            title: '반대 투표되었습니다.',
            content: '지인들에게도 공약을 소개해주세요!',
          });
        setTimeout(() => {
          setShowVoteNoti(false);
        }, 10000);
        setLoading('');
      });
  }, [user, showAlert, showNoti, promiseItem]);

  if (error)
    return (
      <div className="py-20 text-center text-3xl font-bold">
        <p>
          페이지를 찾을 수 없거나 <br />
          찾는 중 문제가 발생했습니다.
        </p>
      </div>
    );

  if (initialLoading || promiseItem === null || breadcrumbs === null)
    return (
      <div className="px-4 pt-10">
        <section>
          <div className="h-4 w-40 animate-pulse rounded-md bg-gray-300" />
          <div className="mt-2 mb-4 h-10 w-full max-w-md animate-pulse rounded-md bg-gray-300" />
          <div className="mt-4 h-6 w-60 animate-pulse rounded-md bg-gray-300" />
        </section>
        <section className="pt-12">
          <div className="h-6 w-16 animate-pulse rounded-md bg-gray-300" />
          <div className="ml-4">
            <div className="mt-2 mb-4 h-6 w-full max-w-sm animate-pulse rounded-md bg-gray-300" />
            <div className="mt-2 ml-4 mb-4 h-6 w-60 animate-pulse rounded-md bg-gray-300" />
            <div className="mt-2 ml-4 mb-4 h-6 w-52 animate-pulse rounded-md bg-gray-300" />
            <div className="mt-2 mb-4 h-6 w-full max-w-md animate-pulse rounded-md bg-gray-300" />
            <div className="mt-2 mb-4 h-6 w-full max-w-md animate-pulse rounded-md bg-gray-300" />
          </div>
        </section>

        <section className="pt-4 pb-8">
          <div className="h-6 w-16 animate-pulse rounded-md bg-gray-300" />
          <div className="ml-4">
            <div className="mt-2 mb-4 h-6 w-full max-w-sm animate-pulse rounded-md bg-gray-300" />
            <div className="mt-2 mb-4 h-6 w-60 animate-pulse rounded-md bg-gray-300" />
            <div className="mt-2 mb-4 h-6 w-52 animate-pulse rounded-md bg-gray-300" />
            <div className="mt-2 ml-4 mb-4 h-6 w-full max-w-md animate-pulse rounded-md bg-gray-300" />
            <div className="mt-2 ml-4 mb-4 h-6 w-full max-w-md animate-pulse rounded-md bg-gray-300" />
          </div>
        </section>
        <div className="mx-auto flex max-w-md items-center space-x-2 pb-12">
          <div className="flex h-[52px] flex-1 animate-pulse items-center space-x-3 rounded-xl bg-gray-300 py-1.5 px-3 text-gray-100">
            <EmptyCircle />
            <div className="space-y-1">
              <div className="h-[18px] w-10 rounded-sm bg-gray-100" />
              <div className="h-[18px] w-12 rounded-sm bg-gray-100" />
            </div>
          </div>
          <div className="flex h-[52px] flex-1 animate-pulse items-center space-x-3 rounded-xl bg-gray-300 py-1.5 px-3 text-gray-100">
            <XIcon className="h-9 w-9" />
            <div className="space-y-1">
              <div className="h-[18px] w-10 rounded-sm bg-gray-100" />
              <div className="h-[18px] w-12 rounded-sm bg-gray-100" />
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <>
      <NextSeo
        title={`${promiseItem.title}ㅣ오월 십일`}
        openGraph={{
          title: `${promiseItem.title}ㅣ오월 십일`,
        }}
      />
      <div className="bg-gray-100">
        <section className="bg-white px-4 pt-10">
          <div className="flex items-center text-xs font-semibold text-PC-400">
            {breadcrumbs.map((val, idx) => (
              <div key={`breadcrumbs-${idx}`} className="flex items-center">
                {idx !== 0 && <ChevronRightIcon className="h-4 w-4" />}
                <span>{val}</span>
              </div>
            ))}
          </div>
          <p className="pt-2 pb-4 text-3xl font-bold">{promiseItem.title}</p>
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
                'prose-li:my-0 prose-li:py-0 prose-li:text-base prose-li:font-normal prose-li:text-gray-900 prose-li:marker:text-xs prose-li:marker:text-black',
                'prose-ul:my-1',
                'prose-img:w-full',
              )}
              dangerouslySetInnerHTML={{
                __html: markdownToHtml(promiseItem.body),
              }}
            />
          </div>
        </section>
        <div className="sticky inset-x-0 bottom-0 z-[1] border-t border-gray-100 bg-white p-2">
          <div className="mx-auto flex max-w-md items-center space-x-2">
            <button
              onClick={() => {
                const isShowNoti = shareLogic(
                  `${window.location.origin}/promise/detail?promiseId=${promiseItem._id}`,
                );
                if (isShowNoti) showNoti({ title: '공유하기 URL이 복사되었습니다.' });
              }}
              className="mx-2 mt-2 text-xs text-gray-600"
            >
              <ShareIcon className="h-6 w-6" />
              <p>공유</p>
            </button>

            <button
              disabled={Boolean(loading) || Boolean(isVote)}
              onClick={() => {
                if (user) handleRecommend();
                else {
                  setShowModal(true);
                }
              }}
              className={clsx(
                'flex flex-1 items-center space-x-3 rounded-xl py-1.5 px-3 text-sm font-bold',
                { 'animate-pulse': loading === 'true' },
                { 'bg-red-400 text-white': isVote === '' },
                { 'bg-gray-300 text-gray-400': isVote === 'notRecommended' },
                { 'bg-red-600 text-white': isVote === 'recommended' },
              )}
            >
              <EmptyCircle />
              <div className="text-left">
                <p>
                  {(
                    promiseItem.recommendedCount + (userVoteFlag === 'recommended' ? 1 : 0)
                  ).toLocaleString()}
                </p>
                <p>지지해요</p>
              </div>
            </button>
            <button
              disabled={Boolean(loading) || Boolean(isVote)}
              onClick={() => {
                if (user) handleNotRecommend();
                else {
                  setShowModal(true);
                }
              }}
              className={clsx(
                'flex flex-1 items-center space-x-3 rounded-xl py-1.5 px-3 text-sm font-bold',
                { 'animate-pulse': loading === 'false' },
                { 'bg-blue-400 text-white': isVote === '' },
                { 'bg-gray-300 text-gray-400': isVote === 'recommended' },
                { 'bg-blue-600 text-white': isVote === 'notRecommended' },
              )}
            >
              <XIcon className="h-9 w-9" />
              <div className="text-left">
                <p>
                  {(
                    promiseItem.notRecommendedCount + (userVoteFlag === 'notRecommended' ? 1 : 0)
                  ).toLocaleString()}
                </p>
                <p>반대해요</p>
              </div>
            </button>
          </div>
        </div>
        <section>
          <KakaoChannel className="my-4 bg-white" />
        </section>
        <section className="bg-white">
          <div className="overflow-x-hidden py-10 text-center">
            <TagSlider tags={pureTags} />
          </div>
        </section>
        <section>
          <PromiseSections
            booleanPromiseItems={booleanPromiseItems}
            populatePromiseItems={populatePromiseItems}
          />
        </section>
        <LoginModal
          show={showModal}
          close={() => setShowModal(false)}
          action={async () => {
            await handleSignin().finally(() => setShowModal(false));
          }}
        />
      </div>
      <VoteNotification
        {...notiText}
        close={() => {
          setShowVoteNoti(false);
        }}
        show={showVoteNoti}
      />
      <VoteModal
        close={() => {
          setShowVoteModal(false);
          window.localStorage.setItem(localVoteModalFlag, 'false');
        }}
        show={showVoteModal}
      />
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  try {
    const promiseCol = await collection.promise();

    const promiseItems = (await promiseCol
      .find({ deletedAt: null }, { projection: { createdAt: 0, body: 0, deletedAt: 0 } })
      .sort({ viewCount: -1 })
      .toArray()) as PromiseTypeFront[];

    if (promiseItems.length === 0) throw new Error('[getStaticProps]: failed to fetch');

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
      .slice(0, 5);

    const pureTags = removeDuplicatedTags(promiseItems).filter((tag) => tagWhiteList.includes(tag));

    return {
      props: JSON.parse(
        JSON.stringify({
          pureTags,
          populatePromiseItems: promiseItems.slice(0, 5),
          booleanPromiseItems,
        }),
      ),
      revalidate: 120,
    };
  } catch (err) {
    console.log('[promise detail page]', (err as any).message);

    return { props: [], notFound: true };
  }
};
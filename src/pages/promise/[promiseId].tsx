import { ShareIcon, XIcon } from '@heroicons/react/outline';
import { ChevronRightIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { ObjectId } from 'mongodb';
import { NextSeo } from 'next-seo';
import { useCallback, useEffect, useState } from 'react';
import useSWR from 'swr';

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
import type { GetRecommendCount } from '@frontend/lib/count/get-recommend-counts';
import increaseNotRecommendCount from '@frontend/lib/count/increase-not-recommend-count';
import increaseRecommendCount from '@frontend/lib/count/increase-recommend-count';
import { fetcher, swrFetcher } from '@frontend/lib/fetcher';

import buildBreadcrumbs from '@utils/build-breadcrumbs';
import markdownToHtml from '@utils/markdownToHtml';
import { removeDuplicatedTags } from '@utils/remove-duplicated-tags';
import shareLogic from '@utils/share-logic';

import type { GetStaticPaths, GetStaticProps } from 'next';

interface Props {
  breadcrumbs: string[];
  promiseItem: PromiseTypeFront & { body: string };
  pureTags: string[];
  booleanPromiseItems: PromiseTypeFront[];
  populatePromiseItems: PromiseTypeFront[];
}

export default function PromiseDetailPage({
  breadcrumbs,
  promiseItem,
  pureTags,
  booleanPromiseItems,
  populatePromiseItems,
}: Props) {
  // for seperate promise true or false button loading
  const [loading, setLoading] = useState<'true' | 'false' | ''>('');
  const [notiText, setNotiTest] = useState<{ title: string; content: string; url: string }>({
    title: '',
    content: '',
    url: '',
  });
  const [showVoteNoti, setShowVoteNoti] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isVote, setIsVote] = useState<'recommended' | 'notRecommended' | ''>('');
  const [showVoteModal, setShowVoteModal] = useState(false);

  const { data, mutate } = useSWR<GetRecommendCount>(
    `/api/count?promiseId=${promiseItem._id}`,
    swrFetcher,
    {
      refreshInterval: 10000,
      fallbackData: {
        recommendedCount: promiseItem.recommendedCount,
        notRecommendedCount: promiseItem.notRecommendedCount,
      },
    },
  );

  const { user, loading: userLoading, handleSignin } = useUser();

  const { showAlert, showNoti } = useNoti();

  useIncreaseView(promiseItem._id as string);

  useEffect(() => {
    const showVoteModalFlag = window.localStorage.getItem(localVoteModalFlag);

    if (!showVoteModalFlag) {
      setShowVoteModal(true);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetcher(`/api/user/vote-info?promiseId=${promiseItem._id}`)
        .json<{ voteInfo: 'recommended' | 'notRecommended' | '' }>()
        .then(({ voteInfo }) => {
          setIsVote(voteInfo);
        })
        .catch(showAlert)
        .finally(() => {
          setDisableButton(false);
        });
    } else if (!userLoading) {
      setDisableButton(false);
    }
  }, [user, promiseItem._id, userLoading, showAlert]);

  const handleRecommend = useCallback(async () => {
    setLoading('true');
    if (!user) {
      setLoading('');
      return showNoti({ variant: 'alert', title: '로그인 후 이용해주세요.' });
    }

    await increaseRecommendCount(promiseItem._id as string)
      .then(async (status) => {
        if (status === 204) return showNoti({ title: '이미 투표하였습니다.' });
        if (data) {
          await mutate({ ...data, recommendedCount: data.recommendedCount + 1 });
        }
      })
      .catch(showAlert)
      .finally(() => {
        setIsVote('recommended');
        setShowVoteNoti(true);
        setNotiTest({
          url: `${window.location.origin}/promise/${promiseItem._id}`,
          title: '지지 투표되었습니다.',
          content: '지인들에게도 공약을 소개해주세요!',
        });
        setTimeout(() => {
          setShowVoteNoti(false);
        }, 10000);
        setLoading('');
      });
  }, [user, showAlert, mutate, data, showNoti, promiseItem._id]);

  const handleNotRecommend = useCallback(async () => {
    setLoading('false');
    if (!user) {
      setLoading('');
      return showNoti({ variant: 'alert', title: '로그인 후 이용해주세요.' });
    }

    await increaseNotRecommendCount(promiseItem._id as string)
      .then(async (status) => {
        if (status === 204) return showNoti({ title: '이미 투표하였습니다.' });
        if (data) {
          await mutate({ ...data, notRecommendedCount: data.notRecommendedCount + 1 });
        }
      })
      .catch(showAlert)
      .finally(() => {
        setIsVote('notRecommended');
        setShowVoteNoti(true);
        setNotiTest({
          url: `${window.location.origin}/promise/${promiseItem._id}`,
          title: '반대 투표되었습니다.',
          content: '지인들에게도 공약을 소개해주세요!',
        });
        setTimeout(() => {
          setShowVoteNoti(false);
        }, 10000);
        setLoading('');
      });
  }, [user, showAlert, mutate, showNoti, promiseItem._id]);

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
            <div className="flex flex-wrap space-x-1 text-sm font-semibold text-PC-400">
              {promiseItem.tags.map((tag, idx) => (
                <span key={`detail-tag-${tag}-${idx}`}>#{tag}</span>
              ))}
            </div>
          )}
          <div className="pt-10 pb-4">
            <div
              className={clsx(
                'prose prose-lg',
                'prose-hr:hidden',
                'prose-h3:mt-8 prose-h3:text-xl prose-h3:font-bold prose-h3:text-black',
                'prose-p:text-base prose-p:font-normal prose-p:text-gray-900',
                'prose-li:my-0 prose-li:py-0 prose-li:text-base prose-li:font-normal prose-li:text-gray-900',
                'prose-li:marker:text-xs prose-li:marker:text-black prose-li:marker:text-white/0 prose-li:before:mr-2 prose-li:before:content-["📍"]',
                'prose-ul:my-1',
                'prose-custom-li',
                'prose-img:w-full',
              )}
              dangerouslySetInnerHTML={{
                __html: markdownToHtml(promiseItem.body),
              }}
            />
          </div>
        </section>
        <div className="sticky inset-x-0 bottom-0 z-[1] border-t border-gray-200 bg-white p-2">
          <div className="mx-auto flex max-w-md items-center space-x-2">
            <button
              onClick={() => {
                const isShowNoti = shareLogic(
                  `${window.location.origin}/promise/${promiseItem._id}`,
                );
                if (isShowNoti) showNoti({ title: '공유하기 URL이 복사되었습니다.' });
              }}
              className="mx-2 mt-2 text-xs text-gray-600"
            >
              <ShareIcon className="h-6 w-6" />
              <p>공유</p>
            </button>
            {disableButton ? (
              <div className="flex h-[52px] flex-1 animate-pulse items-center space-x-3 rounded-xl bg-gray-300 py-1.5 px-3 text-gray-100">
                <EmptyCircle />
                <div className="space-y-1">
                  <div className="h-[18px] w-10 rounded-sm bg-gray-100" />
                  <div className="h-[18px] w-12 rounded-sm bg-gray-100" />
                </div>
              </div>
            ) : (
              <button
                disabled={Boolean(loading) || disableButton || Boolean(isVote)}
                onClick={() => {
                  if (user) handleRecommend();
                  else {
                    setShowModal(true);
                  }
                }}
                className={clsx(
                  'flex flex-1 items-center space-x-3 rounded-xl py-1.5 px-3 text-sm font-bold',
                  { 'animate-pulse-fast': loading === 'true' },
                  { 'bg-red-400 text-white': isVote === '' },
                  { 'bg-gray-300 text-gray-400': isVote === 'notRecommended' },
                  { 'bg-red-600 text-white': isVote === 'recommended' },
                )}
              >
                <EmptyCircle />
                <div className="text-left">
                  {data?.recommendedCount.toLocaleString() ?? 0}
                  <p>지지해요</p>
                </div>
              </button>
            )}
            {disableButton ? (
              <div className="flex h-[52px] flex-1 animate-pulse items-center space-x-3 rounded-xl bg-gray-300 py-1.5 px-3 text-gray-100">
                <XIcon className="h-9 w-9" />
                <div className="space-y-1">
                  <div className="h-[18px] w-10 rounded-sm bg-gray-100" />
                  <div className="h-[18px] w-12 rounded-sm bg-gray-100" />
                </div>
              </div>
            ) : (
              <button
                disabled={Boolean(loading) || disableButton || Boolean(isVote)}
                onClick={() => {
                  if (user) handleNotRecommend();
                  else {
                    setShowModal(true);
                  }
                }}
                className={clsx(
                  'flex flex-1 items-center space-x-3 rounded-xl py-1.5 px-3 text-sm font-bold',
                  { 'animate-pulse-fast': loading === 'false' },
                  { 'bg-blue-400 text-white': isVote === '' },
                  { 'bg-gray-300 text-gray-400': isVote === 'recommended' },
                  { 'bg-blue-600 text-white': isVote === 'notRecommended' },
                )}
              >
                <XIcon className="h-9 w-9" />
                <div className="text-left">
                  <p>{data?.notRecommendedCount.toLocaleString() ?? 0}</p>
                  <p>반대해요</p>
                </div>
              </button>
            )}
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
          Math.abs(prev.recommendedCount - prev.notRecommendedCount) -
          Math.abs(next.recommendedCount - next.notRecommendedCount)
        );
      })
      .slice(0, 5);

    const pureTags = removeDuplicatedTags(promiseItems).filter((tag) => tagWhiteList.includes(tag));

    return {
      props: JSON.parse(
        JSON.stringify({
          breadcrumbs,
          promiseItem,
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

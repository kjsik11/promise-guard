import { ExclamationCircleIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import type { MyPromiseType, PromiseTypeFront } from '@backend/model/promise';

import DynamicLoading from '@frontend/components/core/DynamicLoading';
import Loading from '@frontend/components/core/Loading';
import PromiseCard from '@frontend/components/custom/promise/PromiseCard';
import { useNoti } from '@frontend/hooks/use-noti';
import useUser from '@frontend/hooks/use-user';
import { fetcher } from '@frontend/lib/fetcher';

export const PageNumber = 10;

export default function MyPromisePage() {
  const [myPromiseItems, setMyPromiseItems] = useState<MyPromiseType | null>(null);
  const [selected, setSelected] = useState<'view' | 'recommended' | 'notRecommended'>('view');
  const [buttonLoading, setButtonLoading] = useState(false);

  const { ref: inViewRef, inView: isInView } = useInView();

  const { showAlert } = useNoti();

  const router = useRouter();
  const { user, loading } = useUser();

  useEffect(() => {
    if (!loading && !user) router.push('/');
  }, [loading, user, router]);

  useEffect(() => {
    if (user) {
      fetcher('/api/user/promise').json<MyPromiseType>().then(setMyPromiseItems);
    }
  }, [user]);

  useEffect(() => {
    if (
      myPromiseItems &&
      myPromiseItems[selected].items.length === 0 &&
      myPromiseItems[selected].count > 0
    ) {
      setButtonLoading(true);
      fetcher(`/api/user/other-promise?variant=${selected}`)
        .json<PromiseTypeFront[]>()
        .then((promiseItems) =>
          setMyPromiseItems((prev) =>
            prev
              ? {
                  ...prev,
                  recommended:
                    selected === 'recommended'
                      ? { ...prev.recommended, items: promiseItems }
                      : prev.recommended,
                  notRecommended:
                    selected === 'notRecommended'
                      ? { ...prev.notRecommended, items: promiseItems }
                      : prev.notRecommended,
                }
              : null,
          ),
        )
        .catch(showAlert)
        .finally(() => setButtonLoading(false));
    }
  }, [selected, myPromiseItems, showAlert]);

  useEffect(() => {
    if (
      isInView &&
      myPromiseItems &&
      myPromiseItems[selected].items.length > 0 &&
      myPromiseItems[selected].count > myPromiseItems[selected].items.length &&
      !buttonLoading
    ) {
      const currentPage = Math.floor(myPromiseItems[selected].items.length / PageNumber);

      setButtonLoading(true);

      fetcher(`/api/user/promise-pagination?variant=${selected}&page=${currentPage}`)
        .json<PromiseTypeFront[]>()
        .then((promiseItems) => {
          setMyPromiseItems((prev) =>
            prev
              ? {
                  view:
                    selected === 'view'
                      ? {
                          ...prev.view,
                          items: [...prev.view.items, ...promiseItems],
                        }
                      : prev.recommended,
                  recommended:
                    selected === 'recommended'
                      ? {
                          ...prev.recommended,
                          items: [...prev.recommended.items, ...promiseItems],
                        }
                      : prev.recommended,
                  notRecommended:
                    selected === 'notRecommended'
                      ? {
                          ...prev.notRecommended,
                          items: [...prev.notRecommended.items, ...promiseItems],
                        }
                      : prev.notRecommended,
                }
              : null,
          );
        })
        .catch(showAlert)
        .finally(() => setButtonLoading(false));
    }
  }, [isInView, myPromiseItems, showAlert, selected, buttonLoading]);

  if (!user || myPromiseItems === null) return <Loading />;

  return (
    <>
      <NextSeo
        title="내 공약ㅣ오월 십일"
        openGraph={{
          title: '내 공약ㅣ오월 십일',
        }}
      />
      <div>
        <p className="px-4 pt-12 text-3xl font-bold text-PC-800">내 공약</p>
        <div className="flex justify-center pt-6 text-sm font-medium text-gray-500">
          <div className="flex items-center space-x-1 rounded bg-gray-100 px-2 py-1">
            <ExclamationCircleIcon className="h-5 w-5 text-gray-400" />
            <p>내가 투표/조회한 공약은 나만 확인할 수 있어요</p>
          </div>
        </div>
        <div className="mt-7 grid grid-cols-3">
          <button
            disabled={buttonLoading}
            onClick={() => setSelected('view')}
            className={clsx('-mb-[2px] border-b-2 pb-3 text-center', {
              'border-PC-600': selected === 'view',
              'border-white': selected !== 'view',
            })}
          >
            <p
              className={clsx('text-2xl font-bold', {
                'text-PC-600': selected === 'view',
                'text-gray-300': selected !== 'view',
              })}
            >
              {myPromiseItems.view.count}
            </p>
            <p
              className={clsx('pt-1 text-sm font-semibold', {
                'text-black': selected === 'view',
                'text-gray-500': selected !== 'view',
              })}
            >
              내가 조회한 공약
            </p>
          </button>
          <button
            disabled={buttonLoading}
            onClick={() => setSelected('recommended')}
            className={clsx('-mb-[2px] border-b-2 pb-3 text-center', {
              'border-PC-600': selected === 'recommended',
              'border-white': selected !== 'recommended',
            })}
          >
            <p
              className={clsx('text-2xl font-bold', {
                'text-PC-600': selected === 'recommended',
                'text-gray-300': selected !== 'recommended',
              })}
            >
              {myPromiseItems.recommended.count}
            </p>
            <p
              className={clsx('pt-1 text-sm font-semibold', {
                'text-black': selected === 'recommended',
                'text-gray-500': selected !== 'recommended',
              })}
            >
              내가 지지한 공약
            </p>
          </button>
          <button
            disabled={buttonLoading}
            onClick={() => setSelected('notRecommended')}
            className={clsx('-mb-[2px] border-b-2 pb-3 text-center', {
              'border-PC-600': selected === 'notRecommended',
              'border-white': selected !== 'notRecommended',
            })}
          >
            <p
              className={clsx('text-2xl font-bold', {
                'text-PC-600': selected === 'notRecommended',
                'text-gray-300': selected !== 'notRecommended',
              })}
            >
              {myPromiseItems.notRecommended.count}
            </p>
            <p
              className={clsx('pt-1 text-sm font-semibold', {
                'text-black': selected === 'notRecommended',
                'text-gray-500': selected !== 'notRecommended',
              })}
            >
              내가 반대한 공약
            </p>
          </button>
        </div>
        <section className="space-y-4 bg-gray-100 p-4">
          {myPromiseItems[selected].items.length
            ? myPromiseItems[selected].items.map((item, idx) => (
                <PromiseCard
                  isView={false}
                  tagPrefix={`my-promise-tags-${idx}`}
                  promiseItem={item}
                  key={`my-promise-${idx}`}
                />
              ))
            : !buttonLoading && (
                <div className="py-60 text-center text-2xl font-bold text-gray-300">
                  {selected === 'view' ? '조회' : selected === 'recommended' ? '지지' : '반대'}한
                  공약이 없습니다.
                </div>
              )}

          {buttonLoading && <DynamicLoading />}
        </section>
        <div ref={inViewRef} />
      </div>
    </>
  );
}

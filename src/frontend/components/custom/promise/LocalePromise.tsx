import clsx from 'clsx';
import NextImage from 'next/image';
import { useEffect, useState } from 'react';

import type { PromiseTypeFront } from '@backend/model/promise';

import DynamicLoading from '@frontend/components/core/DynamicLoading';
import { MarkerCategory } from '@frontend/components/vector';
import { localeImageArr } from '@frontend/define/locale-image-circle';
import { useNoti } from '@frontend/hooks/use-noti';
import { fetcher } from '@frontend/lib/fetcher';

import PromiseCard from './PromiseCard';

interface Props {
  id?: string;
}

export default function LocalePromise({ id }: Props) {
  const [selectedLocaleCategory, setSelectedLocaleCategory] = useState('');
  const [promiseItems, setPromiseItems] = useState<null | PromiseTypeFront[]>(null);
  const [loading, setLoading] = useState(false);

  const { showAlert } = useNoti();

  useEffect(() => {
    if (selectedLocaleCategory) {
      setLoading(true);
      setPromiseItems(null);
      fetcher(`/api/promise/locale?category=${selectedLocaleCategory}`)
        .json<PromiseTypeFront[]>()
        .then(setPromiseItems)
        .catch(showAlert)
        .finally(() => setLoading(false));
    }
  }, [selectedLocaleCategory, showAlert]);

  return (
    <div id={id}>
      <div className="flex space-x-2 px-4">
        <p className="text-3xl font-bold">지역 공약</p>
        <MarkerCategory className="h-8 w-8" />
      </div>

      <div className="mx-auto max-w-sm">
        <div className="scrollbarNone flex space-x-3 overflow-x-scroll pt-6">
          {localeImageArr.slice(0, localeImageArr.length / 2).map((item, idx) => (
            <div className="first:pl-4 last:pr-4" key={`tenpromise-circle-${item.value}-${idx}`}>
              <button
                disabled={loading}
                onClick={() => setSelectedLocaleCategory(item.value)}
                className={clsx(
                  'flex h-[60px] w-[60px] items-center justify-center overflow-hidden rounded-full bg-white transition-colors',
                  {
                    'ring-[2px] ring-PC-400': selectedLocaleCategory === item.value,
                  },
                )}
              >
                <div className="h-10 w-10">
                  <NextImage src={item.image} layout="responsive" placeholder="blur" />
                </div>
              </button>
              <p
                className={clsx('pt-1.5 text-center text-xs font-semibold transition-colors', {
                  'text-PC-400': selectedLocaleCategory === item.value,
                  'text-gray-500': selectedLocaleCategory !== item.value,
                })}
              >
                {item.label.split('\n').map((val, index) => (
                  <span key={`circle-label-${item.value}-${idx}-${index}`}>
                    {val}
                    <br />
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
        <div className="scrollbarNone flex space-x-3 overflow-x-scroll pt-5">
          {localeImageArr.slice(localeImageArr.length / 2).map((item, idx) => (
            <div className="first:pl-4 last:pr-4" key={`tenpromise-circle-${item.value}-${idx}`}>
              <button
                disabled={loading}
                onClick={() => setSelectedLocaleCategory(item.value)}
                className={clsx(
                  'flex h-[60px] w-[60px] items-center justify-center overflow-hidden rounded-full bg-white transition-colors',
                  {
                    'ring-[2px] ring-PC-400': selectedLocaleCategory === item.value,
                  },
                )}
              >
                <div className="h-10 w-10">
                  <NextImage src={item.image} layout="responsive" placeholder="blur" />
                </div>
              </button>
              <p
                className={clsx('pt-1.5 text-center text-xs font-semibold transition-colors', {
                  'text-PC-400': selectedLocaleCategory === item.value,
                  'text-gray-500': selectedLocaleCategory !== item.value,
                })}
              >
                {item.label.split('\n').map((val, index) => (
                  <span key={`circle-label-${item.value}-${idx}-${index}`}>
                    {val}
                    <br />
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* <div className="mx-auto grid max-w-sm grid-cols-5 gap-y-4 gap-x-3 pt-6">
        {localeImageArr.map((item, idx) => (
          <div key={`tenpromise-circle-${item.value}-${idx}`}>
            <button
              disabled={loading}
              onClick={() => setSelectedLocaleCategory(item.value)}
              className={clsx(
                'flex h-[60px] w-[60px] items-center justify-center overflow-hidden rounded-full bg-white transition-colors',
                {
                  'ring-[2px] ring-PC-400': selectedLocaleCategory === item.value,
                },
              )}
            >
              <div className="h-10 w-10">
                <NextImage src={item.image} layout="responsive" placeholder="blur" />
              </div>
            </button>
            <p
              className={clsx('pt-1.5 text-center text-xs font-semibold transition-colors', {
                'text-PC-400': selectedLocaleCategory === item.value,
                'text-gray-500': selectedLocaleCategory !== item.value,
              })}
            >
              {item.label.split('\n').map((val, index) => (
                <span key={`circle-label-${item.value}-${idx}-${index}`}>
                  {val}
                  <br />
                </span>
              ))}
            </p>
          </div>
        ))}
      </div> */}
      <div className="px-4">
        {selectedLocaleCategory &&
          (promiseItems && promiseItems.length > 0 ? (
            <div className="mt-6 space-y-4">
              {promiseItems.map((item, idx) => (
                <PromiseCard
                  tagPrefix={`locale-promise-tag-${idx}`}
                  promiseItem={item}
                  key={`locale-promise-card-${idx}`}
                />
              ))}
            </div>
          ) : (
            <DynamicLoading />
          ))}
      </div>
    </div>
  );
}

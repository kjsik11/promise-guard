import clsx from 'clsx';
import NextImage from 'next/image';
import { useMemo, useState } from 'react';

import type { PromiseTypeFront } from '@backend/model/promise';

import { MarkerCategory } from '@frontend/components/vector';
import { localeImageArr } from '@frontend/define/locale-image-circle';

import PromiseCard from './PromiseCard';

interface Props {
  localePromiseItems: PromiseTypeFront[];
  id?: string;
}

export default function LocalePromise({ id, localePromiseItems }: Props) {
  const [selectedLocaleCategory, setSelectedLocaleCategory] = useState('');

  const filterPromiseItems = useMemo(() => {
    return localePromiseItems.filter(({ categories }) => {
      return categories.includes(selectedLocaleCategory);
    });
  }, [selectedLocaleCategory, localePromiseItems]);

  return (
    <div id={id} className="px-4">
      <div className="flex space-x-2">
        <p className="text-3xl font-bold">지역 공약</p>
        <MarkerCategory className="h-8 w-8" />
      </div>
      <div className="mx-auto grid max-w-sm grid-cols-5 gap-y-4 gap-x-3 pt-6">
        {localeImageArr.map((item, idx) => (
          <div key={`tenpromise-circle-${item.value}-${idx}`}>
            <button
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
      {filterPromiseItems.length > 0 && (
        <ul className="space-y-4 pt-6">
          {filterPromiseItems.map((item, idx) => (
            <PromiseCard
              tagPrefix={`locale-promise-tag-${idx}`}
              promiseItem={item}
              key={`locale-promise-card-${idx}`}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

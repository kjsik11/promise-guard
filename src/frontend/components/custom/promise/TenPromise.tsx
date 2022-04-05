import clsx from 'clsx';
import { useMemo, useState } from 'react';

import type { PromiseTypeFront } from '@backend/model/promise';

import { FlagCategory } from '@frontend/components/vector';
import { tenPromiseArr } from '@frontend/define/ten-promise-arr';

import removeDuplicatedTags from '@utils/remove-duplicated-tags';

import PromiseCard from './PromiseCard';

interface Props {
  tenPromiseItems: PromiseTypeFront[];
  id?: string;
}

export default function TenPromise({ id, tenPromiseItems }: Props) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  const filterPromise = useMemo(() => {
    const tempPromiseItems = tenPromiseItems.filter(({ categories }) => {
      return categories.includes(selectedCategory);
    });

    const pureTags = removeDuplicatedTags(tempPromiseItems);

    return {
      promiseItems: tempPromiseItems,
      pureTags,
    };
  }, [selectedCategory, tenPromiseItems]);

  return (
    <div id={id}>
      <div className="flex space-x-2 px-4">
        <p className="text-3xl font-bold">10대 공약</p>
        <FlagCategory className="h-8 w-8" />
      </div>
      <div className="mx-auto grid max-w-sm grid-cols-5 gap-y-4 gap-x-3 px-4 pt-6">
        {tenPromiseArr.map((item, idx) => (
          <div key={`tenpromise-circle-${item.value}-${idx}`}>
            <button
              onClick={() => setSelectedCategory(item.value)}
              className={clsx('rounded-full bg-white p-2.5 transition-colors', {
                'bg-[#E3F0FF] ring-[2px] ring-PC-400': selectedCategory === item.value,
              })}
            >
              <item.svg className="h-10 w-10" />
            </button>
            <p
              className={clsx('pt-1.5 text-center text-xs font-semibold transition-colors', {
                'text-PC-400': selectedCategory === item.value,
                'text-gray-500': selectedCategory !== item.value,
              })}
            >
              {item.label.split('\n').map((val, index) => (
                <span key={`circle-label-${val}-${idx}-${index}`}>
                  {val}
                  <br />
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>
      {filterPromise && filterPromise.pureTags.length > 0 && (
        <div className="mt-6 flex overflow-auto bg-white py-2">
          {filterPromise.pureTags.map((tag, idx) => (
            <button
              onClick={() => setSelectedTag(tag)}
              className={clsx(
                'rounded-full px-3 py-1.5 text-sm font-semibold transition-colors first:pl-4 last:pr-4',
                {
                  'bg-PC-400 text-white': selectedTag === tag,
                  'text-PC-600': selectedTag !== tag,
                },
              )}
              key={`puretags-${tag}-${idx}`}
            >
              {'Hello'}
            </button>
          ))}
        </div>
      )}
      {filterPromise && filterPromise.promiseItems.length > 0 && (
        <div className="mt-6 space-y-4 px-4">
          {filterPromise.promiseItems.map((item, idx) => (
            <PromiseCard
              tagPrefix={`locale-promise-tag-${idx}`}
              promiseItem={item}
              key={`locale-promise-card-${idx}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

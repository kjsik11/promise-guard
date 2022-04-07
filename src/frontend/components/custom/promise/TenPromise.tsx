import clsx from 'clsx';
import { useEffect, useState } from 'react';

import type { PromiseTypeFront } from '@backend/model/promise';

import DynamicLoading from '@frontend/components/core/DynamicLoading';
import { FlagCategory } from '@frontend/components/vector';
import { tenPromiseArr } from '@frontend/define/ten-promise-arr';
import { useNoti } from '@frontend/hooks/use-noti';
import { fetcher } from '@frontend/lib/fetcher';

import removeDuplicatedTags from '@utils/remove-duplicated-tags';

import PromiseCard from './PromiseCard';

interface Props {
  id?: string;
}

export default function TenPromise({ id }: Props) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [promiseItems, setPromiseItems] = useState<null | PromiseTypeFront[]>(null);
  const [promiseTags, setPromiseTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const { showAlert } = useNoti();

  // const filterPromise = useMemo(() => {
  //   const tempPromiseItems = tenPromiseItems.filter(({ categories }) => {
  //     return categories.includes(selectedCategory);
  //   });

  //   const pureTags = removeDuplicatedTags(tempPromiseItems);

  //   return {
  //     promiseItems: tempPromiseItems,
  //     pureTags,
  //   };
  // }, [selectedCategory, tenPromiseItems]);

  useEffect(() => {
    if (selectedCategory) {
      setLoading(true);
      setPromiseItems(null);
      fetcher(`/api/promise/ten?category=${selectedCategory}`)
        .json<PromiseTypeFront[]>()
        .then((tenPromiseList) => {
          setPromiseItems(tenPromiseList);
          setPromiseTags(removeDuplicatedTags(tenPromiseList));
        })
        .catch(showAlert)
        .finally(() => setLoading(false));
    }
  }, [selectedCategory, showAlert]);

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
              disabled={loading}
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
      {/* {promiseItems && promiseTags.length > 0 ? (
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
      ) : (
        <DynamicLoading />
      )} */}
      {selectedCategory &&
        (promiseItems && promiseItems.length > 0 ? (
          <div className="mt-6 space-y-4 px-4">
            {promiseItems.map((item, idx) => (
              <PromiseCard
                tagPrefix={`ten-promise-tag-${idx}`}
                promiseItem={item}
                key={`ten-promise-card-${idx}`}
              />
            ))}
          </div>
        ) : (
          <DynamicLoading />
        ))}
    </div>
  );
}

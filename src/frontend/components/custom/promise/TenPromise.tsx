import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';

import type { PromiseTypeFront } from '@backend/model/promise';

import DynamicLoading from '@frontend/components/core/DynamicLoading';
import { FlagCategory } from '@frontend/components/vector';
import { recentCategoryKey } from '@frontend/define/session-key';
import { tenPromiseArr, tenPromiseTags } from '@frontend/define/ten-promise-arr';
import { useNoti } from '@frontend/hooks/use-noti';
import { fetcher } from '@frontend/lib/fetcher';

import { removeDuplicatedCategoris } from '@utils/remove-duplicated-tags';

import PromiseCard from './PromiseCard';

interface Props {
  id?: string;
  viewArray: string[];
}

export default function TenPromise({ id, viewArray }: Props) {
  const [selectedPureCategory, setSelectedPureCategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [promiseItems, setPromiseItems] = useState<null | PromiseTypeFront[]>(null);
  const [pureCategories, setPureCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const { showAlert } = useNoti();

  const renderedPromiseItem = useMemo<null | PromiseTypeFront[]>(() => {
    if (!promiseItems) return null;
    else if (selectedPureCategory)
      return promiseItems.filter(({ categories }) => categories[1] === selectedPureCategory);
    return promiseItems;
  }, [selectedPureCategory, promiseItems]);

  useEffect(() => {
    const sessionCategory = window.sessionStorage.getItem(recentCategoryKey);

    if (
      sessionCategory &&
      typeof sessionCategory === 'string' &&
      tenPromiseTags.includes(sessionCategory)
    ) {
      setSelectedCategory(sessionCategory);
      setLoading(true);
      fetcher(`/api/promise/ten?category=${sessionCategory}`)
        .json<PromiseTypeFront[]>()
        .then((tenPromiseList) => {
          setPromiseItems(tenPromiseList);
          const myPureCategories = removeDuplicatedCategoris(tenPromiseList);
          setPureCategories(myPureCategories);
          setSelectedPureCategory(myPureCategories[0]);
        })
        .catch(showAlert)
        .finally(() => setLoading(false));
    }
  }, [showAlert]);

  useEffect(() => {
    if (selectedCategory) {
      window.sessionStorage.setItem(recentCategoryKey, selectedCategory);
      setLoading(true);
      setPromiseItems(null);
      setPureCategories([]);
      setSelectedPureCategory('');

      fetcher(`/api/promise/ten?category=${selectedCategory}`)
        .json<PromiseTypeFront[]>()
        .then((tenPromiseList) => {
          setPromiseItems(tenPromiseList);
          const myPureCategories = removeDuplicatedCategoris(tenPromiseList);
          setPureCategories(myPureCategories);
          setSelectedPureCategory(myPureCategories[0]);
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
              aria-label={`${item.label}-circle-button`}
              disabled={loading}
              onClick={() => setSelectedCategory(item.value)}
              className={clsx('rounded-full bg-white p-2.5 text-PC-400 transition-colors', {
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
      {selectedCategory && pureCategories.length > 0 && (
        <div className="scrollbarNone my-6 flex items-center overflow-x-auto bg-white py-2 px-4">
          {pureCategories.map((category, idx) => (
            <button
              onClick={() => setSelectedPureCategory(category)}
              className={clsx(
                'shrink-0 rounded-full py-1.5 px-3 text-sm font-semibold transition-colors',
                {
                  'text-PC-600': selectedPureCategory !== category,
                  'bg-PC-400 text-white': selectedPureCategory === category,
                },
              )}
              key={`pure-${category}-${idx}`}
            >
              {category}
            </button>
          ))}
        </div>
      )}
      {selectedCategory &&
        (renderedPromiseItem && renderedPromiseItem.length > 0 ? (
          <div className="space-y-4 px-4">
            {renderedPromiseItem.map((item, idx) => (
              <PromiseCard
                isView={viewArray.includes(item._id as string)}
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

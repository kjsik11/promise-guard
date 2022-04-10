import { EyeIcon, ThumbDownIcon, ThumbUpIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import Link from 'next/link';

import type { PromiseTypeFront } from '@backend/model/promise';

import compressCategoryText from '@utils/compress-category-text';

interface Props {
  promiseItem: PromiseTypeFront;
  tagPrefix: string;
  isView: boolean;
}

export default function BooleanPromiseCard({ promiseItem, isView, tagPrefix }: Props) {
  return (
    <Link href={`/promise/detail?promiseId=${promiseItem._id}`}>
      <a className="relative block rounded-lg bg-white py-3 px-2">
        <div className="space-x-[6px] text-sm font-semibold text-PC-600">
          {promiseItem.tags.map((tag, index) => (
            <span key={`boolean-promise-${tagPrefix}-${index}`}>#{tag}</span>
          ))}
        </div>
        <p className={clsx('mr-8 pt-1 font-bold line-clamp-1', { 'text-gray-400': isView })}>
          {promiseItem.title}
        </p>
        <div className="flex justify-between pt-3">
          <p className="text-xs font-semibold text-PC-400">
            {compressCategoryText(promiseItem.categories[0])}
          </p>
          <div className="flex items-center space-x-2 text-xs font-medium">
            <EyeIcon className="h-3 w-3 text-gray-400" />
            <span className="text-gray-500">{promiseItem.viewCount.toLocaleString()}</span>
          </div>
        </div>
        <div className="mt-1 mb-0.5 flex h-[5px] space-x-[1px]">
          <div
            className="bg-red-400"
            style={{
              width: `${
                promiseItem.notRecommendedCount + promiseItem.recommendedCount === 0
                  ? 50
                  : Math.round(
                      100 *
                        (promiseItem.recommendedCount /
                          (promiseItem.notRecommendedCount + promiseItem.recommendedCount)),
                    )
              }%`,
            }}
          />
          <div
            style={{
              width: `${
                promiseItem.notRecommendedCount + promiseItem.recommendedCount === 0
                  ? 50
                  : 100 -
                    Math.round(
                      100 *
                        (promiseItem.recommendedCount /
                          (promiseItem.notRecommendedCount + promiseItem.recommendedCount)),
                    )
              }%`,
            }}
            className="bg-blue-400"
          />
        </div>
        <div className="flex items-center justify-between space-x-3 text-xs font-medium text-gray-500">
          <div className="flex items-center space-x-2">
            <ThumbUpIcon className="h-3 w-3 text-red-400" />
            <span>{promiseItem.recommendedCount.toLocaleString()}</span>
          </div>
          <div className="flex items-center space-x-2">
            <ThumbDownIcon className="h-3 w-3 text-blue-400" />
            <span>{promiseItem.notRecommendedCount.toLocaleString()}</span>
          </div>
        </div>
      </a>
    </Link>
  );
}

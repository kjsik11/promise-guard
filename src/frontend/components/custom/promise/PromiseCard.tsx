import { EyeIcon, ThumbDownIcon, ThumbUpIcon } from '@heroicons/react/solid';
import Link from 'next/link';

import type { PromiseTypeFront } from '@backend/model/promise';

import { PopulateFlag } from '@frontend/components/vector';

interface Props {
  promiseItem: PromiseTypeFront;
  tagPrefix: string;
  isFlag?: {
    label: string;
    color: string;
  } | null;
}

export default function PromiseCard({ promiseItem, tagPrefix, isFlag }: Props) {
  return (
    <Link passHref href={`/promise/${promiseItem._id}`}>
      <a className="relative block rounded-lg bg-white py-3 px-2">
        <div className="space-x-[3px] text-sm font-semibold text-PC-600">
          {promiseItem.tags.map((tag, idx) => (
            <span key={`${tagPrefix}-${tag}-${idx}`}>#{tag}</span>
          ))}
        </div>
        <p className="mr-8 pt-2 font-bold line-clamp-1">{promiseItem.title}</p>
        <div className="flex justify-between pt-3">
          <p className="text-xs font-semibold text-PC-400">{promiseItem.categories[0]}</p>
          <div className="flex items-center space-x-3 text-xs font-medium text-gray-500">
            <div className="flex items-center space-x-2">
              <ThumbUpIcon className="h-3 w-3 text-red-400" />
              <span>{promiseItem.recommendedCount.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <ThumbDownIcon className="h-3 w-3 text-blue-400" />
              <span>{promiseItem.notRecommendedCount.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <EyeIcon className="h-3 w-3" />
              <span>{promiseItem.viewCount.toLocaleString()}</span>
            </div>
          </div>
        </div>
        {isFlag && (
          <div className="absolute -top-2 right-2">
            <PopulateFlag flagColor={isFlag.color} />
            <p className="absolute left-1/2 top-1/2 -translate-x-[5px] -translate-y-[12px] text-sm font-bold text-white">
              {isFlag.label}
            </p>
          </div>
        )}
      </a>
    </Link>
  );
}

import { EyeIcon, ThumbDownIcon, ThumbUpIcon } from '@heroicons/react/solid';
import Link from 'next/link';

import type { PromiseTypeFront } from '@backend/model/promise';

import { FireCategory } from '@frontend/components/vector';

interface Props {
  booleanPromiseItems: PromiseTypeFront[];
  id?: string;
}

export default function BooleanPromise({ id, booleanPromiseItems }: Props) {
  return (
    <div id={id} className="px-4">
      <div className="flex justify-between">
        <div className="flex items-center space-x-2">
          <p className="text-3xl font-bold">찬반 공약</p>
          <FireCategory className="h-8 w-8" />
        </div>
        <Link href="#">
          <a className="self-end text-sm font-semibold text-PC-400">더보기</a>
        </Link>
      </div>
      <ul className="space-y-4 pt-6">
        {booleanPromiseItems.map((item, idx) => (
          <li
            className="relative rounded-lg bg-white py-3 px-2"
            key={`populate-promise-card-${idx}`}
          >
            <div className="space-x-[3px] text-sm font-semibold text-PC-600">
              {item.tags.map((tag, index) => (
                <span key={`boolean-promise-${tag}-${idx}-${index}`}>#{tag}</span>
              ))}
            </div>
            <p className="mr-8 pt-2 font-bold line-clamp-1">{item.title}</p>
            <div className="flex justify-between pt-3">
              <p className="text-xs font-semibold text-PC-400">정부혁신</p>
              <div className="flex items-center space-x-2 text-xs font-medium">
                <EyeIcon className="h-3 w-3 text-gray-400" />
                <span className="text-gray-500">{item.viewCount.toLocaleString()}</span>
              </div>
            </div>
            <div className="mt-1 mb-0.5 flex h-[5px] space-x-[1px]">
              <div className="w-1/2 bg-red-400" />
              <div className="w-1/2 bg-blue-400" />
            </div>
            <div className="flex items-center justify-between space-x-3 text-xs font-medium text-gray-500">
              <div className="flex items-center space-x-2">
                <ThumbUpIcon className="h-3 w-3 text-red-400" />
                <span>{item.recommendedCount.toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <ThumbDownIcon className="h-3 w-3 text-blue-400" />
                <span>{item.nonRecommendedCount.toLocaleString()}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

import Link from 'next/link';

import { StarCategory } from '@frontend/components/vector';

import PromiseCard from './PromiseCard';
import type { PromiseProps } from './PromiseSections';

const flagColors = ['#082E59', '#285A92', '#6A99CD', '#D1D5DB', '#D1D5DB'];

export default function PopulatePromise({ promiseItems }: PromiseProps) {
  return (
    <div className="px-4">
      <div className="flex justify-between">
        <div className="flex items-center space-x-2">
          <p className="text-3xl font-bold">인기 공약</p>
          <StarCategory className="h-8 w-8" />
        </div>
        <Link href="#">
          <a className="self-end text-sm font-semibold text-PC-400">더보기</a>
        </Link>
      </div>
      <ul className="space-y-4 pt-6">
        {promiseItems.map((item, idx) => (
          <PromiseCard
            isFlag={{ color: flagColors[idx], label: String(idx + 1) }}
            tagPrefix={`populatecard-tag-${idx}`}
            promiseItem={item}
            key={`populate-promise-card-${idx}`}
          />
        ))}
      </ul>
    </div>
  );
}

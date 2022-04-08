import clsx from 'clsx';
import Link from 'next/link';

import type { PromiseTypeFront } from '@backend/model/promise';

import { StarCategory } from '@frontend/components/vector';

import PromiseCard from './PromiseCard';

const flagColors = ['#082E59', '#285A92', '#6A99CD', '#D1D5DB', '#D1D5DB'];

interface Props {
  populateItems: PromiseTypeFront[];
  isDetailPage?: boolean;
  id?: string;
}

export default function PopulatePromise({ id, populateItems, isDetailPage = false }: Props) {
  return (
    <div id={id} className={clsx({ 'px-4': !isDetailPage })}>
      <div className="flex justify-between">
        <div className={clsx('flex items-center space-x-2', { 'px-4': isDetailPage })}>
          <p className="text-3xl font-bold">인기 공약</p>
          <StarCategory className="h-8 w-8" />
        </div>
        {!isDetailPage && (
          <Link href="/populate">
            <a className="self-end text-sm font-semibold text-PC-400">더보기</a>
          </Link>
        )}
      </div>
      <div className={clsx('space-y-4 pt-6', { 'mt-4 bg-gray-50 px-4 pb-4': isDetailPage })}>
        {populateItems.map((item, idx) => (
          <PromiseCard
            isFlag={{ color: flagColors[idx], label: String(idx + 1) }}
            tagPrefix={`populatecard-tag-${idx}`}
            promiseItem={item}
            key={`populate-promise-card-${idx}`}
          />
        ))}
      </div>
    </div>
  );
}

import clsx from 'clsx';
import Link from 'next/link';

import type { PromiseTypeFront } from '@backend/model/promise';

import { FireCategory } from '@frontend/components/vector';
import useUser from '@frontend/hooks/use-user';

import BooleanPromiseCard from './BooleanPromiseCard';

interface Props {
  booleanPromiseItems: PromiseTypeFront[];
  isDetailPage?: boolean;
  id?: string;
}

export default function BooleanPromise({ id, isDetailPage, booleanPromiseItems }: Props) {
  const { viewArray } = useUser();

  return (
    <div id={id} className={clsx({ 'px-4': !isDetailPage })}>
      <div className="flex justify-between">
        <div className={clsx('flex items-center space-x-2', { 'px-4': isDetailPage })}>
          <p className="text-3xl font-bold">찬반 공약</p>
          <FireCategory className="h-8 w-8" />
        </div>
        {isDetailPage ? (
          <div></div>
        ) : (
          <Link href="/pros-and-cons">
            <a className="self-end text-sm font-semibold text-PC-400">더보기</a>
          </Link>
        )}
      </div>
      <div className={clsx('space-y-4 pt-6', { 'mt-4 bg-gray-100 px-4 pb-4': isDetailPage })}>
        {booleanPromiseItems.map((item, idx) => (
          <BooleanPromiseCard
            isView={viewArray.includes(item._id as string)}
            promiseItem={item}
            tagPrefix={`boolean-tag-${idx}`}
            key={`populate-promise-card-${idx}`}
          />
        ))}
      </div>
    </div>
  );
}

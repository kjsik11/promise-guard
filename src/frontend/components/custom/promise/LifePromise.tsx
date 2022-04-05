import { HeartIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';

import { DrinkCategory } from '@frontend/components/vector';

import type { PromiseProps } from './PromiseSections';

export default function LifePromise({ promiseItems }: PromiseProps) {
  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <div className="px-4">
      <div className="flex justify-between">
        <div className="flex items-center space-x-2">
          <p className="text-3xl font-bold">생활 공약</p>
          <DrinkCategory className="h-8 w-8" />
        </div>
        <Link href="#">
          <a className="self-end text-sm font-semibold text-PC-400">더보기</a>
        </Link>
      </div>
      <div className="mx-auto flex max-w-sm space-x-2 pt-6">
        <button
          onClick={() => setSelectedCategory('59-shorts')}
          className={clsx('flex items-center space-x-2 rounded-lg bg-white p-2 transition-colors', {
            'bg-[#E3F0FF] ring-[2px] ring-PC-400': selectedCategory === '59-shorts',
            'bg-white': selectedCategory !== '59-shorts',
          })}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.832 30.2734C15.2891 30.2734 18.3242 27.416 18.3242 23.4102C18.3242 19.6094 15.6172 16.8887 11.9805 16.9023C10.2441 16.8887 8.74023 17.5996 8.01562 18.5703H7.85156L8.39844 13.5664H17.2031V10.2031H5.00781L3.94141 21.6055H7.66016C8.24805 20.498 9.28711 19.9375 10.7773 19.9375C12.8555 19.9512 14.3457 21.4141 14.332 23.5195C14.3457 25.584 12.8828 27.0332 10.832 27.0195C9.10938 27.0332 7.70117 25.9668 7.60547 24.4219H3.61328C3.68164 27.8398 6.70312 30.2734 10.832 30.2734ZM28.332 9.92969C23.8613 9.91602 20.8398 12.8145 20.8398 16.793C20.8672 20.4844 23.4922 23.1641 27.0469 23.1641C29.248 23.1641 31.2031 22.125 32.1328 20.375H32.2969C32.2832 24.3262 30.8613 26.7461 28.168 26.7461C26.582 26.7461 25.4473 25.8848 25.1055 24.4219H21.0586C21.4551 27.7715 24.1895 30.2734 28.168 30.2734C33.1445 30.2734 36.3301 26.3086 36.3164 19.582C36.3164 12.3906 32.4336 9.94336 28.332 9.92969ZM24.8594 16.6836C24.832 14.7148 26.3359 13.1699 28.3594 13.1562C30.3828 13.1699 31.8594 14.7695 31.8867 16.6562C31.8867 18.5566 30.3418 20.1562 28.332 20.1562C26.2949 20.1562 24.8594 18.6387 24.8594 16.6836Z"
              fill="#6A99CD"
            />
          </svg>
          <div className="space-y-0.5 pr-7">
            <p className="text-left font-bold">59초 쇼츠</p>
            <p className="text-gray-00 text-sm font-medium">좋아 빠르게 가!</p>
          </div>
        </button>
        <button
          onClick={() => setSelectedCategory('heart-break')}
          className={clsx('flex items-center space-x-2 rounded-lg bg-white p-2 transition-colors', {
            'bg-[#E3F0FF] ring-[2px] ring-PC-400': selectedCategory === 'heart-break',
            'bg-white': selectedCategory !== 'heart-break',
          })}
        >
          <HeartIcon className="h-10 w-10 text-PC-400" />
          <div className="space-y-0.5 pr-7">
            <p className="text-left font-bold">심쿵약속</p>
            <p className="text-gray-00 text-sm font-medium">나를 위한 생활정책</p>
          </div>
        </button>
      </div>
    </div>
  );
}

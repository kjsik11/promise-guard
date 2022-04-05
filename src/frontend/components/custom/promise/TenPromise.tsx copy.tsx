import clsx from 'clsx';
import { useState } from 'react';

import { FlagCategory } from '@frontend/components/vector';
import { tenPromiseArr } from '@frontend/define/ten-promise-arr';

import type { PromiseProps } from './PromiseSections';

export default function TenPromise({ promiseItems }: PromiseProps) {
  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <div className="px-4">
      <div className="flex space-x-2">
        <p className="text-3xl font-bold">10대 공약</p>
        <FlagCategory className="h-8 w-8" />
      </div>
      <div className="mx-auto grid max-w-sm grid-cols-5 gap-y-4 gap-x-3 pt-6">
        {tenPromiseArr.map((item, idx) => (
          <div key={`tenpromise-circle-${item.label}-${idx}`}>
            <button
              onClick={() => setSelectedCategory(item.label)}
              className={clsx('rounded-full bg-white p-2.5 transition-colors', {
                'bg-[#E3F0FF] ring-[2px] ring-PC-400': selectedCategory === item.label,
              })}
            >
              <item.svg className="h-10 w-10" />
            </button>
            <p
              className={clsx('pt-1.5 text-center text-xs font-semibold transition-colors', {
                'text-PC-400': selectedCategory === item.label,
                'text-gray-500': selectedCategory !== item.label,
              })}
            >
              {item.label.split('\n').map((val, index) => (
                <span key={`circle-label-${item.label}-${idx}-${index}`}>
                  {val}
                  <br />
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

import type { PromiseTypeFront } from '@backend/model/promise';

import BooleanPromise from './BooleanPromise.tsx copy';
import LocalePromise from './LocalePromise';
import PopulatePromise from './PopulatePromise.tsx';
import TenPromise from './TenPromise.tsx copy';

export interface PromiseProps {
  promiseItems: PromiseTypeFront[];
}

export default function PromiseSections({ promiseItems }: PromiseProps) {
  return (
    <div className="space-y-16 bg-gray-100 py-12">
      <PopulatePromise promiseItems={promiseItems.slice(0, 5)} />
      <BooleanPromise promiseItems={promiseItems.slice(0, 5)} />
      <TenPromise promiseItems={promiseItems.slice(0, 5)} />
      <LocalePromise promiseItems={promiseItems.slice(0, 5)} />
    </div>
  );
}

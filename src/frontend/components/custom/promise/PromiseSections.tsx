import type { PromiseTypeFront } from '@backend/model/promise';

import PopulatePromise from './PopulatePromise.tsx';

export interface PromiseProps {
  promiseItems: PromiseTypeFront[];
}

export default function PromiseSections({ promiseItems }: PromiseProps) {
  return (
    <div className="bg-gray-100 py-12">
      <PopulatePromise promiseItems={promiseItems.slice(0, 5)} />
    </div>
  );
}

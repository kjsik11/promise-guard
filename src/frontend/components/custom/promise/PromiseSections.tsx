import type { PromiseTypeFront } from '@backend/model/promise';

import {
  booleanSectionId,
  lifeSectionId,
  localeSectionId,
  populateSectionId,
  tenSectionId,
} from '@frontend/define/promise-section-ids';

import BooleanPromise from './BooleanPromise';
import LifePromise from './LifePromise';
import LocalePromise from './LocalePromise';
import PopulatePromise from './PopulatePromise.tsx';
import TenPromise from './TenPromise';

export interface PromiseProps {
  promiseItems: PromiseTypeFront[];
  booleanPromiseItems: PromiseTypeFront[];
  localePromiseItems: PromiseTypeFront[];
  tenPromiseItems: PromiseTypeFront[];
  lifePromiseItems: PromiseTypeFront[];
}

export default function PromiseSections({
  localePromiseItems,
  booleanPromiseItems,
  tenPromiseItems,
  lifePromiseItems,
  promiseItems,
}: PromiseProps) {
  return (
    <div className="space-y-16 bg-gray-100 py-12">
      <PopulatePromise id={populateSectionId} promiseItems={promiseItems.slice(0, 5)} />
      <BooleanPromise id={booleanSectionId} booleanPromiseItems={booleanPromiseItems} />
      <TenPromise id={tenSectionId} tenPromiseItems={tenPromiseItems} />
      <LocalePromise id={localeSectionId} localePromiseItems={localePromiseItems} />
      <LifePromise id={lifeSectionId} lifePromiseItems={lifePromiseItems} />
    </div>
  );
}

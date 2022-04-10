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
  populatePromiseItems: PromiseTypeFront[];
  booleanPromiseItems: PromiseTypeFront[];
}

export default function PromiseSections({
  populatePromiseItems,
  booleanPromiseItems,
}: PromiseProps) {
  return (
    <div className="space-y-16 bg-gray-100 py-12">
      <PopulatePromise id={populateSectionId} populateItems={populatePromiseItems} />
      <BooleanPromise id={booleanSectionId} booleanPromiseItems={booleanPromiseItems} />
      <TenPromise id={tenSectionId} />
      <LocalePromise id={localeSectionId} />
      <LifePromise id={lifeSectionId} />
    </div>
  );
}

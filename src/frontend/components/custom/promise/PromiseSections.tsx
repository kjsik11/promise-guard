import type { PromiseTypeFront } from '@backend/model/promise';

import {
  booleanSectionId,
  lifeSectionId,
  localeSectionId,
  populateSectionId,
  tenSectionId,
} from '@frontend/define/promise-section-ids';
import useUser from '@frontend/hooks/use-user';

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
  const { viewArray } = useUser();

  return (
    <div className="space-y-16 bg-gray-100 py-12">
      <PopulatePromise
        viewArray={viewArray}
        id={populateSectionId}
        populateItems={populatePromiseItems}
      />
      <BooleanPromise
        viewArray={viewArray}
        id={booleanSectionId}
        booleanPromiseItems={booleanPromiseItems}
      />
      <TenPromise viewArray={viewArray} id={tenSectionId} />
      <LocalePromise viewArray={viewArray} id={localeSectionId} />
      <LifePromise viewArray={viewArray} id={lifeSectionId} />
    </div>
  );
}

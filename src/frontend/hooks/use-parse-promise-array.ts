import { useEffect, useState } from 'react';

import type { PromiseTypeFront } from '@backend/model/promise';

import { lifePromiseTags } from '@frontend/define/life-promise';
import { localeTags } from '@frontend/define/locale-image-circle';
import { tenPromiseTags } from '@frontend/define/ten-promise-arr';

export default function useParsePromiseArray(promiseItems: PromiseTypeFront[]) {
  const [booleanPromiseItems, setBooleanPromiseItems] = useState<PromiseTypeFront[]>([]);
  const [localePromiseItems, setLocalePromiseItems] = useState<PromiseTypeFront[]>([]);
  const [tenPromiseItems, setTenPromiseItems] = useState<PromiseTypeFront[]>([]);
  const [lifePromiseItems, setLifePromiseItems] = useState<PromiseTypeFront[]>([]);

  useEffect(() => {
    // filter boolean promise items
    setBooleanPromiseItems(
      promiseItems
        .sort(
          (
            { recommendedCount: prevRec, notRecommendedCount: prevNrec },
            { recommendedCount: nextRec, notRecommendedCount: nextNRec },
          ) => nextRec - nextNRec - (prevRec - prevNrec),
        )
        .slice(0, 5),
    );

    // filter local promise items
    setLocalePromiseItems(
      promiseItems.filter(({ categories }) => {
        let filterFlag = false;
        categories.forEach((category) => {
          if (localeTags.includes(category)) filterFlag = true;
        });
        return filterFlag;
      }),
    );

    // filter ten promise items
    setTenPromiseItems(
      promiseItems.filter(({ categories }) => {
        let filterFlag = false;
        categories.forEach((category) => {
          if (tenPromiseTags.includes(category)) filterFlag = true;
        });
        return filterFlag;
      }),
    );

    // filter life promise items
    setLifePromiseItems(
      promiseItems.filter(({ categories }) => {
        let filterFlag = false;
        categories.forEach((category) => {
          if (lifePromiseTags.includes(category)) filterFlag = true;
        });
        return filterFlag;
      }),
    );
  }, [promiseItems]);

  return {
    booleanPromiseItems,
    localePromiseItems,
    lifePromiseItems,
    tenPromiseItems,
  };
}

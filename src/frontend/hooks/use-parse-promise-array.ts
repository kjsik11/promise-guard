import { useMemo } from 'react';

import type { PromiseTypeFront } from '@backend/model/promise';

import { lifePromiseTags } from '@frontend/define/life-promise';
import { localeTags } from '@frontend/define/locale-image-circle';
import { tenPromiseTags } from '@frontend/define/ten-promise-arr';

export default function useParsePromiseArray(promiseItems: PromiseTypeFront[]) {
  // filter boolean promise items
  const booleanPromiseItems = useMemo(
    () =>
      promiseItems
        .slice()
        .sort(
          (
            { recommendedCount: prevRec, notRecommendedCount: prevNrec },
            { recommendedCount: nextRec, notRecommendedCount: nextNRec },
          ) => prevRec - prevNrec - (nextRec - nextNRec),
        )
        .slice(0, 5),
    [promiseItems],
  );

  // filter local promise items

  //TODO: Apply new logic
  const localePromiseItems = useMemo(
    () =>
      promiseItems.slice().filter(({ categories }) => {
        let filterFlag = false;
        categories.forEach((category) => {
          if (localeTags.includes(category)) filterFlag = true;
        });
        return filterFlag;
      }),
    [promiseItems],
  );

  // filter ten promise items
  const tenPromiseItems = useMemo(
    () =>
      promiseItems.slice().filter(({ categories }) => {
        let filterFlag = false;
        categories.forEach((category) => {
          if (tenPromiseTags.includes(category)) filterFlag = true;
        });
        return filterFlag;
      }),
    [promiseItems],
  );

  // filter life promise items
  const lifePromiseItems = useMemo(
    () =>
      promiseItems.slice().filter(({ categories }) => {
        let filterFlag = false;
        categories.forEach((category) => {
          if (lifePromiseTags.includes(category)) filterFlag = true;
        });
        return filterFlag;
      }),
    [promiseItems],
  );

  return {
    booleanPromiseItems,
    localePromiseItems,
    lifePromiseItems,
    tenPromiseItems,
  };
}

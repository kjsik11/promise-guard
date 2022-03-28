import type { PromiseTypeBSON } from '@backend/model/promise';

import { fetcher } from '@frontend/lib/fetcher';

export default async function getPromiseList() {
  const promiseList = await fetcher('/api/promise').json<PromiseTypeBSON[]>();

  return promiseList;
}

import type { PromiseType } from '@backend/model/promise';

import { fetcher } from '@frontend/lib/fetcher';

export default async function updatePromise(_id: string, promiseInput: PromiseType) {
  await fetcher.put(`/api/promise/${_id}`, { json: promiseInput });
}

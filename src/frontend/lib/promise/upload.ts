import type { PromiseType } from '@backend/model/promise';

import { fetcher } from '@frontend/lib/fetcher';

export default async function uploadPromise(promiseInput: PromiseType) {
  await fetcher.post('/api/promise', { json: promiseInput });
}

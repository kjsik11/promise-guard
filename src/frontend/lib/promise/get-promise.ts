import type { PromiseType } from '@backend/model/promise';

import { fetcher } from '@frontend/lib/fetcher';

export default async function getPromise(id: string) {
  return await fetcher(`/api/promise/${id}`).json<PromiseType>();
}

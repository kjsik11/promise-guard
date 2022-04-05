import type { PromiseTypeBSON } from '@backend/model/promise';

import { fetcher } from '@frontend/lib/fetcher';

export type GetRecommendCount = Pick<PromiseTypeBSON, 'notRecommendedCount' | 'recommendedCount'>;

export default async function getRecommendCounts(promiseId: string) {
  return await fetcher(`/api/count?promiseId=${promiseId}`).json<GetRecommendCount>();
}

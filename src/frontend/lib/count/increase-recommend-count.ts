import { fetcher } from '@frontend/lib/fetcher';

export default async function increaseRecommendCount(promiseId: string) {
  await fetcher.post(`/api/count/recommend`, { json: { promiseId } });
}

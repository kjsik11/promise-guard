import { fetcher } from '@frontend/lib/fetcher';

export default async function increaseRecommendCount(promiseId: string) {
  const { status } = await fetcher.post(`/api/count/recommend`, { json: { promiseId } });

  return status;
}

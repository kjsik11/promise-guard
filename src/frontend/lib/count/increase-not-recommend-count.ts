import { fetcher } from '@frontend/lib/fetcher';

export default async function increaseNotRecommendCount(promiseId: string) {
  const { status } = await fetcher.post(`/api/count/not-recommend`, { json: { promiseId } });

  return status;
}

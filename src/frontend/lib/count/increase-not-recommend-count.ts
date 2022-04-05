import { fetcher } from '@frontend/lib/fetcher';

export default async function increaseNotRecommendCount(promiseId: string) {
  await fetcher.post(`/api/count/not-recommend`, { json: { promiseId } });
}

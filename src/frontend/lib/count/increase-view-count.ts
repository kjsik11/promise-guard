import { fetcher } from '@frontend/lib/fetcher';

export default async function increaseViewCount(promiseId: string, alreadyViewFlag: boolean) {
  await fetcher.post(`/api/count/view`, { json: { promiseId, alreadyViewFlag } });
}

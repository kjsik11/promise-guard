import type { UserInfo } from '@backend/model/user';

import { fetcher } from '@frontend/lib/fetcher';

export default async function getUserInfo() {
  return await fetcher('/api/user', { retry: 0 }).json<UserInfo>();
}

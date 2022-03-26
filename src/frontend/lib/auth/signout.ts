import { fetcher } from '@frontend/lib/fetcher';

export default async function signout() {
  await fetcher.delete('/api/user');
}

import { fetcher } from '@frontend/lib/fetcher';

export default async function checkAdmin() {
  const { status } = await fetcher('/admin/signin', { retry: 0 }).json<{ status: boolean }>();

  return status;
}

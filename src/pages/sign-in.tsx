import { useRouter } from 'next/router';
import { useCallback } from 'react';

import { Button } from '@frontend/components/ui';
import { useNoti } from '@frontend/hooks/use-noti';
import useUser from '@frontend/hooks/use-user';
import signout from '@frontend/lib/auth/signout';

export default function SignIn() {
  const router = useRouter();
  const { user, mutate } = useUser();

  const { showAlert } = useNoti();

  const handleSignout = useCallback(async () => {
    await signout()
      .then(() => mutate())
      .catch(showAlert);
  }, [showAlert, mutate]);

  if (user)
    return (
      <div className="flex justify-center pt-20">
        <p>{JSON.stringify(user)}</p>
        <Button onClick={handleSignout}>Sign out</Button>
      </div>
    );

  return (
    <div className="flex justify-center pt-20">
      <button
        className="bg-black px-4 py-2 text-white"
        onClick={() => {
          router.push('/signin/kakao');
        }}
      >
        kakao login
      </button>
    </div>
  );
}

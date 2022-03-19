import { useSession, signIn, signOut } from 'next-auth/react';

import { Button } from '@frontend/components/ui';

export default function SignIn() {
  const { data } = useSession();

  if (data) {
    return (
      <>
        <div>{JSON.stringify(data)}</div>
        <Button onClick={() => signOut()}>signou()</Button>
      </>
    );
  }

  return (
    <div className="flex justify-center pt-20">
      <Button onClick={() => signIn('kakao')}>kakao login</Button>
    </div>
  );
}

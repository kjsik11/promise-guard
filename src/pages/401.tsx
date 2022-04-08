import NextImage from 'next/image';

import NotFoundImage from '@assets/404.png';

import { Button } from '@frontend/components/ui';
import useUser from '@frontend/hooks/use-user';

export default function Unauthorized() {
  const { handleSignin } = useUser();

  return (
    <div className="py-16 text-center">
      <div className="mx-auto flex max-w-[200px] justify-center">
        <NextImage draggable="false" src={NotFoundImage} loading="eager" placeholder="blur" />
      </div>
      <p className="text-xl font-bold">해당 서비스는 카카오톡을 사용중인 유저만 사용 가능합니다.</p>

      <Button onClick={() => handleSignin(true)} className="mt-4">
        다시 로그인 시도하기
      </Button>
    </div>
  );
}

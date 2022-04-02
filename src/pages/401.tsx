import NextImage from 'next/image';
import Link from 'next/link';

import NotFoundImage from '@assets/404.png';

import { Button } from '@frontend/components/ui';

export default function Unauthorized() {
  return (
    <div className="py-16 text-center">
      <div className="mx-auto flex max-w-[200px] justify-center">
        <NextImage draggable="false" src={NotFoundImage} loading="eager" placeholder="blur" />
      </div>
      <p className="text-xl font-bold">인증되지 않은 유저로 접근을 시도했습니다.</p>
      <Link href="/sign-in" passHref>
        <Button>다시 로그인 시도하기</Button>
      </Link>
    </div>
  );
}

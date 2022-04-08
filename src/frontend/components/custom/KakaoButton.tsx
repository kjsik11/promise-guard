import clsx from 'clsx';
import Link from 'next/link';

import { Kakao } from '@frontend/components/vector';

interface Props {
  className?: string;
}

export default function KakaoButton({ className }: Props) {
  return (
    <Link href="http://pf.kakao.com/_kpfNb" passHref>
      <a
        target="_blank"
        referrerPolicy="no-referrer"
        className={clsx(
          'mx-auto flex w-full max-w-sm items-center justify-center space-x-2 rounded-lg bg-Kakao py-2 px-4',
          className,
        )}
      >
        <Kakao />
        <p className="font-semibold text-gray-900">카카오 채널 추가하기</p>
      </a>
    </Link>
  );
}

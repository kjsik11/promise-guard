import clsx from 'clsx';

import { Kakao } from '@frontend/components/vector';

interface Props {
  className?: string;
}

export default function KakaoButton({ className }: Props) {
  return (
    <button
      className={clsx(
        'flex w-full items-center  justify-center space-x-2 rounded-lg bg-Kakao py-2 px-4',
        className,
      )}
    >
      <Kakao />
      <p className="font-semibold text-gray-900">카카오 채널 추가하기</p>
    </button>
  );
}

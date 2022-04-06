import clsx from 'clsx';

import { Board, Kakao } from '@frontend/components/vector';

interface Props {
  className?: string;
}

export default function KakaoChannel({ className }: Props) {
  return (
    <section className={clsx('space-y-4 py-3 px-4', className)}>
      <div className="flex items-center justify-center space-x-4">
        <Board />
        <div>
          <p className="text-lg font-bold">오월십일 카카오톡 채널 추가하세요!</p>
          <p className="text-sm font-medium text-gray-500">관심 공약과 관련된 뉴스를 보내드려요</p>
        </div>
      </div>
      <button className="flex w-full items-center  justify-center space-x-2 rounded-lg bg-Kakao py-2 px-4">
        <Kakao />
        <p className="font-semibold text-gray-900">카카오 채널 추가하기</p>
      </button>
    </section>
  );
}
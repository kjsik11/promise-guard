import clsx from 'clsx';
import NextImage from 'next/image';

import CheckBoardImage from '@assets/introduce/check-board.png';

import useUser from '@frontend/hooks/use-user';

import KakaoButton from './KakaoButton';

interface Props {
  className?: string;
}

export default function KakaoChannel({ className }: Props) {
  const { user } = useUser();

  if (!user) return null;

  return (
    <section className={clsx('space-y-4 py-3 px-4', className)}>
      <div className="flex items-center justify-center space-x-4">
        <div className="h-14 w-[45px]">
          <NextImage alt="check-board-image" src={CheckBoardImage} placeholder="blur" />
        </div>
        <div>
          <p className="text-lg font-bold">오월십일 카카오톡 채널 추가하세요!</p>
          <p className="text-sm font-medium text-gray-500">관심 공약과 관련된 뉴스를 보내드려요</p>
        </div>
      </div>
      <KakaoButton />
    </section>
  );
}

import NextImage from 'next/image';

import NotFoundImage from '@assets/404.png';

export default function NotFound() {
  return (
    <div className="py-16 text-center">
      <div className="mx-auto flex max-w-[200px] justify-center">
        <NextImage
          alt="not-found-image"
          draggable="false"
          src={NotFoundImage}
          loading="eager"
          placeholder="blur"
        />
      </div>
      <p className="text-xl font-bold">페이지 준비중입니다</p>
    </div>
  );
}

import Lottie from 'lottie-react';

import xLottie from '@assets/x-lottie.json';

export default function XLottie() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Lottie animationData={xLottie} className="h-72 w-24" />
    </div>
  );
}

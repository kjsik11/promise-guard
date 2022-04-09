import Lottie from 'lottie-react';

import oLottie from '@assets/o-lottie.json';

export default function OLottie() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Lottie animationData={oLottie} className="h-72 w-24" />
    </div>
  );
}

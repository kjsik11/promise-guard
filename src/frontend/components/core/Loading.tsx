import Lottie from 'lottie-react';

import spinner from '@assets/spinner.json';

export default function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Lottie animationData={spinner} className="h-80 w-80" />
    </div>
  );
}

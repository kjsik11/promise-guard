import dynamic from 'next/dynamic';

const XLottie = dynamic(() => import('./XLottie'), {
  loading: () => <p></p>,
});

export default function DynamicXLottie() {
  return <XLottie />;
}

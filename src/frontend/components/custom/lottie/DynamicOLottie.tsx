import dynamic from 'next/dynamic';

const OLottie = dynamic(() => import('./OLottie'), {
  loading: () => <p></p>,
});

export default function DynamicOLottie() {
  return <OLottie />;
}

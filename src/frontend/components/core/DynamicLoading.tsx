import dynamic from 'next/dynamic';

const Loading = dynamic(() => import('./Loading'), {
  loading: () => <p></p>,
});

export default function DynamicLoading() {
  return <Loading />;
}

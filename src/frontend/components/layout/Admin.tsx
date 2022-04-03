import { useRouter } from 'next/router';
import { useEffect } from 'react';

import Footer from '@frontend/components/core/Footer';
import Header from '@frontend/components/core/Header';
import Countdown from '@frontend/components/custom/Countdown';
import useAdmin from '@frontend/hooks/use-admin';

import LoadingPage from '@pages/loading';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { adminFlag, loading } = useAdmin();

  useEffect(() => {
    if (!loading && !adminFlag && router.asPath !== '/upload-promise/admin-signin') {
      router.push('/upload-promise/admin-signin');
    }
  }, [loading, adminFlag, router]);

  if (loading) return <LoadingPage />;

  return (
    <main className="relative mx-auto h-full max-w-7xl px-4">
      <Header />
      <Countdown />
      {children}
      <Footer />
    </main>
  );
}

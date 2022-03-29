import Footer from '@frontend/components/core/Footer';
import Header from '@frontend/components/core/Header';
import Countdown from '@frontend/components/custom/Countdown';

export default function NoneLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative mx-auto h-full max-w-7xl px-4">
      <Header />
      <Countdown />
      {children}
      <Footer />
    </main>
  );
}

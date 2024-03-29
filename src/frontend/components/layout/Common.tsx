import Footer from '@frontend/components/core/Footer';
import Header from '@frontend/components/core/Header';
import Countdown from '@frontend/components/custom/Countdown';

export default function CommonLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="relative mx-auto h-full max-w-3xl pt-14">
        <Countdown />
        {children}
        <Footer />
      </main>
    </>
  );
}

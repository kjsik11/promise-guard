import Footer from '@frontend/components/core/Footer';
import Header from '@frontend/components/core/Header';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="relative mx-auto h-full max-w-3xl">
        {children}
        <Footer />
      </main>
    </>
  );
}

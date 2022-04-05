import Footer from '@frontend/components/core/Footer';
import Header from '@frontend/components/core/Header';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative mx-auto h-full max-w-3xl">
      <Header />
      {children}
      <Footer />
    </main>
  );
}

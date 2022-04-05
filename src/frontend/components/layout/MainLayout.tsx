import Footer from '@frontend/components/core/Footer';
import Header from '@frontend/components/core/Header';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto h-full max-w-3xl">
      <Header />
      <main className="pt-14">
        {children}
        <Footer />
      </main>
    </div>
  );
}

import Footer from './Footer';
import Header from './Header';

interface LayoutProps {
  children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className='flex min-h-screen w-full flex-col'>
      <Header />
      <main className='flex w-full'>{children}</main>
      <Footer />
    </div>
  );
}

import Footer from './Footer';
import Header from './Header';

interface LayoutProps {
  children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className='flex flex-col min-h-screen w-full'>
      <Header />
      <main className='flex w-full'>{children}</main>
      {/* <Chatbar /> */}
      <Footer />
    </div>
  );
}

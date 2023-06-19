import Header from './Header';
import Footer from './Footer';
import { Toaster } from 'react-hot-toast';
interface LayoutProps {
  children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <div
        className='relative flex min-h-screen w-full flex-col overflow-hidden bg-contain bg-center bg-no-repeat'
        style={{ backgroundImage: 'url(/images/net.png)' }}
      >
        <Header />
        <main className='relative z-[1] flex w-full flex-grow items-center' style={{ zoom: '0.5' }}>
          {children}
          <img
            src='/images/blue_star.png'
            alt='blue-star'
            className='absolute bottom-0 right-1/4 animate-pulse delay-100'
          />
          <img
            src='/images/yellow_star.png'
            alt='yellow-star'
            className='absolute left-1/4 top-[60%] animate-pulse'
          />
        </main>
        <Footer />
        <div className='absolute bottom-0 left-0 h-1/6 w-full bg-[#9bdc6f] bg-opacity-30 blur-[100px]' />
      </div>

      <Toaster position='top-center' />
    </>
  );
}

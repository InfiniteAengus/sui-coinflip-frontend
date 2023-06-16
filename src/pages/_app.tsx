import '../styles/global.css';
import {
  WalletProvider,
  SuiDevnetChain,
  SuiTestnetChain,
  SuiMainnetChain,
  Chain,
} from '@suiet/wallet-kit';
import '@suiet/wallet-kit/style.css';
import { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from '@/layouts';
import type { AppProps } from 'next/app';

const SupportedChains: Chain[] = [SuiDevnetChain, SuiTestnetChain, SuiMainnetChain];

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Suspense fallback={<></>}>
      <WalletProvider chains={SupportedChains}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ToastContainer
          position='top-right'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='colored'
        />
      </WalletProvider>
    </Suspense>
  );
};

export default MyApp;

import '../styles/global.css';
import {
  WalletProvider,
  SuiDevnetChain,
  SuiTestnetChain,
  SuiMainnetChain,
  Chain,
} from '@suiet/wallet-kit';
import '@suiet/wallet-kit/style.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import type { AppProps } from 'next/app';
import Layout from '@/layouts';

const SupportedChains: Chain[] = [
  // ...DefaultChains,
  SuiDevnetChain,
  SuiTestnetChain,
  SuiMainnetChain,
  // NOTE: you can add custom chain (network),
  // but make sure the connected wallet does support it
  // customChain,
];

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
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
  );
};

export default MyApp;

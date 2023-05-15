import Layout from '@/layouts';
import '../styles/global.css';
import {
  WalletProvider,
  SuiDevnetChain,
  SuiTestnetChain,
  SuiMainnetChain,
  Chain
} from '@suiet/wallet-kit';
import '@suiet/wallet-kit/style.css';

import type { AppProps } from 'next/app';

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
    </WalletProvider>
  )
};

export default MyApp;

import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import {
  WalletProvider,
  SuiDevnetChain,
  SuiTestnetChain,
  SuiMainnetChain,
  Chain,
} from '@suiet/wallet-kit';

import { WalletKitProvider } from '@mysten/wallet-kit';

import Main from './pages/main';
import Play from './pages/play';
import Layout from './layouts';

import './App.css';
import './styles/global.css';
import '@suiet/wallet-kit/style.css';
import 'react-toastify/dist/ReactToastify.css';

const SupportedChains: Chain[] = [SuiDevnetChain, SuiTestnetChain, SuiMainnetChain];

const App = () => {
  return (
    <Suspense fallback={<></>}>
      <WalletKitProvider>
        <Layout>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/play' element={<Play />} />
          </Routes>
        </Layout>
      </WalletKitProvider>
    </Suspense>
  );
};

export default App;

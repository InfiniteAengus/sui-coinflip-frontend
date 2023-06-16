import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import {
  WalletProvider,
  SuiDevnetChain,
  SuiTestnetChain,
  SuiMainnetChain,
  Chain,
} from '@suiet/wallet-kit';

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
      <BrowserRouter>
        <WalletProvider chains={SupportedChains}>
          <Layout>
            <Routes>
              <Route path='/' element={<Main />} />
              <Route path='/play' element={<Play />} />
            </Routes>
          </Layout>
        </WalletProvider>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;

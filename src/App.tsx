import { WalletKitProvider } from '@mysten/wallet-kit';
import '@suiet/wallet-kit/style.css';
import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import Layout from './layouts';
import './styles/global.css';
import { lazyRetry } from './utils/lazy';

const Main = lazy(() => lazyRetry(() => import('./pages/main'), 'main') as any);
const Play = lazy(() => lazyRetry(() => import('./pages/play'), 'play') as any);

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

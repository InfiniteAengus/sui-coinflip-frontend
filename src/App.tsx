import { WalletKitProvider } from '@mysten/wallet-kit';
import '@suiet/wallet-kit/style.css';
import React, { Suspense } from 'react';
// import { Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
// import Layout from './layouts';
// import Main from './pages/main';
import Maintenance from './pages/maintenance';
// import Play from './pages/play';
import './styles/global.css';

const App = () => {
	return (
		<Suspense fallback={<></>}>
			<WalletKitProvider>
				<Maintenance />
				{/* <Layout>
					<Routes>
						<Route path='/' element={<Main />} />
						<Route path='/play' element={<Play />} />
					</Routes>
				</Layout> */}
			</WalletKitProvider>
		</Suspense>
	);
};

export default App;

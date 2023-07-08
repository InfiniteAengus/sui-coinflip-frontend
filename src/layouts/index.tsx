import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { io } from 'socket.io-client';

import { SOCKET_URL } from 'src/config';
import { useAppDispatch } from 'src/hooks/redux';
import { setRecentData } from 'src/store/slices/history';

import Footer from './Footer';
import Header from './Header';

interface LayoutProps {
	children?: React.ReactNode;
}

const socket = io(SOCKET_URL);

export default function Layout({ children }: LayoutProps) {
	const dispatch = useAppDispatch();

	const getRecentData = data => {
		dispatch(setRecentData(data));
	};

	useEffect(() => {
		socket.on('recent', getRecentData);

		return () => {
			socket.off('recent', getRecentData);
		};
	}, []);

	return (
		<>
			<div
				className='relative flex min-h-screen w-full flex-col overflow-hidden bg-contain bg-center bg-no-repeat'
				style={{ backgroundImage: 'url(/images/net.png)' }}
			>
				<Header />
				<main className='relative z-[1] flex w-full flex-grow items-center'>
					{children}
					<img
						src='/images/blue_star.png'
						alt='blue-star'
						className='absolute bottom-0 right-1/4 w-[100px] animate-pulse delay-100'
					/>
					<img
						src='/images/yellow_star.png'
						alt='yellow-star'
						className='absolute left-1/4 top-[60%] w-[40px] animate-pulse'
					/>
				</main>
				<Footer />
				<div className='absolute bottom-0 left-0 h-1/6 w-full bg-[#9bdc6f] bg-opacity-30 blur-[100px]' />
				<div className='fixed left-1/2 top-[20px] z-[3] mx-auto flex -translate-x-1/2 items-center gap-x-2 rounded-xl border-4 border-[#ff9e47] bg-[#6e3603] bg-opacity-70 px-4 py-2'>
					<img src='/images/warning.png' alt='warning' className='w-6' />
					DEGRADED PERFORMANCE DUE TO EXTREME TRAFFIC.
				</div>
			</div>

			<Toaster position='top-center' />
		</>
	);
}

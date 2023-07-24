import { ConnectModal } from '@mysten/wallet-kit';
import { useState } from 'react';

const ConnectButton = () => {
	const [modalOpen, setModalOpen] = useState<boolean>(false);

	return (
		<>
			<button
				className='!relative !w-auto !rounded-3xl !bg-[#2E4D7D] !p-4 !pt-6 !font-[Anja] !font-medium !uppercase !leading-none !text-white'
				onClick={() => {
					setModalOpen(true);
				}}
			>
				<span className='relative z-20 text-3xl'>
					connect <br />
				</span>
				<span className='relative z-20 text-4xl'>wallet</span>
				<div className='absolute left-0 top-0 z-[1] h-full w-full !rounded-3xl !border-4 !border-solid !border-[#3283b9] !bg-[#2E4D7D]'></div>
				<div className='absolute -bottom-3 left-0 z-[0] h-full w-full !rounded-3xl bg-[#32678A] ' />
				<div className='absolute left-0 top-0 z-[0] h-full w-full !rounded-3xl bg-[#5486D1] blur-[40px]' />
			</button>
			<ConnectModal
				open={modalOpen}
				onClose={() => {
					setModalOpen(false);
				}}
			/>
		</>
	);
};

export default ConnectButton;

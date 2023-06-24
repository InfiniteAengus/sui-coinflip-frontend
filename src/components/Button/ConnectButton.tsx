import { ConnectModal } from '@mysten/wallet-kit';
import { useState } from 'react';

const ConnectButton = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <>
      <button
        className='!relative !w-auto !rounded-[40px] !bg-[#2E4D7D] !p-8 !pt-11 !font-[Anja] !font-medium !uppercase !leading-none !text-white'
        onClick={() => {
          setModalOpen(true);
        }}
      >
        <span className='relative z-[2]'>
          <span className='text-[70px]'>
            connect <br />
          </span>
          <span className='text-[80px]'>wallet</span>
        </span>
        <div className='absolute left-0 top-0 z-[1] h-full w-full !rounded-[40px] !border-8 !border-solid !border-[#3283b9] !bg-[#2E4D7D]'></div>
        <div className='absolute -bottom-6 left-0 z-[0] h-full w-full rounded-[40px] bg-[#32678A] ' />
        <div className='absolute left-0 top-0 z-[0] h-full w-full rounded-[40px] bg-[#5486D1] blur-[80px]' />
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

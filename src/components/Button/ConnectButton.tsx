import { ConnectButton as SuiConnectButton } from '@suiet/wallet-kit';

const ConnectButton = () => {
  return (
    <SuiConnectButton className='!relative !w-auto !rounded-[40px] !bg-[#2E4D7D] !p-8 !font-[Anja] !font-medium !uppercase !leading-none !text-white'>
      <span className='relative z-[2]'>
        <span className='text-[90px]'>
          connect <br />
        </span>
        <span className='text-[100px]'>wallet</span>
      </span>
      <div className='absolute left-0 top-0 z-[1] h-full w-full !rounded-[40px] !border-8 !border-solid !border-[#3283b9] !bg-[#2E4D7D]'></div>
      <div className='absolute -bottom-6 left-0 z-[0] h-full w-full rounded-[40px] bg-[#32678A] ' />
      <div className='absolute left-0 top-0 z-[0] h-full w-full rounded-[40px] bg-[#5486D1] blur-[80px]' />
    </SuiConnectButton>
  );
};

export default ConnectButton;

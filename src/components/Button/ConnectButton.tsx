import { ConnectButton as SuiConnectButton } from '@suiet/wallet-kit';

import DropdownIcon from '@/assets/icons/dropdown.svg';

const ConnectButton = () => {
  return (
    <SuiConnectButton className='group !relative !w-auto !rounded-none !border-x-0 !border-y-8 !border-solid !border-black !bg-transparent !py-8 !font-[Akira] !text-5xl !uppercase !leading-none !text-black'>
      connect <br />
      wallet
      <div className='absolute left-0 top-0 h-[20px] w-full border-x-8 border-black' />
      <div className='absolute bottom-0 left-0 h-[20px] w-full border-x-8 border-black' />
      <div className='trans absolute -left-10 top-1/2 -translate-y-1/2 -rotate-90 scale-150 group-hover:translate-x-4'>
        <DropdownIcon />
        <DropdownIcon />
      </div>
      <div className='trans absolute -right-10 top-1/2 -translate-y-1/2 rotate-90 scale-150 group-hover:-translate-x-4'>
        <DropdownIcon />
        <DropdownIcon />
      </div>
    </SuiConnectButton>
  );
};

export default ConnectButton;

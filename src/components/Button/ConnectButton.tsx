import { ConnectButton as SuiConnectButton } from '@suiet/wallet-kit';
const ConnectButton = () => {
  return (
    <SuiConnectButton className='!w-[unset] !rounded-lg !bg-primary !px-10 !py-6 !font-[Symtext] !text-5xl !font-normal !leading-[unset] !shadow-[0px_20px_#242424]'>
      connect wallet
    </SuiConnectButton>
  );
};

export default ConnectButton;

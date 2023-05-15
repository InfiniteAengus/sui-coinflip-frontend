import { ConnectButton as SuiConnectButton } from '@suiet/wallet-kit';
const ConnectButton = () => {
  return (
    <SuiConnectButton className='pushable !rounded-[6px] !w-[unset] !leading-[unset] !font-[Symtext] !font-normal'>
      <span className='front !text-3xl !rounded-[6px]'>connect wallet</span>
    </SuiConnectButton>
  );
};

export default ConnectButton;

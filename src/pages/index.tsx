import Main from "./main";
import Play from "./play";
import {useWallet } from '@suiet/wallet-kit';
 
const Index = () => {
  const wallet = useWallet();
  console.log(wallet.connected);

  return (
    <>
      {wallet?.connected ? <Play /> : <Main />}
    </>
  );
};

export default Index;

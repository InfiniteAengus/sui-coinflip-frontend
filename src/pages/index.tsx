import { useWallet } from '@suiet/wallet-kit';
import Main from './main';
import Play from './play';

const Index = () => {
  const wallet = useWallet();

  return <>{wallet?.connected ? <Play /> : <Main />}</>;
};

export default Index;

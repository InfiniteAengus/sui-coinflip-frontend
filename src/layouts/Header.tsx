import { useWallet } from "@suiet/wallet-kit";
import { devnetConnection, JsonRpcProvider } from '@mysten/sui.js';
import { useState, useEffect } from "react"

const Header = () => {
  const wallet = useWallet();
  const [balance, setBalance] = useState<string>("");

  useEffect(() => {
    (async () => {
      if (!wallet.address) return;
      const provider = new JsonRpcProvider(devnetConnection);
      setBalance(Math.round((await provider.getBalance({
        owner: wallet.address || ""
      })).totalBalance / 1e7) / 100);
    })();
  }, [wallet]);
  const disconnect = () => {
    wallet.disconnect();
    window.location.href = "/";
  }

  return (
    <div className="px-[145px] pt-[90px] flex justify-between">
      <div className="flex gap-6 h-fit">
        <img src="/images/speaker.png" className="w-[63px] h-[53px]" />
        <button className="bg-primary hover:bg-white anim border-2 border-black rounded-md px-8 font-semibold text-xl">BETR</button>
      </div>

      <div className="flex gap-5 font-semibold text-xl">
        <div className="px-5 py-3 flex gap-1 items-center bg-white hover:bg-primary anim h-fit rounded-md cursor-pointer">
          RECENT
          <img src="/images/down-arrow.png" className="w-auto h-fit" />
        </div>
        <div className="px-5 py-3 flex gap-1 items-center bg-white hover:bg-primary anim h-fit rounded-md cursor-pointer">
          LEADERBOARD
          <img src="/images/down-arrow.png" className="w-fit h-fit" />
        </div>
        <div className="flex flex-col items-center -mt-3">
          <img src="/images/small-icon.png" className="" onClick={disconnect}/>
          <span>{`${balance ?? 100} sui`}</span>
        </div>
      </div>
    </div>
  )
}

export default Header
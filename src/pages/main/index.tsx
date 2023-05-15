import Button from "@/components/Button"
import HistoryItem from "@/components/HistoryItem"
import { ConnectButton, useWallet } from '@suiet/wallet-kit';
import { useEffect, useState } from "react";
import { getRecent } from "@/utils/api";

const Main = () => {
  const wallet = useWallet();
  const [recent, setRecent] = useState<any[]>([]);

  useEffect(() => {
    if (!wallet.connected) return;
    window.location.href = "/play";
  }, [wallet.connected])

  useEffect(() => {
    (async () => {
      setRecent(await getRecent());
    })();
  }, []);

  return (
    <div className="relative w-full flex flex-col items-center justify-center pb-20">
      <span className="text-4xl">sui or nothing?</span>
      <img src="/images/smile-coin.png" className="w-[300px] mt-10" />

      <div className="mt-10">
        <Button label="connect wallet" className="!rounded-[6px] !text-3xl" />
      </div>

      <div className="mt-10 flex flex-col items-center">
        <span className="text-2xl">RECENT PLAYERS</span>
        <div className="flex flex-col gap-4 mt-5">
          {recent.map((item: any, id: number) => (
            <HistoryItem address={item.address} betAmount={item.betAmount} time={item.timestamp} win={item.won} key={id} />
          ))}
        </div>
      </div>
      <ConnectButton />
    </div>
  )
}

export default Main
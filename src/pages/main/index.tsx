import Button from "@/components/Button"
import HistoryItem from "@/components/HistoryItem"
import { ConnectButton, useWallet } from '@suiet/wallet-kit';
import { useEffect } from "react";

const dummyData = [
  {
    mainContent: "PLAYER NAME FLIPPED 1.0 SUI AND",
    subContent: "DOUBLE 2 TIMES",
    time: "3 MINUTES AGO",
    win: true
  },
  {
    mainContent: "PLAYER NAME FLIPPED 1.0 SUI AND",
    subContent: "DOUBLE 2 TIMES",
    time: "3 MINUTES AGO",
    win: true
  },
  {
    mainContent: "PLAYER NAME FLIPPED 1.0 SUI AND",
    subContent: "DOUBLE 2 TIMES",
    time: "3 MINUTES AGO",
    win: false
  },
  {
    mainContent: "PLAYER NAME FLIPPED 1.0 SUI AND",
    subContent: "DOUBLE 2 TIMES",
    time: "3 MINUTES AGO",
    win: true
  },
]

const Main = () => {
  const wallet = useWallet()

  useEffect(() => {
    if (!wallet.connected) return;
    window.location.href = "/play";
  }, [wallet.connected])

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
          {dummyData.map((item: any, id: number) => (
            <HistoryItem mainContent={item.mainContent} subContent={item.subContent} time={item.time} win={item.win} key={id} />
          ))}
        </div>
      </div>
      <ConnectButton />
    </div>
  )
}

export default Main
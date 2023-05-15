import Button from "@/components/Button"

import { useState, useEffect } from "react"
import Confetti from 'react-confetti';
import { ToastContainer, toast } from 'react-toastify';

import { TransactionBlock, devnetConnection, JsonRpcProvider } from '@mysten/sui.js';
import { useWallet } from '@suiet/wallet-kit';
import { bytesToHex, randomBytes } from "@noble/hashes/utils";
import { useWindowSize } from '@react-hook/window-size';
import axios from "axios";

import 'react-toastify/dist/ReactToastify.css';

const statusList = ['init', 'deposit', 'flipping', 'won', 'lost']

const Play = () => {
  const [width, height] = useWindowSize();
  const [status, setStatus] = useState<string>("init");
  const [guess, setGuess] = useState<string>("");
  const [betAmount, setBetAmount] = useState<number>(0);
  const [previousBalance, setPreviousBalance] = useState<string>("0");
  const wallet = useWallet();

  const nextStatus = () => {
    setStatus(statusList[(statusList.indexOf(status) + 1) % statusList.length] ?? "init");
  }

  useEffect(() => {
    const getBalance = async () => {
      const provider = new JsonRpcProvider(devnetConnection);
      return (await provider.getBalance({
        owner: wallet.address || ""
      })).totalBalance;
    }

    (async () => {
      if (status == "deposit") {
        setTimeout(() => {
          setStatus("flipping");
        }, 1000);
      }
      if (status == "flipping") {
        await new Promise(r => setTimeout(r, 1000));
        let balance = await getBalance();
        if (Number(balance) < Number(previousBalance)) {
          setStatus("lost");
          toast.error('You lost :(', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } else {
          setStatus("won");
          toast.success('You won :)', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      }
    })();
  }, [status]);

  const playGame = async () => {
    // console.log(guess, betAmount, wallet.connected);
    // if (!guess || !betAmount) {
    //   console.log("hey, kidding?");
    //   return;
    // }
    const provider = new JsonRpcProvider(devnetConnection);
    const txb = new TransactionBlock();

    const ser = bytesToHex(randomBytes(16));

    const coins = txb.splitCoins(txb.gas, [txb.pure(betAmount * 1000000000)]);

    const packageObjectId = "0xcd43c69d5ad829f979a89e9394c5831445e2090bda3a9374ad80361f3576ab4a";
    const houseDataId = "0xe252026aa62a5e91aeb769dad9266a9cdc53288594f774d00a89cd451a6ad170";
    txb.moveCall({
      target: `${packageObjectId}::coin_flip::play`,
      arguments: [txb.pure(guess === "head" ? 1 : 0), txb.pure(ser), coins[0] as any, txb.pure(betAmount * 1000000000), txb.pure(houseDataId)],
    });
    txb.setGasBudget(50000000);
    const getBalance = async () => {
      return (await provider.getBalance({
        owner: wallet.address || ""
      })).totalBalance;
    }
    try {
      let prvBalance = await getBalance();
      setPreviousBalance(prvBalance);
      let result = await wallet.signAndExecuteTransactionBlock({ transactionBlock: txb });
      nextStatus();

      setTimeout(() => {
        axios.post("/api/add_digest", {
          digest: result.digest,
        });
      }, 2000);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      {status === "init" && <div className="w-full flex flex-col items-center justify-center pb-20">
        <img src="/images/smile-coin.png" className="w-[300px]" />

        <div className="mt-10 flex flex-col items-center">
          <div className="flex gap-10">
            <Button label="heads" className="!rounded-[18px] !text-3xl" onClick={() => setGuess("head")} selected={guess === "head"} />
            <Button label="tails" className="!rounded-[18px] !text-3xl" onClick={() => setGuess("tail")} selected={guess === "tail"} />
          </div>

          <span className="text-2xl py-4">for</span>

          <div className="grid grid-cols-3 gap-6">
            <Button label="1 sui" className="!rounded-[18px] !text-3xl" onClick={() => setBetAmount(1)} selected={betAmount === 1} />
            <Button label="2 sui" className="!rounded-[18px] !text-3xl" onClick={() => setBetAmount(2)} selected={betAmount === 2} />
            <Button label="5 sui" className="!rounded-[18px] !text-3xl" onClick={() => setBetAmount(5)} selected={betAmount === 5} />
            <Button label="10 sui" className="!rounded-[18px] !text-3xl" onClick={() => setBetAmount(10)} selected={betAmount === 10} />
            <Button label="25 sui" className="!rounded-[18px] !text-3xl" onClick={() => setBetAmount(25)} selected={betAmount === 25} />
            <Button label="50 sui" className="!rounded-[18px] !text-3xl" onClick={() => setBetAmount(50)} selected={betAmount === 50} />
          </div>

          <div className="mt-8">
            <Button label="play" className="!rounded-[40px] !text-4xl !bg-[#1D4F88]" extraClassName="!bg-[#091B2E]" onClick={playGame} />
          </div>

          <div className="mt-20 flex gap-1">
            <span>faq</span>
            <span>|</span>
            <span>how to play</span>
            <span>|</span>
            <span>Flip responsibly</span>
          </div>
        </div>
      </div>}

      {status === "deposit" && (
        <div className="w-full flex flex-col items-center justify-center pb-20">
          <img src="/images/smile-coin.png" className="w-[300px]" />
          <p className="mt-10 text-2xl">waiting for deposit....</p>
          <p className="text-base">heads for 1.0 sui</p>
        </div>
      )}

      {status === "flipping" && (
        <div className="w-full flex flex-col items-center justify-center pb-20">
          <img src="/images/smile-coin.png" className="w-[300px]" />
          <p className="mt-10 text-2xl">flipping..</p>
          <p className="text-base">heads for {betAmount} sui</p>
        </div>
      )}

      {status === "won" && (
        <>
          <div className="w-full flex flex-col items-center justify-center pb-20">
            <img src="/images/smile-coin.png" className="w-[300px]" />
            <p className="mt-10 text-4xl">you won!</p>
            <div className="text-xl bg-black py-2 px-8 text-[#53DD82] mt-1 rounded-md">{betAmount} sui</div>
            <div className="mt-5">
              <Button label="try again?" className="!rounded-[6px] !text-xl" onClick={() => { setStatus("init"); setGuess(""); setBetAmount(0); }} />
            </div>
          </div>
          <Confetti
            width={width ? width : 1920}
            height={height ? height : 1500}
            recycle={false}
          />
        </>
      )}

      {status === "lost" && (
        <div className="w-full flex flex-col items-center justify-center pb-20">
          <img src="/images/cry-icon.png" className="w-[300px]" />
          <p className="mt-10 text-4xl">you lost!</p>
          <div className="text-xl bg-black py-2 px-8 text-[#F02323] mt-1 rounded-md">{betAmount} sui</div>
          <div className="mt-5">
            <Button label="try again?" className="!rounded-[6px] !text-xl" onClick={() => { setStatus("init"); setGuess(""); setBetAmount(0); }} />
          </div>
        </div>
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  )
}

export default Play
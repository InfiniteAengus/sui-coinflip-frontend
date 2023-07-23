import { Connection, JsonRpcProvider, TransactionBlock } from '@mysten/sui.js';
import { useWalletKit } from '@mysten/wallet-kit';
import { randomBytes } from '@noble/hashes/utils';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { io } from 'socket.io-client';

import type { CoinSide, GameResult } from 'src/@types/game';
import {
	BULLSHARK_NFT_TYPE,
	CAPY_NFT_TYPE,
	DLABS_NFT_TYPE,
	FULL_NODE,
	HOUSE_DATA_ID,
	PACKAGE_ID,
	SOCKET_URL,
} from 'src/config';

import useOwnedObject from './useOwnedObject';

const socket = io(SOCKET_URL);

export const useGame = () => {
	const { currentAccount, signAndExecuteTransactionBlock } = useWalletKit();
	const { ownedObject: ownedCapyObject } = useOwnedObject(
		currentAccount?.address,
		CAPY_NFT_TYPE
	);
	const { ownedObject: ownedBullsharkObject } = useOwnedObject(
		currentAccount?.address,
		BULLSHARK_NFT_TYPE
	);
	const { ownedObject: ownedDlabsObject } = useOwnedObject(
		currentAccount?.address,
		DLABS_NFT_TYPE
	);

	const [isLoading, setIsLoading] = useState(false);
	const [gameResult, setGameResult] = useState<GameResult | null>(null);
	const [choice, setChoice] = useState<CoinSide | null>(null);
	const [betAmount, setBetAmount] = useState<number>(0);
	const [currentGameId, setCurrentGameId] = useState<string | null>(null);

	const currentGameIdRef = useRef<string | null>(null);

	useEffect(() => {
		socket.on('game_ended', data => {
			const { gameId, playerWon } = data;

			if (currentGameIdRef.current === gameId) {
				setIsLoading(false);
				setGameResult(playerWon ? 'win' : 'lost');
			}
		});

		const timerId = setInterval(async () => {
			if (!currentGameIdRef.current) {
				return;
			}

			const provider = new JsonRpcProvider(
				new Connection({
					fullnode: FULL_NODE,
				})
			);

			const game: any = await provider.getObject({
				id: currentGameIdRef.current,
				options: { showContent: true },
			});

			const { player_won: playerWon } = game.data?.content?.fields;
			if (+playerWon !== 0) {
				setIsLoading(false);
				setGameResult(+playerWon === 1 ? 'lost' : 'win');
			}
		}, 2000);

		return () => {
			clearInterval(timerId);
		};
	}, []);

	const handlePlayGame = async (choice: CoinSide, balance: number) => {
		setChoice(choice);
		setBetAmount(balance);

		await handleNewGame(choice, balance);
	};

	const handleNewGame = async (choice: CoinSide, balance: number) => {
		const userRandomness = randomBytes(16);
		// const userRandomnessHexString = bytesToHex(userRandomness);

		const tx = new TransactionBlock();
		const coin = tx.splitCoins(tx.gas, [tx.pure(Number(balance))]);

		if (ownedDlabsObject) {
			tx.moveCall({
				target: `${PACKAGE_ID}::coin_flip::start_game_with_dlab`,
				arguments: [
					tx.pure(ownedCapyObject.kiosk),
					tx.pure(ownedCapyObject.objectId),
					tx.pure(choice === 'heads' ? '1' : '0'),
					tx.pure(Array.from(userRandomness)),
					coin,
					tx.object(HOUSE_DATA_ID),
				],
			});
		} else if (ownedBullsharkObject) {
			tx.moveCall({
				target: `${PACKAGE_ID}::coin_flip::start_game_with_bullshark`,
				arguments: [
					tx.pure(ownedBullsharkObject.kiosk),
					tx.pure(ownedBullsharkObject.objectId),
					tx.pure(choice === 'heads' ? '1' : '0'),
					tx.pure(Array.from(userRandomness)),
					coin,
					tx.object(HOUSE_DATA_ID),
				],
			});
		} else if (ownedCapyObject) {
			tx.moveCall({
				target: `${PACKAGE_ID}::coin_flip::start_game_with_capy`,
				arguments: [
					tx.pure(ownedCapyObject.objectId),
					tx.pure(choice === 'heads' ? '1' : '0'),
					tx.pure(Array.from(userRandomness)),
					coin,
					tx.object(HOUSE_DATA_ID),
				],
			});
		} else {
			tx.moveCall({
				target: `${PACKAGE_ID}::coin_flip::start_game`,
				arguments: [
					tx.pure(choice === 'heads' ? '1' : '0'),
					tx.pure(Array.from(userRandomness)),
					coin,
					tx.object(HOUSE_DATA_ID),
				],
			});
		}

		return await signAndExecuteTransactionBlock({
			transactionBlock: tx as any,
			requestType: 'WaitForLocalExecution',
			options: {
				showEffects: true,
				showEvents: true,
			},
		})
			.then(resp => {
				setIsLoading(true);
				if (resp.effects?.status.status === 'success') {
					const createdObjects = resp.effects?.created;
					const createdGame = createdObjects?.[0];
					const gameObjectId = createdGame?.reference.objectId;
					// const txnDigest = resp.digest;
					if (gameObjectId) {
						setCurrentGameId(gameObjectId);
						currentGameIdRef.current = gameObjectId;
						// return playGame(
						// 	gameObjectId,
						// 	userRandomnessHexString,
						// 	txnDigest,
						// 	currentAccount?.address,
						// 	+balance
						// );
					} else {
						setCurrentGameId(null);
						currentGameIdRef.current = null;
					}
				} else {
					setCurrentGameId(null);
					currentGameIdRef.current = null;
					console.log('game creation failed');
					toast.error('Sorry, game could not be played.');
				}
			})
			.catch(err => {
				setCurrentGameId(null);
				currentGameIdRef.current = null;
				console.log('game creation failed');
				console.log(err);
				toast.error('Something went wrong, game could not be started.');
			});
	};

	// const playGame = async (
	// 	gameObjectId: string,
	// 	userRandomnessHexString: string,
	// 	txnDigest: string,
	// 	player: string | undefined,
	// 	balance: number
	// ) => {
	// 	if (!player) {
	// 		return;
	// 	}

	// 	return await API.playGameRequest(
	// 		gameObjectId,
	// 		txnDigest,
	// 		userRandomnessHexString,
	// 		player,
	// 		balance
	// 	)
	// 		.then(resp => {
	// 			const { playerWon } = resp.data;
	// 			setGameResult(playerWon ? 'win' : 'lost');
	// 		})
	// 		.catch(err => {
	// 			console.log(err);
	// 		});
	// };

	const handleEndGame = () => {
		setIsLoading(false);
		setChoice(null);
		setGameResult(null);
	};

	return {
		currentGameId,
		gameResult,
		betAmount,
		choice,
		isLoading,
		handlePlayGame,
		handleEndGame,
	};
};

import { Connection, JsonRpcProvider } from '@mysten/sui.js';
import { useEffect, useState } from 'react';

import { FULL_NODE } from 'src/config';

const useBalance = (address: string | undefined) => {
	const [balance, setBalance] = useState<string>('0');

	useEffect(() => {
		if (!address) return;
		const timerId = setInterval(async () => {
			const provider = new JsonRpcProvider(
				new Connection({
					fullnode: FULL_NODE,
				})
			);
			const providerBalance = await provider.getBalance({
				owner: address || '',
			});
			const accountBalance =
				Math.round(+providerBalance.totalBalance / 1e8) / 10;
			setBalance(accountBalance.toString());
		}, 3000);

		return () => {
			clearInterval(timerId);
		};
	}, [address]);

	return { balance };
};

export default useBalance;

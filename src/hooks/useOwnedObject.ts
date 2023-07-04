import { Connection, JsonRpcProvider } from '@mysten/sui.js';
import { useEffect, useState } from 'react';

import { FULL_NODE } from 'src/config';

const useOwnedObject = (address: string | undefined, type: string) => {
	const [ownedObject, setOwnedObject] = useState<any>(null);

	const isOwned = async (address, type) => {
		if (!address) return;
		const provider = new JsonRpcProvider(
			new Connection({
				fullnode: FULL_NODE,
			})
		);
		const { data: ownedObjects } = await provider.getOwnedObjects({
			owner: address || '',
		});

		for (const object of ownedObjects) {
			const { data } = object;
			if (!data?.objectId) {
				continue;
			}
			const txn = await provider.getObject({
				id: data?.objectId,
				options: { showContent: true },
			});

			const { data: objectData } = txn;
			if (objectData?.content && (objectData.content as any).type === type) {
				setOwnedObject(data?.objectId);
			}
		}
	};

	useEffect(() => {
		isOwned(address, type);
	}, [address, type]);

	return { ownedObject };
};

export default useOwnedObject;

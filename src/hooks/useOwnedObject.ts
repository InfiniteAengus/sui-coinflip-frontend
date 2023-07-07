import { fetchKiosk } from '@mysten/kiosk';
import { Connection, JsonRpcProvider } from '@mysten/sui.js';
import { useEffect, useState } from 'react';

import { FULL_NODE, KIOSK_TYPE } from 'src/config';

const useOwnedObject = (
	address: string | undefined = undefined,
	type: string | undefined = undefined
) => {
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
			options: { showContent: true },
		});

		console.log(ownedObjects);

		for (const object of ownedObjects) {
			const { data } = object;
			if (!data?.objectId) {
				continue;
			}

			const { content: objectContent } = data;

			if (objectContent && (objectContent as any).type === type) {
				setOwnedObject({
					objectId: data?.objectId,
				});
			}

			if (objectContent && (objectContent as any).type === KIOSK_TYPE) {
				const { fields } = objectContent as any;
				const { data: kioskItems } = await fetchKiosk(
					provider as any,
					fields.for,
					{},
					{ withListingPrices: true, withKioskFields: true }
				);

				const ownedObject = kioskItems.items.find(item => item.type === type);
				if (ownedObject) {
					setOwnedObject({ objectId: ownedObject.objectId, kiosk: fields.for });
				}
			}
		}
	};

	useEffect(() => {
		if (address && type) isOwned(address, type);
	}, [address, type]);

	return { ownedObject };
};

export default useOwnedObject;

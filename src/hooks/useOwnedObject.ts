import { Connection, JsonRpcProvider } from '@mysten/sui.js';
import { useState, useEffect } from 'react';
import { mode } from 'src/config';

const useOwnedObject = (address: string, type: string) => {
  const [ownedObject, setOwnedObject] = useState<any>(null);

  const isOwned = async (address, type) => {
    if (!address) return;
    const provider = new JsonRpcProvider(
      new Connection({
        fullnode: `https://fullnode.${mode}.sui.io/`,
      }),
    );
    const { data: ownedObjects } = await provider.getOwnedObjects({
      owner: address || '',
    });

    for (let object of ownedObjects) {
      const { data } = object;
      const txn = await provider.getObject({
        id: data?.objectId!,
        options: { showContent: true },
      });

      const { data: objectData } = txn;
      if (
        objectData?.content &&
        (objectData.content as any).type ===
          '0x80d7de9c4a56194087e0ba0bf59492aa8e6a5ee881606226930827085ddf2332::suifrens::SuiFren<0x80d7de9c4a56194087e0ba0bf59492aa8e6a5ee881606226930827085ddf2332::capy::Capy>'
      ) {
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

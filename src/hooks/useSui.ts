import {
  Connection,
  ExecuteTransactionRequestType,
  JsonRpcProvider,
  SignedTransaction,
  SuiTransactionBlockResponseOptions,
} from '@mysten/sui.js';
import { FULL_NODE } from 'src/config';

interface ExecuteSignedTransactionBlockProps {
  signedTx: SignedTransaction;
  requestType: ExecuteTransactionRequestType;
  options?: SuiTransactionBlockResponseOptions;
}

export const useSui = () => {
  const connection = new Connection({
    fullnode: FULL_NODE,
  });
  const provider = new JsonRpcProvider(connection);

  const executeSignedTransactionBlock = async ({
    signedTx,
    requestType,
    options,
  }: ExecuteSignedTransactionBlockProps) => {
    return provider.executeTransactionBlock({
      transactionBlock: signedTx.transactionBlockBytes,
      signature: signedTx.signature,
      requestType,
      ...(options && { options }),
    });
  };

  return { executeSignedTransactionBlock, provider };
};

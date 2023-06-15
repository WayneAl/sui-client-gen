import { PUBLISHED_AT } from '..'
import { pure } from '../../_framework/util'
import { TransactionArgument, TransactionBlock } from '@mysten/sui.js'

export function decompressPubkey(
  txb: TransactionBlock,
  pubkey: Array<number | TransactionArgument>
) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::ecdsa_k1::decompress_pubkey`,
    arguments: [pure(txb, pubkey, `vector<u8>`)],
  })
}

export interface Secp256k1EcrecoverArgs {
  signature: Array<number | TransactionArgument>
  msg: Array<number | TransactionArgument>
  hash: number | TransactionArgument
}

export function secp256k1Ecrecover(txb: TransactionBlock, args: Secp256k1EcrecoverArgs) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::ecdsa_k1::secp256k1_ecrecover`,
    arguments: [
      pure(txb, args.signature, `vector<u8>`),
      pure(txb, args.msg, `vector<u8>`),
      pure(txb, args.hash, `u8`),
    ],
  })
}

export interface Secp256k1VerifyArgs {
  signature: Array<number | TransactionArgument>
  publicKey: Array<number | TransactionArgument>
  msg: Array<number | TransactionArgument>
  hash: number | TransactionArgument
}

export function secp256k1Verify(txb: TransactionBlock, args: Secp256k1VerifyArgs) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::ecdsa_k1::secp256k1_verify`,
    arguments: [
      pure(txb, args.signature, `vector<u8>`),
      pure(txb, args.publicKey, `vector<u8>`),
      pure(txb, args.msg, `vector<u8>`),
      pure(txb, args.hash, `u8`),
    ],
  })
}
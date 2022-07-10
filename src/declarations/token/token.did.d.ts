import type { Principal } from '@dfinity/principal';
export interface _SERVICE {
  'check_balance' : (arg_0: Principal) => Promise<bigint>,
  'free_tokens' : () => Promise<string>,
  'transfer' : (arg_0: Principal, arg_1: bigint) => Promise<string>,
}

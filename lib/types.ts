export type ChainId = 'bsc' | 'bsc-testnet' | 'eth' | 'polygon';

export interface TokenInfo {
  address: string;
  name: string;
  symbol: string;
  totalSupply: string; // raw
  decimals: number;
  holders: number;
  transfers: number;
  circulating?: string;
  verified: boolean;
  links: { bscscan: string; whitepaper?: string; twitter?: string; website?: string; };
}

export interface LockRecord {
  platform: 'PinkLock' | 'TeamFinance' | 'Other';
  txHash: string;
  amount: string;        // raw
  unlockTime: number;    // unix seconds
  lockTime: number;      // unix seconds
  tokenAddress: string;
  lockerAddress?: string;
  url: string;
}

export interface AllocationSlice {
  nameKey: string;
  percent: number;
}

export interface AuditInfo {
  vendor: 'CertiK' | 'SolidProof' | 'AuditRate' | 'Other';
  reportUrl: string;
  date: string; // ISO
  status: 'passed' | 'in-review' | 'planned';
}

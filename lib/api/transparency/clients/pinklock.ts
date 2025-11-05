import { LockRecord } from "@/lib/types";

export async function getLocks(tokenAddress: string): Promise<LockRecord[]> {
  return [
    {
      platform: "PinkLock",
      txHash: "0xmocktx1",
      amount: "20000000000000000000000000",
      lockTime: Math.floor(Date.now()/1000) - 7*24*3600,
      unlockTime: Math.floor(Date.now()/1000) + 30*24*3600,
      tokenAddress,
      url: "https://pinklock.app/mock/lock/0xmocktx1"
    },
    {
      platform: "TeamFinance",
      txHash: "0xmocktx2",
      amount: "5000000000000000000000000",
      lockTime: Math.floor(Date.now()/1000) - 10*24*3600,
      unlockTime: Math.floor(Date.now()/1000) + 7*24*3600,
      tokenAddress,
      url: "https://team.finance/mock/lock/0xmocktx2"
    }
  ];
}

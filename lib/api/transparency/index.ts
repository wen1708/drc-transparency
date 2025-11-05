import { getTokenInfo as bscGetTokenInfo } from "./clients/bscscan";
import { getLocks as pinkGetLocks } from "./clients/pinklock";
import type { AllocationSlice, AuditInfo, LockRecord, TokenInfo } from "@/lib/types";

const TOKEN_ADDRESS = process.env.NEXT_PUBLIC_DRC_ADDRESS || "0xYourTokenAddressHere";

export async function fetchTokenInfo(): Promise<TokenInfo> {
  return bscGetTokenInfo(TOKEN_ADDRESS);
}

export async function fetchLocks(): Promise<LockRecord[]> {
  return pinkGetLocks(TOKEN_ADDRESS);
}

export async function fetchAllocation(): Promise<AllocationSlice[]> {
  return [
    { nameKey: "团队", percent: 15 },
    { nameKey: "市场与成长", percent: 25 },
    { nameKey: "流动性池", percent: 45 },
    { nameKey: "合作与生态", percent: 15 }
  ];
}

export async function fetchAudit(): Promise<AuditInfo> {
  return {
    vendor: "SolidProof",
    reportUrl: "#",
    date: new Date().toISOString(),
    status: "in-review"
  };
}

// lib/api/transparency/clients/bscscan.ts
import { TokenInfo } from "@/lib/types";

/**
 * 浠?Etherscan V2 API 鑾峰彇浠ｅ竵淇℃伅锛堝悕绉般€佺鍙枫€佹€讳緵搴斻€侀獙璇佺姸鎬侊級
 * 閫氳繃鏈湴 Next.js API 璺敱浠ｇ悊锛岄伩鍏嶆毚闇?API Key銆?
 */
export async function getTokenInfo(address: string): Promise<TokenInfo> {
  // 璋冪敤鎴戜滑鑷繁鍐欑殑鏈嶅姟绔唬鐞嗚矾鐢?
  const r = await fetch(`/api/etherscan/token-details?address=${encodeURIComponent(address)}`, { cache: "no-store" });

  if (!r.ok) {
    throw new Error(`etherscan proxy error: ${r.status}`);
  }

  const data = await r.json();

  // 缁熶竴鏍煎紡杩斿洖
  return {
    address: data.address,
    name: data.name ?? "Unknown",
    symbol: data.symbol ?? "TKN",
    totalSupply: String(data.totalSupply ?? "0"),
    decimals: Number.isFinite(data.decimals) ? data.decimals : 18,
    holders: Number(data.holders ?? 0),
    transfers: Number(data.transfers ?? 0),
    verified: Boolean(data.verified),
    links: data.links ?? { bscscan: `https://bscscan.com/token/${data.address}` },
  };
}

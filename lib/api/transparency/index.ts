// lib/api/transparency/index.ts

type TokenDetails = {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: string;
  verified: boolean;
  holders: number;
  transfers: number;
  links?: {
    bscscan?: string;
  };
};

/**
 * 璇诲彇 DRC 浠ｅ竵淇℃伅锛堥€氳繃浣犻」鐩唴鐨?/api/etherscan/token-details锛?
 * - 鏈嶅姟绔皟鐢細浣跨敤缁濆鍦板潃锛堝吋瀹规湰鍦颁笌 Vercel锛?
 */
export async function getDRCTokenDetails(): Promise<TokenDetails> {
  const addr =
    process.env.NEXT_PUBLIC_DRC_ADDRESS ??
    "0x457C1274ff9B4e3c35b518A63D9DA566faf9D09b";

  const origin = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  const url = `${origin}/api/etherscan/token-details?address=${addr}`;

  const res = await fetch(url, {
    // 鏈嶅姟鍣ㄧ粍浠跺彲缂撳瓨/鍐嶉獙璇侊紝鎸夐渶璋冩暣
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch token details: ${res.status}`);
  }

  const json = await res.json();

  // 缁熶竴杩斿洖缁撴瀯锛屽苟琛ュ叏 address
  const data: TokenDetails = {
    address: addr,
    name: json.name ?? "Unknown",
    symbol: json.symbol ?? "TKN",
    decimals: Number(json.decimals ?? 18),
    totalSupply: String(json.totalSupply ?? "0"),
    verified: Boolean(json.verified),
    holders: Number(json.holders ?? 0),
    transfers: Number(json.transfers ?? 0),
    links: json.links ?? {
      bscscan: `https://bscscan.com/token/${addr}`,
    },
  };

  return data;
}

// lib/api/transparency/clients/bscscan.ts
import { TokenInfo } from "@/lib/types";

/**
 * 从 Etherscan V2 API 获取代币信息（名称、符号、总供应、验证状态）
 * 通过本地 Next.js API 路由代理，避免暴露 API Key。
 */
export async function getTokenInfo(address: string): Promise<TokenInfo> {
  // 调用我们自己写的服务端代理路由
  const r = await fetch(`/api/etherscan/token-details?address=${encodeURIComponent(address)}`, { cache: "no-store" });

  if (!r.ok) {
    throw new Error(`etherscan proxy error: ${r.status}`);
  }

  const data = await r.json();

  // 统一格式返回
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

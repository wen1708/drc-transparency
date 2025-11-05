import { NextResponse } from "next/server";

const ETHERSCAN_BASE = "https://api.etherscan.io/v2/api";
const KEY = process.env.ETHERSCAN_API_KEY!;
const CHAIN_ID = process.env.DRC_CHAIN_ID || "56"; // 56=BSC主网, 97=BSC测试网
const RPC_URL = process.env.BSC_RPC_URL || "https://bsc-dataseed.binance.org";

const qs = (o: Record<string, string>) =>
  ETHERSCAN_BASE + "?" + new URLSearchParams({ ...o, chainid: CHAIN_ID, apikey: KEY }).toString();

async function jget(url: string) {
  const r = await fetch(url, { cache: "no-store" });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json();
}

/** ---------- JSON-RPC helpers ---------- */
async function ethCall(to: string, data: string) {
  const r = await fetch(RPC_URL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "eth_call",
      params: [{ to, data }, "latest"],
    }),
  });
  const j = await r.json();
  if (j.error) throw new Error(j.error.message || "eth_call failed");
  return (j.result || "0x") as string;
}
const strip0x = (s: string) => (s?.startsWith("0x") ? s.slice(2) : s);

function hexToUtf8(hex: string): string {
  const bytes = hex.match(/.{1,2}/g)?.map((b) => parseInt(b, 16)) ?? [];
  return new TextDecoder().decode(new Uint8Array(bytes));
}
function decodeAbiString(ret: string): string | undefined {
  // 标准 ABI 编码: [offset][... padding ...][length][data...]
  const h = strip0x(ret);
  if (h.length < 64 * 2) return undefined;
  const offset = parseInt(h.slice(0, 64), 16);
  if (offset % 32 !== 0) return undefined;
  const start = offset * 2;
  const len = parseInt(h.slice(start, start + 64), 16);
  const data = h.slice(start + 64, start + 64 + len * 2);
  return hexToUtf8(data);
}
function decodeAbiUint256(ret: string): string {
  const h = strip0x(ret).padStart(64, "0");
  const word = h.slice(-64);
  return BigInt("0x" + word).toString(10);
}
function decodeAbiUint8(ret: string): number {
  const h = strip0x(ret).padStart(64, "0");
  const word = h.slice(-64);
  return Number(BigInt("0x" + word));
}

// 已知选择器
const SELECTORS = {
  name: "0x06fdde03",
  symbol: "0x95d89b41",
  decimals: "0x313ce567",
  totalSupply: "0x18160ddd",
};

export async function GET(req: Request) {
  const address = new URL(req.url).searchParams.get("address");
  if (!address) return NextResponse.json({ error: "address is required" }, { status: 400 });
  if (!KEY) return NextResponse.json({ error: "missing ETHERSCAN_API_KEY" }, { status: 500 });

  let name: string | undefined;
  let symbol: string | undefined;
  let decimals: number | undefined;
  let totalSupply: string | undefined;
  let verified = false;
  let holders = 0;
  let transfers = 0;

  // 1) 优先：Etherscan V2
  try {
    const tokenInfo = await jget(qs({ module: "token", action: "tokeninfo", contractaddress: address }));
    const info = Array.isArray(tokenInfo?.result) ? tokenInfo.result[0] : {};
    name = info?.tokenName || info?.name;
    symbol = info?.tokenSymbol || info?.symbol;
    decimals = Number(info?.divisor ?? info?.decimals);

    const supplyRes = await jget(qs({ module: "stats", action: "tokensupply", contractaddress: address })).catch(() => null);
    totalSupply =
      supplyRes?.status === "1" && supplyRes?.result ? String(supplyRes.result) :
      info?.totalSupply ? String(info.totalSupply) : undefined;

    const source = await jget(qs({ module: "contract", action: "getsourcecode", address })).catch(() => null);
    verified = Boolean(source?.result?.[0]?.SourceCode);
  } catch {
    // 忽略，进入 RPC 回退
  }

  // 2) 回退：直接 JSON-RPC 读 ERC-20 方法（缺啥补啥）
  try {
    if (!name) {
      const ret = await ethCall(address, SELECTORS.name);
      const v = decodeAbiString(ret);
      if (v) name = v;
    }
    if (!symbol) {
      const ret = await ethCall(address, SELECTORS.symbol);
      const v = decodeAbiString(ret);
      if (v) symbol = v;
    }
    if (decimals === undefined || Number.isNaN(decimals)) {
      const ret = await ethCall(address, SELECTORS.decimals);
      decimals = decodeAbiUint8(ret);
    }
    if (!totalSupply) {
      const ret = await ethCall(address, SELECTORS.totalSupply);
      totalSupply = decodeAbiUint256(ret);
    }
  } catch {
    // 可能是非标准实现，继续兜底
  }

  // 3) 附加统计：HOLDERS（PRO 端点; 免费失败则忽略为0） & TRANSFERS（最近样本数）
  try {
    const h = await jget(qs({
      module: "token",
      action: "tokenholdercount",
      contractaddress: address
    }));
    if (h?.status === "1" && h?.result) {
      holders = Number(h.result) || 0;
    }
  } catch { /* ignore */ }

  try {
    const t = await jget(qs({
      module: "account",
      action: "tokentx",
      contractaddress: address,
      page: "1",
      offset: "100",   // 最近 100 条；需要更大样本可以调大并分页聚合（建议在后端定时任务里做）
      sort: "desc"
    }));
    if (t?.status === "1" && Array.isArray(t?.result)) {
      transfers = t.result.length;
    }
  } catch { /* ignore */ }

  // 4) 返回（兜底不报错）
  return NextResponse.json({
    address,
    name: name || "Unknown",
    symbol: symbol || "TKN",
    decimals: Number.isFinite(decimals!) ? decimals : 18,
    totalSupply: totalSupply || "0",
    verified,
    holders,
    transfers,
    links: { bscscan: `https://bscscan.com/token/${address}` },
  });
}

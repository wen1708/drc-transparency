// app/api/transparency/route.ts
import { NextResponse } from "next/server";
import { createPublicClient, http, formatUnits } from "viem";
import { bsc } from "viem/chains";

const ERC20_ABI = [
  { type: "function", name: "decimals", stateMutability: "view", inputs: [], outputs: [{ type: "uint8" }] },
  { type: "function", name: "totalSupply", stateMutability: "view", inputs: [], outputs: [{ type: "uint256" }] },
  { type: "function", name: "balanceOf", stateMutability: "view", inputs: [{ name: "account", type: "address" }], outputs: [{ type: "uint256" }] },
] as const;

let cache: { data: any; ts: number } | null = null;
const TTL_MS = 8_000;

export async function GET() {
  const now = Date.now();
  if (cache && now - cache.ts < TTL_MS) {
    return NextResponse.json({ ...cache.data, _cache: true });
  }

  const rpcUrl = process.env.BSC_RPC_URL;
  const tokenAddress = process.env.NEXT_PUBLIC_DRC_ADDRESS as `0x${string}` | undefined;
  const chainId = process.env.DRC_CHAIN_ID ?? "56";
  const lockedJson = process.env.DRC_LOCKED_ADDRESSES ?? "[]";

  if (!rpcUrl || !tokenAddress) {
    return NextResponse.json({ error: true, message: "Missing env: BSC_RPC_URL or NEXT_PUBLIC_DRC_ADDRESS" }, { status: 500 });
  }

  let lockedList: { label: string; address: `0x${string}` }[] = [];
  try { lockedList = JSON.parse(lockedJson); } catch {
    return NextResponse.json({ error: true, message: "DRC_LOCKED_ADDRESSES must be valid JSON" }, { status: 500 });
  }

  try {
    const client = createPublicClient({ chain: bsc, transport: http(rpcUrl) });

    const [decimals, totalSupplyRaw, blockNumber] = await Promise.all([
      client.readContract({ address: tokenAddress, abi: ERC20_ABI, functionName: "decimals" }) as Promise<number>,
      client.readContract({ address: tokenAddress, abi: ERC20_ABI, functionName: "totalSupply" }) as Promise<bigint>,
      client.getBlockNumber(),
    ]);

    const lockedBalances = await Promise.all(
      lockedList.map(async (item) => {
        const bal = (await client.readContract({
          address: tokenAddress, abi: ERC20_ABI, functionName: "balanceOf", args: [item.address],
        })) as bigint;
        return { label: item.label, address: item.address, raw: bal, value: formatUnits(bal, decimals) };
      })
    );

    const lockedSumRaw = lockedBalances.reduce((acc, x) => acc + x.raw, 0n);
    const circulatingRaw = totalSupplyRaw - lockedSumRaw;

    const payload = {
      chainId,
      address: tokenAddress,
      decimals,
      totalSupply: formatUnits(totalSupplyRaw, decimals),
      circulating: formatUnits(circulatingRaw, decimals),
      locked: Object.fromEntries(lockedBalances.map((x) => [x.label, x.value])),
      lastOnchainBlock: Number(blockNumber),
      updatedAt: new Date().toISOString(),
    };

    cache = { data: payload, ts: now };
    return NextResponse.json(payload);
  } catch (err: any) {
    return NextResponse.json({ error: true, message: err?.message || "On-chain fetch failed" }, { status: 500 });
  }
}

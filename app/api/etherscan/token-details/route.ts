// app/api/etherscan/token-details/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const address = searchParams.get("address");
    const apiKey = process.env.ETHERSCAN_API_KEY;
    if (!address) {
      return NextResponse.json({ error: "Missing address" }, { status: 400 });
    }
    if (!apiKey) {
      return NextResponse.json({ error: "Missing ETHERSCAN_API_KEY" }, { status: 500 });
    }

    // Total supply
    const supplyUrl = `https://api.bscscan.com/api?module=stats&action=tokensupply&contractaddress=${address}&apikey=${apiKey}`;
    const metaUrl = `https://api.bscscan.com/api?module=token&action=tokeninfo&contractaddress=${address}&apikey=${apiKey}`;

    const [supplyRes, metaRes] = await Promise.all([fetch(supplyUrl), fetch(metaUrl)]);
    if (!supplyRes.ok) throw new Error(`BscScan supply HTTP ${supplyRes.status}`);
    if (!metaRes.ok) throw new Error(`BscScan tokeninfo HTTP ${metaRes.status}`);

    const supplyJson = await supplyRes.json();
    const metaJson = await metaRes.json();

    const totalSupply = supplyJson?.result ?? null;
    const info = Array.isArray(metaJson?.result) ? metaJson.result[0] : null;

    return NextResponse.json({
      address,
      totalSupply,
      name: info?.tokenName ?? null,
      symbol: info?.symbol ?? null,
      decimals: info?.divisor ? Number(info.divisor) : info?.decimals ? Number(info.decimals) : null,
      raw: { supplyJson, metaJson },
    });
  } catch (e: any) {
    return NextResponse.json({ error: String(e?.message || e) }, { status: 500 });
  }
}


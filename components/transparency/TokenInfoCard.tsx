// components/transparency/TokenInfoCard.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export function TokenInfoCard({
  name,
  symbol,
  decimals,
  totalSupply,
  circulating,
}: {
  name?: string | null;
  symbol?: string | null;
  decimals?: number | null;
  totalSupply?: string | number | null;
  circulating?: string | number | null;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Token</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1 text-sm">
        <div>Name: {name ?? "—"}</div>
        <div>Symbol: {symbol ?? "—"}</div>
        <div>Decimals: {decimals ?? "—"}</div>
        <div>Total Supply: {totalSupply ?? "—"}</div>
        <div>Circulating: {circulating ?? "—"}</div>
      </CardContent>
    </Card>
  );
}

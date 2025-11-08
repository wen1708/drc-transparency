// components/transparency/ContractBox.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export function ContractBox({
  chainId,
  address,
}: {
  chainId?: string | number | null;
  address?: string | null;
}) {
  const isBsc = String(chainId) === "56";
  const scan = isBsc ? "https://bscscan.com/address/" : "https://testnet.bscscan.com/address/";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contract</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="text-sm">Chain ID: {chainId ?? "—"}</div>
        <div className="text-sm break-all">
          Address:{" "}
          {address ? (
            <a
              className="underline underline-offset-4"
              href={scan + address}
              target="_blank"
              rel="noreferrer"
            >
              {address}
            </a>
          ) : (
            "—"
          )}
        </div>
      </CardContent>
    </Card>
  );
}

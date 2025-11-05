'use client';
import { Card } from "@/components/ui/Card";

export function ContractBox() {
  const address = process.env.NEXT_PUBLIC_DRC_ADDRESS || "0xYourTokenAddressHere";
  return (
    <Card className="p-5 space-y-2">
      <div className="text-sm text-slate-500">合约地址</div>
      <div className="font-mono break-all">{address}</div>
      <div className="text-sm">
        <button
          className="mt-2 rounded-xl border px-3 py-1"
          onClick={() => navigator.clipboard.writeText(address)}
        >复制地址</button>
      </div>
    </Card>
  );
}

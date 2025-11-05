'use client';
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Skeleton } from "@/components/ui/Skeleton";
import { StatKPI } from "./StatKPI";
import { TokenInfo } from "@/lib/types";
import { formatUnits } from "@/lib/format";

export function TokenInfoCard({ data, loading, error }: { data?: TokenInfo; loading?: boolean; error?: any }) {
  if (loading) return <Skeleton className="h-40 w-full" />;
  if (error || !data) return <Card className="p-5">无法获取代币信息。<button className="ml-2 underline">重试</button></Card>;
  return (
    <Card className="p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">{data.name} ({data.symbol})</h3>
        <Badge tone={data.verified ? "success" : "muted"}>{data.verified ? "Verified" : "Unverified"}</Badge>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatKPI label="总供应量" value={formatUnits(data.totalSupply, data.decimals)} />
        <StatKPI label="持有人数" value={data.holders.toLocaleString()} />
        <StatKPI label="转账次数" value={data.transfers.toLocaleString()} />
        {data.circulating && <StatKPI label="流通量" value={formatUnits(data.circulating, data.decimals)} />}
      </div>
      <div className="text-sm text-slate-500 break-all">
        合约：<a href={data.links.bscscan} className="underline" aria-label="在 BscScan 查看合约">{data.address}</a>
      </div>
    </Card>
  );
}

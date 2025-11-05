'use client';
import dayjs from "dayjs";
import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { LockRecord } from "@/lib/types";
import { formatUnits } from "@/lib/format";

export function LocksSection({ data, loading, error }: { data?: LockRecord[]; loading?: boolean; error?: any }) {
  if (loading) return <Skeleton className="h-56 w-full" />;
  if (error) return <Card className="p-5">锁仓数据获取失败。</Card>;
  if (!data || data.length === 0) return <Card className="p-5">暂无锁仓记录。</Card>;
  return (
    <Card className="p-0 overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-slate-50">
          <tr>
            <th className="text-left p-3">平台</th>
            <th className="text-left p-3">数量</th>
            <th className="text-left p-3">解锁时间</th>
            <th className="text-left p-3">交易</th>
          </tr>
        </thead>
        <tbody>
          {data.map((r) => {
            const soon = r.unlockTime - Math.floor(Date.now()/1000) <= 7*24*3600;
            return (
              <tr key={r.txHash} className={`border-t ${soon ? "bg-warning/10" : ""}`}>
                <td className="p-3">{r.platform}</td>
                <td className="p-3 font-mono">{formatUnits(r.amount, 18)}</td>
                <td className="p-3">{dayjs.unix(r.unlockTime).format("YYYY-MM-DD HH:mm")}</td>
                <td className="p-3"><a className="underline" href={r.url} aria-label="查看锁仓交易">查看</a></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}

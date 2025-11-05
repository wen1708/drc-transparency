import { Card } from "@/components/ui/Card";
import { AuditInfo } from "@/lib/types";

export function AuditCard({ data, loading }: { data?: AuditInfo; loading?: boolean }) {
  if (loading) return <Card className="p-5">加载审计信息…</Card>;
  if (!data) return <Card className="p-5">暂无审计信息。</Card>;
  return (
    <Card className="p-5 space-y-2">
      <div className="text-sm text-slate-500">审计机构</div>
      <div className="text-lg font-semibold">{data.vendor}</div>
      <a className="underline" href={data.reportUrl}>查看报告</a>
      <div className="text-xs text-slate-500">状态：{data.status}</div>
    </Card>
  );
}

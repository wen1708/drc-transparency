'use client';
import { Card } from "@/components/ui/Card";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { AllocationSlice } from "@/lib/types";

export function AllocationChart({ data, loading, error }: { data?: AllocationSlice[]; loading?: boolean; error?: any }) {
  if (loading) return <Card className="p-5">加载分配结构…</Card>;
  if (error || !data) return <Card className="p-5">无法加载分配结构。</Card>;
  const palette = ["#5B8CFF", "#16A34A", "#F59E0B", "#0EA5E9", "#DC2626"];
  return (
    <Card className="p-5">
      <h4 className="font-medium mb-4">代币分配</h4>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="percent" nameKey="nameKey" label>
              {data.map((_, i) => <Cell key={i} fill={palette[i % palette.length]} />)}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

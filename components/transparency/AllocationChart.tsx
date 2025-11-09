// components/transparency/AllocationChart.tsx
"use client";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export type AllocationSlice = { name: string; value: number };

export function AllocationChart({ data }: { data?: AllocationSlice[] }) {
  if (!data || data.length === 0) {
    return (
      <Card className="border-slate-800 bg-slate-900/50">
        <CardContent className="p-5 text-sm text-slate-400">
          No allocation data available.
        </CardContent>
      </Card>
    );
  }
  const palette = ["#60a5fa","#34d399","#f59e0b","#0ea5e9","#ef4444","#a78bfa"];
  return (
    <Card className="border-slate-800 bg-slate-900/50">
      <CardHeader><CardTitle className="text-slate-100">Locked Breakdown</CardTitle></CardHeader>
      <CardContent>
        <div className="h-72 w-full">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" outerRadius={110}>
                {data.map((_, i) => <Cell key={i} fill={palette[i % palette.length]} />)}
              </Pie>
              <Tooltip
                contentStyle={{ background: "#0f172a", border: "1px solid #334155", color: "#e2e8f0" }}
                itemStyle={{ color: "#e2e8f0" }}
                labelStyle={{ color: "#93c5fd" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

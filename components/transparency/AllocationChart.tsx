// components/transparency/AllocationChart.tsx
"use client";

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export type AllocationSlice = { name: string; value: number };

export function AllocationChart({
  data,
  loading,
  error,
}: {
  data?: AllocationSlice[];
  loading?: boolean;
  error?: any;
}) {
  if (loading) {
    return <Card className="p-5">Loading allocation…</Card>;
  }
  if (error || !data || data.length === 0) {
    return <Card className="p-5">No allocation data available.</Card>;
  }

  // 不指定颜色也可以，但给 5 个基础色更清晰（可按需增减）
  const palette = ["#5B8CFF", "#16A34A", "#F59E0B", "#0EA5E9", "#DC2626", "#7C3AED", "#059669"];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Allocation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-72 w-full">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" outerRadius={110}>
                {data.map((_, i) => (
                  <Cell key={i} fill={palette[i % palette.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

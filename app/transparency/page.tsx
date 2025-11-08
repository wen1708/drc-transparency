// app/transparency/page.tsx
"use client";
import useSWR from "swr";
import { useCallback, useEffect, useMemo, useState } from "react";
import { StatusBar } from "@/components/ui/StatusBar";
import { Skeleton } from "@/components/ui/Skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { useAutoRefresh } from "@/lib/useAutoRefresh";

const fetcher = (url: string) =>
  fetch(url).then((r) => {
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.json();
  });

export default function TransparencyPage() {
  const { enabled, setEnabled, tick, lastUpdated, markUpdated } =
    useAutoRefresh(10_000);
  const [manualKey, setManualKey] = useState(0);

  const key = useMemo(
    () => `/api/transparency?ts=${tick}-${manualKey}`,
    [tick, manualKey]
  );

  const { data, error, isLoading, mutate } = useSWR(key, fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: true,
    errorRetryCount: 2,
    errorRetryInterval: 4000,
    keepPreviousData: true,
  });

  useEffect(() => {
    if (!data) return;
    markUpdated();
    localStorage.setItem("drc:last", JSON.stringify(data));
  }, [data, markUpdated]);

  const cached = useMemo(() => {
    try {
      const raw = localStorage.getItem("drc:last");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }, []);

  const safe = data || cached;
  const loading = isLoading && !safe;

  const onManualRefresh = useCallback(async () => {
    setManualKey((k) => k + 1);
    await mutate();
  }, [mutate]);

  const pieData = useMemo(() => {
    if (!safe?.locked) return [];
    return Object.entries(safe.locked).map(([k, v]) => ({
      name: k,
      value: Number(v),
    }));
  }, [safe]);

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4 md:p-8">
      <h1 className="text-2xl font-semibold tracking-tight">
        DragonCoin Transparency (Live)
      </h1>

      <StatusBar
        enabled={enabled}
        onToggle={setEnabled}
        onManualRefresh={onManualRefresh}
        lastUpdated={lastUpdated}
        loading={isLoading}
      />

      {error && (
        <div className="rounded-2xl border border-red-300 bg-red-50 p-4 text-sm text-red-800">
          Data fetch failed. Retrying automatically. Details:{" "}
          {String(error.message || error)}
        </div>
      )}

      {/* --- Key Figures --- */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Total Supply</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-40" />
            ) : (
              <div className="text-2xl font-semibold">
                {safe?.totalSupply ?? "—"}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Circulating</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-40" />
            ) : (
              <div className="text-2xl font-semibold">
                {safe?.circulating ?? "—"}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Last On-chain Block</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-32" />
            ) : (
              <div className="text-2xl font-semibold">
                {safe?.lastOnchainBlock ?? "—"}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* --- Locked Breakdown --- */}
      <Card>
        <CardHeader>
          <CardTitle>Locked Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-64 w-full" />
          ) : pieData.length === 0 ? (
            <div className="rounded-xl border p-4 text-sm opacity-80">
              No locked addresses configured yet. Add{" "}
              <code>DRC_LOCKED_ADDRESSES</code> in your <code>.env.local</code>{" "}
              file to display this chart.
            </div>
          ) : pieData.every((d) => !d.value) ? (
            <div className="rounded-xl border p-4 text-sm opacity-80">
              Locked addresses detected, but all balances are 0. Update
              configuration or balances to see the chart.
            </div>
          ) : (
            <div className="h-72 w-full">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                  >
                    {pieData.map((_, i) => (
                      <Cell key={i} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="text-xs opacity-70">
        Chain: {safe?.chainId ?? "—"} · Contract: {safe?.address ?? "—"} ·
        Updated: {safe?.updatedAt ?? "—"}
      </div>
    </div>
  );
}

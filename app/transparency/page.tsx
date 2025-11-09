// app/transparency/page.tsx
"use client";

import useSWR from "swr";
import { useCallback, useEffect, useMemo, useState } from "react";
import { StatusBar } from "@/components/ui/StatusBar";
import { Skeleton } from "@/components/ui/Skeleton"; // ✅ 注意大写 S
import { Card, CardContent } from "@/components/ui/Card";
import { AllocationChart, AllocationSlice } from "@/components/transparency/AllocationChart";
import { useAutoRefresh } from "@/lib/useAutoRefresh";

const fetcher = (url: string) =>
  fetch(url).then((r) => {
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.json();
  });

export default function TransparencyPage() {
  const { enabled, setEnabled, tick, lastUpdated, markUpdated } = useAutoRefresh(10_000);
  const [manualKey, setManualKey] = useState(0);
  const [mounted, setMounted] = useState(false); // 用于避免首屏 hydration 不一致
  useEffect(() => setMounted(true), []);

  const key = useMemo(() => `/api/transparency?ts=${tick}-${manualKey}`, [tick, manualKey]);

  const { data, error, isLoading, mutate } = useSWR(key, fetcher, {
    revalidateOnFocus: false,
    keepPreviousData: true,
    errorRetryCount: 2,
    errorRetryInterval: 4000,
  });

  // 到了真正拿到数据再标记更新时间；仅在已挂载后写入本地缓存
  useEffect(() => {
    if (!data) return;
    markUpdated();
    if (mounted) {
      try {
        localStorage.setItem("drc:last", JSON.stringify(data));
      } catch {}
    }
  }, [data, markUpdated, mounted]);

  // 首屏（未 mounted）不读取 localStorage，保证与服务端一致
  const safe = useMemo(() => {
    if (data) return data;
    if (!mounted) return undefined;
    try {
      const raw = localStorage.getItem("drc:last");
      return raw ? JSON.parse(raw) : undefined;
    } catch {
      return undefined;
    }
  }, [data, mounted]);

  const onManualRefresh = useCallback(async () => {
    setManualKey((k) => k + 1);
    await mutate();
  }, [mutate]);

  const pieData: AllocationSlice[] | undefined = useMemo(() => {
    if (!safe?.locked) return undefined;
    const arr = Object.entries(safe.locked).map(([k, v]) => ({
      name: k,
      value: Number(v),
    }));
    return arr.every((d) => !d.value) ? undefined : arr;
  }, [safe]);

  // 小工具：包一层，默认值“—”，并抑制水合警告
  const Num = ({ value }: { value: any }) => (
    <span suppressHydrationWarning>{value ?? "—"}</span>
  );

  return (
    <div className="space-y-6">
      {/* Title */}
      <h1 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.25)]">
        DragonCoin Transparency (Live)
      </h1>

      {/* Status Bar */}
      <StatusBar
        enabled={enabled}
        onToggle={setEnabled}
        onManualRefresh={onManualRefresh}
        lastUpdated={lastUpdated}
        loading={isLoading}
      />

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-900/40 bg-red-950/40 p-3 text-sm text-red-200">
          Data fetch failed. Retrying automatically. Details: {String(error.message || error)}
        </div>
      )}

      {/* KPI Row */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Total Supply */}
        <Card className="border-slate-800 bg-slate-900/50">
          <CardContent className="p-6">
            <div className="text-xs font-medium text-sky-300">TOTAL SUPPLY</div>
            {isLoading && !safe ? (
              <Skeleton className="mt-2 h-8 w-40" />
            ) : (
              // ✅ 字体改为黑色，其他不变（你当前卡片底可能是浅色时更清晰）
              <div className="mt-1 text-2xl font-bold text-slate-900 drop-shadow-[0_0_3px_rgba(0,0,0,0.25)] kpi-number">
                <Num value={safe?.totalSupply} />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Circulating */}
        <Card className="border-slate-800 bg-slate-900/50">
          <CardContent className="p-6">
            <div className="text-xs font-medium text-emerald-300">CIRCULATING</div>
            {isLoading && !safe ? (
              <Skeleton className="mt-2 h-8 w-40" />
            ) : (
              <div className="mt-1 text-2xl font-bold text-slate-900 drop-shadow-[0_0_3px_rgba(0,0,0,0.25)] kpi-number">
                <Num value={safe?.circulating} />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Last On-chain Block */}
        <Card className="border-slate-800 bg-slate-900/50">
          <CardContent className="p-6">
            <div className="text-xs font-medium text-amber-300">LAST ON-CHAIN BLOCK</div>
            {isLoading && !safe ? (
              <Skeleton className="mt-2 h-8 w-28" />
            ) : (
              <div className="mt-1 text-2xl font-bold text-slate-900 drop-shadow-[0_0_3px_rgba(0,0,0,0.25)] kpi-number">
                <Num value={safe?.lastOnchainBlock} />
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Allocation Chart */}
      <AllocationChart data={pieData} />

      {/* Footer Info */}
      <div className="text-xs text-slate-400">
        Chain: <span suppressHydrationWarning>{safe?.chainId ?? "—"}</span> · Contract:{" "}
        <span suppressHydrationWarning>{safe?.address ?? "—"}</span> · Updated:{" "}
        <span suppressHydrationWarning>{safe?.updatedAt ?? "—"}</span>
      </div>
    </div>
  );
}

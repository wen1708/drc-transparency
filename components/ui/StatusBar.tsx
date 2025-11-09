// components/ui/StatusBar.tsx
"use client";
import { useMemo } from "react";
import { Button } from "@/components/ui/Button";
import { Switch } from "@/components/ui/switch";

type Props = {
  enabled: boolean;
  onToggle: (v: boolean) => void;
  onManualRefresh: () => void;
  lastUpdated?: number | null;
  loading?: boolean;
};

export function StatusBar({ enabled, onToggle, onManualRefresh, lastUpdated, loading }: Props) {
  const timeAgo = useMemo(() => {
    if (!lastUpdated) return "—";
    const sec = Math.floor((Date.now() - lastUpdated) / 1000);
    if (sec < 60) return `${sec}s ago`;
    const m = Math.floor(sec / 60);
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    return `${h}h ago`;
  }, [lastUpdated]);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
      <div className="flex items-center gap-3">
        <Switch checked={enabled} onCheckedChange={onToggle} />
        <span className="text-sm text-slate-200">Auto Refresh</span>
        <span className="ml-3 text-xs text-slate-400">Last update: {timeAgo}</span>
        {loading ? <span className="ml-2 text-xs text-slate-400">Loading…</span> : null}
      </div>
      <Button
        variant="secondary"
        onClick={onManualRefresh}
        disabled={!!loading}
        className="bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700"
      >
        Refresh now
      </Button>
    </div>
  );
}

// components/ui/StatusBar.tsx
"use client";

import { useMemo } from "react";
import { Button } from "@/components/ui/Button";   // 注意大写 B（已统一）
import { Switch } from "@/components/ui/switch";   // 你之前创建的是小写文件名 switch.tsx

type Props = {
  enabled: boolean;
  onToggle: (v: boolean) => void;
  onManualRefresh: () => void;
  lastUpdated?: number | null;
  loading?: boolean;
};

export function StatusBar({
  enabled,
  onToggle,
  onManualRefresh,
  lastUpdated,
  loading,
}: Props) {
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
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border p-3">
      <div className="flex items-center gap-3">
        <Switch checked={enabled} onCheckedChange={onToggle} />
        <span className="text-sm">Auto Refresh</span>
        <span className="ml-3 text-xs opacity-70">
          Last update: {timeAgo}
        </span>
        {loading ? (
          <span className="ml-2 text-xs opacity-70">Loading…</span>
        ) : null}
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          onClick={onManualRefresh}
          disabled={!!loading}
        >
          Refresh now
        </Button>
      </div>
    </div>
  );
}

// lib/useAutoRefresh.ts
import { useEffect, useRef, useState } from "react";

export function useAutoRefresh(intervalMs = 10_000) {
  const [enabled, setEnabled] = useState(true);
  const [tick, setTick] = useState(0);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);
  const ref = useRef<NodeJS.Timeout | null>(null);

  const markUpdated = () => setLastUpdated(Date.now());

  useEffect(() => {
    if (!enabled) return;
    ref.current = setInterval(() => setTick((t) => t + 1), intervalMs);
    return () => { if (ref.current) clearInterval(ref.current); };
  }, [enabled, intervalMs]);

  return { enabled, setEnabled, tick, lastUpdated, markUpdated } as const;
}

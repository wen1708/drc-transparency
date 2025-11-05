export function formatUnits(raw: string, decimals: number) {
  if (!raw) return "0";
  const neg = raw.startsWith("-");
  const s = neg ? raw.slice(1) : raw;
  const pad = s.padStart(decimals + 1, "0");
  const head = pad.slice(0, -decimals);
  const tail = pad.slice(-decimals).replace(/0+$/, "");
  const out = tail ? `${head}.${tail}` : head;
  return neg ? `-${out}` : out;
}

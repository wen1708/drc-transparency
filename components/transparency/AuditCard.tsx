// components/transparency/AuditCard.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export function AuditCard({
  status = "Pending",
  link,
}: {
  status?: "Pending" | "Passed" | "Failed";
  link?: string;
}) {
  const color =
    status === "Passed" ? "text-green-600" : status === "Failed" ? "text-red-600" : "text-amber-600";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Audit</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className={`text-sm ${color}`}>Status: {status}</div>
        {link ? (
          <a className="text-sm underline underline-offset-4" href={link} target="_blank" rel="noreferrer">
            View report
          </a>
        ) : (
          <div className="text-sm opacity-70">Report link not available.</div>
        )}
      </CardContent>
    </Card>
  );
}


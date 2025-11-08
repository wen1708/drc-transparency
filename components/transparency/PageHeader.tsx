"use client";

import dayjs from "dayjs";
import { useEffect, useState } from "react";

export default function PageHeader() {
  const [now, setNow] = useState("");

  useEffect(() => {
    // 鍏堢珛鍗虫覆鏌撲竴娆℃椂闂达紝鍐嶆瘡绉掓洿鏂?
    setNow(dayjs().format("YYYY/MM/DD HH:mm:ss"));
    const id = setInterval(() => {
      setNow(dayjs().format("YYYY/MM/DD HH:mm:ss"));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="px-6 pt-6 pb-4 max-w-7xl mx-auto">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            DragonCoin Transparency (Live)
          </h1>
          <p className="text-sm text-gray-500 mt-1">Last updated: {now}</p>
        </div>
        {/* intentionally no Back button here to avoid duplication with the global Navbar */}
      </div>
    </div>
  );
}

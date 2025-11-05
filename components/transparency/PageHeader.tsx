'use client';
import { useEffect, useState } from 'react';

export function PageHeader() {
  const [stamp, setStamp] = useState<string>('');

  useEffect(() => {
    // 固定为 24 小时制，避免“上午/下午”差异；只在客户端赋值，避免服务端/客户端不一致
    const f = new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      hour12: false
    });
    setStamp(f.format(new Date()));
  }, []);

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">透明页 Transparency</h1>
        <p className="text-slate-500 text-sm">
          最后更新时间：{stamp || '—'}
        </p>
      </div>
      <div className="hidden sm:block rounded-full border px-3 py-1 text-sm">BSC</div>
    </div>
  );
}

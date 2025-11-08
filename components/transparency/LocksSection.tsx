import { Card, CardContent } from "../ui/Card";

type Lock = {
  platform: "PinkLock" | "TeamFinance";
  amount: string;
  unlockAt: string; // formatted
  txUrl: string;
};

export default function LocksSection({ locks }: { locks: Lock[] }) {
  return (
    <Card>
      <CardContent>
        <h3 className="text-lg font-semibold mb-3">Locks / 閿佷粨</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-gray-500">
              <tr>
                <th className="text-left py-2 pr-4">Platform / 骞冲彴</th>
                <th className="text-left py-2 pr-4">Amount / 鏁伴噺</th>
                <th className="text-left py-2 pr-4">Unlock Time / 瑙ｉ攣鏃堕棿</th>
                <th className="text-left py-2">Tx / 浜ゆ槗</th>
              </tr>
            </thead>
            <tbody>
              {locks.map((l, i) => (
                <tr key={i} className="border-t">
                  <td className="py-2 pr-4">{l.platform}</td>
                  <td className="py-2 pr-4">{l.amount}</td>
                  <td className="py-2 pr-4">{l.unlockAt}</td>
                  <td className="py-2">
                    <a href={l.txUrl} target="_blank" className="text-blue-600 hover:underline">
                      View / 鏌ョ湅
                    </a>
                  </td>
                </tr>
              ))}
              {!locks.length && (
                <tr>
                  <td colSpan={4} className="py-4 text-gray-500">
                    No lock data yet / 鏆傛棤閿佷粨鏁版嵁
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

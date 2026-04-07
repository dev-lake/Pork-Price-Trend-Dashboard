import { StockSeries } from '@/types/domain';

export default function CompanyTable({ stocks }: { stocks: StockSeries[] }) {
  const latest = (data: { value: number }[]) => data[data.length - 1]?.value ?? 0;
  const pct = (data: { value: number }[]) => {
    if (data.length < 2) return 0;
    return ((data[data.length - 1].value - data[data.length - 2].value) / data[data.length - 2].value) * 100;
  };

  return (
    <div className="card overflow-x-auto">
      <h3 className="mb-3 font-semibold">生猪养殖企业对比</h3>
      <table className="w-full text-sm">
        <thead><tr className="text-left text-slate-500"><th>公司</th><th>代码</th><th>最新价</th><th>日涨跌%</th></tr></thead>
        <tbody>
          {stocks.map((s) => <tr key={s.code} className="border-t border-slate-200 dark:border-slate-700"><td>{s.name}</td><td>{s.code}</td><td>{latest(s.data).toFixed(2)}</td><td className={pct(s.data) >= 0 ? 'text-red-500' : 'text-green-500'}>{pct(s.data).toFixed(2)}%</td></tr>)}
        </tbody>
      </table>
    </div>
  );
}

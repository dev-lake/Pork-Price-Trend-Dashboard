import { DashboardData } from '@/types/domain';

export default function KpiCards({ data }: { data: DashboardData }) {
  const latest = (arr: { value: number }[]) => arr[arr.length - 1]?.value ?? 0;
  const items = [
    { label: '猪肉价格(元/kg)', value: latest(data.prices.porkRetail) },
    { label: '生猪价格(元/kg)', value: latest(data.prices.liveHog) },
    { label: '白条肉(元/kg)', value: latest(data.prices.carcass) },
    { label: '能繁母猪存栏(万头)', value: latest(data.prices.breedingSowInventory) },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
      {items.map((it) => (
        <div key={it.label} className="card">
          <p className="text-sm text-slate-500">{it.label}</p>
          <p className="text-2xl font-semibold text-primary-500">{it.value.toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}

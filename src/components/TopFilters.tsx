import { FetchParams } from '@/types/domain';

type Props = {
  params: FetchParams;
  onChange: (next: FetchParams) => void;
  adapterKey: string;
  onAdapterChange: (key: string) => void;
};

export default function TopFilters({ params, onChange, adapterKey, onAdapterChange }: Props) {
  return (
    <div className="card flex flex-wrap items-end gap-3">
      <label className="text-sm">开始日期
        <input className="ml-2 rounded border px-2 py-1 dark:bg-slate-700" type="date" value={params.startDate} onChange={(e) => onChange({ ...params, startDate: e.target.value })} />
      </label>
      <label className="text-sm">结束日期
        <input className="ml-2 rounded border px-2 py-1 dark:bg-slate-700" type="date" value={params.endDate} onChange={(e) => onChange({ ...params, endDate: e.target.value })} />
      </label>
      <label className="text-sm">频率
        <select className="ml-2 rounded border px-2 py-1 dark:bg-slate-700" value={params.frequency} onChange={(e) => onChange({ ...params, frequency: e.target.value as FetchParams['frequency'] })}>
          <option value="daily">日频</option>
          <option value="weekly">周频</option>
          <option value="monthly">月频</option>
        </select>
      </label>
      <label className="text-sm">数据适配器
        <select className="ml-2 rounded border px-2 py-1 dark:bg-slate-700" value={adapterKey} onChange={(e) => onAdapterChange(e.target.value)}>
          <option value="mock">Mock 默认</option>
          <option value="official">官方数据（预留）</option>
        </select>
      </label>
    </div>
  );
}

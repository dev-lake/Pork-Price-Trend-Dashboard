import { useEffect, useState } from 'react';
import CompanyTable from '@/components/CompanyTable';
import CorrelationPanel from '@/components/CorrelationPanel';
import DataSourceNotes from '@/components/DataSourceNotes';
import KpiCards from '@/components/KpiCards';
import PolicyTimeline from '@/components/PolicyTimeline';
import TopFilters from '@/components/TopFilters';
import TrendChart from '@/components/TrendChart';
import { OfficialCnDataAdapter } from '@/adapters/officialCnAdapter';
import { useDashboardData } from '@/hooks/useDashboardData';
import { registerAdapter } from '@/services/dataService';
import { ThemeMode } from '@/types/domain';

registerAdapter('official', new OfficialCnDataAdapter());

export default function App() {
  const [adapterKey, setAdapterKey] = useState('mock');
  const [theme, setTheme] = useState<ThemeMode>('light');
  const { data, loading, error, params, setParams } = useDashboardData(adapterKey);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <main className="min-h-screen p-4 text-slate-900 dark:text-slate-100">
      <div className="mx-auto max-w-7xl space-y-4">
        <header className="flex flex-wrap items-center justify-between gap-2">
          <h1 className="text-2xl font-bold">猪周期监控台</h1>
          <button className="rounded border px-3 py-1 text-sm" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
            切换到{theme === 'light' ? '深色' : '浅色'}模式
          </button>
        </header>

        <TopFilters params={params} onChange={setParams} adapterKey={adapterKey} onAdapterChange={setAdapterKey} />

        {loading && <div className="card">加载中...</div>}
        {error && <div className="card text-red-500">{error}</div>}

        {data && (
          <>
            <KpiCards data={data} />
            <TrendChart data={data} />
            <CorrelationPanel data={data} />
            <div className="grid gap-3 xl:grid-cols-2">
              <CompanyTable stocks={data.stocks} />
              <PolicyTimeline policies={data.policies} />
            </div>
            <DataSourceNotes notes={data.dataSourceNotes} />
          </>
        )}
      </div>
    </main>
  );
}

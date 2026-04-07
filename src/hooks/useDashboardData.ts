import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import { fetchDashboardData } from '@/services/dataService';
import { FetchParams } from '@/types/domain';

export const useDashboardData = (adapterKey: string) => {
  const [params, setParams] = useState<FetchParams>({
    startDate: dayjs().subtract(6, 'month').format('YYYY-MM-DD'),
    endDate: dayjs().format('YYYY-MM-DD'),
    frequency: 'daily',
  });
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      setError(null);
      try {
        const payload = await fetchDashboardData(adapterKey, params);
        setData(payload);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [adapterKey, params]);

  return useMemo(() => ({ data, loading, error, params, setParams }), [data, loading, error, params]);
};

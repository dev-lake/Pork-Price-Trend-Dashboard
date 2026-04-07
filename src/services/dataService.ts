import { DataAdapter } from '@/adapters/baseAdapter';
import { MockDataAdapter } from '@/adapters/mockAdapter';
import { DashboardData, FetchParams } from '@/types/domain';

const registry: Record<string, DataAdapter> = {
  mock: new MockDataAdapter(),
};

export const registerAdapter = (key: string, adapter: DataAdapter): void => {
  registry[key] = adapter;
};

export const fetchDashboardData = async (adapterKey: string, params: FetchParams): Promise<DashboardData> => {
  const adapter = registry[adapterKey] ?? registry.mock;
  return adapter.fetchDashboardData(params);
};

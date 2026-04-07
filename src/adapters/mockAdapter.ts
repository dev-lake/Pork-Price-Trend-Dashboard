import { DataAdapter } from './baseAdapter';
import { mockDashboardData } from '@/data/mockData';
import { DashboardData, FetchParams } from '@/types/domain';

export class MockDataAdapter implements DataAdapter {
  readonly name = 'mock-adapter';

  async fetchDashboardData(_params: FetchParams): Promise<DashboardData> {
    await new Promise((resolve) => setTimeout(resolve, 250));
    return structuredClone(mockDashboardData);
  }
}

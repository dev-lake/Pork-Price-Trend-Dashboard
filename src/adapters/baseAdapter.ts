import { DashboardData, FetchParams } from '@/types/domain';

export interface DataAdapter {
  readonly name: string;
  fetchDashboardData(params: FetchParams): Promise<DashboardData>;
}

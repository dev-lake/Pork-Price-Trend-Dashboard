import { DataAdapter } from './baseAdapter';
import { DashboardData, FetchParams } from '@/types/domain';

/**
 * 官方数据适配器骨架（农业农村部/国家统计局/国家发改委）
 * 这里保留统一入口，方便后续根据各机构开放方式接入。
 */
export class OfficialCnDataAdapter implements DataAdapter {
  readonly name = 'official-cn-adapter';

  async fetchDashboardData(params: FetchParams): Promise<DashboardData> {
    const message = `官方接口尚未配置。请实现 fetch 并映射字段。查询区间 ${params.startDate} ~ ${params.endDate}`;
    throw new Error(message);
  }
}

import dayjs from 'dayjs';
import { DashboardData, SeriesPoint } from '@/types/domain';

const genSeries = (start = '2023-01-01', n = 140, base = 10, vol = 0.5, trend = 0): SeriesPoint[] =>
  Array.from({ length: n }, (_, i) => {
    const wave = Math.sin(i / 7) * vol + Math.sin(i / 17) * (vol / 2);
    const value = Number((base + trend * i + wave + Math.random() * vol).toFixed(2));
    return { date: dayjs(start).add(i, 'day').format('YYYY-MM-DD'), value };
  });

export const mockDashboardData: DashboardData = {
  prices: {
    porkRetail: genSeries('2023-01-01', 160, 26, 0.9, 0.01),
    liveHog: genSeries('2023-01-01', 160, 16.5, 0.7, 0.008),
    carcass: genSeries('2023-01-01', 160, 21, 0.8, 0.009),
    corn: genSeries('2023-01-01', 160, 2.9, 0.08, 0.001),
    soybeanMeal: genSeries('2023-01-01', 160, 3.9, 0.12, -0.0006),
    breedingSowInventory: genSeries('2023-01-01', 160, 4150, 32, -0.5),
  },
  stocks: [
    { code: '002714.SZ', name: '牧原股份', data: genSeries('2023-01-01', 160, 45, 1.2, 0.03) },
    { code: '300498.SZ', name: '温氏股份', data: genSeries('2023-01-01', 160, 18, 0.9, 0.015) },
    { code: '605296.SH', name: '神农集团', data: genSeries('2023-01-01', 160, 34, 1.1, 0.02) },
    { code: '603477.SH', name: '巨星农牧', data: genSeries('2023-01-01', 160, 22, 0.95, 0.018) },
  ],
  policies: [
    {
      date: '2023-07-31',
      title: '稳定生猪生产政策通知',
      source: '农业农村部',
      description: '提出优化产能调控节奏，防范猪价大幅波动。',
    },
    {
      date: '2024-03-12',
      title: '猪肉储备投放机制调整',
      source: '国家发改委',
      description: '完善储备投放与收储阈值，平抑市场预期。',
    },
  ],
  dataSourceNotes: [
    '农业农村部：生猪、白条、能繁母猪存栏等官方监测口径。',
    '国家统计局：CPI猪肉分项、农产品价格监测补充。',
    '国家发改委：中央储备肉政策、价格过度下跌预警。',
    '股票行情：通过可替换适配器接入交易所/券商/数据服务商。',
  ],
};

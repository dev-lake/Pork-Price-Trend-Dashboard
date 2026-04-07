import ReactECharts from 'echarts-for-react';
import { DashboardData } from '@/types/domain';
import { movingAverage } from '@/utils/analytics';

export default function TrendChart({ data }: { data: DashboardData }) {
  const ma = movingAverage(data.prices.liveHog, 14);
  const option = {
    tooltip: { trigger: 'axis' },
    legend: { top: 0 },
    xAxis: { type: 'category', data: data.prices.liveHog.map((d) => d.date) },
    yAxis: [{ type: 'value' }, { type: 'value' }],
    series: [
      { name: '生猪', type: 'line', data: data.prices.liveHog.map((d) => d.value), smooth: true },
      { name: '猪肉', type: 'line', data: data.prices.porkRetail.map((d) => d.value), smooth: true },
      { name: '白条', type: 'line', data: data.prices.carcass.map((d) => d.value), smooth: true },
      { name: '生猪MA14', type: 'line', data: ma.map((d) => d.value), smooth: true, lineStyle: { type: 'dashed' } },
      { name: '能繁母猪存栏', type: 'line', yAxisIndex: 1, data: data.prices.breedingSowInventory.map((d) => d.value) },
    ],
  };
  return <div className="card"><h3 className="mb-2 font-semibold">价格与供给趋势</h3><ReactECharts option={option} style={{ height: 360 }} /></div>;
}

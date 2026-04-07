import ReactECharts from 'echarts-for-react';
import { DashboardData } from '@/types/domain';
import { lagCorrelation, linearRegression, returns, rollingCorrelation } from '@/utils/analytics';

export default function CorrelationPanel({ data }: { data: DashboardData }) {
  const stock = data.stocks[0];
  const hogRet = returns(data.prices.liveHog);
  const stockRet = returns(stock.data);
  const rolling = rollingCorrelation(hogRet, stockRet, 20);
  const lag = lagCorrelation(hogRet, stockRet, 20);
  const x = hogRet.map((i) => i.value);
  const y = stockRet.map((i) => i.value);
  const reg = linearRegression(x, y);

  return (
    <div className="grid gap-3 xl:grid-cols-3">
      <div className="card">
        <h3 className="mb-2 font-semibold">滚动相关性（20日）</h3>
        <ReactECharts style={{ height: 260 }} option={{ xAxis: { type: 'category', data: rolling.map((d) => d.date) }, yAxis: { type: 'value', min: -1, max: 1 }, series: [{ type: 'line', data: rolling.map((d) => d.value) }], tooltip: { trigger: 'axis' } }} />
      </div>
      <div className="card">
        <h3 className="mb-2 font-semibold">领先滞后相关（lag）</h3>
        <ReactECharts style={{ height: 260 }} option={{ xAxis: { type: 'category', data: lag.map((d) => d.lag) }, yAxis: { type: 'value', min: -1, max: 1 }, series: [{ type: 'bar', data: lag.map((d) => d.corr) }], tooltip: { trigger: 'axis' } }} />
      </div>
      <div className="card">
        <h3 className="mb-2 font-semibold">收益率散点回归</h3>
        <p className="text-xs text-slate-500">y={reg.slope}x+{reg.intercept} / R²={reg.r2}</p>
        <ReactECharts style={{ height: 240 }} option={{ xAxis: { type: 'value' }, yAxis: { type: 'value' }, series: [{ type: 'scatter', data: x.map((v, i) => [v, y[i]]) }], tooltip: { trigger: 'item' } }} />
      </div>
    </div>
  );
}

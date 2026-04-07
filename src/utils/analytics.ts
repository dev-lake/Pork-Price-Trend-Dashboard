import { SeriesPoint } from '@/types/domain';

export const movingAverage = (series: SeriesPoint[], window: number): SeriesPoint[] =>
  series.map((p, i, arr) => {
    const slice = arr.slice(Math.max(0, i - window + 1), i + 1);
    const value = slice.reduce((s, it) => s + it.value, 0) / slice.length;
    return { date: p.date, value: Number(value.toFixed(4)) };
  });

export const returns = (series: SeriesPoint[]): SeriesPoint[] =>
  series.slice(1).map((point, i) => {
    const prev = series[i].value;
    const ret = prev === 0 ? 0 : (point.value - prev) / prev;
    return { date: point.date, value: Number(ret.toFixed(6)) };
  });

const pearson = (x: number[], y: number[]): number => {
  if (x.length !== y.length || x.length < 2) return 0;
  const avgX = x.reduce((s, v) => s + v, 0) / x.length;
  const avgY = y.reduce((s, v) => s + v, 0) / y.length;
  let num = 0;
  let denX = 0;
  let denY = 0;
  for (let i = 0; i < x.length; i += 1) {
    const dx = x[i] - avgX;
    const dy = y[i] - avgY;
    num += dx * dy;
    denX += dx * dx;
    denY += dy * dy;
  }
  return denX === 0 || denY === 0 ? 0 : Number((num / Math.sqrt(denX * denY)).toFixed(4));
};

export const rollingCorrelation = (a: SeriesPoint[], b: SeriesPoint[], window = 20): SeriesPoint[] => {
  const len = Math.min(a.length, b.length);
  return Array.from({ length: len }).map((_, i) => {
    const from = Math.max(0, i - window + 1);
    const ax = a.slice(from, i + 1).map((p) => p.value);
    const by = b.slice(from, i + 1).map((p) => p.value);
    return { date: a[i].date, value: pearson(ax, by) };
  });
};

export const lagCorrelation = (x: SeriesPoint[], y: SeriesPoint[], maxLag = 20): Array<{ lag: number; corr: number }> =>
  Array.from({ length: maxLag * 2 + 1 }, (_, idx) => idx - maxLag).map((lag) => {
    const xVals: number[] = [];
    const yVals: number[] = [];
    for (let i = 0; i < x.length; i += 1) {
      const j = i + lag;
      if (j >= 0 && j < y.length) {
        xVals.push(x[i].value);
        yVals.push(y[j].value);
      }
    }
    return { lag, corr: pearson(xVals, yVals) };
  });

export const linearRegression = (x: number[], y: number[]): { slope: number; intercept: number; r2: number } => {
  const n = Math.min(x.length, y.length);
  if (n < 2) return { slope: 0, intercept: 0, r2: 0 };
  const xAvg = x.reduce((s, v) => s + v, 0) / n;
  const yAvg = y.reduce((s, v) => s + v, 0) / n;
  let num = 0;
  let den = 0;
  for (let i = 0; i < n; i += 1) {
    num += (x[i] - xAvg) * (y[i] - yAvg);
    den += (x[i] - xAvg) ** 2;
  }
  const slope = den === 0 ? 0 : num / den;
  const intercept = yAvg - slope * xAvg;
  const yHat = x.map((it) => slope * it + intercept);
  const sst = y.reduce((s, v) => s + (v - yAvg) ** 2, 0);
  const sse = y.reduce((s, v, i) => s + (v - yHat[i]) ** 2, 0);
  const r2 = sst === 0 ? 0 : 1 - sse / sst;
  return {
    slope: Number(slope.toFixed(4)),
    intercept: Number(intercept.toFixed(4)),
    r2: Number(r2.toFixed(4)),
  };
};

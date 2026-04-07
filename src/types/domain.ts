export type SeriesPoint = { date: string; value: number };

export interface PriceBundle {
  porkRetail: SeriesPoint[];
  liveHog: SeriesPoint[];
  carcass: SeriesPoint[];
  corn: SeriesPoint[];
  soybeanMeal: SeriesPoint[];
  breedingSowInventory: SeriesPoint[];
}

export interface StockSeries {
  code: string;
  name: string;
  data: SeriesPoint[];
}

export interface PolicyEvent {
  date: string;
  title: string;
  source: string;
  description: string;
}

export interface DashboardData {
  prices: PriceBundle;
  stocks: StockSeries[];
  policies: PolicyEvent[];
  dataSourceNotes: string[];
}

export interface FetchParams {
  startDate: string;
  endDate: string;
  frequency: 'daily' | 'weekly' | 'monthly';
}

export type ThemeMode = 'light' | 'dark';

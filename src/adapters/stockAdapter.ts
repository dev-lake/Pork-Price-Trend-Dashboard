import { FetchParams, StockSeries } from '@/types/domain';

export interface StockDataAdapter {
  readonly provider: string;
  fetchStockSeries(symbols: string[], params: FetchParams): Promise<StockSeries[]>;
}

export class MockStockAdapter implements StockDataAdapter {
  readonly provider = 'mock-stock-provider';

  async fetchStockSeries(): Promise<StockSeries[]> {
    return [];
  }
}

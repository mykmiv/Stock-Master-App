// Stock API using Finnhub for real-time data
const FINNHUB_BASE_URL = 'https://finnhub.io/api/v1';

export interface StockQuote {
  price: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  open: number;
  previousClose: number;
}

export interface CompanyProfile {
  name: string;
  ticker: string;
  marketCap: number;
  sector: string;
  industry: string;
  logo: string;
  weburl: string;
}

export interface CompanyNews {
  headline: string;
  source: string;
  url: string;
  datetime: number;
  summary: string;
}

// Format large numbers (e.g., market cap)
export function formatMarketCap(value: number): string {
  if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
  return `$${value.toLocaleString()}`;
}

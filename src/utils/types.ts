export interface PricePoint { price: number; date: string; }
export interface Product {
  id: number; name: string; url: string; imageUrl: string;
  retailer: string; currentPrice: number; previousPrice: number;
  targetPrice: number; lastChecked: string; priceHistory: PricePoint[];
}

// src/types/trading.ts
export interface TradeEntry {
    id: number;
    date: string;
    symbol: string;
    type: 'long' | 'short';
    entry: string;
    exit: string;
    quantity: string;
    pnl: string | number;
    screenshotUrl: string;
    technicalAnalysis: string;
    psychologicalNotes: string;
    tradeReview: string;
    rating: string;
  }
  
  export interface SelectedTrade {
    date: string;
    symbol: string;
    type: string;
    entry: string;
    exit: string;
    pnl: string | number;
    screenshotUrl: string;
  }
// src/services/trading.ts
import { TradeEntry } from '@/types/trading';

export const tradingService = {
  async fetchTrades() {
    const response = await fetch('/api/trades');
    if (!response.ok) throw new Error('Failed to fetch trades');
    return response.json();
  },

  async createTrade(trade: Omit<TradeEntry, 'id'>) {
    const response = await fetch('/api/trades', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(trade),
    });
    if (!response.ok) throw new Error('Failed to create trade');
    return response.json();
  },

  async updateTrade(id: number, trade: Omit<TradeEntry, 'id'>) {
    const response = await fetch(`/api/trades/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(trade),
    });
    if (!response.ok) throw new Error('Failed to update trade');
    return response.json();
  },

  async deleteTrade(id: number) {
    const response = await fetch(`/api/trades/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete trade');
    return response.json();
  },
};
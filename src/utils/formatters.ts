// src/utils/formatters.ts
export const formatPnL = (pnl: number | string) => {
    const numPnL = typeof pnl === 'string' ? parseFloat(pnl) : pnl;
    return numPnL.toFixed(2);
  };
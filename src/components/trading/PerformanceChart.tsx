'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { TradeEntry } from '@/types/trading';
import { formatDate } from '@/utils/date';

interface PerformanceChartProps {
  trades: TradeEntry[];
}

export const PerformanceChart: React.FC<PerformanceChartProps> = ({ trades }) => {
  const chartData = trades.map((entry, index) => {
    const cumulativePnL = trades
      .slice(0, index + 1)
      .reduce((sum, e) => sum + (typeof e.pnl === 'string' ? parseFloat(e.pnl) : e.pnl), 0);
    return {
      date: formatDate(entry.date),
      pnl: cumulativePnL
    };
  });

  if (trades.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full overflow-x-auto">
          <div className="min-w-[800px] h-64">
            <LineChart
              width={800}
              height={240}
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="pnl"
                stroke="#8884d8"
                name="Cumulative P&L"
              />
            </LineChart>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
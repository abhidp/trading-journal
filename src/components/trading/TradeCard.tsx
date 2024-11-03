'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil, X, ExternalLink } from 'lucide-react';
import { TradeEntry } from '@/types/trading';
import { formatDate } from '@/utils/date';

interface TradeCardProps {
  trade: TradeEntry;
  onEdit: (trade: TradeEntry) => void;
  onDelete: (id: number) => void;
  onScreenshotClick: (trade: TradeEntry, e: React.MouseEvent) => void;
  isLoading: boolean;
}

export const TradeCard: React.FC<TradeCardProps> = ({
  trade,
  onEdit,
  onDelete,
  onScreenshotClick,
  isLoading
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{trade.symbol} : {formatDate(trade.date)}</CardTitle>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(trade)}
              className="flex items-center gap-2"
              disabled={isLoading}
            >
              <Pencil className="w-4 h-4" /> Edit
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(trade.id)}
              className="flex items-center gap-2 text-red-500 hover:text-red-700"
              disabled={isLoading}
            >
              <X className="w-4 h-4" /> Delete
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <strong>Type:</strong> {trade.type}
          </div>
          <div>
            <strong>Entry:</strong> {trade.entry}
          </div>
          <div>
            <strong>Exit:</strong> {trade.exit}
          </div>
          <div>
            <strong>P&L:</strong> {trade.pnl}
          </div>
          <div>
            <strong>Rating:</strong> {trade.rating} Stars
          </div>
        </div>
        {trade.screenshotUrl && (
          <div className="mt-4">
            <strong>Screenshot:</strong>{' '}
            <button
              onClick={(e) => onScreenshotClick(trade, e)}
              className="text-blue-500 hover:text-blue-700 inline-flex items-center"
            >
              View Screenshot
              <ExternalLink className="ml-1 h-4 w-4" />
            </button>
          </div>
        )}
        <div className="mt-4 space-y-4">
          <div>
            <strong>Technical Analysis:</strong>
            <p>{trade.technicalAnalysis}</p>
          </div>
          <div>
            <strong>Psychological Notes:</strong>
            <p>{trade.psychologicalNotes}</p>
          </div>
          <div>
            <strong>Trade Review:</strong>
            <p>{trade.tradeReview}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
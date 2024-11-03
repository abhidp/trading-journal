'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink } from 'lucide-react';
import ZoomableImage from '../ZoomableImage';
import { SelectedTrade } from '@/types/trading';
import { formatDate } from '@/utils/date';

interface ScreenshotModalProps {
  isOpen: boolean;
  onClose: () => void;
  trade: SelectedTrade | null;
}

export const ScreenshotModal: React.FC<ScreenshotModalProps> = ({
  isOpen,
  onClose,
  trade
}) => {
  if (!trade) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="font-semibold">{formatDate(trade.date)}</span>
              <span className="px-2 py-1 bg-gray-100 rounded-full font-bold">
                {trade.symbol}
              </span>
              <span className={`px-2 py-1 rounded-full font-medium ${
                trade.type === 'long' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {trade.type.toUpperCase()}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <span>
                Entry: <span className="font-medium">{trade.entry}</span>
              </span>
              <span>
                Exit: <span className="font-medium">{trade.exit}</span>
              </span>
              <span className={`font-medium ${
                Number(trade.pnl) >= 0 
                  ? 'text-green-600' 
                  : 'text-red-600'
              }`}>
                P&L: {trade.pnl}
              </span>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="relative w-full">
          <ZoomableImage 
            src={trade.screenshotUrl} 
            alt={`${trade.symbol} Trade Screenshot`} 
          />
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <Button 
            variant="outline" 
            onClick={() => window.open(trade.screenshotUrl, '_blank')}
            className="inline-flex items-center"
          >
            Open in New Tab
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
          <Button 
            variant="secondary" 
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
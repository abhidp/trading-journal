'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Save, X } from 'lucide-react';
import { TradeEntry } from '@/types/trading';

interface TradeFormProps {
  currentEntry: TradeEntry;
  isEditing: boolean;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange: (name: string, value: string) => void;
  onCancelEdit: () => void;
}

export const TradeForm: React.FC<TradeFormProps> = ({
  currentEntry,
  isEditing,
  isLoading,
  onSubmit,
  onInputChange,
  onSelectChange,
  onCancelEdit,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-6 h-6" />
          {isEditing ? 'Edit Trade Entry' : 'New Trade Entry'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Input
              type="date"
              name="date"
              value={currentEntry.date}
              onChange={onInputChange}
              placeholder="Date"
              required
              disabled={isLoading}
            />
            <Input
              name="symbol"
              value={currentEntry.symbol}
              onChange={onInputChange}
              placeholder="Symbol"
              required
              disabled={isLoading}
            />
            <Select
              value={currentEntry.type}
              onValueChange={(value) => onSelectChange('type', value)}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Trade Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="long">Long</SelectItem>
                <SelectItem value="short">Short</SelectItem>
              </SelectContent>
            </Select>
            <Input
              name="entry"
              value={currentEntry.entry}
              onChange={onInputChange}
              placeholder="Entry Price"
              type="number"
              step="0.01"
              required
              disabled={isLoading}
            />
            <Input
              name="exit"
              value={currentEntry.exit}
              onChange={onInputChange}
              placeholder="Exit Price"
              type="number"
              step="0.01"
              required
              disabled={isLoading}
            />
            <Input
              name="quantity"
              value={currentEntry.quantity}
              onChange={onInputChange}
              placeholder="Quantity"
              type="number"
              required
              disabled={isLoading}
            />
            <Input
              name="pnl"
              value={currentEntry.pnl.toString()}
              onChange={onInputChange}
              placeholder="P&L"
              type="number"
              step="0.01"
              required
              disabled={isLoading}
            />
            <Input
              name="screenshotUrl"
              value={currentEntry.screenshotUrl}
              onChange={onInputChange}
              placeholder="TradingView Screenshot URL"
              disabled={isLoading}
            />
            <Select
              value={currentEntry.rating}
              onValueChange={(value) => onSelectChange('rating', value)}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Trade Rating" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5].map(rating => (
                  <SelectItem key={rating} value={rating.toString()}>
                    {rating} Star{rating !== 1 ? 's' : ''}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Textarea
              name="technicalAnalysis"
              value={currentEntry.technicalAnalysis}
              onChange={onInputChange}
              placeholder="Technical Analysis"
              className="h-24"
              disabled={isLoading}
            />
            <Textarea
              name="psychologicalNotes"
              value={currentEntry.psychologicalNotes}
              onChange={onInputChange}
              placeholder="Psychological Notes"
              className="h-24"
              disabled={isLoading}
            />
            <Textarea
              name="tradeReview"
              value={currentEntry.tradeReview}
              onChange={onInputChange}
              placeholder="Trade Review"
              className="h-24"
              disabled={isLoading}
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit" className="flex-1" disabled={isLoading}>
              {isEditing ? (
                <><Save className="w-4 h-4 mr-2" /> Update Entry</>
              ) : (
                'Save Entry'
              )}
            </Button>
            {isEditing && (
              <Button type="button" variant="outline" onClick={onCancelEdit} disabled={isLoading}>
                <X className="w-4 h-4 mr-2" /> Cancel Edit
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
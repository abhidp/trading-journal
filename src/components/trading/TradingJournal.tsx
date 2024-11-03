'use client';

import React, { useState, useEffect } from 'react';
import { TradeForm } from './TradeForm';
import { PerformanceChart } from './PerformanceChart';
import { TradeCard } from './TradeCard';
import { ScreenshotModal } from './ScreenshotModal';
import { TradeEntry, SelectedTrade } from '@/types/trading';
import { tradingService } from '@/services/trading';

const initialEntry: TradeEntry = {
  id: 0,
  date: '',
  symbol: '',
  type: 'long',
  entry: '',
  exit: '',
  quantity: '',
  pnl: '',
  screenshotUrl: '',
  technicalAnalysis: '',
  psychologicalNotes: '',
  tradeReview: '',
  rating: '5'
};

const TradingJournal: React.FC = () => {
  const [entries, setEntries] = useState<TradeEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState<TradeEntry>(initialEntry);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isScreenshotOpen, setIsScreenshotOpen] = useState(false);
  const [selectedTrade, setSelectedTrade] = useState<SelectedTrade | null>(null);

  useEffect(() => {
    fetchTrades();
  }, []);

  const fetchTrades = async () => {
    try {
      setIsLoading(true);
      const data = await tradingService.fetchTrades();
      setEntries(data);
    } catch (error) {
      setError('Failed to load trades');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentEntry(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setCurrentEntry(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (isEditing && editingId) {
        await tradingService.updateTrade(editingId, currentEntry);
        setIsEditing(false);
        setEditingId(null);
      } else {
        await tradingService.createTrade(currentEntry);
      }
      await fetchTrades();
      setCurrentEntry(initialEntry);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (trade: TradeEntry) => {
    setCurrentEntry(trade);
    setEditingId(trade.id);
    setIsEditing(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this trade?')) return;

    try {
      setIsLoading(true);
      await tradingService.deleteTrade(id);
      await fetchTrades();
    } catch (error) {
      setError('Failed to delete trade');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setCurrentEntry(initialEntry);
    setEditingId(null);
    setIsEditing(false);
  };

  const handleScreenshotClick = (trade: TradeEntry, e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedTrade(trade);
    setIsScreenshotOpen(true);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      )}

      <TradeForm
        currentEntry={currentEntry}
        isEditing={isEditing}
        isLoading={isLoading}
        onSubmit={handleSubmit}
        onInputChange={handleInputChange}
        onSelectChange={handleSelectChange}
        onCancelEdit={handleCancelEdit}
      />

      {entries.length > 0 && <PerformanceChart trades={entries} />}

      {entries.map(trade => (
        <TradeCard
          key={trade.id}
          trade={trade}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onScreenshotClick={handleScreenshotClick}
          isLoading={isLoading}
        />
      ))}

      <ScreenshotModal
        isOpen={isScreenshotOpen}
        onClose={() => {
          setIsScreenshotOpen(false);
          setSelectedTrade(null);
        }}
        trade={selectedTrade}
      />
    </div>
  );
};

export default TradingJournal;
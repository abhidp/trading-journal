// src/app/api/trades/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const trades = await prisma.trade.findMany({
      orderBy: {
        date: 'desc'
      }
    });
    return NextResponse.json(trades);
  } catch (error) {
    console.error('Error fetching trades:', error);
    return NextResponse.json(
      { error: 'Failed to fetch trades' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const trade = await prisma.trade.create({
      data: {
        date: data.date,
        symbol: data.symbol,
        type: data.type,
        entry: data.entry,
        exit: data.exit,
        quantity: data.quantity,
        pnl: parseFloat(data.pnl.toString()),
        screenshotUrl: data.screenshotUrl || '',
        technicalAnalysis: data.technicalAnalysis || '',
        psychologicalNotes: data.psychologicalNotes || '',
        tradeReview: data.tradeReview || '',
        rating: data.rating,
      },
    });
    return NextResponse.json(trade);
  } catch (error) {
    console.error('Error creating trade:', error);
    return NextResponse.json(
      { error: 'Failed to create trade' },
      { status: 500 }
    );
  }
}
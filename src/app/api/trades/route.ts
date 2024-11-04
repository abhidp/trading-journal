// src/app/api/trades/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { formatStorageDate } from '@/utils/date';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log('Received data:', data);

    // Convert date from DD-MM-YYYY to YYYY-MM-DD
    const dateFormatted = formatStorageDate(data.date);
    console.log('Formatted date:', dateFormatted);

    const tradeData = {
      date: dateFormatted,
      symbol: data.symbol,
      type: data.type,
      entry: data.entry,
      exit: data.exit,
      quantity: data.quantity,
      pnl: parseFloat(data.pnl),
      screenshotUrl: data.screenshotUrl || '',
      technicalAnalysis: data.technicalAnalysis || '',
      psychologicalNotes: data.psychologicalNotes || '',
      tradeReview: data.tradeReview || '',
      rating: data.rating || '5'
    };

    console.log('Processed data for storage:', tradeData);

    // Validate required fields
    if (!tradeData.date || !tradeData.symbol || !tradeData.type || 
        !tradeData.entry || !tradeData.exit || !tradeData.quantity || 
        isNaN(tradeData.pnl)) {
      return NextResponse.json(
        { 
          error: 'Invalid data format',
          details: 'All required fields must be provided and in correct format'
        },
        { status: 400 }
      );
    }

    const trade = await prisma.trade.create({
      data: tradeData
    });

    console.log('Trade created:', trade);

    return NextResponse.json(trade);
  } catch (error) {
    console.error('Error creating trade:', error);
    
    // Enhanced error response
    if (error instanceof Error) {
      return NextResponse.json({
        error: 'Failed to create trade',
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }, { status: 500 });
    }

    return NextResponse.json({
      error: 'Failed to create trade',
      message: String(error)
    }, { status: 500 });
  }
}

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
// src/app/api/trade/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(request: Request) {
  try {
    const url = new URL(request.url);
    const id = parseInt(url.searchParams.get('id') || '', 10);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid trade ID' },
        { status: 400 }
      );
    }

    const data = await request.json();
    const trade = await prisma.trade.update({
      where: { id },
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
    console.error('Error updating trade:', error);
    return NextResponse.json(
      { error: 'Failed to update trade' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = parseInt(url.searchParams.get('id') || '', 10);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid trade ID' },
        { status: 400 }
      );
    }

    await prisma.trade.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Trade deleted successfully' });
  } catch (error) {
    console.error('Error deleting trade:', error);
    return NextResponse.json(
      { error: 'Failed to delete trade' },
      { status: 500 }
    );
  }
}
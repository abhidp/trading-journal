// src/app/api/health/route.ts
import { NextResponse } from 'next/server';
import { checkDatabaseConnection } from '@/lib/prisma';

export async function GET() {
  try {
    const isConnected = await checkDatabaseConnection();
    
    if (!isConnected) {
      return NextResponse.json(
        { status: 'error', message: 'Database connection failed' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { status: 'ok', message: 'Database connection successful' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Health check error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Service unavailable' },
      { status: 503 }
    );
  }
}
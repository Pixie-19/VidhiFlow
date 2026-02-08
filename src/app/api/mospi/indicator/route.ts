import { NextRequest, NextResponse } from 'next/server';
import { fetchIndicator } from '@/lib/mospi/client';

export async function GET(request: NextRequest) {
  const indicator = request.nextUrl.searchParams.get('indicator');
  const stateCode = request.nextUrl.searchParams.get('stateCode');
  const yearParam = request.nextUrl.searchParams.get('year');
  const sector = request.nextUrl.searchParams.get('sector');

  const result = await fetchIndicator({
    indicator: indicator ?? undefined,
    stateCode: stateCode ?? undefined,
    year: yearParam ? parseInt(yearParam, 10) : undefined,
    sector: sector ?? undefined,
  });

  if (!result) {
    return NextResponse.json({ error: 'Indicator not found' }, { status: 404 });
  }
  return NextResponse.json(result);
}

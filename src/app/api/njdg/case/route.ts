import { NextRequest, NextResponse } from 'next/server';
import { fetchCaseByNumber } from '@/lib/njdg/client';

export async function GET(request: NextRequest) {
  const caseNumber = request.nextUrl.searchParams.get('caseNumber');
  const diaryNumber = request.nextUrl.searchParams.get('diaryNumber');
  const courtCode = request.nextUrl.searchParams.get('courtCode');
  const yearParam = request.nextUrl.searchParams.get('year');

  const result = await fetchCaseByNumber({
    caseNumber: caseNumber ?? undefined,
    diaryNumber: diaryNumber ?? undefined,
    courtCode: courtCode ?? undefined,
    year: yearParam ? parseInt(yearParam, 10) : undefined,
  });

  if (!result) {
    return NextResponse.json({ error: 'Case not found' }, { status: 404 });
  }
  return NextResponse.json(result);
}

import { NextRequest, NextResponse } from 'next/server';
import { translate } from '@/lib/bhashini/client';
import { z } from 'zod';

const bodySchema = z.object({
  sourceLanguage: z.string(),
  targetLanguage: z.string(),
  text: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = bodySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid body', details: parsed.error.flatten() }, { status: 400 });
    }
    const result = await translate(parsed.data as Parameters<typeof translate>[0]);
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json({ error: 'Translation failed' }, { status: 500 });
  }
}

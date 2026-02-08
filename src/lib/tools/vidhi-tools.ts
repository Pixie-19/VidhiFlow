'use client';

import { defineTool } from '@tambo-ai/react';
import { z } from 'zod';

function getBase(): string {
  if (typeof window !== 'undefined') return '';
  return process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
}

/** Fetch case details from National Judicial Data Grid (NJDG). */
export const njdgFetchCaseTool = defineTool({
  name: 'njdg_fetch_case',
  description:
    'Fetch case details from the National Judicial Data Grid by case number or diary number. Returns case title, court, stage, parties, next hearing date.',
  inputSchema: z.object({
    caseNumber: z.string().optional().describe('Case number'),
    diaryNumber: z.string().optional().describe('Diary number'),
    courtCode: z.string().optional().describe('Court code'),
    year: z.number().optional().describe('Year'),
  }),
  outputSchema: z.object({
    caseNumber: z.string(),
    court: z.string(),
    title: z.string(),
    stage: z.string(),
    nextHearingDate: z.string().optional(),
    petitioner: z.string().optional(),
    respondent: z.string().optional(),
  }),
  tool: async (input) => {
    const params = new URLSearchParams();
    if (input.caseNumber) params.set('caseNumber', input.caseNumber);
    if (input.diaryNumber) params.set('diaryNumber', input.diaryNumber);
    if (input.courtCode) params.set('courtCode', input.courtCode);
    if (input.year != null) params.set('year', String(input.year));
    const res = await fetch(`${getBase()}/api/njdg/case?${params.toString()}`);
    if (!res.ok) throw new Error('NJDG fetch failed');
    return res.json();
  },
});

/** Fetch socio-economic indicator from MoSPI. */
export const mospiFetchIndicatorTool = defineTool({
  name: 'mospi_fetch_indicator',
  description:
    'Fetch socio-economic indicator from MoSPI (Ministry of Statistics and Programme Implementation). Use for compensation, inflation, per capita income, state-level data.',
  inputSchema: z.object({
    indicator: z.string().optional().describe('Indicator code e.g. per_capita_income'),
    stateCode: z.string().optional().describe('State code'),
    year: z.number().optional().describe('Year'),
    sector: z.string().optional().describe('Sector'),
  }),
  outputSchema: z.object({
    indicator: z.string(),
    value: z.union([z.number(), z.string()]),
    unit: z.string().optional(),
    state: z.string().optional(),
    year: z.number().optional(),
  }),
  tool: async (input) => {
    const params = new URLSearchParams();
    if (input.indicator) params.set('indicator', input.indicator);
    if (input.stateCode) params.set('stateCode', input.stateCode);
    if (input.year != null) params.set('year', String(input.year));
    if (input.sector) params.set('sector', input.sector);
    const res = await fetch(`${getBase()}/api/mospi/indicator?${params.toString()}`);
    if (!res.ok) throw new Error('MoSPI fetch failed');
    return res.json();
  },
});

/** Translate text using Bhashini (Indic languages). */
export const translateTool = defineTool({
  name: 'translate_indic',
  description:
    'Translate text between English and Indian languages (Hindi, Tamil, Telugu, Bengali, etc.) using Bhashini. Use for summons, orders, or UI in regional language.',
  inputSchema: z.object({
    text: z.string().describe('Text to translate'),
    sourceLanguage: z.string().describe('Source language code e.g. en, hi'),
    targetLanguage: z.string().describe('Target language code e.g. hi, ta, te, bn'),
  }),
  outputSchema: z.object({
    translatedText: z.string(),
    sourceLanguage: z.string(),
    targetLanguage: z.string(),
  }),
  tool: async (input) => {
    const res = await fetch(`${getBase()}/api/translate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: input.text,
        sourceLanguage: input.sourceLanguage,
        targetLanguage: input.targetLanguage,
      }),
    });
    if (!res.ok) throw new Error('Translation failed');
    return res.json();
  },
});

export const vidhiFlowTools = [njdgFetchCaseTool, mospiFetchIndicatorTool, translateTool];

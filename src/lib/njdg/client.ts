/**
 * National Judicial Data Grid (NJDG) client.
 * Fetches case data from the national grid. Use MCP or this client from API routes.
 * In production, wire to official NJDG API / MCP server.
 */

export interface NJDGCaseQuery {
  caseNumber?: string;
  diaryNumber?: string;
  courtCode?: string;
  year?: number;
}

export interface NJDGCaseResult {
  caseNumber: string;
  diaryNumber?: string;
  court: string;
  courtCode?: string;
  title: string;
  stage: string;
  filingDate?: string;
  nextHearingDate?: string;
  petitioner?: string;
  respondent?: string;
  advocates?: string[];
}

const NJDG_BASE = process.env.NJDG_API_BASE;

export async function fetchCaseByNumber(query: NJDGCaseQuery): Promise<NJDGCaseResult | null> {
  if (!NJDG_BASE) return mockCase(query);

  try {
    const params = new URLSearchParams();
    if (query.caseNumber) params.set('caseNumber', query.caseNumber);
    if (query.diaryNumber) params.set('diaryNumber', query.diaryNumber);
    if (query.courtCode) params.set('courtCode', query.courtCode);
    if (query.year) params.set('year', String(query.year));
    const res = await fetch(`${NJDG_BASE}/case?${params.toString()}`, {
      headers: { 'Accept': 'application/json' },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return mockCase(query);
  }
}

function mockCase(query: NJDGCaseQuery): NJDGCaseResult {
  const num = query.caseNumber ?? query.diaryNumber ?? 'MOCK-001';
  return {
    caseNumber: num,
    diaryNumber: query.diaryNumber ?? num,
    court: 'District Court (Mock)',
    courtCode: query.courtCode ?? 'DIST_01',
    title: `Sample case ${num}`,
    stage: 'Evidence',
    filingDate: '2024-01-15',
    nextHearingDate: '2025-03-10',
    petitioner: 'Petitioner (Mock)',
    respondent: 'Respondent (Mock)',
    advocates: ['Advocate A', 'Advocate B'],
  };
}

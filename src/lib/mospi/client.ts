/**
 * MoSPI (Ministry of Statistics and Programme Implementation) client.
 * Fetches socio-economic indicators for use in judicial context (e.g. compensation, indices).
 * In production, wire to official MoSPI/NSS/state data APIs or MCP server.
 */

export interface MoSPIQuery {
  indicator?: string;
  stateCode?: string;
  year?: number;
  sector?: string;
}

export interface MoSPIIndicatorResult {
  indicator: string;
  value: number | string;
  unit?: string;
  state?: string;
  year?: number;
  source?: string;
}

const MOSPI_BASE = process.env.MOSPI_API_BASE;

export async function fetchIndicator(query: MoSPIQuery): Promise<MoSPIIndicatorResult | null> {
  if (!MOSPI_BASE) return mockIndicator(query);

  try {
    const params = new URLSearchParams();
    if (query.indicator) params.set('indicator', query.indicator);
    if (query.stateCode) params.set('stateCode', query.stateCode);
    if (query.year) params.set('year', String(query.year));
    if (query.sector) params.set('sector', query.sector);
    const res = await fetch(`${MOSPI_BASE}/indicator?${params.toString()}`, {
      headers: { 'Accept': 'application/json' },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return mockIndicator(query);
  }
}

function mockIndicator(query: MoSPIQuery): MoSPIIndicatorResult {
  return {
    indicator: query.indicator ?? 'per_capita_income',
    value: 125000,
    unit: 'INR',
    state: query.stateCode ?? 'All India',
    year: query.year ?? new Date().getFullYear() - 1,
    source: 'MoSPI (Mock)',
  };
}

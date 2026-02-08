/**
 * VidhiFlow MCP Server – exposes NJDG and MoSPI tools via Model Context Protocol.
 * Run: npm run mcp:serve
 * Connect TamboV1Provider via mcpServers: [{ url: 'http://localhost:3001/mcp', transport: MCPTransport.HTTP }]
 * when using Streamable HTTP (or use stdio for local CLI clients).
 */
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio';
import { z } from 'zod';

const APP_URL = process.env.VIDHIFLOW_APP_URL ?? 'http://localhost:3000';

const mcpServer = new McpServer({
  name: 'vidhiflow-mcp',
  version: '1.0.0',
});

/** Fetch case from National Judicial Data Grid */
mcpServer.registerTool(
  'njdg_fetch_case',
  {
    description:
      'Fetch case details from the National Judicial Data Grid (NJDG) by case number or diary number. Returns case title, court, stage, parties, next hearing date.',
    inputSchema: {
      caseNumber: z.string().optional().describe('Case number'),
      diaryNumber: z.string().optional().describe('Diary number'),
      courtCode: z.string().optional().describe('Court code'),
      year: z.number().optional().describe('Year'),
    },
  },
  async (args) => {
    const params = new URLSearchParams();
    if (args.caseNumber) params.set('caseNumber', args.caseNumber);
    if (args.diaryNumber) params.set('diaryNumber', args.diaryNumber);
    if (args.courtCode) params.set('courtCode', args.courtCode);
    if (args.year != null) params.set('year', String(args.year));
    const res = await fetch(`${APP_URL}/api/njdg/case?${params.toString()}`);
    if (!res.ok) throw new Error('NJDG fetch failed');
    const data = await res.json();
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  }
);

/** Fetch socio-economic indicator from MoSPI */
mcpServer.registerTool(
  'mospi_fetch_indicator',
  {
    description:
      'Fetch socio-economic indicator from MoSPI (Ministry of Statistics and Programme Implementation). Use for compensation, inflation, per capita income, state-level data.',
    inputSchema: {
      indicator: z.string().optional().describe('Indicator code e.g. per_capita_income'),
      stateCode: z.string().optional().describe('State code'),
      year: z.number().optional().describe('Year'),
      sector: z.string().optional().describe('Sector'),
    },
  },
  async (args) => {
    const params = new URLSearchParams();
    if (args.indicator) params.set('indicator', args.indicator);
    if (args.stateCode) params.set('stateCode', args.stateCode);
    if (args.year != null) params.set('year', String(args.year));
    if (args.sector) params.set('sector', args.sector);
    const res = await fetch(`${APP_URL}/api/mospi/indicator?${params.toString()}`);
    if (!res.ok) throw new Error('MoSPI fetch failed');
    const data = await res.json();
    return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await mcpServer.connect(transport);
  console.error('VidhiFlow MCP server running on stdio');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

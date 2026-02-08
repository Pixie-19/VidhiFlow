'use client';

import { defineTool } from '@tambo-ai/react';
import { z } from 'zod';

const MOCK_NJDG_URL = 'http://localhost:8261';

/**
 * Tool for the agent: get_case_details by CNR.
 * When Mock NJDG Server runs at http://localhost:8261/mcp, Tambo uses the MCP tool.
 * This client-side tool is a fallback that calls the same server via HTTP for demo.
 */
export const getCaseDetailsTool = defineTool({
  name: 'get_case_details',
  description:
    'Fetch case details from NJDG (National Judicial Data Grid) by CNR number. Returns petitioner, respondent, last date, status. Use when the user mentions a CNR.',
  inputSchema: z.object({
    cnr_number: z.string().describe('Case Number / CNR'),
  }),
  outputSchema: z.object({
    cnrNumber: z.string(),
    petitioner: z.string(),
    respondent: z.string(),
    lastDate: z.string(),
    status: z.string(),
  }),
  tool: async ({ cnr_number }) => {
    try {
      const res = await fetch(
        `${MOCK_NJDG_URL}/case?cnr=${encodeURIComponent(cnr_number)}`
      );
      if (res.ok) {
        const data = await res.json();
        return {
          cnrNumber: data.cnrNumber ?? cnr_number,
          petitioner: data.petitioner ?? '—',
          respondent: data.respondent ?? '—',
          lastDate: data.lastDate ?? '—',
          status: data.status ?? '—',
        };
      }
    } catch {
      // Fallback mock when Mock NJDG Server is not running
    }
    return {
      cnrNumber: cnr_number,
      petitioner: 'Petitioner (mock)',
      respondent: 'Respondent (mock)',
      lastDate: new Date().toISOString().slice(0, 10),
      status: 'Listed',
    };
  },
});

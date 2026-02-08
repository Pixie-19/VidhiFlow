'use client';

import React from 'react';
import { TamboProvider } from '@tambo-ai/react';
import { vidhiFlowComponents } from '@/components/tambo';
import { getCaseDetailsTool } from '@/lib/tools/get-case-details';

const VIDHIFLOW_SYSTEM_PROMPT = `You are the VidhiFlow Judicial Assistant. Your goal is to help the judge manage hearings by rendering the CaseStatusCard when a CNR is mentioned and using the SummonsGenerator for final orders.`;

const MCP_NJDG_URL = 'http://localhost:8261/mcp';

export function TamboProviders({ children }: { children: React.ReactNode }) {
  const apiKey = process.env.NEXT_PUBLIC_TAMBO_API_KEY ?? '';

  if (!apiKey) {
    return <>{children}</>;
  }

  return (
    <TamboProvider
      apiKey={apiKey}
      components={vidhiFlowComponents}
      tools={[getCaseDetailsTool]}
      mcpServers={[{ url: MCP_NJDG_URL, name: 'Mock NJDG Server' }]}
      initialMessages={[
        { role: 'system', content: [{ type: 'text', text: VIDHIFLOW_SYSTEM_PROMPT }] },
      ]}
    >
      {children}
    </TamboProvider>
  );
}

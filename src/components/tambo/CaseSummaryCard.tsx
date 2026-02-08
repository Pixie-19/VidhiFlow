'use client';

import React from 'react';
import { caseSummaryPropsSchema, type CaseSummaryProps } from '@/lib/schemas/case-summary';

function CaseSummaryCardBase(props: CaseSummaryProps) {
  const { caseNumber, title, court, stage, nextDate, parties } = props;

  return (
    <div className="rounded-bolt-lg border border-bolt-border bg-bolt-surface p-4 shadow-bolt-sm">
      <h3 className="text-bolt-primary font-semibold">{title}</h3>
      <p className="text-sm text-bolt-text-muted mt-1">Case No. {caseNumber} · {court}</p>
      <p className="text-sm mt-2 text-bolt-text"><strong>Stage:</strong> {stage}</p>
      {nextDate && <p className="text-sm text-bolt-text"><strong>Next date:</strong> {nextDate}</p>}
      {parties && parties.length > 0 && (
        <ul className="mt-2 text-sm list-disc list-inside text-bolt-text-muted">
          {parties.map((p, i) => (
            <li key={i}>{p.name} ({p.role})</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export const CaseSummaryCard = {
  name: 'CaseSummaryCard',
  description: 'Displays a concise case summary: number, title, court, stage, next date, and parties. Use when showing NJDG case data.',
  component: CaseSummaryCardBase,
  propsSchema: caseSummaryPropsSchema,
};

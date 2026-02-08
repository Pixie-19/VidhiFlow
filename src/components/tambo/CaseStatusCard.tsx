'use client';

import React from 'react';
import { caseStatusCardPropsSchema, type CaseStatusCardProps } from '@/lib/schemas/case-status';

function CaseStatusCardBase(props: CaseStatusCardProps) {
  const { cnrNumber, petitioner, respondent, lastDate, status } = props;

  return (
    <div className="rounded border border-slate-600/40 bg-slate-800/80 p-4 shadow-lg ring-1 ring-gold-500/20">
      <div className="border-b border-gold-500/30 pb-2 mb-2">
        <span className="text-gold-400 font-mono text-xs uppercase tracking-wider">CNR</span>
        <p className="font-mono text-slate-100 font-semibold">{cnrNumber}</p>
      </div>
      <dl className="grid grid-cols-1 gap-1.5 text-sm">
        <div>
          <dt className="text-slate-400">Petitioner</dt>
          <dd className="text-slate-100">{petitioner}</dd>
        </div>
        <div>
          <dt className="text-slate-400">Respondent</dt>
          <dd className="text-slate-100">{respondent}</dd>
        </div>
        <div>
          <dt className="text-slate-400">Last date</dt>
          <dd className="text-slate-200">{lastDate}</dd>
        </div>
        <div>
          <dt className="text-slate-400">Status</dt>
          <dd className="text-gold-400 font-medium">{status}</dd>
        </div>
      </dl>
    </div>
  );
}

export const CaseStatusCard = {
  name: 'CaseStatusCard',
  description:
    'Displays case status for a given CNR: petitioner, respondent, last hearing date, and current status. Render when the user mentions a CNR number.',
  component: CaseStatusCardBase,
  propsSchema: caseStatusCardPropsSchema,
};

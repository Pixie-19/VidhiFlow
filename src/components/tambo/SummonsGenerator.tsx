'use client';

import React from 'react';
import { withInteractable, useTamboComponentState } from '@tambo-ai/react';
import { summonsGeneratorPropsSchema, type SummonsGeneratorProps } from '@/lib/schemas/summons';

function SummonsGeneratorBase(props: SummonsGeneratorProps) {
  const { caseNumber, courtName, petitioner, respondent, purpose = 'Hearing' } = props;

  const [hearingDate, setHearingDate] = useTamboComponentState(
    'hearingDate',
    props.hearingDate,
    props.hearingDate
  );
  const [courtRoom, setCourtRoom] = useTamboComponentState(
    'courtRoom',
    props.courtRoom,
    props.courtRoom
  );

  return (
    <div className="rounded border border-gold-500/40 bg-slate-800/90 p-5 shadow-lg ring-1 ring-gold-500/30">
      <h3 className="text-gold-400 font-semibold mb-3 uppercase tracking-wider text-sm">Summons</h3>
      <div className="space-y-2 text-sm text-slate-200">
        <p><span className="text-slate-400">Court:</span> {courtName}</p>
        <p><span className="text-slate-400">Case No:</span> {caseNumber}</p>
        <p><span className="text-slate-400">Petitioner:</span> {petitioner}</p>
        <p><span className="text-slate-400">Respondent:</span> {respondent}</p>
        <p><span className="text-slate-400">Purpose:</span> {purpose}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div>
            <label className="block text-slate-400 text-xs uppercase tracking-wider mb-1">
              Hearing date (editable)
            </label>
            <input
              type="text"
              value={hearingDate}
              onChange={(e) => setHearingDate(e.target.value)}
              className="w-full rounded border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 placeholder-slate-500 focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/50"
              placeholder="e.g. 15-Mar-2025"
            />
          </div>
          <div>
            <label className="block text-slate-400 text-xs uppercase tracking-wider mb-1">
              Court room (editable)
            </label>
            <input
              type="text"
              value={courtRoom}
              onChange={(e) => setCourtRoom(e.target.value)}
              className="w-full rounded border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 placeholder-slate-500 focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/50"
              placeholder="e.g. Court Room 3"
            />
          </div>
        </div>
      </div>
      <p className="mt-3 text-xs text-slate-500">
        Edits sync to the thread. Use for final orders.
      </p>
    </div>
  );
}

export const SummonsGenerator = withInteractable(SummonsGeneratorBase, {
  componentName: 'SummonsGenerator',
  description:
    'Editable summons for final orders. Judge can adjust hearingDate and courtRoom in the UI; state syncs back to the thread.',
  propsSchema: summonsGeneratorPropsSchema,
});

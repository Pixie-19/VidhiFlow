'use client';

import React from 'react';
import { useBhashiniMockWs } from '@/hooks/useBhashiniMockWs';

const LANG_LABELS: Record<string, string> = {
  en: 'English',
  hi: 'Hindi',
  ta: 'Tamil',
};

export function BhashiniLiveTranslator() {
  const { entries, connected } = useBhashiniMockWs();

  return (
    <div className="rounded border border-slate-600/40 bg-slate-800/80 overflow-hidden shadow-lg ring-1 ring-gold-500/20">
      <div className="flex items-center justify-between border-b border-slate-600/60 px-4 py-2 bg-slate-900/80">
        <h3 className="text-gold-400 font-semibold uppercase tracking-wider text-sm">
          Live transcript (Bhashini)
        </h3>
        <span
          className={`h-2 w-2 rounded-full ${connected ? 'bg-emerald-400' : 'bg-slate-500'}`}
          title={connected ? 'Connected' : 'Disconnected'}
        />
      </div>
      <div className="max-h-64 overflow-y-auto p-3 space-y-2">
        {entries.length === 0 && (
          <p className="text-slate-500 text-sm">Waiting for transcript…</p>
        )}
        {entries.map((e) => (
          <div
            key={e.id}
            className="rounded border border-slate-600/40 bg-slate-900/60 p-2 text-sm"
          >
            <p className="text-slate-300">
              <span className="text-slate-500 text-xs uppercase">{LANG_LABELS[e.sourceLang] ?? e.sourceLang}</span>
              {' '}{e.source}
            </p>
            <p className="text-gold-400/90 mt-1">
              <span className="text-slate-500 text-xs uppercase">{LANG_LABELS[e.targetLang] ?? e.targetLang}</span>
              {' '}{e.target}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

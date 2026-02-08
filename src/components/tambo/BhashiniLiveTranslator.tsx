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
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto space-y-3 p-2 h-full">
        {entries.length === 0 && (
           <div className="flex flex-col items-center justify-center h-full text-center p-4">
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-ping mb-2" />
              <p className="text-slate-400 text-sm">Listening for audio stream...</p>
           </div>
        )}
        {entries.map((e) => (
          <div
            key={e.id}
            className="rounded-xl border border-gray-100 bg-gray-50/50 p-3 text-sm hover:bg-white hover:shadow-sm transition-all"
          >
            <div className="flex items-start gap-2 mb-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 bg-white border border-gray-200 px-1 rounded tracking-wider mt-0.5 min-w-[3em] text-center">
                    {LANG_LABELS[e.sourceLang]?.substring(0,3) ?? e.sourceLang}
                </span>
                <p className="text-slate-700 leading-relaxed font-medium">
                  {e.source}
                </p>
            </div>
            
            <div className="flex items-start gap-2">
                <span className="text-[10px] uppercase font-bold text-indigo-400 bg-indigo-50 border border-indigo-100 px-1 rounded tracking-wider mt-0.5 min-w-[3em] text-center">
                    {LANG_LABELS[e.targetLang]?.substring(0,3) ?? e.targetLang}
                </span>
                <p className="text-slate-600 leading-relaxed italic">
                  {e.target}
                </p>
            </div>
          </div>
        ))}
        {/* Dummy element to ensure we can scroll to bottom if needed, though native behavior usually sufficient */}
      </div>
       <div className="px-3 py-2 border-t border-gray-100 bg-gray-50 text-[10px] text-slate-400 flex justify-between items-center">
            <span>Server: aws-bhashini-v2</span>
            <div className="flex items-center gap-1">
                <span className={`w-1.5 h-1.5 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'}`} />
                {connected ? 'Sync' : 'Offline'}
            </div>
       </div>
    </div>
  );
}

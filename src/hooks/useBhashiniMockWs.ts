'use client';

import { useState, useEffect, useCallback } from 'react';

export type TranscriptEntry = {
  id: string;
  source: string;
  sourceLang: 'en' | 'hi' | 'ta';
  target: string;
  targetLang: 'en' | 'hi' | 'ta';
  timestamp: number;
};

const MOCK_ENTRIES: TranscriptEntry[] = [
  { id: '1', source: 'The court is now in session.', sourceLang: 'en', target: 'अदालत अब सत्र में है।', targetLang: 'hi', timestamp: Date.now() - 5000 },
  { id: '2', source: 'Please state your name and designation.', sourceLang: 'en', target: 'कृपया अपना नाम और पद बताएं।', targetLang: 'hi', timestamp: Date.now() - 4000 },
  { id: '3', source: 'मैं गवाह हूं।', sourceLang: 'hi', target: 'I am the witness.', targetLang: 'en', timestamp: Date.now() - 3000 },
  { id: '4', source: 'Objection, your Honour.', sourceLang: 'en', target: 'आपत्ति, महोदय।', targetLang: 'hi', timestamp: Date.now() - 2000 },
  { id: '5', source: 'Sustained.', sourceLang: 'en', target: 'स्वीकृत।', targetLang: 'hi', timestamp: Date.now() - 1000 },
];

/**
 * Mock WebSocket hook for Bhashini live translation demo.
 * Simulates real-time transcript with English ↔ Hindi/Tamil.
 * Replace with real Bhashini WebSocket in production.
 */
export function useBhashiniMockWs() {
  const [entries, setEntries] = useState<TranscriptEntry[]>([]);
  const [connected, setConnected] = useState(false);

  const connect = useCallback(() => {
    setConnected(true);
    setEntries(MOCK_ENTRIES);
    // Simulate new entries every few seconds
    const interval = setInterval(() => {
      const langs: Array<{ sourceLang: 'en' | 'hi'; targetLang: 'en' | 'hi'; source: string; target: string }> = [
        { sourceLang: 'en', targetLang: 'hi', source: 'Next hearing on Monday.', target: 'अगली सुनवाई सोमवार को।' },
        { sourceLang: 'hi', targetLang: 'en', source: 'जमानत पर विचार किया जाएगा।', target: 'Bail will be considered.' },
      ];
      const pick = langs[Math.floor(Math.random() * langs.length)];
      setEntries((prev) => [
        ...prev,
        {
          id: String(Date.now()),
          source: pick.source,
          sourceLang: pick.sourceLang,
          target: pick.target,
          targetLang: pick.targetLang,
          timestamp: Date.now(),
        },
      ]);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const clear = connect();
    return () => { if (clear) clear(); };
  }, [connect]);

  const disconnect = useCallback(() => {
    setConnected(false);
    setEntries([]);
  }, []);

  return { entries, connected, connect, disconnect };
}

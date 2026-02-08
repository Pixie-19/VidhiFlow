'use client';

import { useEffect, useCallback } from 'react';
import { useTamboThread, useTamboThreadInput } from '@tambo-ai/react';
import { BhashiniLiveTranslator } from '@/components/tambo/BhashiniLiveTranslator';

function GenerativeBenchInner() {
  const {
    thread,
    currentThreadId,
    startNewThread,
    sendThreadMessage,
    streaming,
    generationStatusMessage,
  } = useTamboThread();
  const { value, setValue, submit, isPending } = useTamboThreadInput();

  useEffect(() => {
    if (!currentThreadId && thread?.id) return;
    if (!currentThreadId) startNewThread();
  }, [currentThreadId, startNewThread, thread?.id]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      await submit();
    },
    [submit]
  );

  const canSubmit = !isPending && !streaming && value.trim().length > 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Judicial terminal header */}
      <header className="border-b border-slate-700/80 bg-slate-900/90 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1 bg-gold-500 rounded-full" />
          <h1 className="text-lg font-semibold tracking-wide text-slate-100">
            VidhiFlow — Generative Bench
          </h1>
        </div>
        <span className="text-slate-500 text-sm font-mono">
          {currentThreadId ? 'Session active' : 'New session'}
        </span>
      </header>

      <div className="flex-1 flex flex-col md:flex-row gap-0 md:gap-4 p-4 overflow-hidden">
        {/* Main chat */}
        <div className="flex-1 flex flex-col min-h-0 rounded-lg border border-slate-700/60 bg-slate-900/50 overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {thread?.messages?.length === 0 && (
              <p className="text-slate-500 text-center py-8 text-sm">
                Mention a CNR to see CaseStatusCard, or ask for a summons to use SummonsGenerator.
              </p>
            )}
            {thread?.messages?.map((msg) => (
              <MessageBlock key={msg.id} message={msg} />
            ))}
            {streaming && (
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <span className="animate-pulse">●</span>
                {generationStatusMessage || 'Thinking…'}
              </div>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="border-t border-slate-700/60 p-4 bg-slate-900/80"
          >
            <div className="flex gap-2">
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Ask by CNR, request summons…"
                className="flex-1 rounded border border-slate-600 bg-slate-800 px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/50"
                disabled={!canSubmit}
              />
              <button
                type="submit"
                disabled={!canSubmit}
                className="rounded bg-gold-500 px-4 py-2.5 font-medium text-slate-900 hover:bg-gold-400 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </div>
          </form>
        </div>

        {/* Bhashini live translator panel */}
        <aside className="w-full md:w-96 flex-shrink-0">
          <BhashiniLiveTranslator />
        </aside>
      </div>
    </div>
  );
}

function getMessageText(content: unknown): string {
  if (typeof content === 'string') return content;
  if (Array.isArray(content)) {
    return content
      .map((part: { type?: string; text?: string }) => (part?.type === 'text' ? part.text : ''))
      .filter(Boolean)
      .join('\n');
  }
  return '';
}

function MessageBlock({
  message,
}: {
  message: { id: string; role: string; content?: unknown; renderedComponent?: React.ReactNode };
}) {
  const isUser = message.role === 'user';
  const text = getMessageText(message.content);

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] rounded-lg px-4 py-2.5 ${
          isUser
            ? 'bg-gold-500/20 border border-gold-500/40 text-slate-100'
            : 'bg-slate-800/80 border border-slate-600/40 text-slate-200'
        }`}
      >
        {text && <p className="whitespace-pre-wrap">{text}</p>}
        {message.renderedComponent != null && (
          <div className="mt-2">{message.renderedComponent}</div>
        )}
      </div>
    </div>
  );
}

export default function GenerativeBenchPage() {
  const apiKey = process.env.NEXT_PUBLIC_TAMBO_API_KEY;

  if (!apiKey) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-8">
        <div className="rounded-lg border border-slate-700 bg-slate-900 p-6 text-slate-200 max-w-md">
          <p className="font-medium text-gold-400">Missing Tambo API key</p>
          <p className="text-sm text-slate-400 mt-2">
            Set <code className="bg-slate-800 px-1 rounded">NEXT_PUBLIC_TAMBO_API_KEY</code> in your environment to use the Generative Bench.
          </p>
        </div>
      </div>
    );
  }

  return <GenerativeBenchInner />;
}

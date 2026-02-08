'use client';

import { useEffect, useCallback } from 'react';
import { useTamboThread, useTamboThreadInput } from '@tambo-ai/react';
import { BhashiniLiveTranslator } from '@/components/tambo/BhashiniLiveTranslator';
import { Gavel, Mic, MonitorPlay, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

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
  
  // Adjusted canSubmit to check isPending instead of negation for disable logic
  const canSend = !isPending && !streaming && value.trim().length > 0;

  return (
    <div className="min-h-screen bg-gray-50 text-slate-800 flex flex-col font-sans">
      {/* Judicial terminal header */}
      <header className="border-b border-gray-200 bg-white px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 rounded-lg text-slate-500 hover:bg-gray-100 hover:text-indigo-600 transition-colors" title="Return to Home">
             <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="h-8 w-1 bg-gray-200 rounded-full" />
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-indigo-200 shadow-md">
              <Gavel className="w-5 h-5" />
            </div>
            <h1 className="text-lg font-bold tracking-tight text-slate-900">
              VidhiFlow — Generative Bench
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-semibold border border-red-100 animate-pulse ring-1 ring-red-100">
                <div className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                LIVE
             </div>
             <span className="text-slate-500 text-sm font-medium hidden sm:inline-block">
                {currentThreadId ? 'Session Active' : 'Connecting...'}
             </span>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 p-6 overflow-hidden max-w-[1800px] mx-auto w-full h-[calc(100vh-80px)]">
        {/* Main chat */}
        <div className="flex-[2] flex flex-col min-h-0 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
            {thread?.messages?.length === 0 && (
               <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-60">
                  <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-2">
                     <MonitorPlay className="w-8 h-8 text-indigo-500" />
                  </div>
                  <p className="text-slate-500 text-lg font-medium">Bench Ready</p>
                  <p className="text-slate-400 text-sm max-w-sm">Mention a Case Number (CNR) to pull up the Case Status Card, or issue a directive to generate Summons.</p>
               </div>
            )}
            {thread?.messages?.map((msg) => (
              <MessageBlock key={msg.id} message={msg} />
            ))}
            {streaming && (
              <div className="flex items-center gap-2 text-indigo-600 text-sm p-4 bg-indigo-50 rounded-lg w-fit animate-pulse">
                <span className="font-semibold">Thinking...</span>
                <span>{generationStatusMessage}</span>
              </div>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="border-t border-gray-100 p-4 bg-gray-50/50"
          >
            <div className="flex gap-2">
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Issue order, ask by CNR..."
                className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all shadow-sm"
                disabled={isPending}
              />
              <button
                type="submit"
                disabled={!canSend}
                className="rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
              >
                Send
              </button>
            </div>
          </form>
        </div>

        {/* Bhashini live translator panel */}
        <aside className="w-full lg:w-[400px] flex-shrink-0 flex flex-col h-1/3 lg:h-full">
             <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden flex-1 flex flex-col h-full ring-1 ring-black/5">
                <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                    <h3 className="font-semibold text-slate-700 flex items-center gap-2">
                        <Mic className="w-4 h-4 text-indigo-500" />
                        Live Transcript
                    </h3>
                    <span className="text-[10px] font-bold text-slate-500 bg-white border border-slate-200 px-2 py-1 rounded-md shadow-sm">BHASHINI</span>
                </div>
                <div className="flex-1 overflow-hidden bg-white/50">
                     <BhashiniLiveTranslator />
                </div>
             </div>
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
        className={`max-w-[85%] rounded-2xl px-5 py-3.5 shadow-sm text-sm leading-relaxed ${
          isUser
            ? 'bg-indigo-600 text-white rounded-br-none'
            : 'bg-white border border-gray-200 text-slate-800 rounded-bl-none'
        }`}
      >
        {text && <p className="whitespace-pre-wrap">{text}</p>}
        {message.renderedComponent != null && (
          <div className="mt-4 w-full bg-gray-50 rounded-xl overflow-hidden border border-gray-200 shadow-sm">{message.renderedComponent}</div>
        )}
      </div>
    </div>
  );
}

export default function GenerativeBenchPage() {
  const apiKey = process.env.NEXT_PUBLIC_TAMBO_API_KEY;

  if (!apiKey) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <div className="rounded-xl border border-red-200 bg-white p-8 text-slate-800 shadow-lg max-w-md text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gavel className="w-6 h-6 text-red-600" />
            </div>
          <p className="font-bold text-lg mb-2">Configuration Required</p>
          <p className="text-slate-500 text-sm mt-2">
            Set <code className="bg-gray-100 px-2 py-1 rounded text-red-500 font-mono">NEXT_PUBLIC_TAMBO_API_KEY</code> in your environment to use the Generative Bench.
          </p>
        </div>
      </div>
    );
  }

  return <GenerativeBenchInner />;
}

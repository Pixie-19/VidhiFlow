'use client';

import { useState, useCallback } from 'react';
import {
  TamboV1Provider,
  useTamboV1,
  useTamboV1ThreadInput,
  V1ComponentRenderer,
  type Content,
  type TamboV1Message,
} from '@tambo-ai/react/v1';
import { vidhiFlowComponents } from '@/components/tambo';
import { vidhiFlowTools } from '@/lib/tools/vidhi-tools';

function ChatInner() {
  const [threadId, setThreadId] = useState<string | undefined>();
  const { messages, isStreaming, startNewThread } = useTamboV1(threadId);
  const { value, setValue, submit, isPending } = useTamboV1ThreadInput(threadId);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const result = await submit();
      if (result?.threadId && !threadId) setThreadId(result.threadId);
    },
    [submit, threadId]
  );

  const startNew = useCallback(() => {
    startNewThread();
    setThreadId(undefined);
  }, [startNewThread]);

  return (
    <div className="flex flex-col h-full max-w-3xl mx-auto">
      <header className="flex items-center justify-between p-4 border-b border-bolt-border bg-bolt-surface shadow-bolt-sm">
        <h1 className="text-xl font-semibold text-bolt-primary">VidhiFlow</h1>
        <button
          type="button"
          onClick={startNew}
          className="text-sm text-bolt-text-muted hover:text-bolt-primary transition-colors"
        >
          New conversation
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {!threadId && messages.length === 0 && (
          <p className="text-bolt-text-muted text-center py-8 text-sm leading-normal">
            Start by asking for a case summary, summons draft, or translation. Use case numbers for NJDG or ask for MoSPI data.
          </p>
        )}
        {messages.map((msg) => (
          <MessageBlock key={msg.id} message={msg} threadId={threadId ?? ''} />
        ))}
        {isStreaming && (
          <div className="flex justify-start">
            <span className="text-bolt-text-subtle text-sm">Thinking…</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-bolt-border bg-bolt-surface">
        <div className="flex gap-2">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Ask for case data, summons, translation…"
            className="flex-1 rounded-bolt-lg border border-bolt-border-strong px-4 py-2.5 text-bolt-text placeholder:text-bolt-text-subtle focus:outline-none focus:ring-2 focus:ring-bolt-secondary focus:border-transparent transition-shadow"
            disabled={isPending}
          />
          <button
            type="submit"
            disabled={isPending}
            className="rounded-bolt-lg bg-bolt-primary text-bolt-text-inverse px-4 py-2.5 font-medium hover:bg-bolt-primary-hover disabled:opacity-50 transition-colors"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

function MessageBlock({ message, threadId }: { message: TamboV1Message; threadId: string }) {
  const isUser = message.role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] rounded-bolt-lg px-4 py-2.5 shadow-bolt-sm ${
          isUser ? 'bg-bolt-primary text-bolt-text-inverse' : 'bg-bolt-surface border border-bolt-border text-bolt-text'
        }`}
      >
        {message.content.map((block, i) => (
          <ContentBlock key={i} content={block} threadId={threadId} messageId={message.id} />
        ))}
      </div>
    </div>
  );
}

function ContentBlock({
  content,
  threadId,
  messageId,
}: {
  content: Content;
  threadId: string;
  messageId: string;
}) {
  if (content.type === 'text') {
    return <p className="whitespace-pre-wrap">{content.text}</p>;
  }
  if (content.type === 'component') {
    return (
      <V1ComponentRenderer
        content={content}
        threadId={threadId}
        messageId={messageId}
        fallback={<span className="text-gray-500">[Component: {content.name}]</span>}
      />
    );
  }
  if (content.type === 'tool_use') {
    return (
      <p className="text-sm text-bolt-text-muted">
        {content.statusMessage ?? `Tool: ${content.name}`}
      </p>
    );
  }
  return null;
}

export default function ChatPage() {
  const apiKey = process.env.NEXT_PUBLIC_TAMBO_API_KEY;
  if (!apiKey) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-bolt-background">
        <div className="rounded-bolt-lg border border-bolt-border-strong bg-bolt-surface p-6 text-bolt-text shadow-bolt-md max-w-md">
          <p className="font-medium">Missing Tambo API key</p>
          <p className="text-sm mt-2">
            Set <code className="bg-amber-100 px-1 rounded">NEXT_PUBLIC_TAMBO_API_KEY</code> in your environment to use the Judicial Assistant.
          </p>
        </div>
      </div>
    );
  }

  return (
    <TamboV1Provider
      apiKey={apiKey}
      userKey="vidhiflow-judge-demo"
      components={vidhiFlowComponents}
      tools={vidhiFlowTools}
    >
      <div className="min-h-screen bg-bolt-background flex flex-col">
        <ChatInner />
      </div>
    </TamboV1Provider>
  );
}

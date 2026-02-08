'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import {
  TamboV1Provider,
  useTamboV1,
  useTamboV1ThreadInput,
  V1ComponentRenderer,
} from '@tambo-ai/react/v1';

// Workaround for types not being exported from the package main entry
type UseTamboV1Return = ReturnType<typeof useTamboV1>;
type TamboV1Message = UseTamboV1Return['messages'][number];
type Content = TamboV1Message['content'][number];
import { vidhiFlowComponents } from '@/components/tambo';
import { vidhiFlowTools } from '@/lib/tools/vidhi-tools';
import ReactMarkdown from 'react-markdown';
import {
  Search,
  MessageSquare,
  FileText,
  Languages,
  Gavel,
  Settings,
  Plus,
  Send,
  User,
  Bot
} from 'lucide-react';

const MOCK_HISTORIES: Record<string, TamboV1Message[]> = {
  'case-analysis': [
     { id: 'm1', role: 'user', content: [{ type: 'text', text: 'Analyze the kidnapping case details for FIR 123/2024 (State v. Rahul)' }] },
     { id: 'm2', role: 'assistant', content: [{ type: 'text', text: '**Case Analysis: State v. Rahul (FIR 123/2024)**\n\n**Incident Summary:**\nThe prosecution alleges that on Jan 15, 2024, the accused Rahul abducted the victim (minor) from the school premises.\n\n**Evidence Highlights:**\n1. CCTV footage at 14:00 hours shows accused with victim.\n2. Witness statement of school guard correlates with time.\n\n**Legal Provisions:**\n- Section 363 IPC (Kidnapping)\n- Section 364A IPC (Kidnapping for Ransom)\n\n**Recommendation:**\nReview the bail application in light of the CCTV evidence which prima facie establishes presence.' }] }
  ],
  'summons-draft': [
     { id: 'm3', role: 'user', content: [{ type: 'text', text: 'Draft a summons for case CNR-DLCT01-001234-2023 for witness appearance.' }] },
     { id: 'm4', role: 'assistant', content: [{ type: 'text', text: 'Here is the draft summons for the witness.\n\n**SUMMONS TO WITNESS**\n*(Under Section 61, CrPC)*\n\n**To:**\nMr. Rajesh Kumar,\n123, Lajpat Nagar, New Delhi\n\n**Case:** State vs. Unknown\n**CNR No:** DLCT01-001234-2023\n\nWHEREAS your attendance is necessary to prove the documents seized in the above-mentioned case, you are hereby required to appear in person before this Court on **25th Feb 2026 at 10:00 AM**.\n\nGiven under my hand and the seal of the Court,\n\n*(Signature)*\n**Magistrate First Class**' }] }
  ]
};

function ChatInner() {
  const { messages: liveMessages, isStreaming, startNewThread, currentThreadId } = useTamboV1();
  const threadId = currentThreadId;
  const [mockThreadId, setMockThreadId] = useState<string | null>(null);
  
  const messages = mockThreadId && MOCK_HISTORIES[mockThreadId] ? MOCK_HISTORIES[mockThreadId] : liveMessages;

  const { value, setValue, submit, isPending } = useTamboV1ThreadInput();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isStreaming]);

  const handleSubmit = useCallback(
    async (e?: React.FormEvent, customValue?: string) => {
      e?.preventDefault();
      
      if (mockThreadId) setMockThreadId(null);

      if (customValue) {
        setValue(customValue);
        // Small delay to allow state update before submit if needed by the hook,
        // but typically setValue is sync enough or we directly submit. 
        // efficient way: submit the value directly if supported, else rely on state.
        // The hook might need the state to be set.
        // Actually, for instant card click, we might need a different approach if submit() doesn't take args.
        // We'll set value then submit.
        setTimeout(() => submit(), 0);
      } else {
        await submit();
      }
    },
    [submit, setValue, mockThreadId]
  );

  const handleCardClick = (prompt: string) => {
    setValue(prompt);
    // Trigger submit manually after state update
    // We can't await setValue, so we'll just set it and let the user press send OR auto-send
    // Auto-sending might be better UX
    setTimeout(async () => {
        await submit();
    }, 100);
  };

  const startNew = useCallback(() => {
    startNewThread();
    setMockThreadId(null);
  }, [startNewThread]);

  const hasMessages = messages.length > 0;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans text-slate-800">
      {/* Sidebar */}
      <aside className="w-[260px] bg-white border-r border-gray-200 hidden md:flex flex-col flex-shrink-0 z-20">
        <div className="p-4 flex items-center gap-2 border-b border-gray-100">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Gavel className="w-5 h-5 text-white" />
          </div>
          <span className="font-semibold text-lg tracking-tight text-slate-900">VidhiFlow</span>
        </div>

        <div className="p-3">
          <button
            onClick={startNew}
            className="w-full flex items-center gap-2 px-4 py-3 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg transition-all font-medium border border-indigo-100 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>New Chat</span>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
          <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Recent
          </div>
          {/* Mock History Items */}
          <button 
            onClick={() => { setMockThreadId('case-analysis'); }}
            className={`w-full flex items-center gap-3 px-3 py-2 text-sm transition-colors text-left truncate rounded-md ${mockThreadId === 'case-analysis' ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-slate-600 hover:bg-gray-50'}`}
          >
            <MessageSquare className={`w-4 h-4 ${mockThreadId === 'case-analysis' ? 'text-indigo-500' : 'text-slate-400'}`} />
            <span className="truncate">Kidnapping Case Analysis</span>
          </button>
          <button 
             onClick={() => { setMockThreadId('summons-draft'); }}
             className={`w-full flex items-center gap-3 px-3 py-2 text-sm transition-colors text-left truncate rounded-md ${mockThreadId === 'summons-draft' ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-slate-600 hover:bg-gray-50'}`}
          >
            <MessageSquare className={`w-4 h-4 ${mockThreadId === 'summons-draft' ? 'text-indigo-500' : 'text-slate-400'}`} />
            <span className="truncate">NJDG Summons Draft</span>
          </button>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button className="flex items-center gap-3 w-full px-2 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center text-xs">
              JD
            </div>
            <div className="flex-1 text-left">
              <div className="text-slate-900">Judge Demo</div>
              <div className="text-xs text-slate-500">Free Plan</div>
            </div>
            <Settings className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative w-full h-full bg-white/50">
        {/* Header - Mobile Only or Minimal */}
        <header className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Gavel className="w-6 h-6 text-indigo-600" />
            <span className="font-bold text-slate-900">VidhiFlow</span>
          </div>
          <button onClick={startNew}>
            <Plus className="w-6 h-6 text-slate-600" />
          </button>
        </header>

        {/* Chat Area */}
        {hasMessages ? (
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scroll-smooth">
            {messages.map((msg) => (
              <MessageBlock key={msg.id} message={msg} threadId={threadId ?? ''} />
            ))}
            {isStreaming && (
              <div className="flex justify-start w-full max-w-3xl mx-auto pl-12 fade-in">
                <span className="flex items-center gap-2 text-slate-500 text-sm bg-gray-50 px-3 py-1.5 rounded-full">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" />
                  Thinking...
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        ) : (
          /* Empty State - Centered Dashboard */
          <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 overflow-y-auto w-full max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <Gavel className="w-8 h-8 text-indigo-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-2 text-center tracking-tight">
              Good Afternoon, Judge
            </h2>
            <p className="text-slate-500 text-lg mb-10 text-center max-w-xl">
              What legal assistance can I provide for your courtroom today?
            </p>

            {/* Input for Empty State */}
            <div className="w-full max-w-2xl mb-12">
               <form onSubmit={handleSubmit} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all opacity-0 group-hover:opacity-100" />
                <div className="relative bg-white rounded-xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-gray-200 flex items-center p-2 focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all">
                  <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Ask about a case, generate summons, or search NJDG..."
                    className="flex-1 bg-transparent border-none px-4 py-3 text-lg placeholder:text-slate-400 focus:ring-0 text-slate-800"
                    disabled={isPending}
                  />
                  <button
                    type="submit"
                    disabled={isPending || !value.trim()}
                    className="ml-2 p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>

            {/* Suggestion Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-4xl">
              <SuggestionCard
                icon={<Search className="w-5 h-5 text-blue-500" />}
                title="Case Status"
                desc="Check status by CNR or Case No."
                onClick={() => handleCardClick('Check case status for case number...')}
              />
              <SuggestionCard
                icon={<FileText className="w-5 h-5 text-orange-500" />}
                title="Draft Summons"
                desc="Generate legal notices & summons"
                onClick={() => handleCardClick('Draft a summons for...')}
              />
              <SuggestionCard
                icon={<Languages className="w-5 h-5 text-green-500" />}
                title="Translate"
                desc="Real-time document translation"
                onClick={() => handleCardClick('Open the translation tool')}
              />
              <SuggestionCard
                icon={<MessageSquare className="w-5 h-5 text-purple-500" />}
                title="Summarize"
                desc="Brief analysis of case files"
                onClick={() => handleCardClick('Summarize this case file...')}
              />
            </div>
          </div>
        )}

        {/* Floating Input Bar (Visible only when chat has messages) */}
        {hasMessages && (
          <div className="p-4 bg-white/80 backdrop-blur-md border-t border-gray-200 sticky bottom-0 z-10">
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSubmit} className="relative">
                <input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 pr-12 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
                  disabled={isPending}
                />
                <button
                  type="submit"
                  disabled={isPending || !value.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg disabled:opacity-50 transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
              <p className="text-center text-xs text-slate-400 mt-2">
                VidhiFlow can make mistakes. Verify important legal information.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function SuggestionCard({ icon, title, desc, onClick }: { icon: React.ReactNode; title: string; desc: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-start p-4 bg-white border border-gray-200 hover:border-indigo-300 hover:shadow-md rounded-xl transition-all text-left group h-full"
    >
      <div className="mb-3 p-2 bg-gray-50 rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all">
        {icon}
      </div>
      <span className="font-semibold text-slate-900 mb-1 text-sm">{title}</span>
      <span className="text-xs text-slate-500 leading-relaxed">{desc}</span>
    </button>
  );
}

function MessageBlock({ message, threadId }: { message: TamboV1Message; threadId: string }) {
  const isUser = message.role === 'user';
  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} max-w-3xl mx-auto group`}>
      <div className={`flex gap-4 max-w-[90%] md:max-w-[85%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar */}
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${isUser ? 'bg-indigo-600' : 'bg-green-600'}`}>
          {isUser ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
        </div>

        {/* Bubble */}
        <div
          className={`relative px-5 py-3.5 rounded-2xl shadow-sm text-sm md:text-base leading-relaxed ${
            isUser
              ? 'bg-indigo-600 text-white rounded-br-none'
              : 'bg-white border border-gray-100 text-slate-800 rounded-bl-none'
          }`}
        >
          {message.content.map((block, i) => (
            <ContentBlock key={i} content={block} threadId={threadId} messageId={message.id} isUser={isUser} />
          ))}
        </div>
        
        {/* Actions (Copy/Regenerate - Placeholder) */}
        <div className={`opacity-0 group-hover:opacity-100 transition-opacity flex items-center pt-2 ${isUser ? 'flex-row-reverse' : ''}`}>
           {/* Can add icons here */}
        </div>
      </div>
    </div>
  );
}

function ContentBlock({
  content,
  threadId,
  messageId,
  isUser
}: {
  content: Content;
  threadId: string;
  messageId: string;
  isUser: boolean;
}) {
  if (content.type === 'text') {
    // Render Markdown cleanly
    return (
      <div className={`prose prose-sm max-w-none ${isUser ? 'prose-invert' : 'prose-slate'}`}>
        <ReactMarkdown
           components={{
            // Override basic elements to ensure they look good and not like raw markdown
            h1: ({...props}) => <h1 className="text-lg font-bold mb-2" {...props} />,
            h2: ({...props}) => <h2 className="text-base font-bold mb-1" {...props} />,
            h3: ({...props}) => <h3 className="text-sm font-bold mb-1" {...props} />,
            p: ({...props}) => <p className="mb-2 last:mb-0" {...props} />,
            ul: ({...props}) => <ul className="list-disc pl-4 mb-2 space-y-1" {...props} />,
            ol: ({...props}) => <ol className="list-decimal pl-4 mb-2 space-y-1" {...props} />,
            li: ({...props}) => <li className="" {...props} />,
            code: ({...props}) => (
                <code className={`px-1 py-0.5 rounded ${isUser ? 'bg-indigo-700' : 'bg-gray-100 text-pink-600'} font-mono text-xs`} {...props} />
            ),
            pre: ({...props}) => (
                <pre className={`p-3 rounded-lg overflow-x-auto mb-2 ${isUser ? 'bg-indigo-800' : 'bg-gray-900 text-gray-100'}`} {...props} />
            ),
           }}
        >
            {content.text}
        </ReactMarkdown>
      </div>
    );
  }
  if (content.type === 'component') {
    return (
      <div className="my-3 w-full bg-gray-50 border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <V1ComponentRenderer
          content={content}
          threadId={threadId}
          messageId={messageId}
          fallback={<span className="text-gray-500 p-4 block">[Component: {content.name}]</span>}
        />
      </div>
    );
  }
  if (content.type === 'tool_use') {
    return (
      <div className="flex items-center gap-2 text-xs text-slate-400 bg-gray-50/50 px-2 py-1 rounded border border-gray-100 mx-auto w-fit my-1">
        <Settings className="w-3 h-3" />
        {content.statusMessage ?? `Using Tool: ${content.name}...`}
      </div>
    );
  }
  return null;
}

export default function ChatPage() {
  const apiKey = process.env.NEXT_PUBLIC_TAMBO_API_KEY;
  if (!apiKey) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-gray-50">
        <div className="rounded-xl border border-red-200 bg-white p-8 text-slate-800 shadow-lg max-w-md text-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
             <Settings className="w-6 h-6 text-red-600" />
          </div>
          <h3 className="font-bold text-lg mb-2">Configuration Required</h3>
          <p className="text-slate-500 mb-6">
            Please set your <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-red-500">NEXT_PUBLIC_TAMBO_API_KEY</code> to continue.
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
        <ChatInner />
    </TamboV1Provider>
  );
}


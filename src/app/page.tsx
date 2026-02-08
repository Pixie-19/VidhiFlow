import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-bolt-background">
      <div className="max-w-2xl w-full text-center space-y-8">
        <h1 className="text-4xl font-bold text-bolt-primary tracking-tight">
          VidhiFlow
        </h1>
        <p className="text-lg text-bolt-text-muted">
          MCP-native Generative UI for the Indian Judiciary. No static dashboards—AI renders components dynamically in chat.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/generative-bench"
            className="inline-flex items-center justify-center rounded-bolt-lg bg-bolt-primary text-bolt-text-inverse px-6 py-3 font-medium hover:bg-bolt-primary-hover transition-colors shadow-bolt-sm"
          >
            Generative Bench (demo)
          </Link>
          <Link
            href="/chat"
            className="inline-flex items-center justify-center rounded-bolt-lg border border-bolt-border bg-bolt-surface px-6 py-3 font-medium text-bolt-primary hover:bg-bolt-primary-muted transition-colors"
          >
            Chat (v1)
          </Link>
        </div>
      </div>
    </main>
  );
}

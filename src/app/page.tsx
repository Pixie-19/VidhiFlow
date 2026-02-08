import Link from 'next/link';
import { Gavel, ArrowRight, MessageSquare, FileText, Globe, Sparkles } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col font-sans text-slate-800">
        {/* Navbar */}
        <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                    <Gavel className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl tracking-tight text-slate-900">VidhiFlow</span>
            </div>
            <div className="flex items-center gap-4">
                <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
                    Log in
                </Link>
                <Link
                    href="/chat"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm"
                >
                    Get Started
                </Link>
            </div>
        </nav>

        {/* Hero Section */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-20 text-center max-w-5xl mx-auto w-full">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-6 animate-fade-in-up">
                <Sparkles className="w-3 h-3" />
                <span>New: Generative UI for Indian Judiciary</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
                Modern Legal Assistance <br/>
                <span className="text-indigo-600">Reimagined with AI</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
                No static dashboards. VidhiFlow uses an MCP-native Generative UI to render case details, summons, and summaries dynamically within your conversation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
                <Link
                    href="/chat"
                    className="flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-xl text-lg font-medium hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg w-full sm:w-auto justify-center"
                >
                    <span>Launch Assistant</span>
                    <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                    href="/generative-bench"
                    className="flex items-center gap-2 px-8 py-4 bg-white border border-gray-200 text-slate-700 rounded-xl text-lg font-medium hover:border-indigo-300 hover:text-indigo-600 transition-all w-full sm:w-auto justify-center"
                >
                   <span>View Demo Bench</span>
                </Link>
            </div>
            
            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 w-full text-left">
                <FeatureCard 
                    icon={<Globe className="w-6 h-6 text-blue-500" />}
                    title="NJDG Integration"
                    desc="Real-time case status & history fetching directly from the National Judicial Data Grid."
                />
                <FeatureCard 
                    icon={<FileText className="w-6 h-6 text-orange-500" />}
                    title="Smart Summons"
                    desc="Auto-generate legally compliant summons and notices with a single prompt."
                />
                <FeatureCard 
                    icon={<MessageSquare className="w-6 h-6 text-purple-500" />}
                    title="Bhashini Translation"
                    desc="Instant multilingual translation for legal documents and case files."
                />
            </div>
        </div>
        
        {/* Footer */}
        <footer className="py-6 border-t border-gray-200 text-center text-sm text-slate-400">
            &copy; 2026 VidhiFlow. Built for the Indian Judiciary.
        </footer>
    </main>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <div className="p-6 bg-white rounded-xl border border-gray-200 hover:shadow-md hover:border-indigo-200 transition-all">
            <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center mb-4">
                {icon}
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
            <p className="text-slate-500 leading-relaxed">{desc}</p>
        </div>
    );
}


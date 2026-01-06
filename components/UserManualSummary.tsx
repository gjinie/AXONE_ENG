
import React from 'react';
import { Sparkles, CheckCircle } from 'lucide-react';

const UserManualSummary: React.FC = () => {
  const manuals = [
    { title: "Smart Assessment", content: "Our data-driven engine evaluates your AI readiness and maps it to your specific job role." },
    { title: "Curated Roadmap", content: "Skip the noise. Get a direct learning path that focuses on tools you need for tomorrow's meeting." },
    { title: "Instant Productivity", content: "Use the Content Creation Agent to summarize documents and create quizzes in seconds." },
    { title: "Expert Frameworks", content: "Access the Prompt Lab for pre-built, high-performance prompt templates used by industry leaders." }
  ];

  return (
    <section className="py-24 bg-zinc-950/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight">Mastering AI<br/><span className="gradient-text">Has Never Been Easier</span></h2>
            <div className="space-y-8">
              {manuals.map((manual, idx) => (
                <div key={idx} className="flex gap-5 group">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full border border-purple-500/50 flex items-center justify-center text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-all">
                    <CheckCircle size={16} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 tracking-tight">{manual.title}</h4>
                    <p className="text-gray-400 leading-relaxed text-sm">{manual.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="rounded-3xl border border-white/10 overflow-hidden shadow-2xl shadow-purple-900/20 bg-zinc-900">
              <div className="p-8 border-b border-white/5 flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
                <div className="px-3 py-1 rounded-md bg-white/5 text-[10px] font-bold text-gray-500 uppercase">axone-dashboard.v1</div>
              </div>
              <div className="p-10">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-xl font-black">AX</div>
                  <div>
                    <h4 className="font-bold">Transformation Intelligence</h4>
                    <p className="text-xs text-gray-500 tracking-widest uppercase">System Active • AI Ready</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                    <div className="w-3/4 h-full gradient-bg animate-pulse"></div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="h-20 rounded-xl bg-white/5 border border-white/5"></div>
                    <div className="h-20 rounded-xl bg-white/5 border border-white/5"></div>
                    <div className="h-20 rounded-xl bg-purple-500/10 border border-purple-500/20"></div>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-6 right-6">
                <div className="flex items-center gap-3 bg-zinc-800/80 backdrop-blur-xl p-4 rounded-2xl border border-white/10">
                  <Sparkles className="text-yellow-400 animate-pulse" size={20} />
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">AI Suggestion</p>
                    <p className="text-xs font-bold">Try "SEO Prompt v4" for this document</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserManualSummary;


import React from 'react';
import { Layout } from 'lucide-react';

const AgentView: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 max-w-7xl mx-auto animate-fade-in-up">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-4 rounded-3xl bg-blue-500/10 border border-blue-500/20 mb-6 text-blue-400">
          <Layout size={40} />
        </div>
        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">
          Gen <span className="gradient-text">Agent</span>
        </h1>
        <p className="text-gray-500 text-lg">Automate your documentation and learning. (Coming Soon)</p>
      </div>

      <div className="glass-effect p-20 rounded-[3rem] border border-white/10 flex items-center justify-center bg-white/5">
        <div className="text-center">
          <p className="text-gray-400 font-medium">The Generative Agent workspace is being prepared.</p>
          <div className="mt-8 flex justify-center">
            <div className="w-12 h-1 bg-blue-500/20 rounded-full overflow-hidden">
              <div className="w-1/2 h-full bg-blue-500 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentView;

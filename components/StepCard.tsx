
import React from 'react';

interface StepCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  stepNum: string;
}

const StepCard: React.FC<StepCardProps> = ({ icon, title, desc, stepNum }) => (
  <div className="glass-effect p-8 rounded-3xl flex flex-col items-start gap-4 transition-all hover:border-purple-500/50 group bg-white/5 h-full">
    <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-2 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <span className="text-[10px] font-bold text-purple-500 uppercase tracking-[0.2em]">Phase {stepNum}</span>
    <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
  </div>
);

export default StepCard;

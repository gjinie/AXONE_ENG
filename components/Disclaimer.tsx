
import React, { useState } from 'react';
import { Info, X } from 'lucide-react';

const Disclaimer: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-indigo-950/80 backdrop-blur-md border-b border-indigo-500/20 px-6 py-3.5 relative transition-all duration-300 z-40">
      <div className="max-w-6xl mx-auto flex items-start sm:items-center gap-3.5 pr-10">
        <Info className="text-indigo-400 shrink-0" size={18} />
        <p className="text-[12px] text-indigo-100 font-medium leading-relaxed">
          This diagnosis analyzes your <strong className="text-white font-bold underline decoration-indigo-400 underline-offset-4">AI Literacy & Transformation Readiness</strong> based on your interview. 
          Please provide honest and detailed responses for the most accurate results.
        </p>
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 text-indigo-300/50 hover:bg-white/10 hover:text-white rounded-full transition-colors"
          aria-label="Close"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default Disclaimer;

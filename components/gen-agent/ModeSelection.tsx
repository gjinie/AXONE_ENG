import React from 'react';
import { Brain, Presentation, ArrowLeft } from 'lucide-react';

interface ModeSelectionProps {
  onSelectMode: (mode: 'quiz' | 'slides') => void;
  onBack?: () => void;
}

export const ModeSelection: React.FC<ModeSelectionProps> = ({ onSelectMode, onBack }) => {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in-up">
      
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-black mb-4">Select Your Content Type</h2>
        <p className="text-gray-400">Choose the format of the AI-generated material you wish to create.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Quiz Option */}
        <button
          onClick={() => onSelectMode('quiz')}
          className="group relative glass-effect p-10 rounded-[2.5rem] border border-white/10 hover:border-purple-500 transition-all duration-500 text-left overflow-hidden"
        >
          <div className="absolute -top-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity">
            <Brain className="w-48 h-48 text-purple-400" />
          </div>
          <div className="relative z-10">
            <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform border border-purple-500/20">
              <Brain className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4 group-hover:text-purple-400 transition-colors">
              Smart Assessment
            </h3>
            <p className="text-gray-500 leading-relaxed text-sm">
              Generate 10 deep-dive quizzes to validate understanding. 
              Includes detailed feedback and automated grading.
            </p>
          </div>
        </button>

        {/* Slides Option */}
        <button
          onClick={() => onSelectMode('slides')}
          className="group relative glass-effect p-10 rounded-[2.5rem] border border-white/10 hover:border-blue-500 transition-all duration-500 text-left overflow-hidden"
        >
          <div className="absolute -top-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity">
            <Presentation className="w-48 h-48 text-blue-400" />
          </div>
          <div className="relative z-10">
            <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform border border-blue-500/20">
              <Presentation className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-400 transition-colors">
              Slide Deck Summary
            </h3>
            <p className="text-gray-500 leading-relaxed text-sm">
              Transform complex documents into structured presentation slides 
              complete with speaker notes and key insights.
            </p>
          </div>
        </button>
      </div>
    </div>
  );
};
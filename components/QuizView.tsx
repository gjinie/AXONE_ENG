

import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, HelpCircle } from 'lucide-react';

interface QuizViewProps {
  onComplete: (score: number) => void;
}

const QUESTIONS = [
  { id: 1, question: "What is the primary characteristic of Generative AI?", options: ["It merely searches and displays existing data.", "It generates new data based on learned patterns.", "It always provides 100% factual information.", "It knows all real-time news without internet."], answer: 1 },
  { id: 2, question: "What do we call the phenomenon where an AI provides false information as if it were a fact?", options: ["Overfitting", "Black Box", "Hallucination", "Tokenization"], answer: 2 },
  { id: 3, question: "What is the text-based command used to obtain a desired output from an AI?", options: ["Script", "Prompt", "Query", "Source Code"], answer: 1 },
  { id: 4, question: "What is a critical precaution when using LLMs for professional tasks?", options: ["The response speed is too slow for business.", "Confidential company data can be input freely.", "AI-generated info must be fact-checked and validated.", "Translations are perfect and require no review."], answer: 2 },
  { id: 5, question: "Which statement best describes the training data of models like ChatGPT?", options: ["It knows every event that happened today in real-time.", "It is trained on historical data up to a certain point.", "It trained on private data without any consent.", "It learns on its own from the live internet without humans."], answer: 1 },
  { id: 6, question: "What is the basic unit an AI uses to understand and process text?", options: ["Pixel", "Bit", "Token", "Node"], answer: 2 },
  { id: 7, question: "Which is NOT a valid example of using AI to increase work efficiency?", options: ["Drafting and proofreading emails", "Summarizing extensive documents", "Delegating final high-stakes decision-making", "Creative brainstorming and ideation"], answer: 2 },
  { id: 8, question: "What is the prompt technique of assigning a specific role (e.g., 'You are a Marketer') to the AI?", options: ["Few-shot Prompting", "Chain of Thought", "Persona Prompting", "Zero-shot Prompting"], answer: 2 }
];

const QuizView: React.FC<QuizViewProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(new Array(QUESTIONS.length).fill(-1));

  const handleSelect = (optionIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentIndex] = optionIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      let score = 0;
      selectedAnswers.forEach((ans, idx) => {
        if (ans === QUESTIONS[idx].answer) score += 1;
      });
      onComplete(score);
    }
  };

  const currentQuestion = QUESTIONS[currentIndex];
  const isSelected = selectedAnswers[currentIndex] !== -1;
  const isLastQuestion = currentIndex === QUESTIONS.length - 1;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 animate-fade-in-up relative z-10">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-white/5 border border-white/10 mb-6 text-purple-400">
          <HelpCircle size={32} />
        </div>
        <h1 className="text-3xl font-black mb-2 tracking-tight">AI Competency Quiz</h1>
        <p className="text-gray-500 font-medium">Validating your technical literacy to complete the report.</p>
      </div>

      <div className="mb-8 flex items-center gap-4">
        <div className="flex-grow bg-white/5 h-2 rounded-full overflow-hidden border border-white/5">
          <div 
            className="gradient-bg h-full transition-all duration-500 ease-out" 
            style={{ width: `${((currentIndex + 1) / QUESTIONS.length) * 100}%` }}
          />
        </div>
        <span className="text-xs font-black text-purple-500 min-w-[3rem] text-right">
          {currentIndex + 1} / {QUESTIONS.length}
        </span>
      </div>

      <div className="glass-effect p-10 md:p-14 rounded-[3rem] border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-10 leading-snug">
            <span className="text-purple-500 mr-3 opacity-50 font-black italic">Q{currentIndex + 1}.</span>
            {currentQuestion.question}
          </h2>

          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className={`
                  w-full text-left p-6 rounded-2xl border transition-all duration-300 flex items-center justify-between group
                  ${selectedAnswers[currentIndex] === idx 
                    ? 'bg-purple-600/20 text-white border-purple-500 shadow-xl shadow-purple-900/10' 
                    : 'bg-white/5 text-gray-400 border-white/10 hover:border-purple-500/40 hover:text-white'}
                `}
              >
                <span className="font-bold text-sm leading-relaxed">{option}</span>
                <div className={`
                  w-6 h-6 rounded-full border flex items-center justify-center transition-all
                  ${selectedAnswers[currentIndex] === idx ? 'bg-purple-500 border-transparent text-white' : 'border-white/20 group-hover:border-purple-500'}
                `}>
                  {selectedAnswers[currentIndex] === idx && <CheckCircle2 size={14} />}
                </div>
              </button>
            ))}
          </div>

          <div className="mt-12 flex justify-end">
            <button
              onClick={handleNext}
              disabled={!isSelected}
              className={`
                flex items-center gap-3 px-8 py-4 rounded-xl font-black transition-all text-sm
                ${isSelected 
                  ? 'gradient-bg text-white hover:scale-105 shadow-xl shadow-purple-500/20' 
                  : 'bg-white/5 text-gray-600 cursor-not-allowed border border-white/5'}
              `}
            >
              {isLastQuestion ? 'Analyze My Results' : 'Next Question'}
              <ArrowRight size={18} />
            </button>
          </div>
      </div>
    </div>
  );
};

export default QuizView;

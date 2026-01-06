
import React, { useState } from 'react';
import { QuizQuestion, QuizResult } from '../../types';
import { CheckCircle, XCircle, ArrowRight, HelpCircle, Download, Check, X } from 'lucide-react';
import * as XLSX from 'xlsx';

interface QuizGameProps {
  questions: QuizQuestion[];
  onComplete: (result: QuizResult) => void;
}

export const QuizGame: React.FC<QuizGameProps> = ({ questions, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [subjectiveAnswer, setSubjectiveAnswer] = useState('');
  const [isSubjectiveSubmitted, setIsSubjectiveSubmitted] = useState(false);
  const [subjectiveResult, setSubjectiveResult] = useState<'correct' | 'incorrect' | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  const handleOptionSelect = (index: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);
    setShowExplanation(true);
    
    // types.ts에서 지정한 correctAnswerIndex 필드와 비교 확인
    if (index === currentQuestion.correctAnswerIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleSubmitSubjective = () => {
    if (!subjectiveAnswer.trim()) return;
    setIsSubjectiveSubmitted(true);
    setShowExplanation(true);
  };

  const handleSubjectiveGrade = (result: 'correct' | 'incorrect') => {
    setSubjectiveResult(result);
    if (result === 'correct') setScore(prev => prev + 1);
  };

  const handleNext = () => {
  if (isLastQuestion) {
      // 마지막 문제 완료 시 즉시 결과 전송
      const finalScoreValue = score; 
      onComplete({
        totalQuestions: questions.length,
        correctAnswers: finalScoreValue,
        score: Math.round((finalScoreValue / questions.length) * 100)
      });
    } else {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setSubjectiveAnswer('');
      setIsSubjectiveSubmitted(false);
      setSubjectiveResult(null);
      setShowExplanation(false);
    }
  };

  const isSubjective = currentQuestion.type === 'subjective';
  const canProceed = isSubjective ? subjectiveResult !== null : selectedOption !== null;

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-8">
         <span className="text-xs font-black text-gray-500 uppercase tracking-widest">Question {currentIndex + 1} of {questions.length}</span>
         <span className="text-xs font-black text-purple-400 uppercase tracking-widest">Score: {score}</span>
      </div>

      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mb-12 border border-white/5">
        <div className="h-full gradient-bg transition-all duration-500" style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}></div>
      </div>

      <div className="glass-effect p-10 rounded-[2.5rem] border border-white/10 mb-8">
        <h3 className="text-2xl font-black mb-8 leading-tight">{currentQuestion.question}</h3>
        
        {isSubjective ? (
          <div className="space-y-4">
            <textarea value={subjectiveAnswer} onChange={(e) => setSubjectiveAnswer(e.target.value)} disabled={isSubjectiveSubmitted} placeholder="Please enter the correct answer...." className="w-full bg-black/50 border border-white/10 rounded-2xl p-5 outline-none focus:ring-2 focus:ring-purple-500/50 resize-none min-h-[120px]" />
            {!isSubjectiveSubmitted ? (
              <button onClick={handleSubmitSubjective} className="w-full py-4 gradient-bg rounded-xl font-bold">Answer verification</button>
            ) : (
              <div className="animate-fade-in-up space-y-4">
                <div className="p-5 bg-purple-500/10 border border-purple-500/20 rounded-2xl">
                  <p className="text-xs font-black text-purple-400 uppercase mb-2">Model answer</p>
                  <p className="font-bold">{currentQuestion.correctAnswer}</p>
                </div>
                {subjectiveResult === null && (
                  <div className="flex gap-4">
                    <button onClick={() => handleSubjectiveGrade('correct')} className="flex-1 py-4 bg-green-500/20 border border-green-500/30 text-green-400 rounded-xl font-bold">That's correct.</button>
                    <button onClick={() => handleSubjectiveGrade('incorrect')} className="flex-1 py-4 bg-red-500/20 border border-red-500/30 text-red-400 rounded-xl font-bold">That's incorrect.</button>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {currentQuestion.options?.map((opt, i) => (
              <button key={i} onClick={() => handleOptionSelect(i)} disabled={selectedOption !== null} className={`w-full text-left p-5 rounded-2xl border transition-all ${selectedOption === null ? 'bg-white/5 border-white/10 hover:border-purple-500/50' : i === currentQuestion.correctAnswerIndex ? 'bg-green-500/20 border-green-500/50 text-green-400' : i === selectedOption ? 'bg-red-500/20 border-red-500/50 text-red-400' : 'bg-white/5 border-white/10 opacity-40'}`}>{opt}</button>
            ))}
          </div>
        )}
      </div>

      {showExplanation && (
        <div className="glass-effect p-8 rounded-[2rem] border border-blue-500/20 mb-8 animate-fade-in-up">
          <h4 className="text-xs font-black text-blue-400 uppercase tracking-widest mb-3 flex items-center gap-2"><HelpCircle size={14}/> Commentary</h4>
          <p className="text-sm text-gray-300 leading-relaxed">{currentQuestion.explanation}</p>
        </div>
      )}

      {canProceed && (
        <div className="flex justify-end">
          <button onClick={handleNext} className="px-10 py-4 gradient-bg rounded-2xl font-black shadow-xl shadow-purple-500/20 flex items-center gap-2 hover:scale-105 transition-all">{isLastQuestion ? 'View results' : 'Next question'} <ArrowRight size={20}/></button>
        </div>
      )}
    </div>
  );
};

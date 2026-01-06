import React from 'react';
import { QuizResult } from '../../types';
import { RefreshCw, Trophy, ArrowLeft } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface ResultViewProps {
  result: QuizResult;
  onReset: () => void;
  onRetry: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({ result, onReset, onRetry }) => {
  // Ensure data safety: handle cases where result might be null
  const correct = result?.correctAnswers ?? 0;
  const total = result?.totalQuestions ?? 0;
  const score = result?.score ?? 0;
  const incorrect = Math.max(0, total - correct);

  const data = [
    { name: 'Correct', value: correct },
    { name: 'Incorrect', value: incorrect },
  ];

  const COLORS = ['#A855F7', 'rgba(255,255,255,0.05)'];

  return (
    <div className="w-full max-w-3xl mx-auto text-center animate-fade-in-up">
      <div className="glass-effect p-16 rounded-[3.5rem] border border-white/10 shadow-2xl relative overflow-hidden bg-zinc-900/50">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 to-blue-500"></div>
        
        <div className="inline-flex items-center justify-center p-8 bg-purple-500/10 rounded-full mb-8 text-purple-400">
          <Trophy size={64} />
        </div>
        
        <h2 className="text-5xl font-black mb-4 tracking-tighter text-white">Quiz Completed!</h2>
        <p className="text-gray-400 text-lg mb-12">
          {score >= 80 
            ? "Excellent work! You've mastered this topic." 
            : "Keep practicing! You're almost there. 💪"}
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-16 mb-16">
          <div className="w-64 h-64 relative">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie 
                    data={data} 
                    cx="50%" cy="50%" 
                    innerRadius={75} 
                    outerRadius={95} 
                    paddingAngle={8} 
                    dataKey="value" 
                    startAngle={90} 
                    endAngle={-270}
                  >
                    {data.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />)}
                  </Pie>
                </PieChart>
             </ResponsiveContainer>
             <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                 {/* 영어권에서는 큰 숫자 뒤에 단위를 잘 붙이지 않아 숫자만 강조합니다 */}
                 <span className="text-4xl font-black gradient-text">{score}</span>
                 <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest mt-1">Score</span>
             </div>
          </div>
          
          <div className="text-left space-y-5 bg-white/[0.03] p-10 rounded-[2.5rem] border border-white/5 min-w-[280px]">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500 font-bold uppercase">Total Questions</span>
              <span className="font-bold text-white">{total}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500 font-bold uppercase">Correct</span>
              <span className="font-bold text-purple-400">{correct}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500 font-bold uppercase">Incorrect</span>
              <span className="font-bold text-gray-400">{incorrect}</span>
            </div>
            <div className="h-px bg-white/10 my-4"></div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-black uppercase text-purple-400">Final Score</span>
              <span className="font-black text-3xl text-white">{score}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* '입력 수정하기'는 문맥상 설정으로 돌아가는 것이므로 Edit Inputs가 적절합니다 */}
          <button onClick={onRetry} className="flex items-center justify-center gap-3 px-10 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-bold hover:bg-white/10 transition-all">
              ← Edit Inputs
          </button>
          <button onClick={onReset} className="flex items-center justify-center gap-3 px-10 py-4 gradient-bg text-white rounded-2xl font-bold hover:scale-105 transition-all shadow-xl shadow-purple-500/20">
             <RefreshCw size={18} /> Create New Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

// import React from 'react';
// import { QuizResult } from '../../types';
// import { RefreshCw, Trophy, ArrowLeft } from 'lucide-react';
// import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

// interface ResultViewProps {
//   result: QuizResult;
//   onReset: () => void;
//   onRetry: () => void;
// }

// export const ResultView: React.FC<ResultViewProps> = ({ result, onReset, onRetry }) => {
//   // 데이터 안전성 확보: result가 없을 경우를 대비
//   const correct = result?.correctAnswers ?? 0;
//   const total = result?.totalQuestions ?? 0;
//   const score = result?.score ?? 0;
//   const incorrect = Math.max(0, total - correct);

//   const data = [
//     { name: '정답', value: correct },
//     { name: '오답', value: incorrect },
//   ];

//   const COLORS = ['#A855F7', 'rgba(255,255,255,0.05)'];

//   return (
//     <div className="w-full max-w-3xl mx-auto text-center animate-fade-in-up">
//       <div className="glass-effect p-16 rounded-[3.5rem] border border-white/10 shadow-2xl relative overflow-hidden bg-zinc-900/50">
//         <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 to-blue-500"></div>
        
//         <div className="inline-flex items-center justify-center p-8 bg-purple-500/10 rounded-full mb-8 text-purple-400">
//           <Trophy size={64} />
//         </div>
        
//         <h2 className="text-5xl font-black mb-4 tracking-tighter text-white">퀴즈 종료!</h2>
//         <p className="text-gray-400 text-lg mb-12">
//           {score >= 80 ? "훌륭합니다! 이 주제를 완벽히 이해하셨군요." : "조금 더 복습하면 완벽해질 거예요! 💪"}
//         </p>

//         <div className="flex flex-col md:flex-row items-center justify-center gap-16 mb-16">
//           <div className="w-64 h-64 relative">
//              <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie 
//                     data={data} 
//                     cx="50%" cy="50%" 
//                     innerRadius={75} 
//                     outerRadius={95} 
//                     paddingAngle={8} 
//                     dataKey="value" 
//                     startAngle={90} 
//                     endAngle={-270}
//                   >
//                     {data.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />)}
//                   </Pie>
//                 </PieChart>
//               </ResponsiveContainer>
//               <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
//                  <span className="text-4xl font-black gradient-text">{score}점</span>
//                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest mt-1">정답률</span>
//               </div>
//           </div>
          
//           <div className="text-left space-y-5 bg-white/[0.03] p-10 rounded-[2.5rem] border border-white/5 min-w-[280px]">
//             <div className="flex justify-between items-center text-sm">
//               <span className="text-gray-500 font-bold uppercase">전체 문항</span>
//               <span className="font-bold text-white">{total}개</span>
//             </div>
//             <div className="flex justify-between items-center text-sm">
//               <span className="text-gray-500 font-bold uppercase">맞힌 개수</span>
//               <span className="font-bold text-purple-400">{correct}개</span>
//             </div>
//             <div className="flex justify-between items-center text-sm">
//               <span className="text-gray-500 font-bold uppercase">틀린 개수</span>
//               <span className="font-bold text-gray-400">{incorrect}개</span>
//             </div>
//             <div className="h-px bg-white/10 my-4"></div>
//             <div className="flex justify-between items-center">
//               <span className="text-xs font-black uppercase text-purple-400">최종 점수</span>
//               <span className="font-black text-3xl text-white">{score}점</span>
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-col sm:flex-row gap-4 justify-center">
//           <button onClick={onRetry} className="flex items-center justify-center gap-3 px-10 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-bold hover:bg-white/10 transition-all">
//              ← 입력 수정하기
//           </button>
//           <button onClick={onReset} className="flex items-center justify-center gap-3 px-10 py-4 gradient-bg text-white rounded-2xl font-bold hover:scale-105 transition-all shadow-xl shadow-purple-500/20">
//              <RefreshCw size={18} /> 새로운 퀴즈 만들기
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

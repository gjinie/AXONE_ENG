import React, { useEffect, useState } from 'react';
import { BookOpen, Star, Zap, MessageCircle, ChevronRight, Share2, Layout } from 'lucide-react';
import { AXDiagnosisResult, View } from '../types';

interface DashboardViewProps {
  setView: (view: View) => void;
}

const DashboardView: React.FC<DashboardViewProps> = ({ setView }) => {
  const [result, setResult] = useState<AXDiagnosisResult | null>(null);
  const [aiStack, setAiStack] = useState<string[]>([]);

  useEffect(() => {
    const savedResult = localStorage.getItem('ax_diagnosis_result');
    if (savedResult) {
      try {
        const parsed: AXDiagnosisResult = JSON.parse(savedResult);
        setResult(parsed);
        setAiStack(extractAIStack(parsed.feedback));
      } catch (error) {
        console.error("Failed to parse diagnosis result:", error);
      }
    }
  }, []);

  const extractAIStack = (feedback: string): string[] => {
    const lines = feedback.split('\n');
    const tools: string[] = [];
    lines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        const toolName = trimmed.replace(/^[-*]\s+/, '').replace(/\*\*/g, '').split(':')[0];
        if (toolName.length > 1 && toolName.length < 40) {
          tools.push(toolName);
        }
      }
    });
    return tools.length > 0 ? tools.slice(0, 4) : ["ChatGPT", "Claude", "Midjourney", "Perplexity"];
  };

  if (!result) {
    return (
      <div className="min-h-screen pt-32 px-6 text-center">
        <h1 className="text-2xl font-black mb-4">No Diagnosis Found</h1>
        <p className="text-gray-400 mb-8">Please complete your AX Assessment to unlock the dashboard.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 max-w-7xl mx-auto animate-fade-in-up">
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black mb-2">My Learning Summary</h1>
          <p className="text-gray-400">Personalized intelligence dashboard based on your AX report.</p>
        </div>
        <div className="glass-effect px-6 py-4 rounded-2xl border border-purple-500/30 bg-purple-500/5">
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">AX ONE Level</p>
          <p className="text-2xl font-black text-purple-400 flex items-center gap-2">
            <Star size={20} fill="currentColor" /> {result.ax_one_level}
          </p>
        </div>
      </div>

      {/* 2. Main Grid: Curriculum & Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Learning Curriculum */}
          <div className="glass-effect p-8 rounded-[2.5rem] border border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                <BookOpen size={20} />
              </div>
              <h3 className="text-xl font-bold text-white">Learning Curriculum</h3>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
              <p className="text-gray-300 leading-relaxed">
                Your path is set to <span className="text-purple-400 font-bold">{result.literacy_level}</span> level. 
                We recommend focusing on practical Generative AI applications tailored for your professional role.
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar: Diagnostic Insights */}
        <div className="lg:col-span-1">
          <div className="glass-effect p-8 rounded-[2.5rem] bg-gradient-to-b from-purple-900/10 to-transparent border border-white/10 h-full">
            <h3 className="text-xl font-bold mb-6 text-white">Diagnostic Insights</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-xs text-gray-500 font-bold uppercase">Literacy Score</span>
                  <span className="text-xs font-black text-purple-400">{result.literacy_score}/100</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full gradient-bg transition-all duration-1000" 
                    style={{ width: `${result.literacy_score}%` }}
                  ></div>
                </div>
              </div>
              <div className="pt-4 border-t border-white/5">
                <p className="text-[10px] text-gray-500 font-bold uppercase mb-2">Proficiency Level</p>
                <p className="text-lg font-bold text-white">{result.literacy_level}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Full Width Section: AI Stack & Encouragement */}
      <div className="w-full space-y-6 mb-8">
        {/* Recommended AI Stack */}
        <div className="glass-effect p-8 rounded-[2.5rem] border border-white/10 w-full">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-500">
              <Zap size={20} />
            </div>
            <h4 className="font-bold text-white">Recommended AI Stack</h4>
          </div>
          <p className="text-xs text-gray-500 mb-6 leading-relaxed">
            Essential tools to automate your workflow and enhance output quality.
          </p>
          <div className="flex flex-wrap gap-3">
            {aiStack.map((tool, idx) => (
              <span key={idx} className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-[12px] font-bold text-gray-300">
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Expert Encouragement */}
        <div className="glass-effect p-8 rounded-[2.5rem] border border-white/10 w-full">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500">
              <MessageCircle size={20} />
            </div>
            <h4 className="font-bold text-white">Expert Encouragement</h4>
          </div>
          <div className="bg-white/5 p-6 rounded-2xl border-l-4 border-green-500/50">
            <p className="text-sm text-gray-400 italic leading-relaxed">
              "The first step to AI transformation is consistent exploration. Your results show great potential to lead this change."
            </p>
          </div>
        </div>
      </div>

      {/* 4. Action Section: Solutions Shortcut */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button 
          onClick={() => setView('promptlab')}
          className="glass-effect p-8 rounded-[2.5rem] border border-white/10 hover:border-purple-500/50 transition-all text-left group relative overflow-hidden bg-purple-500/5"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
              <Share2 size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Explore Prompt Lab</h3>
              <p className="text-xs text-purple-400 font-bold uppercase tracking-widest">Efficiency Boost</p>
            </div>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed mb-4">
            Don't struggle with blank pages. Access expert-curated prompt templates designed for high-stakes business scenarios.
          </p>
          <div className="flex items-center gap-2 text-xs font-black text-white uppercase tracking-tighter">
            Go to Prompt Lab <ChevronRight size={14} />
          </div>
        </button>

        <button 
          onClick={() => setView('agent')}
          className="glass-effect p-8 rounded-[2.5rem] border border-white/10 hover:border-blue-500/50 transition-all text-left group relative overflow-hidden bg-blue-500/5"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
              <Layout size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Try Learning Agent</h3>
              <p className="text-xs text-blue-400 font-bold uppercase tracking-widest">Smart Automation</p>
            </div>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed mb-4">
            Transform your raw documents into structured study materials or slide decks instantly using our Generative AI agent.
          </p>
          <div className="flex items-center gap-2 text-xs font-black text-white uppercase tracking-tighter">
            Go to Learning Agent <ChevronRight size={14} />
          </div>
        </button>
      </div>
    </div>
  );
};

export default DashboardView;


// import React, { useEffect, useState } from 'react';
// import { BookOpen, Star, Zap, MessageCircle, ChevronRight } from 'lucide-react';
// import { AXDiagnosisResult } from '../types';
// import { Share2, Layout } from 'lucide-react'; // 아이콘 추가 필요 시 상단 import 확인



// const DashboardView: React.FC = () => {
//   const [result, setResult] = useState<AXDiagnosisResult | null>(null);
//   const [aiStack, setAiStack] = useState<string[]>([]);

//   useEffect(() => {
//     // 1. 로컬 스토리지에서 진단 결과를 불러옵니다.
//     const savedResult = localStorage.getItem('ax_diagnosis_result');
//     if (savedResult) {
//       try {
//         const parsed: AXDiagnosisResult = JSON.parse(savedResult);
//         setResult(parsed);
//         // 2. 피드백 텍스트에서 AI 도구 리스트를 추출합니다.
//         setAiStack(extractAIStack(parsed.feedback));
//       } catch (error) {
//         console.error("Failed to parse diagnosis result:", error);
//       }
//     }
//   }, []);

//   // 피드백 마크다운에서 AI 도구를 추출하는 유틸리티 함수
//   const extractAIStack = (feedback: string): string[] => {
//     const lines = feedback.split('\n');
//     const tools: string[] = [];
    
//     lines.forEach(line => {
//       const trimmed = line.trim();
//       // 마크다운 리스트 기호(-, *)로 시작하는 줄을 찾아 도구명 추출
//       if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
//         const toolName = trimmed.replace(/^[-*]\s+/, '').replace(/\*\*/g, '').split(':')[0];
//         if (toolName.length > 1 && toolName.length < 40) {
//           tools.push(toolName);
//         }
//       }
//     });

//     // 추출된 도구가 없으면 기본 추천 도구 반환
//     return tools.length > 0 ? tools.slice(0, 4) : ["ChatGPT", "Claude", "Midjourney", "Perplexity"];
//   };

//   if (!result) {
//     return (
//       <div className="min-h-screen pt-32 px-6 text-center">
//         <h1 className="text-2xl font-black mb-4">No Diagnosis Found</h1>
//         <p className="text-gray-400 mb-8">Please complete your AX Assessment to unlock the dashboard.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen pt-32 pb-24 px-6 max-w-7xl mx-auto animate-fade-in-up">
//       {/* 1. AX ONE Level Header */}
//       <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
//         <div>
//           <h1 className="text-4xl font-black mb-2">My Learning Summary</h1>
//           <p className="text-gray-400">Personalized intelligence dashboard based on your AX report.</p>
//         </div>
//         <div className="flex gap-4">
//           <div className="glass-effect px-6 py-4 rounded-2xl border border-purple-500/30 bg-purple-500/5">
//             <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">AX ONE Level</p>
//             <p className="text-2xl font-black text-purple-400 flex items-center gap-2">
//               <Star size={20} fill="currentColor" /> {result.ax_one_level}
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         <div className="lg:col-span-2 space-y-8">
//           {/* 3. Learning Curriculum Section */}
//           <div className="glass-effect p-8 rounded-[2.5rem] border border-white/10">
//             <div className="flex items-center gap-3 mb-6">
//               <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
//                 <BookOpen size={20} />
//               </div>
//               <h3 className="text-xl font-bold text-white">Learning Curriculum</h3>
//             </div>
//             <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
//               <p className="text-gray-300 leading-relaxed mb-4">
//                 Your path is set to <span className="text-purple-400 font-bold">{result.literacy_level}</span> level. 
//                 We recommend focusing on practical Generative AI applications tailored for your role as a <strong>Strategic Lead</strong>.
//               </p>
//             </div>
//           </div>
//           {/* 하단 섹션: AI Stack과 Encouragement를 세로로 길게 배치 */}
//           <div className="w-full space-y-6">
//             {/* 2. Recommended AI Stack Section - 가로로 길게 배치 */}
//             <div className="glass-effect p-8 rounded-[2.5rem] border border-white/10 flex flex-col w-full">
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-500">
//                   <Zap size={20} />
//                 </div>
//                 <h4 className="font-bold text-white">Recommended AI Stack</h4>
//               </div>
//               <p className="text-xs text-gray-500 mb-6 leading-relaxed">
//                 Essential tools to automate your workflow and enhance output quality.
//               </p>
//               {/* 도구 배지들을 가로로 나열 */}
//               <div className="flex flex-wrap gap-3">
//                 {aiStack.map((tool, idx) => (
//                   <span key={idx} className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-[12px] font-bold text-gray-300">
//                     {tool}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             {/* 4. Encouragement Section - 가로로 길게 배치 */}
//             <div className="glass-effect p-8 rounded-[2.5rem] border border-white/10 w-full">
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500">
//                   <MessageCircle size={20} />
//                 </div>
//                 <h4 className="font-bold text-white">Expert Encouragement</h4>
//               </div>
//               <div className="bg-white/5 p-6 rounded-2xl border-l-4 border-green-500/50 w-full">
//                 <p className="text-sm text-gray-400 italic leading-relaxed">
//                   "The first step to AI transformation is consistent exploration. Your results show great potential to lead this change."
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Sidebar Metrics */}
//         <div className="space-y-8">
//           <div className="glass-effect p-8 rounded-[2.5rem] bg-gradient-to-b from-purple-900/10 to-transparent border border-white/10">
//             <h3 className="text-xl font-bold mb-6 text-white">Diagnostic Insights</h3>
//             <div className="space-y-6">
//               <div>
//                 <div className="flex justify-between mb-2">
//                   <span className="text-xs text-gray-500 font-bold uppercase">Literacy Score</span>
//                   <span className="text-xs font-black text-purple-400">{result.literacy_score}/100</span>
//                 </div>
//                 <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
//                   <div 
//                     className="h-full gradient-bg transition-all duration-1000" 
//                     style={{ width: `${result.literacy_score}%` }}
//                   ></div>
//                 </div>
//               </div>
//               <div className="pt-4 border-t border-white/5">
//                 <p className="text-[10px] text-gray-500 font-bold uppercase mb-2">Proficiency Level</p>
//                 <p className="text-lg font-bold text-white">{result.literacy_level}</p>
//               </div>
//             </div>
//           </div>
//         </div>
        

//       </div>

//     </div>
//   );
// };

// export default DashboardView;

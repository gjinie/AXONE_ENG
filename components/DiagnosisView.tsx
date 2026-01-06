import React, { useState, useEffect, useRef } from 'react';
import { geminiService } from '../services/geminiService';
import { ChatMessage, UserInfo, AXDiagnosisResult, AppView } from '../types';
import SetupForm from './SetupForm';
import QuizView from './QuizView';
import Disclaimer from './Disclaimer';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import DiagnosisResult from './DiagnosisResult';
import { Loader2, Sparkles } from 'lucide-react';

const DiagnosisView: React.FC = () => {
  const [appView, setAppView] = useState<AppView>('setup');
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState<AXDiagnosisResult | null>(null);
  const [step, setStep] = useState(1);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // 컴포넌트 마운트 시 로컬 스토리지 확인 (탭 이동 시 결과 유지 로직)
  useEffect(() => {
    const savedResult = localStorage.getItem('ax_diagnosis_result');
    if (savedResult) {
      try {
        const result: AXDiagnosisResult = JSON.parse(savedResult);
        setDiagnosisResult(result);
        setAppView('result'); // 결과가 있으면 바로 결과 화면으로 이동
      } catch (error) {
        console.error("Failed to parse saved diagnosis result", error);
      }
    }
  }, []);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSetupComplete = (info: UserInfo) => {
    setUserInfo(info);
    geminiService.initializeChat(info);
    setAppView('chat');
    startInterview();
  };

  const startInterview = async () => {
    setIsLoading(true);
    try {
      let fullResponse = "";
      const stream = geminiService.sendMessageStream("Start the interview.");
      
      const newMsg: ChatMessage = { role: 'model', text: "" };
      setMessages([newMsg]);

      for await (const chunk of stream) {
        fullResponse += chunk;
        setMessages([{ role: 'model', text: fullResponse }]);
        
        const stepMatch = fullResponse.match(/\[\[STEP:(\d+)\]\]/);
        if (stepMatch) setStep(parseInt(stepMatch[1]));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      let fullResponse = "";
      const stream = geminiService.sendMessageStream(text);
      
      const botMsg: ChatMessage = { role: 'model', text: "" };
      setMessages(prev => [...prev, botMsg]);

      for await (const chunk of stream) {
        fullResponse += chunk;
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: 'model', text: fullResponse };
          return updated;
        });

        const stepMatch = fullResponse.match(/\[\[STEP:(\d+)\]\]/);
        if (stepMatch) setStep(parseInt(stepMatch[1]));
      }

      if (fullResponse.includes('[[STEP:8]]')) {
        setTimeout(() => setAppView('quiz'), 2000);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "An error occurred. Please try again.", isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuizComplete = async (score: number) => {
    setQuizScore(score);
    setAppView('result');
    setIsAnalyzing(true);

    try {
      const jsonStr = await geminiService.generateFinalDiagnosis(score);
      const result: AXDiagnosisResult = JSON.parse(jsonStr);
      setDiagnosisResult(result);
      // 대시보드 및 유지 보관을 위해 로컬 스토리지에 저장
      localStorage.setItem('ax_diagnosis_result', JSON.stringify(result));
    } catch (error) {
      console.error("Diagnosis failed", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleRestart = () => {
    // 다시 시작할 때는 로컬 스토리지 데이터 삭제
    localStorage.removeItem('ax_diagnosis_result');
    setAppView('setup');
    setUserInfo(null);
    setQuizScore(0);
    setMessages([]);
    setDiagnosisResult(null);
    setIsAnalyzing(false);
    setStep(1);
  };

  if (appView === 'setup') return <div className="min-h-screen bg-black pt-20"><SetupForm onComplete={handleSetupComplete} /></div>;
  if (appView === 'quiz') return <div className="min-h-screen bg-black pt-20"><QuizView onComplete={handleQuizComplete} /></div>;

  if (appView === 'result') {
    if (isAnalyzing) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-black">
          <div className="relative mb-12">
            <Loader2 size={80} className="text-purple-500 animate-spin" />
            <Sparkles className="absolute top-0 right-0 text-yellow-400 animate-pulse" size={24} />
          </div>
          <h2 className="text-4xl font-black mb-6 tracking-tighter">Assembling Your <span className="gradient-text">Intelligence Report</span></h2>
          <p className="text-gray-400 text-lg max-w-md leading-relaxed">Cross-referencing your potential with our proprietary AX framework for precision insights.</p>
        </div>
      );
    }
    return diagnosisResult ? <DiagnosisResult resultData={diagnosisResult} onRestart={handleRestart} /> : null;
  }

  return (
    <div className="min-h-screen pt-16 flex flex-col bg-black relative selection:bg-purple-500/30">
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <div className="fixed top-[72px] left-0 w-full z-40">
        <Disclaimer />
      </div>

      <div 
        ref={chatScrollRef} 
        className="flex-grow overflow-y-auto px-6 pt-24 pb-48 custom-scrollbar max-w-5xl mx-auto w-full z-10"
      >
        <div className="space-y-4">
          {messages.map((msg, idx) => (
            <MessageBubble 
              key={idx} 
              message={msg} 
              isLast={idx === messages.length - 1} 
              onSelectOption={handleSendMessage}
            />
          ))}
          {isLoading && messages[messages.length-1]?.role === 'user' && (
            <div className="flex justify-start animate-pulse mb-8">
              <div className="w-8 h-8 rounded-lg glass-effect border border-white/10 flex items-center justify-center mr-3">
                <Loader2 size={16} className="animate-spin text-purple-500" />
              </div>
              <div className="glass-effect border border-white/10 px-5 py-3 rounded-2xl rounded-tl-none text-sm text-gray-500">
                AI is crafting a response...
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/95 to-transparent pt-12 pb-8 z-40">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex justify-center mb-5">
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] bg-white/5 px-4 py-1.5 rounded-full border border-white/5">
              Current Progress: <span className="text-purple-400">{Math.min(step, 7)}</span> / 7
            </span>
          </div>
          <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default DiagnosisView;



// import React, { useState, useEffect, useRef } from 'react';
// import { geminiService } from '../services/geminiService';
// import { ChatMessage, UserInfo, AXDiagnosisResult, AppView } from '../types';
// import SetupForm from './SetupForm';
// import QuizView from './QuizView';
// import Disclaimer from './Disclaimer';
// import MessageBubble from './MessageBubble';
// import ChatInput from './ChatInput';
// import DiagnosisResult from './DiagnosisResult';
// import { Loader2, Sparkles } from 'lucide-react';

// const DiagnosisView: React.FC = () => {
//   const [appView, setAppView] = useState<AppView>('setup');
//   const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
//   const [quizScore, setQuizScore] = useState(0);
//   const [messages, setMessages] = useState<ChatMessage[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [diagnosisResult, setDiagnosisResult] = useState<AXDiagnosisResult | null>(null);
//   const [step, setStep] = useState(1);
//   const chatScrollRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (chatScrollRef.current) {
//       chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
//     }
//   }, [messages, isLoading]);

//   const handleSetupComplete = (info: UserInfo) => {
//     setUserInfo(info);
//     geminiService.initializeChat(info);
//     setAppView('chat');
//     startInterview();
//   };

//   const startInterview = async () => {
//     setIsLoading(true);
//     try {
//       let fullResponse = "";
//       const stream = geminiService.sendMessageStream("Start the interview.");
      
//       const newMsg: ChatMessage = { role: 'model', text: "" };
//       setMessages([newMsg]);

//       for await (const chunk of stream) {
//         fullResponse += chunk;
//         setMessages([{ role: 'model', text: fullResponse }]);
        
//         const stepMatch = fullResponse.match(/\[\[STEP:(\d+)\]\]/);
//         if (stepMatch) setStep(parseInt(stepMatch[1]));
//       }
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSendMessage = async (text: string) => {
//     if (!text.trim() || isLoading) return;

//     const userMsg: ChatMessage = { role: 'user', text };
//     setMessages(prev => [...prev, userMsg]);
//     setIsLoading(true);

//     try {
//       let fullResponse = "";
//       const stream = geminiService.sendMessageStream(text);
      
//       const botMsg: ChatMessage = { role: 'model', text: "" };
//       setMessages(prev => [...prev, botMsg]);

//       for await (const chunk of stream) {
//         fullResponse += chunk;
//         setMessages(prev => {
//           const updated = [...prev];
//           updated[updated.length - 1] = { role: 'model', text: fullResponse };
//           return updated;
//         });

//         const stepMatch = fullResponse.match(/\[\[STEP:(\d+)\]\]/);
//         if (stepMatch) setStep(parseInt(stepMatch[1]));
//       }

//       if (fullResponse.includes('[[STEP:8]]')) {
//         setTimeout(() => setAppView('quiz'), 2000);
//       }
//     } catch (error) {
//       setMessages(prev => [...prev, { role: 'model', text: "An error occurred. Please try again.", isError: true }]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleQuizComplete = async (score: number) => {
//     setQuizScore(score);
//     setAppView('result');
//     setIsAnalyzing(true);

//     try {
//       const jsonStr = await geminiService.generateFinalDiagnosis(score);
//       const result: AXDiagnosisResult = JSON.parse(jsonStr);
//       setDiagnosisResult(result);
//       localStorage.setItem('ax_diagnosis_result', JSON.stringify(result));
//     } catch (error) {
//       console.error("Diagnosis failed", error);
//     } finally {
//       setIsAnalyzing(false);
//     }
//   };

//   const handleRestart = () => {
//     setAppView('setup');
//     setUserInfo(null);
//     setQuizScore(0);
//     setMessages([]);
//     setDiagnosisResult(null);
//     setIsAnalyzing(false);
//     setStep(1);
//   };

//   if (appView === 'setup') return <div className="min-h-screen bg-black pt-20"><SetupForm onComplete={handleSetupComplete} /></div>;
//   if (appView === 'quiz') return <div className="min-h-screen bg-black pt-20"><QuizView onComplete={handleQuizComplete} /></div>;

//   if (appView === 'result') {
//     if (isAnalyzing) {
//       return (
//         <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-black">
//           <div className="relative mb-12">
//             <Loader2 size={80} className="text-purple-500 animate-spin" />
//             <Sparkles className="absolute top-0 right-0 text-yellow-400 animate-pulse" size={24} />
//           </div>
//           <h2 className="text-4xl font-black mb-6 tracking-tighter">Assembling Your <span className="gradient-text">Intelligence Report</span></h2>
//           <p className="text-gray-400 text-lg max-w-md leading-relaxed">Cross-referencing your potential with our proprietary AX framework for precision insights.</p>
//         </div>
//       );
//     }
//     return diagnosisResult ? <DiagnosisResult resultData={diagnosisResult} onRestart={handleRestart} /> : null;
//   }

//   return (
//     <div className="min-h-screen pt-16 flex flex-col bg-black relative selection:bg-purple-500/30">
//       {/* Fixed Background Aura */}
//       <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none z-0"></div>

//       <div className="fixed top-[72px] left-0 w-full z-40">
//         <Disclaimer />
//       </div>

//       {/* Messages Area */}
//       <div 
//         ref={chatScrollRef} 
//         className="flex-grow overflow-y-auto px-6 pt-24 pb-48 custom-scrollbar max-w-5xl mx-auto w-full z-10"
//       >
//         <div className="space-y-4">
//           {messages.map((msg, idx) => (
//             <MessageBubble 
//               key={idx} 
//               message={msg} 
//               isLast={idx === messages.length - 1} 
//               onSelectOption={handleSendMessage}
//             />
//           ))}
//           {isLoading && messages[messages.length-1]?.role === 'user' && (
//             <div className="flex justify-start animate-pulse mb-8">
//               <div className="w-8 h-8 rounded-lg glass-effect border border-white/10 flex items-center justify-center mr-3">
//                 <Loader2 size={16} className="animate-spin text-purple-500" />
//               </div>
//               <div className="glass-effect border border-white/10 px-5 py-3 rounded-2xl rounded-tl-none text-sm text-gray-500">
//                 AI is crafting a response...
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Fixed Bottom Input Area */}
//       <div className="fixed bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/95 to-transparent pt-12 pb-8 z-40">
//         <div className="max-w-5xl mx-auto px-6">
//           <div className="flex justify-center mb-5">
//             <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] bg-white/5 px-4 py-1.5 rounded-full border border-white/5">
//               Current Progress: <span className="text-purple-400">{Math.min(step, 7)}</span> / 7
//             </span>
//           </div>
//           <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DiagnosisView;

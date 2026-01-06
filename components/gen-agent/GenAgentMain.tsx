import React, { useState } from 'react';
import { AppState, QuizQuestion, QuizResult, Slide, ContentInput } from '../../types';
import { generateQuiz, generateSlides } from '../../services/genaiService';
import { InputSection } from './InputSection';
import { ModeSelection } from './ModeSelection';
import { QuizGame } from './QuizGame';
import { ResultView } from './ResultView';
import { SlideViewer } from './SlideViewer';
import { Sparkles, Layout, AlertCircle } from 'lucide-react';

const GenAgentMain: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.MODE_SELECTION);
  const [selectedMode, setSelectedMode] = useState<'quiz' | 'slides' | null>(null);
  const [inputContent, setInputContent] = useState<ContentInput | null>(null);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [subject, setSubject] = useState<string>('AI Learning'); // 'AI 학습' -> 'AI Learning'
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleModeSelect = (mode: 'quiz' | 'slides') => {
    setSelectedMode(mode);
    setAppState(AppState.INPUT);
    setErrorMsg('');
  };

  const handleContentSubmit = async (content: ContentInput) => {
    setInputContent(content);
    setAppState(AppState.GENERATING);
    setErrorMsg('');

    try {
      if (selectedMode === 'quiz') {
        const questions = await generateQuiz(content);
        if (questions && questions.length > 0) {
          setQuizQuestions(questions);
          setTimeout(() => {
            setAppState(AppState.PLAYING_QUIZ);
          }, 500);
        } else {
          // "AI가 퀴즈 문항을 추출하지 못했습니다..."
          throw new Error('The AI could not generate quiz questions. Please try providing more text content.');
        }
      } else {
        const generatedResult = await generateSlides(content);
        if (generatedResult && generatedResult.slides && generatedResult.slides.length > 0) {
          setSlides(generatedResult.slides);
          // "AI 학습 세션"
          setSubject(generatedResult.subject || 'AI Learning Session');
          setTimeout(() => {
            setAppState(AppState.VIEWING_SLIDES);
          }, 500);
        } else {
           // "AI가 슬라이드 내용을 생성하지 못했습니다."
          throw new Error('The AI could not generate slide content.');
        }
      }
    } catch (err: any) {
      console.error("Generation Error:", err);
      // "처리 중 예기치 않은 오류가 발생했습니다."
      setErrorMsg(err.message || 'An unexpected error occurred during processing.');
      setAppState(AppState.INPUT);
    }
  };

  const handleQuizComplete = (result: QuizResult) => {
    // 결과 데이터를 먼저 설정하고 상태를 변경하여 화면이 바로 보이지 않는 문제 방지
    setQuizResult(result);
    setAppState(AppState.FINISHED_QUIZ);
  };

  const handleReset = () => {
    setAppState(AppState.MODE_SELECTION);
    setSelectedMode(null);
    setInputContent(null);
    setQuizQuestions([]);
    setSlides([]);
    setQuizResult(null);
    setErrorMsg('');
  };

  const handleRetry = () => {
    setAppState(AppState.INPUT);
    setQuizQuestions([]);
    setSlides([]);
    setQuizResult(null);
    setErrorMsg('');
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 max-w-7xl mx-auto animate-fade-in-up">
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center p-5 rounded-3xl bg-purple-500/10 border border-purple-500/20 mb-8 text-purple-400 shadow-2xl shadow-purple-500/10">
          <Layout size={40} />
        </div>
        <h1 className="text-5xl font-black mb-4 tracking-tighter">Learning <span className="gradient-text">Agent</span></h1>
        {/* "AI를 통해 학습 자료와 퀴즈를 즉시 생성하고 확인하세요." */}
        <p className="text-gray-500 text-lg">Instantly generate and review learning materials and quizzes using AI.</p>
      </div>

      {errorMsg && (
        <div className="max-w-4xl mx-auto mb-10 p-6 bg-red-500/10 border border-red-500/20 text-red-400 rounded-3xl font-bold flex items-center justify-center gap-3 animate-pulse">
          <AlertCircle size={24} /> {errorMsg}
        </div>
      )}

      <div className="w-full relative z-10">
        {appState === AppState.MODE_SELECTION && <ModeSelection onSelectMode={handleModeSelect} onBack={handleReset} />}
        
        {appState === AppState.INPUT && selectedMode && (
          <InputSection selectedMode={selectedMode} onNext={handleContentSubmit} onBack={handleReset} initialData={inputContent} />
        )}

        {appState === AppState.GENERATING && (
          <div className="glass-effect p-24 rounded-[4rem] border border-white/10 flex flex-col items-center justify-center min-h-[55vh]">
            <div className="relative w-28 h-28 mb-12">
              <div className="absolute inset-0 border-4 border-purple-500/10 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-purple-500 rounded-full border-t-transparent animate-spin"></div>
              <Sparkles className="absolute inset-0 m-auto text-purple-400 w-14 h-14 animate-pulse" />
            </div>
            {/* "AI 지능 가동 중" */}
            <h2 className="text-4xl font-black mb-5 text-white">AI Analysis in Progress</h2>
            <p className="text-gray-400 text-xl text-center leading-relaxed">
              {/* "입력하신 자료를 분석하여 최적의 ...을 설계하고 있습니다..." */}
              Analyzing your input to structure the optimal {selectedMode === 'quiz' ? 'quiz set' : 'slide deck'}...
            </p>
          </div>
        )}

        {appState === AppState.PLAYING_QUIZ && (
          <div className="animate-fade-in-up">
            <QuizGame questions={quizQuestions} onComplete={handleQuizComplete} />
          </div>
        )}

        {appState === AppState.FINISHED_QUIZ && quizResult && (
          <ResultView result={quizResult} onReset={handleReset} onRetry={handleRetry} />
        )}

        {appState === AppState.VIEWING_SLIDES && (
          <SlideViewer slides={slides} subject={subject} onReset={handleReset} onRetry={handleRetry} />
        )}
      </div>
    </div>
  );
};

export default GenAgentMain;

// import React, { useState } from 'react';
// import { AppState, QuizQuestion, QuizResult, Slide, ContentInput } from '../../types';
// import { generateQuiz, generateSlides } from '../../services/genaiService';
// import { InputSection } from './InputSection';
// import { ModeSelection } from './ModeSelection';
// import { QuizGame } from './QuizGame';
// import { ResultView } from './ResultView';
// import { SlideViewer } from './SlideViewer';
// import { Sparkles, Layout, AlertCircle } from 'lucide-react';

// const GenAgentMain: React.FC = () => {
//   const [appState, setAppState] = useState<AppState>(AppState.MODE_SELECTION);
//   const [selectedMode, setSelectedMode] = useState<'quiz' | 'slides' | null>(null);
//   const [inputContent, setInputContent] = useState<ContentInput | null>(null);
//   const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
//   const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
//   const [slides, setSlides] = useState<Slide[]>([]);
//   const [subject, setSubject] = useState<string>('AI 학습');
//   const [errorMsg, setErrorMsg] = useState<string>('');

//   const handleModeSelect = (mode: 'quiz' | 'slides') => {
//     setSelectedMode(mode);
//     setAppState(AppState.INPUT);
//     setErrorMsg('');
//   };

//   const handleContentSubmit = async (content: ContentInput) => {
//     setInputContent(content);
//     setAppState(AppState.GENERATING);
//     setErrorMsg('');

//     try {
//       if (selectedMode === 'quiz') {
//         const questions = await generateQuiz(content);
//         if (questions && questions.length > 0) {
//           setQuizQuestions(questions);
//           setTimeout(() => {
//             setAppState(AppState.PLAYING_QUIZ);
//           }, 500);
//         } else {
//           throw new Error('AI가 퀴즈 문항을 추출하지 못했습니다. 더 많은 텍스트 자료를 입력해 보세요.');
//         }
//       } else {
//         const generatedResult = await generateSlides(content);
//         if (generatedResult && generatedResult.slides && generatedResult.slides.length > 0) {
//           setSlides(generatedResult.slides);
//           setSubject(generatedResult.subject || 'AI 학습 세션');
//           setTimeout(() => {
//             setAppState(AppState.VIEWING_SLIDES);
//           }, 500);
//         } else {
//           throw new Error('AI가 슬라이드 내용을 생성하지 못했습니다.');
//         }
//       }
//     } catch (err: any) {
//       console.error("Generation Error:", err);
//       setErrorMsg(err.message || '처리 중 예기치 않은 오류가 발생했습니다.');
//       setAppState(AppState.INPUT);
//     }
//   };

//   const handleQuizComplete = (result: QuizResult) => {
//     // 결과 데이터를 먼저 설정하고 상태를 변경하여 화면이 바로 보이지 않는 문제 방지
//     setQuizResult(result);
//     setAppState(AppState.FINISHED_QUIZ);
//   };

//   const handleReset = () => {
//     setAppState(AppState.MODE_SELECTION);
//     setSelectedMode(null);
//     setInputContent(null);
//     setQuizQuestions([]);
//     setSlides([]);
//     setQuizResult(null);
//     setErrorMsg('');
//   };

//   const handleRetry = () => {
//     setAppState(AppState.INPUT);
//     setQuizQuestions([]);
//     setSlides([]);
//     setQuizResult(null);
//     setErrorMsg('');
//   };

//   return (
//     <div className="min-h-screen pt-32 pb-24 px-6 max-w-7xl mx-auto animate-fade-in-up">
//       <div className="text-center mb-16">
//         <div className="inline-flex items-center justify-center p-5 rounded-3xl bg-purple-500/10 border border-purple-500/20 mb-8 text-purple-400 shadow-2xl shadow-purple-500/10">
//           <Layout size={40} />
//         </div>
//         <h1 className="text-5xl font-black mb-4 tracking-tighter">Learning <span className="gradient-text">Agent</span></h1>
//         <p className="text-gray-500 text-lg">AI를 통해 학습 자료와 퀴즈를 즉시 생성하고 확인하세요.</p>
//       </div>

//       {errorMsg && (
//         <div className="max-w-4xl mx-auto mb-10 p-6 bg-red-500/10 border border-red-500/20 text-red-400 rounded-3xl font-bold flex items-center justify-center gap-3 animate-pulse">
//           <AlertCircle size={24} /> {errorMsg}
//         </div>
//       )}

//       <div className="w-full relative z-10">
//         {appState === AppState.MODE_SELECTION && <ModeSelection onSelectMode={handleModeSelect} onBack={handleReset} />}
        
//         {appState === AppState.INPUT && selectedMode && (
//           <InputSection selectedMode={selectedMode} onNext={handleContentSubmit} onBack={handleReset} initialData={inputContent} />
//         )}

//         {appState === AppState.GENERATING && (
//           <div className="glass-effect p-24 rounded-[4rem] border border-white/10 flex flex-col items-center justify-center min-h-[55vh]">
//             <div className="relative w-28 h-28 mb-12">
//               <div className="absolute inset-0 border-4 border-purple-500/10 rounded-full"></div>
//               <div className="absolute inset-0 border-4 border-purple-500 rounded-full border-t-transparent animate-spin"></div>
//               <Sparkles className="absolute inset-0 m-auto text-purple-400 w-14 h-14 animate-pulse" />
//             </div>
//             <h2 className="text-4xl font-black mb-5 text-white">AI 지능 가동 중</h2>
//             <p className="text-gray-400 text-xl text-center leading-relaxed">
//               입력하신 자료를 분석하여 최적의 {selectedMode === 'quiz' ? '퀴즈 세트' : '슬라이드 구성'}을 설계하고 있습니다...
//             </p>
//           </div>
//         )}

//         {appState === AppState.PLAYING_QUIZ && (
//           <div className="animate-fade-in-up">
//             <QuizGame questions={quizQuestions} onComplete={handleQuizComplete} />
//           </div>
//         )}

//         {appState === AppState.FINISHED_QUIZ && quizResult && (
//           <ResultView result={quizResult} onReset={handleReset} onRetry={handleRetry} />
//         )}

//         {appState === AppState.VIEWING_SLIDES && (
//           <SlideViewer slides={slides} subject={subject} onReset={handleReset} onRetry={handleRetry} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default GenAgentMain;

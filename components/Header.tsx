import React, { useState, useRef, useEffect } from 'react';
import { Monitor, ChevronDown } from 'lucide-react';
import { View } from '../types';

interface HeaderProps {
  currentView: View;
  setView: (v: View) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setView }) => {
  const [isSolutionOpen, setIsSolutionOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsSolutionOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleSolution = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsSolutionOpen(!isSolutionOpen);
  };

  const handleMenuClick = (view: View) => {
    setView(view);
    setIsSolutionOpen(false);
  };

  return (
      <nav className="fixed top-0 left-0 w-full z-50 glass-effect px-6 py-4 flex items-center justify-between">
        {/* 로고 영역: public/logo.svg를 직접 참조 */}
        <div className="flex items-center cursor-pointer" onClick={() => setView('home')}>
          <img
              src="/logo.svg"
              alt="AXONE Logo"
              className="h-10 w-auto object-contain block"
          />
        </div>

        <div className="hidden md:flex items-center gap-8">
          <button
              onClick={() => setView('diagnosis')}
              className={`text-sm font-semibold transition-colors ${currentView === 'diagnosis' ? 'text-purple-400' : 'hover:text-purple-400'}`}
          >
            AX Assessment
          </button>

          <button
              onClick={() => setView('dashboard')}
              className={`text-sm font-semibold transition-colors ${currentView === 'dashboard' ? 'text-purple-400' : 'hover:text-purple-400'}`}
          >
            My Learning
          </button>

          {/* AI Solution 드롭다운 */}
          <div className="relative" ref={dropdownRef}>
            <button
                onClick={toggleSolution}
                className={`flex items-center gap-1 text-sm font-semibold transition-all duration-200 ${isSolutionOpen || currentView === 'promptlab' || currentView === 'agent' ? 'text-purple-400' : 'hover:text-purple-400'}`}
            >
              AI Solution
              <ChevronDown size={14} className={`transition-transform duration-300 ${isSolutionOpen ? 'rotate-180' : ''}`} />
            </button>

            {isSolutionOpen && (
                <div className="absolute top-full right-0 mt-3 w-48 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl py-2 animate-fade-in-up origin-top-right overflow-hidden">
                  <button
                      onClick={() => handleMenuClick('promptlab')}
                      className={`w-full text-left px-5 py-3 text-sm transition-colors ${currentView === 'promptlab' ? 'bg-purple-600/30 text-purple-400' : 'hover:bg-white/5 hover:text-purple-400'}`}
                  >
                    Prompt Lab
                  </button>
                  <button
                      onClick={() => handleMenuClick('agent')}
                      className={`w-full text-left px-5 py-3 text-sm transition-colors ${currentView === 'agent' ? 'bg-purple-600/30 text-purple-400' : 'hover:bg-white/5 hover:text-purple-400'}`}
                  >
                    Learning Agent
                  </button>
                </div>
            )}
          </div>
        </div>

        <button className="md:hidden">
          <Monitor size={24} />
        </button>
      </nav>
  );
};

export default Header;

// import React, { useState, useRef, useEffect } from 'react';
// import { Monitor, ChevronDown } from 'lucide-react';
// import { View } from '../types';
//
// interface HeaderProps {
//   currentView: View;
//   setView: (v: View) => void;
// }
//
// const Header: React.FC<HeaderProps> = ({ currentView, setView }) => {
//   // 하위 메뉴 열림 상태 관리
//   const [isSolutionOpen, setIsSolutionOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);
//
//   // 외부 클릭 시 드롭다운 닫기
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setIsSolutionOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);
//
//   const toggleSolution = (e: React.MouseEvent) => {
//     e.preventDefault();
//     setIsSolutionOpen(!isSolutionOpen);
//   };
//
//   const handleMenuClick = (view: View) => {
//     setView(view);
//     setIsSolutionOpen(false);
//   };
//
//   return (
//     <nav className="fixed top-0 left-0 w-full z-50 glass-effect px-6 py-4 flex items-center justify-between">
//       <div className="flex items-center cursor-pointer" onClick={() => setView('home')}>
//         <img
//             src="/logo.png"
//             alt="AXONE Logo"
//             className="h-8 w-auto object-contain" // 높이를 8(32px)로 설정, 비율은 자동 유지
//         />
//       </div>
//
//       <div className="hidden md:flex items-center gap-8">
//         <button
//           onClick={() => setView('diagnosis')}
//           className={`text-sm font-semibold transition-colors ${currentView === 'diagnosis' ? 'text-purple-400' : 'hover:text-purple-400'}`}
//         >
//           AX Assessment
//         </button>
//
//         <button
//           onClick={() => setView('dashboard')}
//           className={`text-sm font-semibold transition-colors ${currentView === 'dashboard' ? 'text-purple-400' : 'hover:text-purple-400'}`}
//         >
//           My Learning
//         </button>
//
//         {/* --- Solution 하위 메뉴 시작 (클릭 토글 방식) --- */}
//         <div className="relative" ref={dropdownRef}>
//           <button
//             onClick={toggleSolution}
//             className={`flex items-center gap-1 text-sm font-semibold transition-all duration-200 ${isSolutionOpen || currentView === 'promptlab' || currentView === 'agent' ? 'text-purple-400' : 'hover:text-purple-400'}`}
//           >
//             AI Solution
//             <ChevronDown size={14} className={`transition-transform duration-300 ${isSolutionOpen ? 'rotate-180' : ''}`} />
//           </button>
//
//           {/* 드롭다운 박스 */}
//           {isSolutionOpen && (
//             <div className="absolute top-full right-0 mt-3 w-48 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl py-2 animate-fade-in-up origin-top-right overflow-hidden">
//               <button
//                 onClick={() => handleMenuClick('promptlab')}
//                 className={`w-full text-left px-5 py-3 text-sm transition-colors ${currentView === 'promptlab' ? 'bg-purple-600/30 text-purple-400' : 'hover:bg-white/5 hover:text-purple-400'}`}
//               >
//                 Prompt Lab
//               </button>
//               <button
//                 onClick={() => handleMenuClick('agent')}
//                 className={`w-full text-left px-5 py-3 text-sm transition-colors ${currentView === 'agent' ? 'bg-purple-600/30 text-purple-400' : 'hover:bg-white/5 hover:text-purple-400'}`}
//               >
//                 Learning Agent
//               </button>
//             </div>
//           )}
//         </div>
//         {/* --- Solution 하위 메뉴 끝 --- */}
//
//         {/*<button
//           onClick={() => setView('mypage')}
//           className={`flex items-center gap-2 text-sm font-semibold transition-colors ${currentView === 'mypage' ? 'text-purple-400' : 'hover:text-purple-400'}`}
//         >
//           <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-[10px]">OD</div>
//           Profile
//         </button>*/}
//       </div>
//
//       <button className="md:hidden">
//         <Monitor size={24} />
//       </button>
//     </nav>
//   );
// };
//
// export default Header;

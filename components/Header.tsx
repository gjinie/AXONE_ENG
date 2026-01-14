import React, {useState, useRef, useEffect} from 'react';
import {ChevronDown, Menu, X} from 'lucide-react';
import {View} from '../types';

interface HeaderProps {
    currentView: View;
    setView: (v: View) => void;
}

const Header: React.FC<HeaderProps> = ({currentView, setView}) => {
    const [isSolutionOpen, setIsSolutionOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // 모바일 메뉴 상태 추가
    const [isMobileSolutionOpen, setIsMobileSolutionOpen] = useState(false); // 모바일 AI Solution 토글 상태 추가
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

    // 모바일 메뉴 열려있을 때 스크롤 방지
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMobileMenuOpen]);

    useEffect(() => {
        // currentView가 변경될 때마다 브라우저 스크롤을 최상단으로 이동
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // 'smooth'는 부드럽게, 'auto'는 즉시 이동
        });
    }, [currentView]); // currentView가 바뀔 때마다 이 로직이 실행됩니다.

    const toggleSolution = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsSolutionOpen(!isSolutionOpen);
    };

    const handleMenuClick = (view: View) => {
        setView(view);
        setIsSolutionOpen(false);
        setIsMobileMenuOpen(false); // 메뉴 클릭 시 모바일 메뉴 닫기
        setIsMobileSolutionOpen(false); // 이동 시 모바일 토글도 초기화
    };


    return (
        <>
            <nav className="fixed top-0 left-0 w-full z-[70] glass-effect px-6 py-4 flex items-center justify-between">
                {/* 로고 영역: public/logo.svg를 직접 참조 */}
                <div className="flex items-center cursor-pointer" onClick={() => setView('home')}>
                    <img
                        src="/logo.svg"
                        alt="AXONE Logo"
                        className="h-10 w-auto object-contain block"
                    />
                </div>

                {/*PC 메뉴 (md이상에서 보임)*/}
                <div className="hidden md:flex items-center gap-8">
                    <button
                        onClick={() => setView('diagnosis')}
                        className={`text-sm font-semibold transition-colors ${currentView === 'diagnosis' ? 'text-purple-400' : 'text-white hover:text-purple-400'}`}
                    >
                        AX Assessment
                    </button>

                    <button
                        onClick={() => setView('dashboard')}
                        className={`text-sm font-semibold transition-colors ${currentView === 'dashboard' ? 'text-purple-400' : 'text-white hover:text-purple-400'}`}
                    >
                        My Learning
                    </button>

                    {/* AI Solution 드롭다운 */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={toggleSolution}
                            className={`flex items-center gap-1 text-sm font-semibold transition-all duration-200 ${isSolutionOpen || currentView === 'promptlab' || currentView === 'agent' ? 'text-purple-400' : 'text-white hover:text-purple-400'}`}
                        >
                            AI Solution
                            <ChevronDown size={14}
                                         className={`transition-transform duration-300 ${isSolutionOpen ? 'rotate-180' : ''}`}/>
                        </button>

                        {isSolutionOpen && (
                            <div
                                className="absolute top-full right-0 mt-3 w-48 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl py-2 animate-fade-in-up origin-top-right overflow-hidden">
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

                {/*햅버거*/}
                <button
                    className="md:hidden text-white z-[80] p-2 hover:text-purple-400 transition-colors"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={28}/> : <Menu size={28}/>}
                </button>
            </nav>

            {/* 모바일 전체 화면 메뉴 오버레이 */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-2xl flex flex-col pt-28 px-8 animate-fade-in-up md:hidden">
                    <div className="flex flex-col gap-8">
                        <button
                            onClick={() => handleMenuClick('diagnosis')}
                            className={`text-left text-base font-bold transition-colors ${currentView === 'diagnosis' ? 'text-purple-400' : 'text-white hover:text-purple-400'}`}
                        >
                            AX Assessment
                        </button>
                        <button
                            onClick={() => handleMenuClick('dashboard')}
                            className={`text-left text-base font-bold ${currentView === 'dashboard' ? 'text-purple-400' : 'text-white hover:text-purple-400'}`}
                        >
                            My Learning
                        </button>

                        {/* 2. AI Solution 토글 메뉴 섹션 */}
                        <div className="flex flex-col">
                            <button
                                onClick={() => setIsMobileSolutionOpen(!isMobileSolutionOpen)}
                                className={`flex items-center justify-between text-base font-bold transition-colors ${isMobileSolutionOpen || currentView === 'promptlab' || currentView === 'agent' ? 'text-purple-400' : 'text-white hover:text-purple-400'}`}
                            >
                                AI Solution
                                {/* 토글 상태에 따라 화살표 회전 */}
                                <ChevronDown
                                    size={20}
                                    className={`transition-transform duration-300 ${isMobileSolutionOpen ? 'rotate-180' : ''}`}
                                />
                            </button>

                            {/* 3. 토글이 열렸을 때만 하위 메뉴 표시 */}
                            <div className={`flex flex-col gap-4 overflow-hidden transition-all duration-300 ${isMobileSolutionOpen ? 'max-h-40 mt-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <button
                                    onClick={() => handleMenuClick('promptlab')}
                                    className={`text-left text-base font-semibold pl-4 transition-colors ${currentView === 'promptlab' ? 'text-purple-400' : 'text-white hover:text-purple-400'}`}
                                >
                                    Prompt Lab
                                </button>
                                <button
                                    onClick={() => handleMenuClick('agent')}
                                    className={`text-left text-base font-semibold pl-4 transition-colors ${currentView === 'agent' ? 'text-purple-400' : 'text-white hover:text-purple-400'}`}
                                >
                                    Learning Agent
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
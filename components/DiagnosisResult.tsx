import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { RotateCw, Image as ImageIcon, Loader2, Quote, Zap, ClipboardCheck, Award, Target, BookOpen, Lightbulb, CheckCircle2 } from 'lucide-react';
import { AXDiagnosisResult, AXLevel } from '../types';
import html2canvas from 'html2canvas';

interface DiagnosisResultProps {
    resultData: AXDiagnosisResult;
    onRestart: () => void;
}

const CHEER_MESSAGES = [
    "Change isn't a threat; it's your biggest opportunity. Fly higher with AI! 🚀",
    "Every small step in learning today creates tomorrow's innovation. We're rooting for you! ✨",
    "AI won't replace you, but it will amplify your potential 100x. Master the tools! 💪",
    "The fact that you've started puts you ahead of the curve. Trust your journey! 🌟",
    "The best way to predict the future is to create it. Design yours with AI! 🎨"
];

const MINDSET_METRICS = {
    aiAttitude: { label: "AI Attitude", avg: 4.0 },
    aiFear: { label: "AI Resilience", avg: 1.9 },
    aiValue: { label: "Value Perception", avg: 3.0 },
    easeOfUse: { label: "UX Familiarity", avg: 3.0 },
    perceivedUtility: { label: "Utility Expectation", avg: 4.3 },
    selfEfficacy: { label: "Self-Efficacy", avg: 4.0 },
    aiAcceptance: { label: "Acceptance", avg: 3.0 },
    axParticipation: { label: "AX Initiative", avg: 3.0 },
};
type MindsetMetricKey = keyof typeof MINDSET_METRICS;

const AX_LEVELS: Record<AXLevel, { title: string; description: string }> = {
    'AX Planet': { title: 'AX Planet', description: 'Early exploration stage. Familiarizing with basic concepts and starting to experiment with tools like ChatGPT.' },
    'AX Star': { title: 'AX Star', description: 'Conceptual awareness stage. Understands AI potential but is still developing hands-on implementation skills.' },
    'AX Cluster': { title: 'AX Cluster', description: 'Integration stage. Actively searching for and adopting specific AI tools to optimize key workflows.' },
    'AX Galaxy': { title: 'AX Galaxy', description: 'Advanced proficiency stage. Orchestrating multiple AI tools to drive complex project outcomes autonomously.' },
    'AX Universe': { title: 'AX Universe', description: 'Mastery & Transformation stage. Architecting AI-first processes and leading organizational AX initiatives.' },
};
const AX_LEVEL_ORDER: AXLevel[] = ['AX Planet', 'AX Star', 'AX Cluster', 'AX Galaxy', 'AX Universe'];

const RadarChart = ({ scores }: { scores: Record<MindsetMetricKey, number> }) => {
    const size = 320;
    const center = size / 2;
    const numMetrics = 8;
    const angleSlice = (Math.PI * 2) / numMetrics;
    const radius = center * 0.55;

    const points = Object.keys(MINDSET_METRICS).map((key, i) => {
        const score = scores[key as MindsetMetricKey] || 1;
        const angle = angleSlice * i - Math.PI / 2;
        const x = center + radius * (score / 5) * Math.cos(angle);
        const y = center + radius * (score / 5) * Math.sin(angle);
        return `${x},${y}`;
    }).join(' ');

    return (
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-auto max-w-[320px] mx-auto overflow-visible drop-shadow-2xl">
            {/* Background Polygons */}
            {[...Array(5)].map((_, i) => (
                <polygon
                    key={i}
                    points={Object.keys(MINDSET_METRICS).map((key, j) => {
                        const r = radius * ((i + 1) / 5);
                        const angle = angleSlice * j - Math.PI / 2;
                        const x = center + r * Math.cos(angle);
                        const y = center + r * Math.sin(angle);
                        return `${x},${y}`;
                    }).join(' ')}
                    fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1"
                />
            ))}
            {/* Axis Lines */}
            {Object.keys(MINDSET_METRICS).map((_, i) => {
                const angle = angleSlice * i - Math.PI / 2;
                const x = center + radius * Math.cos(angle);
                const y = center + radius * Math.sin(angle);
                return <line key={i} x1={center} y1={center} x2={x} y2={y} stroke="rgba(255,255,255,0.08)" strokeWidth="1" />;
            })}
            {/* Data Area */}
            <polygon points={points} fill="rgba(168, 85, 247, 0.35)" stroke="#A855F7" strokeWidth="2.5" strokeLinejoin="round" />
            {/* Labels */}
            {Object.keys(MINDSET_METRICS).map((key, i) => {
                const angle = angleSlice * i - Math.PI / 2;
                const labelRadius = radius * 1.35;
                const x = center + labelRadius * Math.cos(angle);
                const y = center + labelRadius * Math.sin(angle);
                return (
                    <text key={key} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fontSize="10" fill="#94A3B8" fontWeight="800" className="select-none font-sans">
                        {MINDSET_METRICS[key as MindsetMetricKey].label}
                    </text>
                );
            })}
        </svg>
    );
};

const DiagnosisResult: React.FC<DiagnosisResultProps> = ({ resultData, onRestart }) => {
    const {
        literacy_score = 0,
        literacy_level = "Novice",
        ax_one_level = 'AX Planet',
        mindset_scores = { aiAttitude: 1, aiFear: 5, aiValue: 1, easeOfUse: 1, perceivedUtility: 1, selfEfficacy: 1, aiAcceptance: 1, axParticipation: 1 },
        feedback = ""
    } = resultData || {};

    const [isCapturing, setIsCapturing] = useState(false);
    const [cheerMessage, setCheerMessage] = useState("");

    // 정제된 피드백 문자열 (이스케이프된 줄바꿈 처리)
    const processedFeedback = feedback.replace(/\\n/g, '\n');

    useEffect(() => {
        setCheerMessage(CHEER_MESSAGES[Math.floor(Math.random() * CHEER_MESSAGES.length)]);
    }, []);

    const handleSaveImage = async () => {
        setIsCapturing(true);
        await new Promise(resolve => setTimeout(resolve, 500));
        const element = document.getElementById('printable-report');
        if (element) {
            try {
                const canvas = await html2canvas(element, {
                    scale: 2,
                    backgroundColor: '#000000',
                    useCORS: true,
                    logging: false
                });
                const link = document.createElement('a');
                const today = new Date();
                const formattedDate = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;

                link.href = canvas.toDataURL("image/png");
                link.download = `AX-ONE_Capability_Report_${formattedDate}.png`;
                link.click();
            } catch (err) {
                console.error(err);
            } finally {
                setIsCapturing(false);
            }
        }
    };

    const currentUserLevelIndex = AX_LEVEL_ORDER.indexOf(ax_one_level);

    return (
        <div className="max-w-6xl mx-auto px-4 pt-32 pb-24 animate-fade-in-up relative z-10">
            <div id="printable-report" className={`p-4 md:p-10 space-y-8 ${isCapturing ? 'bg-black rounded-none' : 'bg-transparent'}`}>

                <div className="text-center space-y-2 mb-12">
                    <div className="flex items-center justify-center gap-2 text-purple-400">
                        <span className="text-[10px] font-black tracking-[0.4em] uppercase">Individual Capability Intelligence Report</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tighter">AX Competency Analysis</h1>
                    <p className="text-gray-500 font-bold text-[10px] tracking-widest uppercase">AI Literacy & Transformation Mindset Assessment</p>
                </div>

                <div className="glass-effect rounded-[2.5rem] border border-white/10 overflow-hidden bg-white/[0.02]">
                    {/* Part 1 Header 수정: 아이콘과 텍스트 정렬 최적화 */}
                    <div className="px-6 md:px-10 py-6 md:py-8 border-b border-white/5 bg-white/[0.01]">
                        <div className="flex items-start gap-3 md:gap-4">
                            <CheckCircle2 size={24} className="text-purple-400 shrink-0 mt-1" />
                            <h2 className="text-xl md:text-2xl font-black leading-tight">
                                <span className="text-purple-500 whitespace-nowrap mr-2">Part 1.</span>
                                AX Assessment Result
                            </h2>
                        </div>
                        <p className="text-xs md:text-sm text-gray-400 mt-2 ml-9 md:ml-10">This is the result of a multi-faceted analysis of your AX capabilities.</p>
                    </div>

                    <div className="p-8 md:p-12 space-y-16">
                        <div className="space-y-6">
                            <div className="flex items-baseline justify-between">
                                <h3 className="text-base md:text-lg font-bold text-gray-200"> AX ONE LEVEL: <span className="text-purple-400 ml-2">{ax_one_level}</span></h3>
                            </div>
                            <div className="grid grid-cols-5 gap-1.5 md:gap-4">
                                {AX_LEVEL_ORDER.map((level, idx) => (
                                    <div key={level} className="flex flex-col gap-3">
                                        <div className={`h-2.5 rounded-full transition-all duration-1000 ${idx <= currentUserLevelIndex ? 'gradient-bg shadow-[0_0_15px_rgba(168,85,247,0.4)]' : 'bg-white/10'}`}></div>
                                        <span className={`text-[10px] md:text-xs text-center font-bold tracking-tighter ${idx === currentUserLevelIndex ? 'text-purple-400' : 'text-gray-500'}`}>
                                    {level.split(' ')[1]}
                                </span>
                                    </div>
                                ))}
                            </div>
                            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 text-center mt-4">
                                <p className="text-gray-300 font-medium italic text-xs md:text-sm leading-relaxed">
                                    "{AX_LEVELS[ax_one_level].description}"
                                </p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-base md:text-lg font-bold text-gray-200 border-l-4 border-purple-500 pl-4">AI Literacy Assessment</h3>
                            <div className="flex flex-col md:flex-row items-center gap-10 bg-white/[0.03] p-8 rounded-3xl border border-white/5">
                                {/*<div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center shrink-0">*/}
                                {/*    <svg className="w-full h-full transform -rotate-90">*/}
                                {/*        <circle cx="50%" cy="50%" r="60" md:r="70" stroke="rgba(255,255,255,0.05)" strokeWidth="10" md:strokeWidth="12" fill="transparent" />*/}
                                {/*        <circle cx="50%" cy="50%" r="60" md:r="70" stroke="#A855F7" strokeWidth="10" md:strokeWidth="12" fill="transparent"*/}
                                {/*                strokeDasharray={377} md:strokeDasharray={440} strokeDashoffset={377 - (literacy_score / 100) * 377} md:strokeDashoffset={440 - (literacy_score / 100) * 440}*/}
                                {/*                strokeLinecap="round" className="transition-all duration-1000" />*/}
                                {/*    </svg>*/}
                                {/*    <div className="absolute flex flex-col items-center">*/}
                                {/*        <span className="text-3xl md:text-4xl font-black italic">{literacy_score}</span>*/}
                                {/*        <span className="text-[10px] font-bold text-gray-500">/ 100</span>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                <div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center shrink-0">
                                    {/* viewBox를 사용하여 내부 수치를 고정하고 부모 div 크기에 따라 조절되게 합니다 */}
                                    <svg viewBox="0 0 160 160" className="w-full h-full transform -rotate-90">
                                        {/* r="70"으로 고정해도 부모 div가 w-32일 때는 작게, w-40일 때는 크게 보입니다 */}
                                        <circle
                                            cx="80" cy="80" r="70"
                                            stroke="rgba(255,255,255,0.05)"
                                            strokeWidth="12"
                                            fill="transparent"
                                        />
                                        <circle
                                            cx="80" cy="80" r="70"
                                            stroke="#A855F7"
                                            strokeWidth="12"
                                            fill="transparent"
                                            strokeDasharray={440}
                                            strokeDashoffset={440 - (literacy_score / 100) * 440}
                                            strokeLinecap="round"
                                            className="transition-all duration-1000"
                                        />
                                    </svg>
                                    <div className="absolute flex flex-col items-center">
                                        <span className="text-3xl md:text-4xl font-black italic">{literacy_score}</span>
                                        <span className="text-[10px] font-bold text-gray-500">/ 100</span>
                                    </div>
                                </div>
                                <div className="text-center md:text-left space-y-3">
                                    <p className="text-[10px] md:text-[11px] text-gray-500 font-black uppercase tracking-widest">My AI Literacy Level</p>
                                    <h4 className="text-2xl md:text-3xl font-black text-white">{literacy_level}</h4>
                                    <p className="text-xs md:text-sm text-gray-400 leading-relaxed max-w-lg">
                                        This score comprehensively assesses your level of knowledge and ability to utilise AI. It has been analysed based on your quiz results and the depth of your interview responses.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-base md:text-lg font-bold text-gray-200 border-l-4 border-purple-500 pl-4">AX Mindset Assessment</h3>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                                <div className="flex justify-center py-6 bg-white/[0.01] rounded-3xl border border-white/5">
                                    <RadarChart scores={mindset_scores} />
                                </div>
                                <div className="space-y-4">
                                    <div className="overflow-x-auto rounded-2xl border border-white/10 bg-black/20 overflow-hidden">
                                        <table className="w-full text-[10px] md:text-xs text-left">
                                            <thead>
                                            <tr className="border-b border-white/10 text-gray-500 font-black bg-white/[0.03]">
                                                <th className="px-4 md:px-6 py-4 uppercase">Measurement items</th>
                                                <th className="px-4 md:px-6 py-4 text-center uppercase">My score</th>
                                                <th className="px-4 md:px-6 py-4 text-center uppercase">Avg.</th>
                                            </tr>
                                            </thead>
                                            <tbody className="text-gray-300">
                                            {Object.entries(MINDSET_METRICS).map(([key, meta]) => (
                                                <tr key={key} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                                    <td className="px-4 md:px-6 py-3 font-bold">{meta.label}</td>
                                                    <td className="px-4 md:px-6 py-3 text-center text-purple-400 font-black text-sm md:text-base">{(mindset_scores as any)[key].toFixed(1)}</td>
                                                    <td className="px-4 md:px-6 py-3 text-center text-gray-600 font-medium">{meta.avg.toFixed(1)}</td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="glass-effect rounded-[2.5rem] border border-white/10 overflow-hidden bg-white/[0.02] break-inside-avoid">
                    {/* Part 2 Header 수정: 모바일 정렬 및 아이콘 개선 */}
                    <div className="px-6 md:px-10 py-6 md:py-8 border-b border-white/5 bg-white/[0.01]">
                        <div className="flex items-start gap-3 md:gap-4">
                            <CheckCircle2 size={24} className="text-purple-400 shrink-0 mt-1" />
                            <h2 className="text-xl md:text-2xl font-black leading-tight text-white">
                                <span className="text-purple-500 whitespace-nowrap mr-2">Part 2.</span>
                                Expert Detailed Feedback
                            </h2>
                        </div>
                    </div>

                    <div className="p-8 md:p-14 space-y-12">
                        <div className="markdown-content prose-invert">
                            <ReactMarkdown
                                components={{
                                    h2: ({node, ...props}) => (
                                        <div className="flex items-center gap-3 border-l-4 border-purple-500 pl-4 mt-10 md:mt-12 mb-6 first:mt-0">
                                            <h2 className="text-lg md:text-2xl font-black text-white m-0 tracking-tight" {...props} />
                                        </div>
                                    ),
                                    ul: ({node, ...props}) => <ul className="space-y-4 mb-10 list-none" {...props} />,
                                    li: ({node, ...props}) => (
                                        <li className="relative pl-7 text-gray-300 group" {...props}>
                                            <span className="absolute left-0 top-1 text-purple-500 font-black text-xl transition-transform group-hover:scale-125">•</span>
                                            <div className="text-[14px] md:text-[15px] leading-relaxed">{props.children}</div>
                                        </li>
                                    ),
                                    p: ({node, ...props}) => <p className="text-[14px] md:text-[15px] text-gray-400 leading-relaxed mb-6" {...props} />,
                                    strong: ({node, ...props}) => <span className="font-bold text-white bg-purple-500/20 px-1.5 py-0.5 rounded" {...props} />
                                }}
                            >
                                {processedFeedback}
                            </ReactMarkdown>
                        </div>

                        {/*<div className="mt-16 md:mt-20 p-6 md:p-8 rounded-[2rem] bg-gradient-to-r from-purple-500/10 to-transparent border border-purple-500/20 flex items-start gap-5 md:gap-8 relative overflow-hidden group">*/}
                        {/*    <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/10 blur-[60px] rounded-full group-hover:scale-150 transition-transform duration-1000"></div>*/}
                        {/*    <div className="bg-purple-500 p-3 md:p-4 rounded-full shadow-lg shadow-purple-500/30 shrink-0">*/}
                        {/*        <Quote size={24} md:size={28} className="text-white fill-current" />*/}
                        {/*    </div>*/}
                        {/*    <div className="space-y-3 relative z-10">*/}
                        {/*        <p className="text-[9px] md:text-[11px] font-black text-purple-400 uppercase tracking-[0.4em]">Today's word of encouragement</p>*/}
                        {/*        <p className="text-white font-bold leading-relaxed italic text-base md:text-lg">"{cheerMessage}"</p>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        <div className="mt-16 md:mt-20 p-6 md:p-8 rounded-[2rem] bg-gradient-to-r from-purple-500/10 to-transparent border border-purple-500/20 flex flex-col md:flex-row items-center md:items-start gap-5 md:gap-8 relative overflow-hidden group">
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/10 blur-[60px] rounded-full group-hover:scale-150 transition-transform duration-1000"></div>

                            {/* 아이콘: 모바일에서 중앙 정렬을 위해 flex-col과 items-center 영향 하에 둠 */}
                            <div className="bg-purple-500 p-3 md:p-4 rounded-full shadow-lg shadow-purple-500/30 shrink-0">
                                <Quote size={24} className="text-white fill-current md:w-7 md:h-7" />
                            </div>

                            {/* 텍스트 영역: 모바일에서 중앙 정렬(text-center), PC에서 왼쪽 정렬(md:text-left) */}
                            <div className="space-y-3 relative z-10 text-center md:text-left">
                                <p className="text-[9px] md:text-[11px] font-black text-purple-400 uppercase tracking-[0.4em]">Today's word of encouragement</p>
                                {/* 모바일에서 글씨 크기를 text-base로 조정하여 가독성 확보 */}
                                <p className="text-white font-normal leading-relaxed text-sm md:text-lg break-keep">
                                    "{cheerMessage}"
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`flex flex-col sm:flex-row gap-4 md:gap-6 no-print transition-opacity pt-6 ${isCapturing ? 'opacity-0' : 'opacity-100'}`}>
                    <button
                        onClick={handleSaveImage}
                        disabled={isCapturing}
                        className="flex-1 py-4 md:py-5 rounded-2xl border border-white/10 text-white font-black hover:bg-white/5 transition-all flex items-center justify-center gap-3 active:scale-95 group text-sm md:text-base"
                    >
                        {isCapturing ? <Loader2 size={20} className="animate-spin" /> : <ImageIcon size={20} className="group-hover:text-purple-400" />}
                        Report Save
                    </button>
                    <button
                        onClick={onRestart}
                        className="flex-[2] py-4 md:py-5 rounded-2xl gradient-bg text-white font-black text-sm md:text-xl hover:scale-[1.02] shadow-2xl shadow-purple-500/30 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
                    >
                        <RotateCw size={20} />
                        Retry
                    </button>
                </div>
            </div>
        </div>
    );
};
export default DiagnosisResult;
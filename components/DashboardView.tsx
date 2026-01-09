// 더미 데이터
const DUMMY_RESULT: AXDiagnosisResult = {
  literacy_score: 85,
  literacy_level: "Advanced",
  ax_one_level: 'AX Galaxy',
  mindset_scores: {
    aiAttitude: 4.5,
    aiFear: 4.2,
    aiValue: 4.8,
    easeOfUse: 4.0,
    perceivedUtility: 4.7,
    selfEfficacy: 4.3,
    aiAcceptance: 4.5,
    axParticipation: 4.6
  },
  feedback: "## 1. Diagnosis Summary\n" +
      "귀하의 AI 문해력은 매우 높으며, 실무에 즉시 적용 가능한 수준입니다. 특히 분석 및 전략 수립 부문에서 강점을 보입니다.\n" +
      "\n" +
      "## 2. Recommended AI Stack\n" +
      "- **ChatGPT Plus**: 전략적 초안 작성 및 문서 구조화\n" +
      "- **Claude 3.5 Sonnet**: 복잡한 코드 리뷰 및 논리 분석\n" +
      "- **Perplexity Pro**: 실시간 데이터 기반 시장 조사 자동화\n" +
      "- **Midjourney**: 프로젝트를 위한 고품질 비주얼 에셋 생성\n" +
      "\n" +
      "## 3. Optional Learning Path\n" +
      "귀하의 업무 효율을 200% 이상 끌어올리기 위해 'AI 에이전트 구축'과 '프롬프트 체이닝' 기법 습득을 추천드립니다.\n" +
      "\n" +
      "## 4. Strategic Advice\n" +
      "현재의 높은 수용성을 바탕으로 팀 내 AX 변화 관리자(Change Agent)로서의 역할을 수행하시기에 충분한 역량을 갖추고 있습니다."
};

import React, { useEffect, useState } from 'react';
import { BookOpen, Star, Zap, MessageCircle, ChevronRight, Share2, Layout, Play, ChevronLeft, Brain } from 'lucide-react';
import { AXDiagnosisResult, View } from '../types';

interface VideoContent {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
}

interface DashboardViewProps {
  setView: (view: View) => void;
}

const VIDEO_DATA: Record<string, VideoContent[]> = {
  "AI Fundamentals & Literacy": [
    { id: "v1", title: "99% of Beginners Don't Know the Basics of AI", url: "https://www.youtube.com/watch?v=nVyD6THcvDQ", thumbnail: "https://img.youtube.com/vi/nVyD6THcvDQ/mqdefault.jpg" },
    { id: "v2", title: "You’re Not Behind (Yet): How to Learn AI in 29 Minutes", url: "https://www.youtube.com/watch?v=9c7zh2MkslY", thumbnail: "https://img.youtube.com/vi/9c7zh2MkslY/mqdefault.jpg" },
    { id: "v3", title: "AI Basics for Beginners", url: "http://www.youtube.com/watch?v=VGFpV3Qj4as", thumbnail: "https://img.youtube.com/vi/VGFpV3Qj4as/mqdefault.jpg" },
    { id: "v4", title: "AI Full Course 2025 | AI Tutorial for Beginners", url: "https://www.youtube.com/watch?v=LGCZ-Fhm48c", thumbnail: "https://img.youtube.com/vi/LGCZ-Fhm48c/mqdefault.jpg" },
    { id: "v5", title: "What is Artificial Intelligence (AI)?", url: "https://www.youtube.com/watch?v=ad79nYk2keg", thumbnail: "https://img.youtube.com/vi/ad79nYk2keg/mqdefault.jpg" },
    { id: "v6", title: "Artificial Intelligence: Crash Course Computer Science #34", url: "https://youtu.be/z-EtmaFJieY?si=9sKoHVdOoN-kWoE8", thumbnail: "https://img.youtube.com/vi/z-EtmaFJieY/mqdefault.jpg" },
    { id: "v7", title: "How AI could save (not destroy) education", url: "https://youtu.be/hJP5GqnTrNo?si=gU1YNiPOlTC47CaI", thumbnail: "https://img.youtube.com/vi/hJP5GqnTrNo/mqdefault.jpg" }
  ],
  "Advanced Prompt Engineering": [
    { id: "p1", title: "The ADVANCED 2025 Guide to Prompt Engineering", url: "https://www.youtube.com/watch?v=qBlX6FhDm2E", thumbnail: "https://img.youtube.com/vi/qBlX6FhDm2E/mqdefault.jpg" },
    { id: "p2", title: "Master the Perfect ChatGPT Prompt Formula (in just 8 minutes)!", url: "https://www.youtube.com/watch?v=jC4v5AS4RIM", thumbnail: "https://img.youtube.com/vi/jC4v5AS4RIM/mqdefault.jpg" },
    { id: "p3", title: "MASTER Prompt Engineering In 10 Minutes - Complete Guide 2025!", url: "https://www.youtube.com/watch?v=X5qdQ0PquD8", thumbnail: "https://img.youtube.com/vi/X5qdQ0PquD8/mqdefault.jpg" },
    { id: "p4", title: "Ultimate Claude Guide 2025 (How to use Claude AI for beginners)", url: "https://www.youtube.com/watch?v=WGbjP8q79i4", thumbnail: "https://img.youtube.com/vi/WGbjP8q79i4/mqdefault.jpg" },
    { id: "p5", title: "99% Of People STILL Don't Know The Basics Of Prompting", url: "https://www.youtube.com/watch?v=T6iMHtEL9FU", thumbnail: "https://img.youtube.com/vi/T6iMHtEL9FU/mqdefault.jpg" },
    { id: "p6", title: "ChatGPT Prompt Engineering for Developers (Andrew Ng)", url: "https://youtu.be/H4YK_7MAckk?si=PIBdaPXpxPT60bT5", thumbnail: "https://img.youtube.com/vi/H4YK_7MAckk/mqdefault.jpg" }
  ],
  "Deep Dive into AI Technology": [
    { id: "t1", title: "Large Language Models explained briefly", url: "https://www.youtube.com/watch?v=LPZh9BOjkQs", thumbnail: "https://img.youtube.com/vi/LPZh9BOjkQs/mqdefault.jpg" },
    { id: "t2", title: "What is Retrieval-Augmented Generation (RAG)?", url: "https://www.youtube.com/watch?v=T-D1OfcDW1M", thumbnail: "https://img.youtube.com/vi/T-D1OfcDW1M/mqdefault.jpg" },
    { id: "t3", title: "RAG Explained For Beginners", url: "https://www.youtube.com/watch?v=_HQ2H_0Ayy0", thumbnail: "https://img.youtube.com/vi/_HQ2H_0Ayy0/mqdefault.jpg" },
    { id: "t4", title: "RAG vs Fine-Tuning vs Prompt Engineering", url: "https://www.youtube.com/watch?v=zYGDpG-pTho", thumbnail: "https://img.youtube.com/vi/zYGDpG-pTho/mqdefault.jpg" },
    { id: "t5", title: "Intro to Large Language Models", url: "https://youtu.be/zjkBMFhNj_g?si=Gd1ElGS09Gut52GF", thumbnail: "https://img.youtube.com/vi/zjkBMFhNj_g/mqdefault.jpg" },
    { id: "t6", title: "What is a Vector Database?", url: "https://youtu.be/t9IDoenf-lo?si=kjtmbAMHFDWoi0nF", thumbnail: "https://img.youtube.com/vi/t9IDoenf-lo/mqdefault.jpg" }
  ]
};

const DashboardView: React.FC<DashboardViewProps> = ({ setView }) => {
  const [result, setResult] = useState<AXDiagnosisResult | null>(null);
  const [aiStack, setAiStack] = useState<string[]>([]);
  const [shuffledVideos, setShuffledVideos] = useState<Record<string, VideoContent[]>>({});
  const [sectionIndices, setSectionIndices] = useState<Record<string, number>>({
    "AI Fundamentals & Literacy": 0,
    "Advanced Prompt Engineering": 0,
    "Deep Dive into AI Technology": 0
  });

  /* Expert Encouragement 문구 저장 상태*/
  const [encouragement, setEncouragement] = useState("");

  useEffect(() => {
    const savedResult = localStorage.getItem('ax_diagnosis_result');
    if (savedResult) {
      try {
        const parsed: AXDiagnosisResult = JSON.parse(savedResult);
        setResult(parsed);
        setAiStack(extractAIStack(parsed.feedback));
        setEncouragement(extractStrategicAdvice(parsed.feedback));
      } catch (error) {
        console.error("Failed to parse diagnosis result:", error);
      }
    } else {
      console.log("No saved data found. Using dummy data for development.");
      setResult(DUMMY_RESULT);
      setAiStack(extractAIStack(DUMMY_RESULT.feedback));
      setEncouragement(extractStrategicAdvice(DUMMY_RESULT.feedback));
    }

    const initialShuffled: Record<string, VideoContent[]> = {};
    Object.keys(VIDEO_DATA).forEach(key => {
      initialShuffled[key] = [...VIDEO_DATA[key]].sort(() => Math.random() - 0.5);
    });
    setShuffledVideos(initialShuffled);
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

  /* 피드백 리포트의 4번 섹션(전략적 조언)만 추출하는 함수 */
  const extractStrategicAdvice = (feedback: string): string => {
    const sectionHeader = "## 4. Strategic Advice";
    const parts = feedback.split(sectionHeader);

    if (parts.length > 1) {
      let adviceContent = parts[1].split('##')[0].trim();

      // 마크다운 파싱 로직 추가 (**, *, `, 따옴표 제거)
      adviceContent = adviceContent
          .replace(/\*\*/g, '')      // 강조 기호 제거
          .replace(/\*/g, '')       // 리스트/강조 기호 제거
          .replace(/`/g, '')        // 백틱 제거
          .replace(/^["']|["']$/g, '') // 문장 앞뒤 따옴표 제거
          .trim();

      return adviceContent || "Your AX journey has a solid foundation. Continue to explore and lead the change.";
    }

    return "The first step to AI transformation is consistent exploration. Your results show great potential to lead this change.";
  };

  const handleNextVideos = (section: string) => {
    setShuffledVideos(prev => ({
      ...prev,
      [section]: [...VIDEO_DATA[section]].sort(() => Math.random() - 0.5)
    }));
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 items-stretch">
          <div className="lg:col-span-2 space-y-8">
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

        {/* AI Stack & Encouragement */}
        <div className="w-full space-y-6 mb-8">
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

          <div className="glass-effect p-8 rounded-[2.5rem] border border-white/10 w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500">
                <MessageCircle size={20} />
              </div>
              <h4 className="font-bold text-white">Expert Encouragement</h4>
            </div>
            <div className="bg-white/5 p-6 rounded-2xl border-l-4 border-green-500/50">
              <p className="text-sm text-gray-400 italic leading-relaxed">
                "{encouragement}"
              </p>
            </div>
          </div>
        </div>

        {/* 3. 유튜브 영상 학습 섹션  */}
        <div className="mb-10">
          <h2 className="text-2xl font-black mb-4 flex items-center gap-3">
            <Play size={24} className="text-purple-400" /> Course
          </h2>

          <div className="mb-10">
            <p className="text-sm text-gray-400 leading-relaxed">
              After assessing the user’s AI capabilities, we recommend content across three sections to motivate learning and support practical application in real work scenarios.
            </p>
            {/*<ul className="mt-4 text-sm text-gray-300 font-semibold list-disc list-inside space-y-1">*/}
            {/*  <li>AI Fundamentals &amp; Literacy</li>*/}
            {/*  <li>Advanced Prompt Engineering</li>*/}
            {/*  <li>Deep Dive into AI Technology</li>*/}
            {/*</ul>*/}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {[
                {
                  title: "AI Fundamentals & Literacy",
                  desc: "Phase 01",
                  color: "purple"
                },
                {
                  title: "Advanced Prompt Engineering",
                  desc: "Phase 02",
                  color: "blue"
                },
                {
                  title: "Deep Dive into AI Technology",
                  desc: "Phase 03",
                  color: "emerald"
                }
              ].map((item, idx) => (
                  <div key={idx} className="glass-effect p-6 rounded-[2rem] border border-white/5 flex flex-col items-start gap-4 group hover:bg-white/5 transition-all relative overflow-hidden">
                    <div className={`absolute -top-10 -right-10 w-24 h-24 bg-${item.color}-500/5 blur-2xl rounded-full`}></div>

                    <div>
                      <span className={`text-[10px] font-black text-${item.color}-500 uppercase tracking-widest`}>
                        {item.desc}
                      </span>
                      <h4 className="text-base font-bold text-white mt-1 tracking-tight">{item.title}</h4>
                    </div>
                  </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {Object.keys(VIDEO_DATA).map((section) => {
              const videosToShow = (shuffledVideos[section] || []).slice(0, 3);
              return (
                  <div key={section} className="glass-effect p-10 rounded-[3rem] border border-white/10 relative group bg-white/[0.01]">
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-4">
                        <div className="w-2 h-8 gradient-bg rounded-full"></div>
                        <h3 className="text-xl font-black text-white tracking-tight">{section}</h3>
                      </div>
                      <button
                          onClick={() => handleNextVideos(section)}
                          className="flex items-center justify-center p-2 rounded-xl bg-white/5 hover:bg-purple-500/20 text-gray-400 hover:text-purple-400 transition-all border border-white/5"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                      {videosToShow.map((video) => (
                          <a
                              key={video.id}
                              href={video.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex flex-col gap-4 group/item"
                          >
                            <div className="relative aspect-video rounded-[1.5rem] overflow-hidden border border-white/10 bg-black/40 shadow-xl">
                              <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-110" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-all duration-300 transform scale-90 group-hover/item:scale-100">
                                <div className="w-16 h-16 rounded-full bg-purple-500/80 flex items-center justify-center backdrop-blur-sm">
                                  <Play size={28} className="text-white fill-white ml-1" />
                                </div>
                              </div>
                            </div>
                            <div className="px-2">
                              <h4 className="text-sm font-bold text-gray-200 leading-relaxed line-clamp-2 group-hover/item:text-purple-400 transition-colors">
                                {video.title}
                              </h4>
                            </div>
                          </a>
                      ))}
                    </div>
                  </div>
              );
            })}
          </div>
        </div>

        {/* 솔루션 버튼 섹션 */}
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
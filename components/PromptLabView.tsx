import React, { useState } from 'react';
import { PROMPT_DATA, Prompt, CATEGORY_COLORS } from '../data/promptData'; // 데이터 불러오기
import { Share2, Search, ChevronLeft, Copy, Check, Filter } from 'lucide-react';


const PromptLabView: React.FC = () => {
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (selectedPrompt) {
    return (
      <div className="min-h-screen pt-32 pb-24 px-6 max-w-5xl mx-auto animate-fade-in-up">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSelectedPrompt(null)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <h1 className="text-3xl font-black tracking-tight">{selectedPrompt.title}</h1>
          </div>
        </div>

        <div className="space-y-8">
          <div className="glass-effect p-8 md:p-12 rounded-[2.5rem] border border-white/10">
            <div className="mb-8">
              <h3 className="text-sm font-black text-gray-500 uppercase tracking-widest mb-3">prompt description</h3>
              <p className="text-gray-300 text-lg leading-relaxed">{selectedPrompt.description}</p>
            </div>

            <div className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-black text-gray-500 uppercase tracking-widest">prompt template</h3>
                <button 
                  onClick={() => handleCopy(selectedPrompt.content)}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 rounded-lg text-sm font-bold text-purple-400 hover:bg-purple-500/20 transition-all"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />} copy prompt
                </button>
              </div>
              <div className="bg-black/50 p-8 rounded-3xl border border-white/5 text-gray-200 text-lg md:text-xl leading-relaxed font-medium italic whitespace-pre-wrap">
                {selectedPrompt.content}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-3">keywords</h3>
              <div className="flex flex-wrap gap-2">
                {selectedPrompt.tags.map(tag => (
                  <span key={tag} className="px-3 py-1.5 rounded-lg bg-white/5 text-xs font-bold text-purple-400 border border-purple-500/20">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="text-center text-gray-500 text-sm italic">
            Copy the template, paste it into your preferred AI tool, and replace the <span className="text-purple-400">[ ]</span> placeholders.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 max-w-7xl mx-auto animate-fade-in-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">
            Prompt <span className="gradient-text">Lab</span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
            Expert-curated prompt library to maximize your productivity with ChatGPT, Claude, and Gemini.
          </p>
        </div>
        
        <div className="relative flex-grow md:w-40">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text" 
            placeholder="Search library..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {PROMPT_DATA.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase())).map(prompt => (
          <div 
            key={prompt.id} 
            onClick={() => setSelectedPrompt(prompt)}
            className="glass-effect p-8 rounded-[2rem] border border-white/5 hover:border-purple-500/30 transition-all group cursor-pointer flex flex-col justify-between h-72"
          >
            <div className="space-y-5">
              <div className="flex justify-between items-start">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${CATEGORY_COLORS[prompt.category] || 'text-gray-400 bg-gray-400/10'}`}>
                  {prompt.category}
                </span>
              </div>
              <h3 className="text-xl font-bold tracking-tight group-hover:text-purple-300 transition-colors leading-snug">
                {prompt.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                {prompt.description}
              </p>
            </div>
            
            <div className="pt-5 border-t border-white/5 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex gap-1">
                {prompt.tags.slice(0, 2).map(tag => (
                  <span key={tag} className="text-[10px] text-gray-600 font-bold">#{tag}</span>
                ))}
              </div>
              <span className="text-[10px] text-purple-400 font-bold uppercase tracking-widest">View Details →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromptLabView;



//Ko
// import React, { useState } from 'react';
// import { Share2, Bookmark, Search, SlidersHorizontal, ChevronLeft, ChevronRight, Copy, Check, MessageSquare } from 'lucide-react';

// interface Prompt {
//   id: number;
//   category: string;
//   categoryColor: string;
//   title: string;
//   description: string;
//   content: string;
//   tags: string[];
// }

// const SAMPLE_PROMPTS: Prompt[] = [
//   {
//     id: 1,
//     category: "발표 및 교육",
//     categoryColor: "text-purple-400 bg-purple-400/10",
//     title: "팀 프로젝트 발표 스크립트 작성기",
//     description: "전문 발표 컨설턴트의 시각으로 자연스러운 구어체 발표 대본을 작성합니다.",
//     content: "너는 대학 및 기업 프로젝트 발표를 다수 코칭해온 전문 발표 컨설턴트다. 아래 정보를 바탕으로 팀 프로젝트 발표용 스크립트를 작성해라.\n\n[프로젝트 주제]:\n[프로젝트 목적]:\n[발표 대상]:\n[발표 시간(분)]:\n[팀 구성 및 역할]:\n[핵심 결과]:\n[차별점]:",
//     tags: ["발표", "스피치", "팀프로젝트"]
//   },
//   {
//     id: 2,
//     category: "발표 및 교육",
//     categoryColor: "text-purple-400 bg-purple-400/10",
//     title: "슬라이드 구조 설계 도구",
//     description: "전략 컨설팅 출신 전문가가 논리적인 발표 슬라이드 구성을 제안합니다.",
//     content: "너는 전략 컨설팅 출신 프레젠테이션 전문가다. 아래 정보를 바탕으로 발표 슬라이드 구조를 설계해라.\n\n[발표 주제]:\n[청중]:\n[발표 목적]:\n[총 슬라이드 수]:",
//     tags: ["기획", "슬라이드", "컨설팅"]
//   },
//   {
//     id: 3,
//     category: "커뮤니케이션 및 고객 관리",
//     categoryColor: "text-emerald-400 bg-emerald-400/10",
//     title: "브랜드 이미지 맞춤 리뷰 응답기",
//     description: "고객 경험(CX) 전문가가 브랜드 톤앤매너에 맞는 정중한 리뷰 답변을 작성합니다.",
//     content: "너는 고객 경험(CX) 전문가다. 아래 고객 리뷰에 대한 브랜드 이미지에 긍정적인 응답을 작성해라.\n\n[고객 리뷰 내용]:\n[리뷰 유형(긍정/중립/부정)]:\n[브랜드 톤(정중/친근/프리미엄)]:\n[후속 조치 여부]:",
//     tags: ["CX", "고객대응", "리뷰"]
//   },
//   {
//     id: 4,
//     category: "HR 및 복지 관리",
//     categoryColor: "text-pink-400 bg-pink-400/10",
//     title: "경력 개발 계획 작성기",
//     description: "체계적인 커리어 로드맵과 실행 가능한 성과 목표를 설계합니다.",
//     content: "너는 성과관리 컨설턴트다. 아래 정보를 바탕으로 개인 또는 팀원의 경력 개발을 위한 체계적인 계획을 작성해라.\n\n[현재 직무]:\n[희망 성장 방향]:\n[보유 기술]:\n[부족한 역량]:",
//     tags: ["HR", "자기계발", "성과관리"]
//   },
//   {
//     id: 5,
//     category: "커뮤니케이션 및 고객 관리",
//     categoryColor: "text-emerald-400 bg-emerald-400/10",
//     title: "신규 고객 환영 이메일 템플릿",
//     description: "온보딩 마케터의 시각으로 첫 사용 행동을 유도하는 환영 이메일을 작성합니다.",
//     content: "너는 SaaS 기업의 온보딩 마케터다. 아래 정보를 바탕으로 신규 고객 환영 이메일을 작성해라.\n\n[서비스 이름]:\n[주요 기능 3가지]:\n[핵심 가치]:\n[CTA]:",
//     tags: ["마케팅", "이메일", "온보딩"]
//   },
//   {
//     id: 6,
//     category: "비즈니스 및 전략",
//     categoryColor: "text-amber-400 bg-amber-400/10",
//     title: "비즈니스 모델 및 수익 구조 분석기",
//     description: "신사업 전략 컨설턴트가 사업의 한계점을 분석하고 새로운 수익 파이프라인을 제안합니다.",
//     content: "너는 스타트업 및 신사업 전략 컨설턴트다. 아래 사업 정보를 기반으로 수익 모델을 분석해라.\n\n[사업 설명]:\n[타겟 고객]:\n[현재 수익 구조]:\n[경쟁 상황]:",
//     tags: ["비즈니스", "수익모델", "전략"]
//   },
//   {
//     id: 7,
//     category: "비즈니스 및 전략",
//     categoryColor: "text-amber-400 bg-amber-400/10",
//     title: "글로벌 시장 진입 전략 수립기",
//     description: "해외 시장 진출을 위한 초기 로드맵과 차별화 포인트를 설계합니다.",
//     content: "너는 글로벌 시장 진출 전략 컨설턴트다. 아래 정보를 바탕으로 시장 진입 전략을 수립해라.\n\n[제품/서비스]:\n[진입 시장]:\n[경쟁사]:\n[강점]:",
//     tags: ["해외진출", "글로벌", "마케팅"]
//   },
//   {
//     id: 8,
//     category: "업무 및 보고 관리",
//     categoryColor: "text-blue-400 bg-blue-400/10",
//     title: "연간 목표 및 SMART 전략 도우미",
//     description: "SMART 기준을 적용하여 구체적이고 달성 가능한 연간 성과 목표를 수립합니다.",
//     content: "너는 성과관리 컨설턴트다. 아래 정보를 바탕으로 연간 목표를 정리해줘.\n\n[조직/개인]:\n[올해 핵심 방향]:\n[현재 상황]:",
//     tags: ["성과관리", "목표설정", "SMART"]
//   },
//   {
//     id: 9,
//     category: "콘텐츠 및 마케팅",
//     categoryColor: "text-indigo-400 bg-indigo-400/10",
//     title: "다매체 맞춤 광고 카피 작성기",
//     description: "전문 카피라이터가 SNS, 배너 등 매체 특성에 맞는 헤드라인과 카피를 제작합니다.",
//     content: "너는 전문 카피라이터다. 아래 정보를 기반으로 광고 카피를 작성해줘.\n\n[제품/서비스]:\n[타겟 고객]:\n[핵심 장점]:\n[매체(SNS/배너/이메일)]:",
//     tags: ["카피라이팅", "광고", "마케팅"]
//   },
//   {
//     id: 10,
//     category: "업무 및 보고 관리",
//     categoryColor: "text-blue-400 bg-blue-400/10",
//     title: "핵심 요약 및 브리핑 생성기",
//     description: "긴 문서의 핵심 내용을 5줄 이내로 간결하게 요약하여 시간을 절약해줍니다.",
//     content: "아래 문서를 핵심만 요약해줘. 불필요한 수식어는 제거하고 5줄 이내로 작성해라.\n\n[문서 내용]:",
//     tags: ["요약", "브리핑", "문서정리"]
//   },
//   {
//     id: 11,
//     category: "HR 및 복지 관리",
//     categoryColor: "text-pink-400 bg-pink-400/10",
//     title: "성장 중심 성과 피드백 작성기",
//     description: "HR 매니저가 제안하는 객관적이고 존중하는 표현의 성과 피드백을 작성합니다.",
//     content: "너는 HR 매니저다. 아래 정보를 바탕으로 직원 성과 평가 피드백을 작성해라.\n\n[직무]:\n[성과 요약]:\n[강점]:\n[개선 필요 사항]:",
//     tags: ["HR", "피드백", "인사관리"]
//   },
//   {
//     id: 12,
//     category: "업무 및 보고 관리",
//     categoryColor: "text-blue-400 bg-blue-400/10",
//     title: "스마트 엑셀 함수 추천기",
//     description: "분석하려는 데이터 형태에 가장 적합한 엑셀 함수와 사용 예시를 제공합니다.",
//     content: "아래 상황에 맞는 엑셀 함수를 추천해줘.\n\n[하고 싶은 작업]:\n[데이터 형태]:",
//     tags: ["엑셀", "데이터분석", "생산성"]
//   },
//   {
//     id: 13,
//     category: "커뮤니케이션 및 고객 관리",
//     categoryColor: "text-emerald-400 bg-emerald-400/10",
//     title: "비즈니스 영어 문법 교정기",
//     description: "비즈니스 이메일이나 보고서에 적합한 격식 있고 자연스러운 영어 문장으로 교정합니다.",
//     content: "아래 영어 문장을 비즈니스 상황에 적합한 톤으로 자연스럽게 교정해줘.\n\n[영어 문장]:",
//     tags: ["영어", "번역", "비즈니스"]
//   },
//   {
//     id: 14,
//     category: "커뮤니케이션 및 고객 관리",
//     categoryColor: "text-emerald-400 bg-emerald-400/10",
//     title: "한글 맞춤법 및 문장 교정기",
//     description: "단순 맞춤법 검사를 넘어 문장의 흐름과 가독성을 고려해 매끄럽게 다듬어줍니다.",
//     content: "아래 문장의 맞춤법과 비문, 문맥상 어색한 표현을 자연스럽게 교정해줘.\n\n[문장]:",
//     tags: ["교정", "글쓰기", "맞춤법"]
//   },
//   {
//     id: 15,
//     category: "기술 및 개발",
//     categoryColor: "text-cyan-400 bg-cyan-400/10",
//     title: "클린 코드 주석 생성기",
//     description: "코드의 가독성을 높이고 협업 효율을 극대화하는 이해하기 쉬운 주석을 추가합니다.",
//     content: "아래 코드의 로직을 분석하여 이해하기 쉬운 주석을 추가하고 가독성을 높여줘.\n\n[코드]:",
//     tags: ["개발", "주석", "코드리뷰"]
//   },
//   {
//     id: 16,
//     category: "HR 및 복지 관리",
//     categoryColor: "text-pink-400 bg-pink-400/10",
//     title: "매력적인 채용 공고 작성기",
//     description: "직무의 특징과 우대 사항을 강조하여 우수한 인재의 지원을 유도하는 공고를 작성합니다.",
//     content: "아래 정보를 바탕으로 지원자의 마음을 움직이는 채용 공고를 작성해줘.\n\n[직무명]:\n[주요 업무]:\n[필수 요건]:\n[우대 사항]:",
//     tags: ["채용", "HR", "브랜딩"]
//   },
//   {
//     id: 17,
//     category: "HR 및 복지 관리",
//     categoryColor: "text-pink-400 bg-pink-400/10",
//     title: "직무별 면접 질문 리스트 설계자",
//     description: "역량 질문부터 상황 질문까지, 지원자를 다각도로 검증할 수 있는 인터뷰 리스트를 제공합니다.",
//     content: "아래 직무에 적합한 면접 질문을 단계별로 작성해줘.\n\n[직무]:\n[경력 수준]:",
//     tags: ["면접", "인터뷰", "채용"]
//   },
//   {
//     id: 18,
//     category: "커뮤니케이션 및 고객 관리",
//     categoryColor: "text-emerald-400 bg-emerald-400/10",
//     title: "상황별 비즈니스 이메일 마스터",
//     description: "목적과 수신자에 맞게 명확하고 예의 바른 비즈니스 이메일 템플릿을 생성합니다.",
//     content: "너는 비즈니스 커뮤니케이션 전문가다. 아래 상황에 맞는 명확하고 간결한 이메일을 작성해라.\n\n[목적]:\n[수신자]:\n[톤]:",
//     tags: ["이메일", "비즈니스", "소통"]
//   }
// ];

// const PromptLabView: React.FC = () => {
//   const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
//   const [copied, setCopied] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");

//   const handleCopy = (text: string) => {
//     navigator.clipboard.writeText(text);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   // 상세 페이지 렌더링
//   if (selectedPrompt) {
//     return (
//       <div className="min-h-screen pt-32 pb-24 px-6 max-w-5xl mx-auto animate-fade-in-up">
//         {/* Detail Header */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
//           <div className="flex items-center gap-4">
//             <button 
//               onClick={() => setSelectedPrompt(null)}
//               className="p-2 hover:bg-white/10 rounded-full transition-colors"
//             >
//               <ChevronLeft size={24} />
//             </button>
//             <h1 className="text-3xl font-black tracking-tight">{selectedPrompt.title}</h1>
//           </div>
//         </div>

//         {/* Detail Body: 결과 예시가 없으므로 넓게 배치 */}
//         <div className="space-y-8">
//           <div className="glass-effect p-8 md:p-12 rounded-[2.5rem] border border-white/10">
//             <div className="mb-8">
//               <h3 className="text-sm font-black text-gray-500 uppercase tracking-widest mb-3">prompt description</h3>
//               <p className="text-gray-300 text-lg leading-relaxed">{selectedPrompt.description}</p>
//             </div>

//             <div className="mb-10">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-sm font-black text-gray-500 uppercase tracking-widest">prompt</h3>
//                 <button 
//                   onClick={() => handleCopy(selectedPrompt.content)}
//                   className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 rounded-lg text-sm font-bold text-purple-400 hover:bg-purple-500/20 transition-all"
//                 >
//                   {copied ? <Check size={16} /> : <Copy size={16} />} copy prompt
//                 </button>
//               </div>
//               <div className="bg-black/50 p-8 rounded-3xl border border-white/5 text-gray-200 text-lg md:text-xl leading-relaxed font-medium italic whitespace-pre-wrap">
//                 {selectedPrompt.content}
//               </div>
//             </div>

//             <div>
//               <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-3">tag</h3>
//               <div className="flex flex-wrap gap-2">
//                 {selectedPrompt.tags.map(tag => (
//                   <span key={tag} className="px-3 py-1.5 rounded-lg bg-white/5 text-xs font-bold text-purple-400 border border-purple-500/20">
//                     #{tag}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </div>
          
//           <div className="text-center text-gray-500 text-sm">
//             복사한 프롬프트를 AI 툴에 붙여넣고 <span className="text-purple-400">[ ]</span> 부분을 자유롭게 수정하여 사용하세요.
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // 목록 페이지 렌더링
//   return (
//     <div className="min-h-screen pt-32 pb-24 px-6 max-w-7xl mx-auto animate-fade-in-up">
//       {/* List Header */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
//         <div>
//           <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">
//             Prompt <span className="gradient-text">Lab</span>
//           </h1>
//           <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
//             We provide ready-to-use prompts to help you get better results from tools like ChatGPT, Claude, and Perplexity.
//           </p>
//         </div>
        
//         <div className="relative flex-grow md:w-80">
//           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
//           <input 
//             type="text" 
//             placeholder="search by title..." 
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
//           />
//         </div>
//       </div>

//       {/* List Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
//         {SAMPLE_PROMPTS.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase())).map(prompt => (
//           <div 
//             key={prompt.id} 
//             onClick={() => setSelectedPrompt(prompt)}
//             className="glass-effect p-8 rounded-[2rem] border border-white/5 hover:border-purple-500/30 transition-all group cursor-pointer flex flex-col justify-between h-72"
//           >
//             <div className="space-y-5">
//               <div className="flex justify-between items-start">
//                 <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${prompt.categoryColor}`}>
//                   {prompt.category}
//                 </span>
//               </div>
//               <h3 className="text-xl font-bold tracking-tight group-hover:text-purple-300 transition-colors leading-snug">
//                 {prompt.title}
//               </h3>
//               <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
//                 {prompt.description}
//               </p>
//             </div>
            
//             <div className="pt-5 border-t border-white/5 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
//               <div className="flex gap-1">
//                 {prompt.tags.slice(0, 2).map(tag => (
//                   <span key={tag} className="text-[10px] text-gray-600 font-bold">#{tag}</span>
//                 ))}
//               </div>
//               <span className="text-[10px] text-purple-400 font-bold">View Details →</span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PromptLabView;


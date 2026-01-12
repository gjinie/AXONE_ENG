
import React from 'react';
import { ArrowRight, Activity, BookOpen, Rocket, CheckCircle2, Zap, Layout, FileText, Share2, ShieldCheck, Microscope, Database, Brain } from 'lucide-react';
import Galaxy from './backgrounds/Galaxy';
import Prism from './backgrounds/Prism';
import DarkVeil from './backgrounds/DarkVeil';
import BlurText from './backgrounds/BlurText';
import GlareHover from './backgrounds/GlareHover';


import StepCard from './StepCard';
import { View } from '../types';

interface LandingPageProps {
  setView: (v: View) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ setView }) => {
  return (
      <div className="animate-fade-in-up">
        {/* Hero Section */}
        <section className="relative min-h-[95vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
          {/* [수정 부분] 기존 보라색 블러 div 대신 Galaxy 배경 적용 */}
          <div className="absolute inset-0 z-0">
            <Galaxy
                mouseInteraction={true}
                glowIntensity={0.5}
                hueShift={240} // 보라색 테마에 맞춤
                density={1.2}
                transparent={true}
            />
            {/* 가독성을 위해 배경을 살짝 어둡게 처리하는 오버레이 */}
            <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
          </div>

          {/* 컨텐츠가 배경보다 위로 오도록 z-10 유지 */}
          <div className="z-10 max-w-5xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
              <ShieldCheck size={14} className="text-purple-400" />
              <span className="text-xs font-bold tracking-wider text-gray-300">Scientifically Validated AI Transformation</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9]">
              From AI <span className="gradient-text">Learning</span><br />
              To AI <span className="gradient-text">Action</span>
            </h1>

            <p className="text-gray-400 max-w-2xl mx-auto text-xl leading-relaxed mb-12">
              The All-in-One <span className="text-white font-bold">AX(AI Transformation)</span> platform designed for everyone
              to master and apply Generative AI in real-world scenarios.
            </p>

          </div>
        </section>

        {/* Assessment Spotlight (New Section) */}
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="inline-block px-3 py-1 rounded bg-purple-500/10 text-purple-400 text-xs font-bold mb-4 uppercase tracking-widest">Research-Backed</div>
                <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                  The Science of <br/><span className="gradient-text">AX Capability</span>
                </h2>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                  It's a professional diagnostic tool built on <strong>established learning psychology</strong> and <strong>technology adoption frameworks</strong>.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
                    <Microscope className="text-purple-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-bold text-sm">Psychology-Based</h4>
                      <p className="text-xs text-gray-500">Grounded in cognitive learning theories.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
                    <Database className="text-blue-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-bold text-sm">Data-Validated</h4>
                      <p className="text-xs text-gray-500">Verified with 500+ professionals.</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-500/10 to-transparent border-l-4 border-purple-500">
                  <p className="italic text-gray-300 font-medium">
                    "The first step to true AI transformation is knowing exactly where you stand. AXone provides that precision."
                  </p>
                </div>
              </div>

              <div className="order-1 lg:order-2 grid grid-cols-1 gap-4">
                <h3 className="text-xl font-bold mb-2 text-center lg:text-left">What we assess</h3>
                <div className="space-y-4">
                  {[
                    { title: "AI Literacy", desc: "Understanding core AI concepts and possibilities.", icon: <BookOpen className="text-purple-400" /> },
                    { title: "AX Mindset", desc: "Readiness to embrace and lead AI-driven change.", icon: <Brain className="text-blue-400" /> },
                    { title: "Practical Application", desc: "Real-world ability to solve tasks using AI tools.", icon: <Zap className="text-yellow-400" /> }
                  ].map((item, idx) => (
                      <div key={idx} className="glass-effect p-6 rounded-2xl flex items-center gap-6 border border-white/5 hover:border-white/20 transition-all">
                        <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                          {item.icon}
                        </div>
                        <div>
                          <h4 className="text-lg font-bold">{item.title}</h4>
                          <p className="text-sm text-gray-500">{item.desc}</p>
                        </div>
                      </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem & Solution Section */}
        <section className="py-24 px-6 bg-zinc-950/50">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-black leading-tight">
                Turn AI Knowledge<br />
                <span className="text-purple-500">into Business Impact.</span>
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-red-500/10">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500">
                    <Activity size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-red-400">The Problem</h4>
                    <p className="text-gray-400 text-sm">AI feels complex and hard to apply to daily tasks even after taking multiple courses.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-purple-400">AXONE Solution</h4>
                    <p className="text-gray-400 text-sm">A seamless journey from diagnosis and personalized learning to ready-to-use AI tools.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              {/* 1. 부모 컨테이너: aspect-video로 비율을 유지하고 overflow-hidden으로 넘치는 애니메이션을 자릅니다. */}
              <div className="aspect-video glass-effect rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative">

                {/* 2. DarkVeil 배치: absolute inset-0를 사용하여 부모 박스에 꽉 차게 만듭니다. */}
                <div className="absolute inset-0 z-0">
                  <DarkVeil
                      hueShift={-30}
                      noiseIntensity={0}
                      scanlineIntensity={0}
                      speed={1}
                      scanlineFrequency={0}
                      warpAmount={0}
                      resolutionScale={1.3}
                  />
                  {/* 3. 오버레이(선택): 애니메이션이 너무 밝을 경우를 대비해 살짝 어둡게 처리합니다. */}
                  <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
                </div>

                {/* 4. 컨텐츠: 로켓 아이콘이 애니메이션 위에 오도록 z-10을 설정합니다. */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="p-6 glass-effect rounded-2xl border border-white/20 animate-bounce">
                    <Rocket className="text-purple-500" size={48} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Flow (3-Step) */}
        {/* Core Flow (3-Step) 섹션 */}
        <section className="py-32 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black mb-6">Our Framework</h2>
            <p className="text-gray-400 text-lg">A systematic 3-step process to transform you into an AI expert.</p>
          </div>

          {/* 1. items-stretch를 추가하여 모든 카드의 높이를 동일하게 맞춥니다. */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">

            {/* Step 01 */}
            <GlareHover
                width="100%"     /* 부모 grid 너비에 맞춤 */
                height="100%"    /* 부모 grid 높이에 맞춤 (가장 긴 카드 기준) */
                glareColor="#ffffff"
                glareOpacity={0.15}
                glareAngle={-30}
                glareSize={250}
                borderRadius="1.7rem" /* StepCard의 라운드값과 일치시킴 */
                className="border-white/10" /* 테두리 색상 조절 */
            >
              <StepCard
                  stepNum="01"
                  icon={<Activity size={32} />}
                  title="AX Capability Assessment"
                  desc="Discover your current AI proficiency level and identify the best growth opportunities for your role."
              />
            </GlareHover>

            {/* Step 02 */}
            <GlareHover
                width="100%"
                height="100%"
                glareColor="#ffffff"
                glareOpacity={0.15}
                glareAngle={-30}
                glareSize={250}
                borderRadius="1.7rem"
                className="border-white/10"
            >
              <StepCard
                  stepNum="02"
                  icon={<BookOpen size={32} />}
                  title="Personalized Learning"
                  desc="Get a custom curriculum based on your diagnosis, focusing on practical skills you can use immediately."
              />
            </GlareHover>

            {/* Step 03 */}
            <GlareHover
                width="100%"
                height="100%"
                glareColor="#ffffff"
                glareOpacity={0.15}
                glareAngle={-30}
                glareSize={250}
                borderRadius="1.7rem"
                className="border-white/10"
            >
              <StepCard
                  stepNum="03"
                  icon={<Rocket size={32} />}
                  title="Solution Services"
                  desc="Apply your knowledge instantly with our AI agents and prompt libraries built for real work."
              />
            </GlareHover>
          </div>
        </section>

        {/* Solution Services Detail */}
        <section className="py-24 px-6 bg-white/[0.02]">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <h2 className="text-4xl font-black mb-4">Solution Services</h2>
              <p className="text-gray-400">Tools that turn complex AI workflows into simple, automated actions.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Content Creation Agent */}
              <div className="glass-effect p-10 rounded-[2.5rem] border border-white/10 group hover:border-blue-500/30 transition-all">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                    <Layout size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Content Creation Agent</h3>
                    <p className="text-sm text-gray-500">Automate your documentation and learning.</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all cursor-default">
                    <div className="flex items-center gap-3 mb-2 text-blue-400 font-bold">
                      <Zap size={18} /> Quiz Generator
                    </div>
                    <p className="text-sm text-gray-400">Upload your materials and instantly generate 10 high-quality multiple-choice quizzes to validate learning.</p>
                  </div>
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all cursor-default">
                    <div className="flex items-center gap-3 mb-2 text-blue-400 font-bold">
                      <FileText size={18} /> Presentation Summary
                    </div>
                    <p className="text-sm text-gray-400">Get core summaries, slide structures, and even speaker notes from your raw documents automatically.</p>
                  </div>
                </div>
              </div>

              {/* Prompt Lab */}
              <div className="glass-effect p-10 rounded-[2.5rem] border border-white/10 group hover:border-purple-500/30 transition-all">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center text-purple-400">
                    <Share2 size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Prompt Lab</h3>
                    <p className="text-sm text-gray-500">Proven libraries for professional efficiency.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                    <p className="text-xs font-bold text-gray-500 uppercase mb-2">Communication</p>
                    <p className="font-semibold text-sm">Email Drafting</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                    <p className="text-xs font-bold text-gray-500 uppercase mb-2">Strategy</p>
                    <p className="font-semibold text-sm">Document Summary</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                    <p className="text-xs font-bold text-gray-500 uppercase mb-2">Planning</p>
                    <p className="font-semibold text-sm">Event Preparation</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                    <p className="text-xs font-bold text-gray-500 uppercase mb-2">Analysis</p>
                    <p className="font-semibold text-sm">Data Interpretation</p>
                  </div>
                </div>
                <div className="mt-8 p-6 rounded-2xl bg-purple-500/5 border border-purple-500/10 italic text-center text-sm text-gray-400">
                  "No prompt engineering required. Simply select and apply."
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why AXone Section */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black text-center mb-20 underline decoration-purple-500 underline-offset-8">Why Choose AX-ONE</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "Non-Technical First", desc: "Built specifically for business professionals. No AI knowledge or development experience required." },
                { title: "Dual Journey", desc: "Learn the theory and apply it to real tasks at the same time." },
                { title: "AI for Real Business Use", desc: "Designed around practical business scenarios. Focused on boosting productivity and work efficiency." },
              ].map((item, idx) => (
                  <div key={idx} className="p-6 border-l-2 border-purple-500 hover:bg-white/5 transition-colors">
                    <h4 className="text-xl font-bold mb-4 tracking-tight">{item.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-6">
          <div className="max-w-4xl mx-auto glass-effect p-12 md:p-20 rounded-[3rem] text-center relative overflow-hidden">
            {/* Prism 배경 레이어 */}
            <div className="absolute inset-0 z-0">
              <Prism
                  animationType="3drotate" // 부드럽게 회전하는 효과
                  timeScale={0.5}
                  height={5.5}
                  baseWidth={5.0}
                  scale={4.5}
                  hueShift={120} // AX-ONE의 보라색 톤에 맞춤
                  glow={0.8}
              />
              {/* 텍스트 가독성을 위한 검은색 반투명 레이어 */}
              <div className="absolute inset-0 bg-black/50 pointer-events-none"></div>
            </div>

            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black mb-6">Ready For<br/><span className="gradient-text">AI Transformation?</span></h2>
              <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto">Turn Generative AI into your most powerful daily asset.</p>
              <button
                  onClick={() => setView('diagnosis')}
                  className="mx-auto px-10 py-5 gradient-bg rounded-2xl font-black text-lg hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-2xl shadow-purple-500/20"
              >
                Start Your AX Journey <ArrowRight size={22} />
              </button>
            </div>
          </div>
        </section>
      </div>
  );
};

export default LandingPage;

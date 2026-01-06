import React, { useState, useRef } from 'react';
import { Upload, X, ArrowRight, ArrowLeft, Settings } from 'lucide-react';
import { ContentInput, FileData } from '../../types';

interface InputSectionProps {
  onNext: (content: ContentInput) => void;
  selectedMode: 'quiz' | 'slides';
  onBack: () => void;
  initialData?: ContentInput | null;
}

const MAX_FILE_SIZE = 35 * 1024 * 1024;

export const InputSection: React.FC<InputSectionProps> = ({ onNext, selectedMode, onBack, initialData }) => {
  const [text, setText] = useState(initialData?.text || '');
  const [url, setUrl] = useState(initialData?.url || '');
  const [userPrompt, setUserPrompt] = useState(initialData?.userPrompt || '');
  const [files, setFiles] = useState<FileData[]>(initialData?.files || []);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 퀴즈 설정을 명확히 관리
  const [mcCount, setMcCount] = useState<number>(initialData?.multipleChoiceCount ?? 5);
  const [subjectiveCount, setSubjectiveCount] = useState<number>(initialData?.subjectiveCount ?? 0);
  const [difficulty, setDifficulty] = useState<'High' | 'Medium' | 'Low'>(initialData?.difficulty || 'Medium');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles: File[] = Array.from(e.target.files);
      const processed: FileData[] = [];
      for (const file of newFiles) {
        if (file.size > MAX_FILE_SIZE) continue;
        const reader = new FileReader();
        const base64 = await new Promise<string>((resolve) => {
          reader.onload = () => resolve((reader.result as string).split(',')[1]);
          reader.readAsDataURL(file);
        });
        processed.push({ mimeType: file.type, data: base64, name: file.name });
      }
      setFiles(prev => [...prev, ...processed]);
    }
  };

  const handleNext = () => {
    // 모든 필드를 types.ts의 ContentInput 형식에 맞춰 정확히 전달
    onNext({ 
      text: text.trim(), 
      files: files, 
      url: url.trim(), 
      userPrompt: userPrompt.trim(),
      multipleChoiceCount: selectedMode === 'quiz' ? mcCount : 0,
      subjectiveCount: selectedMode === 'quiz' ? subjectiveCount : 0,
      difficulty: difficulty,
      slideCount: 10
    });
  };

  const hasContent = text.trim() || files.length > 0 || url.trim();

  return (
    <div className="w-full animate-fade-in-up">
      <button onClick={onBack} className="mb-8 flex items-center gap-2 text-gray-500 hover:text-purple-400 transition-colors font-bold">
        <ArrowLeft size={16} /> Back to Mode Selection
      </button>

      <div className="glass-effect rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
        <div className={`p-10 ${selectedMode === 'quiz' ? 'bg-purple-600/10' : 'bg-blue-600/10'}`}>
          <h2 className="text-3xl font-black mb-2 uppercase tracking-tighter text-white">
            Configure Your {selectedMode === 'quiz' ? 'Quiz' : 'Slides'}
          </h2>
          <p className="text-gray-400">Provide the source material for AI analysis.</p>
        </div>

        <div className="p-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <h3 className="text-sm font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
              <Upload size={16} className="text-purple-400" /> Source Material
            </h3>
            <input 
              type="url" 
              placeholder="Enter URL (Articles, Blogs, etc.)" 
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white focus:ring-2 focus:ring-purple-500/50 outline-none" 
              value={url} 
              onChange={(e) => setUrl(e.target.value)} 
            />
            <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-white/10 rounded-2xl p-8 text-center cursor-pointer hover:border-purple-500/40 hover:bg-white/5 transition-all">
              <input type="file" ref={fileInputRef} className="hidden" multiple onChange={handleFileChange} />
              <p className="text-sm text-gray-400 font-bold uppercase tracking-tight">Click to Upload Files (PDF, Images)</p>
            </div>
            {files.length > 0 && (
              <div className="space-y-2">
                {files.map((f, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10">
                    <span className="text-xs truncate text-gray-300">{f.name}</span>
                    <button onClick={() => setFiles(files.filter((_, idx) => idx !== i))} className="text-gray-500 hover:text-red-400">
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <textarea 
              placeholder="Or paste your raw text content here..." 
              className="w-full h-40 bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white focus:ring-2 focus:ring-purple-500/50 outline-none resize-none" 
              value={text} 
              onChange={(e) => setText(e.target.value)} 
            />
          </div>

          <div className="space-y-8 bg-white/[0.02] p-8 rounded-[2rem] border border-white/5 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-black text-gray-500 uppercase tracking-widest flex items-center gap-2 mb-6">
                <Settings size={16} className="text-purple-400" /> Generation Settings
              </h3>
              {selectedMode === 'quiz' && (
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase mb-2">Multiple Choice</label>
                    <input type="number" min="0" max="20" value={mcCount} onChange={(e) => setMcCount(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 font-bold text-center text-white focus:border-purple-500" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-500 uppercase mb-2">Subjective</label>
                    <input type="number" min="0" max="10" value={subjectiveCount} onChange={(e) => setSubjectiveCount(Number(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 font-bold text-center text-white focus:border-purple-500" />
                  </div>
                </div>
              )}
              <div className="mb-6">
                <label className="block text-[10px] font-black text-gray-500 uppercase mb-2">Custom Instructions</label>
                <textarea 
                  value={userPrompt} 
                  onChange={(e) => setUserPrompt(e.target.value)} 
                  className="w-full h-32 bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white outline-none focus:ring-2 focus:ring-purple-500/50" 
                  placeholder="Ex: Focus on marketing ROI, use professional tone, etc." 
                />
              </div>
            </div>
            <button 
              onClick={handleNext} 
              disabled={!hasContent} 
              className={`w-full py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all ${hasContent ? 'gradient-bg shadow-xl shadow-purple-500/20 hover:scale-[1.02] text-white' : 'bg-white/5 text-gray-600 cursor-not-allowed border border-white/5'}`}
            >
              Start AI Generation <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useRef, useEffect } from 'react';
import { Slide, SlideContent } from '../../types';
import { ChevronLeft, ChevronRight, Layout, AlignLeft, RefreshCw, Download, FileText, Lightbulb, Loader2, Edit3, Save, ArrowUp, ArrowDown, Trash2, List, ArrowLeft } from 'lucide-react';
import pptxgen from 'pptxgenjs';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

interface SlideViewerProps {
  slides: Slide[];
  subject: string;
  onReset: () => void;
  onRetry: () => void;
}

const COLORS = ['#A855F7', '#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

const cleanText = (text: string | undefined): string => {
  if (!text) return "";
  return text.replace(/\*\*(.*?)\*\*/g, '$1').replace(/__(.*?)__/g, '$1').replace(/\[.*?\]/g, '').replace(/^#+\s/, '').replace(/`/g, '').trim();
};

export const SlideViewer: React.FC<SlideViewerProps> = ({ slides: initialSlides, subject, onReset, onRetry }) => {
  const [slides, setSlides] = useState<Slide[]>(initialSlides);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const pdfExportRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setSlides(initialSlides); }, [initialSlides]);

  const currentSlide = slides[currentIndex] || { id: 0, title: '', content: [], speakerNotes: '', layout: 'bullet' };

  const updateSlideContent = (index: number, newValue: string) => {
    const updatedSlides = [...slides];
    const updatedContent = [...updatedSlides[currentIndex].content];
    updatedContent[index] = { ...updatedContent[index], value: newValue };
    updatedSlides[currentIndex] = { ...updatedSlides[currentIndex], content: updatedContent };
    setSlides(updatedSlides);
  };

  const updateSlideTitle = (newTitle: string) => {
    const updatedSlides = [...slides];
    updatedSlides[currentIndex] = { ...updatedSlides[currentIndex], title: newTitle };
    setSlides(updatedSlides);
  };


  const handleDownloadPPT = async () => {
    const pres = new pptxgen();
    pres.layout = 'LAYOUT_16x9';
    slides.forEach((slide, i) => {
      const pptSlide = pres.addSlide();
      pptSlide.addText(cleanText(slide.title), { x: 0.5, y: 0.5, w: 9, h: 1, fontSize: 30, bold: true });
      slide.content.forEach((item, j) => {
        if (item.type === 'text') pptSlide.addText(cleanText(item.value), { x: 0.5, y: 1.5 + (j*0.5), w: 9, bullet: true });
      });
    });
    pres.writeFile({ fileName: `${subject}.pptx` });
  };

  return (
      <div className="w-full max-w-6xl mx-auto animate-fade-in-up">
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-4">
            <button
                onClick={onRetry}
                className="flex items-center gap-2 text-gray-500 hover:text-purple-400 transition-colors font-bold"
            >
              <ArrowLeft size={16} /> Back to Learning Agent
            </button>
          </div>
          <div className="flex gap-3">
            <button onClick={handleDownloadPPT} className="px-6 py-2.5 gradient-bg rounded-xl font-black flex items-center gap-2 hover:scale-105 transition-all shadow-lg shadow-purple-500/20">
              <Download size={18}/> PPT download
            </button>
          </div>
        </div>

        <div className="aspect-video bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/10 relative flex flex-col text-black">
          <div className="p-16 h-full flex flex-col justify-center">
            {isEditing ? (
                <input
                    type="text"
                    value={currentSlide.title}
                    onChange={(e) => updateSlideTitle(e.target.value)}
                    className="text-4xl font-black mb-12 tracking-tight text-gray-900 border-b-2 border-purple-200 outline-none w-full"
                />
            ) : (
                <h2 className="text-4xl font-black mb-12 tracking-tight text-gray-900">{cleanText(currentSlide.title)}</h2>
            )}

            <ul className="space-y-6">
              {currentSlide.content.map((item, i) => item.type === 'text' && (
                  <li key={i} className="flex items-start gap-4 text-xl text-gray-600 leading-relaxed">
                    <span className="w-3 h-3 bg-purple-500 rounded-full mt-3 flex-shrink-0" />
                    {/* [수정 3] 편집 모드 시 내용 입력 가능하도록 수정 */}
                    {isEditing ? (
                        <textarea
                            value={item.value}
                            onChange={(e) => updateSlideContent(i, e.target.value)}
                            className="w-full border-b border-purple-100 outline-none resize-none"
                            rows={1}
                        />
                    ) : (
                        cleanText(item.value)
                    )}
                  </li>
              ))}
            </ul>
          </div>
          <div className="absolute bottom-8 right-12 text-gray-300 font-black text-sm">{currentIndex + 1} / {slides.length}</div>
        </div>

        <div className="flex items-center justify-center gap-8 mt-12">
          <button onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))} disabled={currentIndex === 0} className="p-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-20"><ChevronLeft/></button>
          <div className="flex gap-4">
            {/* [수정 1] 하단 Edit 버튼이 편집 모드(isEditing)를 토글하도록 변경 */}
            <button
                onClick={() => setIsEditing(!isEditing)}
                className={`px-8 py-3 rounded-xl font-bold border transition-all flex items-center gap-2 ${isEditing ? 'bg-purple-500 text-white border-transparent' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'}`}
            >
              {isEditing ? <><Save size={18} /> Done</> : <><Edit3 size={18} /> Edit</>}
            </button>
            {/*<button onClick={onReset} className="px-6 py-3 bg-white text-black rounded-xl font-black hover:bg-gray-200 transition-colors">Reset</button>*/}
          </div>
          <button onClick={() => setCurrentIndex(Math.min(slides.length - 1, currentIndex + 1))} disabled={currentIndex === slides.length - 1} className="p-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-20"><ChevronRight/></button>
        </div>
      </div>
  );
};
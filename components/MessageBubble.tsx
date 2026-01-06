import React from 'react';
import ReactMarkdown from 'react-markdown';
import { User, Bot, AlertCircle, ArrowLeftCircle } from 'lucide-react';
import { ChatMessage } from '../types';

interface MessageBubbleProps {
  message: ChatMessage;
  onSelectOption?: (option: string) => void;
  isLast?: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, onSelectOption, isLast }) => {
  const isUser = message.role === 'user';
  const isError = message.isError;

  const optionsSeparator = "___OPTIONS___";
  const resumeSeparator = "___RESUME_BTN___";

  let rawText = message.text;
  let mainContent = rawText.replace(/\[\[STEP:\d+\]\]/g, '').trim();
  let options: string[] = [];
  let showResumeBtn = false;

  if (mainContent.includes(resumeSeparator)) {
    const parts = mainContent.split(resumeSeparator);
    mainContent = parts[0];
    showResumeBtn = true;
  } else if (mainContent.includes(optionsSeparator)) {
    const parts = mainContent.split(optionsSeparator);
    mainContent = parts[0];
    options = parts[1] 
      ? parts[1].split('\n').map(opt => opt.trim()).filter(opt => opt.length > 0)
      : [];
  }

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in-up mb-8 flex-col`}>
      <div className={`flex w-full gap-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        
        {/* Avatar */}
        <div className={`
          w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-lg border
          ${isUser 
            ? 'gradient-bg text-white border-transparent' 
            : 'glass-effect border-white/10 text-purple-400'
          }
        `}>
          {isUser ? <User size={18} /> : <Bot size={20} />}
        </div>

        {/* Bubble */}
        <div className={`max-w-[85%] sm:max-w-[70%]`}>
            <div className={`
            px-6 py-4 rounded-[1.8rem] text-[15px] leading-relaxed shadow-xl border
            ${isUser 
                ? 'gradient-bg text-white rounded-tr-none border-transparent font-medium' 
                : isError
                    ? 'bg-red-500/10 text-red-400 border-red-500/20 rounded-tl-none'
                    : 'glass-effect text-gray-200 border-white/10 rounded-tl-none'
            }
            `}>
            {isError ? (
                <div className="flex items-center gap-2">
                <AlertCircle size={18} />
                <span>{mainContent}</span>
                </div>
            ) : (
                <div className="markdown-content">
                <ReactMarkdown 
                    components={{
                        ul: ({node, ...props}) => <ul className="list-disc pl-5 my-2 space-y-2" {...props} />,
                        ol: ({node, ...props}) => <ol className="list-decimal pl-5 my-2 space-y-2" {...props} />,
                        strong: ({node, ...props}) => <span className="font-black text-white bg-purple-500/20 px-1 rounded" {...props} />,
                        p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                        h2: ({node, ...props}) => <h2 className="text-lg font-black text-purple-400 mb-3" {...props} />
                    }}
                >
                    {mainContent}
                </ReactMarkdown>
                </div>
            )}
            </div>
            
            {!isUser && options.length > 0 && (
                <div className="mt-4 flex flex-col gap-2.5 animate-fade-in-up">
                    {options.map((opt, idx) => {
                        const cleanOpt = opt.replace(/^\d+\.\s*/, '').replace(/^- \s*/, '');
                        return (
                            <button
                                key={idx}
                                onClick={() => onSelectOption && onSelectOption(cleanOpt)}
                                className="text-left px-6 py-3.5 glass-effect border border-purple-500/20 rounded-2xl text-purple-300 text-[13px] font-bold hover:bg-purple-500 hover:text-white hover:border-transparent transition-all shadow-lg active:scale-98"
                            >
                                {cleanOpt}
                            </button>
                        );
                    })}
                </div>
            )}

            {!isUser && showResumeBtn && (
               <div className="mt-4 animate-fade-in-up">
                  <button
                    onClick={() => onSelectOption && onSelectOption("Continue Interview")}
                    className="flex items-center gap-3 px-6 py-3.5 gradient-bg text-white rounded-2xl text-sm font-black shadow-xl shadow-purple-500/20 hover:scale-105 active:scale-95 transition-all"
                  >
                    <ArrowLeftCircle size={20} />
                    Continue Diagnosis
                  </button>
               </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;

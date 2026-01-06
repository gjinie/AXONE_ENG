
import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, isLoading }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSend(input);
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 100)}px`;
    }
  }, [input]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form 
        onSubmit={handleSubmit} 
        className="relative flex items-end glass-effect border border-white/10 rounded-[2.2rem] p-2.5 shadow-2xl focus-within:ring-2 focus-within:ring-purple-500/40 transition-all bg-white/5"
      >
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your response here..."
          className="w-full bg-transparent border-none focus:ring-0 resize-none py-3.5 px-6 max-h-32 text-white placeholder:text-gray-600 leading-relaxed text-[15px] custom-scrollbar"
          rows={1}
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className={`
            p-4 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 mb-1 mr-1
            ${input.trim() && !isLoading 
              ? 'gradient-bg text-white shadow-xl shadow-purple-500/30 hover:scale-110 active:scale-90' 
              : 'bg-white/5 text-gray-700 cursor-not-allowed'}
          `}
        >
          {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
        </button>
      </form>
    </div>
  );
};

export default ChatInput;


import React from 'react';
import { View } from '../types';
/* 1. Props 인터페이스 정의 */
interface FooterProps {
    setView: (view: View) => void;
}

const Footer: React.FC<FooterProps> = ({ setView }) => {
  return (
    <footer className="py-12 px-6 border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center cursor-pointer" onClick={() => setView('home')}>
              <img
                  src="/logo.svg"
                  alt="AXONE Logo"
                  className="h-8 w-auto object-contain block"
              />
          </div>
        <p className="text-gray-500 text-sm">© 2026 AX-ONE.</p>
      </div>
    </footer>
  );
};

export default Footer;

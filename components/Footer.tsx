
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 px-6 border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center font-extrabold text-sm">A</div>
          <span className="text-xl font-extrabold tracking-tighter">AXONE</span>
        </div>
        <p className="text-gray-500 text-sm">© 2025 AX-ONE.</p>
      </div>
    </footer>
  );
};

export default Footer;


import React from 'react';

const Footer: React.FC = () => {
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

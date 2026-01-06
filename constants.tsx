
import React from 'react';

export const LogoIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    viewBox="0 0 40 40" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="4"/>
    <path d="M20 8L12 28H16L20 18L24 28H28L20 8Z" fill="currentColor"/>
    <circle cx="20" cy="13" r="1.5" fill="white"/>
  </svg>
);

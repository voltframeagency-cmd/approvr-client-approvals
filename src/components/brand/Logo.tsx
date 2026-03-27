import React from 'react';
import logoUrl from '@/assets/logo.svg';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img 
        src={logoUrl} 
        alt="Approvr Logo" 
        className="h-8 w-auto object-contain"
      />
    </div>
  );
};

export default Logo;

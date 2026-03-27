import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'small' | 'normal' | 'large';
}

export const Logo: React.FC<LogoProps> = ({ className = "", variant = 'normal' }) => {
  const isLarge = variant === 'large';
  
  return (
    <div className={`flex items-center gap-2 md:gap-2.5 select-none ${className}`}>
      {/* Premium Stylized Icon */}
      <div className="relative flex items-center justify-center shrink-0">
        <div className="absolute inset-0 bg-primary opacity-20 blur-[6px] rounded-lg" />
        <div className="relative h-7 w-7 md:h-8 md:w-8 rounded-lg bg-gradient-to-br from-primary via-primary/90 to-emerald-500 flex items-center justify-center shadow-lg shadow-primary/20">
          <svg 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="text-white drop-shadow-sm"
          >
            <path 
              d="M20 6L9 17L4 12" 
              stroke="currentColor" 
              strokeWidth="3.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
        
        {/* Decorative secondary check for "Approvr" nuance */}
        <div className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-white dark:bg-slate-950 flex items-center justify-center shadow-sm">
          <div className="h-2 w-2 rounded-full bg-primary" />
        </div>
      </div>
      
      {/* Brand Text */}
      <span className={`font-display font-black tracking-tight leading-none ${isLarge ? 'text-2xl md:text-3xl' : 'text-[19px] md:text-[22px]'} bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 dark:from-white dark:via-slate-100 dark:to-slate-300`}>
        Approvr
      </span>
    </div>
  );
};

export default Logo;

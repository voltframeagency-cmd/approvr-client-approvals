import React from 'react';
import logoUrl from '@/assets/logo.svg';

interface LogoProps {
  className?: string;
  variant?: 'small' | 'normal' | 'large';
}

export const Logo: React.FC<LogoProps> = ({ className = "", variant = 'normal' }) => {
  const isLarge = variant === 'large';
  const sizeClasses = isLarge ? 'h-10 md:h-12' : 'h-8 md:h-9';
  
  return (
    <div className={`flex items-center select-none ${className}`}>
      <img 
        src={logoUrl} 
        alt="Approvr Logo" 
        className={`${sizeClasses} w-auto object-contain dark:brightness-0 dark:invert transition-all duration-300`}
      />
    </div>
  );
};

export default Logo;

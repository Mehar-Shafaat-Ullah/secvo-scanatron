
import React from 'react';
import { cn } from '@/lib/utils';
import { Shield, Zap } from 'lucide-react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'icon';
}

const Logo: React.FC<LogoProps> = ({ className, variant = 'full' }) => {
  return (
    <div className={cn("flex items-center", className)}>
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-secvo-blue to-secvo-accent rounded-lg blur-[8px] opacity-50"></div>
        <div className="relative bg-secvo-darker p-1.5 rounded-lg border border-secvo-blue/20 flex items-center justify-center">
          <Shield className="text-secvo-blue h-5 w-5" />
          <Zap className="absolute text-secvo-accent h-3 w-3 transform translate-x-[2px] translate-y-[-1px]" />
        </div>
      </div>
      
      {variant === 'full' && (
        <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          SECVO
        </span>
      )}
    </div>
  );
};

export default Logo;


import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedGradientProps {
  className?: string;
}

const AnimatedGradient: React.FC<AnimatedGradientProps> = ({ className }) => {
  return (
    <div className={cn(
      "absolute inset-0 opacity-30 -z-10",
      "bg-gradient-to-br from-secvo-blue/20 via-secvo-accent/10 to-secvo-blue/5",
      "animate-gradient-shift bg-[length:400%_400%]",
      className
    )}>
      {/* Additional glow points */}
      <div className="absolute top-1/4 left-1/4 w-40 h-40 rounded-full bg-secvo-blue/20 filter blur-[100px]"></div>
      <div className="absolute bottom-1/4 right-1/3 w-60 h-60 rounded-full bg-secvo-accent/15 filter blur-[120px]"></div>
    </div>
  );
};

export default AnimatedGradient;

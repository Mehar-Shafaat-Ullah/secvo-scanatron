
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
    )} />
  );
};

export default AnimatedGradient;


import React from 'react';
import { cn } from '@/lib/utils';
import Logo from './ui-components/Logo';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 glass-dark transition-all duration-300">
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Logo />
        
        <div className="hidden md:flex items-center space-x-10 text-sm font-medium">
          <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors duration-200">
            How it Works
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
            Features
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
            Pricing
          </a>
        </div>
        
        <a 
          href="#try-free" 
          className={cn(
            "relative inline-flex items-center justify-center px-6 py-2 overflow-hidden",
            "font-medium rounded-lg text-sm text-white",
            "bg-gradient-to-r from-secvo-blue to-secvo-accent",
            "shadow-[0_0_15px_rgba(0,87,255,0.5)] hover:shadow-[0_0_25px_rgba(0,87,255,0.7)]",
            "transition-all duration-300",
            "after:content-[''] after:absolute after:inset-0",
            "after:rounded-lg after:opacity-0 after:transition-opacity",
            "after:bg-gradient-to-r after:from-secvo-accent after:to-secvo-blue",
            "hover:after:opacity-100 group"
          )}
        >
          <span className="relative z-10 group-hover:text-white transition-colors">
            Try Free
          </span>
        </a>
      </div>
    </header>
  );
};

export default Header;

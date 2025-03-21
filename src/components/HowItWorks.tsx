
import React from 'react';
import { cn } from '@/lib/utils';
import { Search, Cpu, FileText } from 'lucide-react';
import AnimatedGradient from './ui-components/AnimatedGradient';

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="relative py-24 overflow-hidden">
      <AnimatedGradient className="opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h6 className="text-secvo-accent font-semibold mb-3 uppercase tracking-wider text-sm">Process</h6>
          <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            How SECVO Works
          </h2>
          <p className="text-gray-400 text-lg">
            Our AI security scanner works in three simple steps to identify and fix vulnerabilities on your website.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="relative"
            >
              <div 
                className={cn(
                  "glass-dark rounded-xl p-8 h-full transition-all duration-300",
                  "border border-gray-800 hover:border-secvo-blue/40",
                  "group hover:shadow-[0_0_20px_rgba(0,87,255,0.3)] opacity-0 animate-scale-fade-in"
                )}
                style={{ animationDelay: `${index * 200}ms`, animationFillMode: 'forwards' }}
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-full mb-6 bg-gradient-to-br from-secvo-blue to-secvo-accent shadow-[0_0_15px_rgba(0,87,255,0.4)]">
                  {step.icon}
                </div>
                
                <div className="absolute -top-5 -right-2 flex items-center justify-center w-10 h-10 rounded-full bg-secvo-dark border border-gray-800 text-xl font-bold">
                  {index + 1}
                </div>
                
                <h3 className="text-xl font-semibold mb-3 text-white">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-[2px] bg-gradient-to-r from-secvo-blue to-transparent z-20" />
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-20 text-center">
          <a 
            href="#try-free" 
            id="try-free"
            className={cn(
              "inline-flex items-center justify-center px-8 py-3",
              "font-medium rounded-lg text-white",
              "bg-gradient-to-r from-secvo-blue to-secvo-accent",
              "shadow-[0_0_20px_rgba(0,87,255,0.4)] hover:shadow-[0_0_30px_rgba(0,87,255,0.6)]",
              "transition-all duration-300",
              "after:content-[''] after:absolute after:inset-0",
              "after:rounded-lg after:opacity-0 after:transition-opacity",
              "after:bg-gradient-to-r after:from-secvo-accent after:to-secvo-blue",
              "hover:after:opacity-100 relative group"
            )}
          >
            <span className="relative z-10 group-hover:text-white transition-colors">
              Try SECVO for Free
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

const steps = [
  {
    title: "Enter Your URL",
    description: "Simply paste your website URL into the scanner form and click 'Scan Now' to begin the security analysis.",
    icon: <Search size={24} className="text-white" />
  },
  {
    title: "AI Deep Scan",
    description: "Our advanced AI engine scans your website, detecting vulnerabilities, outdated software, and security misconfigurations.",
    icon: <Cpu size={24} className="text-white" />
  },
  {
    title: "Get Your Report",
    description: "Receive a comprehensive security report with AI-generated fix recommendations and step-by-step remediation guidance.",
    icon: <FileText size={24} className="text-white" />
  }
];

export default HowItWorks;

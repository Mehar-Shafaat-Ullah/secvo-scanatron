
import React from 'react';
import { cn } from '@/lib/utils';
import UrlForm from './UrlForm';
import AnimatedGradient from './ui-components/AnimatedGradient';
import { Shield, Lock, Zap } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-28 pb-20 md:pt-44 md:pb-32 flex items-center min-h-screen overflow-hidden">
      <AnimatedGradient />
      
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-10 w-32 h-32 bg-secvo-blue/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-10 w-40 h-40 bg-secvo-accent/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 inline-flex items-center px-3 py-1 rounded-full border border-secvo-blue/30 bg-secvo-blue/5 backdrop-blur-sm">
            <span className="mr-2 bg-secvo-blue text-white text-xs font-semibold px-2 py-0.5 rounded-full">NEW</span>
            <span className="text-xs text-gray-300">AI-powered security scanning</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 animate-fade-in">
            AI-Powered Website <br /> Security Scanner
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto opacity-0 animate-fade-in animation-delay-200" style={{ animationFillMode: 'forwards' }}>
            Scan your website for vulnerabilities & get AI-generated fixes in seconds.
          </p>
          
          <div className="opacity-0 animate-fade-in animation-delay-400" style={{ animationFillMode: 'forwards' }}>
            <UrlForm />
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="glass rounded-xl p-6 opacity-0 animate-fade-in"
                style={{ animationDelay: `${600 + index * 100}ms`, animationFillMode: 'forwards' }}
              >
                <div className="bg-gradient-to-br from-secvo-blue to-secvo-accent w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const features = [
  {
    title: "Advanced AI Scanning",
    description: "Our AI engine identifies vulnerabilities that traditional scanners miss, providing deeper insights.",
    icon: <Zap className="text-white" size={20} />
  },
  {
    title: "Instant Results",
    description: "Get comprehensive security reports in seconds, not hours, with clear remediation steps.",
    icon: <Shield className="text-white" size={20} />
  },
  {
    title: "Actionable Fixes",
    description: "Each vulnerability comes with AI-generated code and instructions to patch security issues.",
    icon: <Lock className="text-white" size={20} />
  }
];

export default Hero;

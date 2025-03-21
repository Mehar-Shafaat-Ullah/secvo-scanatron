
import React from 'react';
import { cn } from '@/lib/utils';

interface CyberSecurityBackgroundProps {
  className?: string;
}

const CyberSecurityBackground: React.FC<CyberSecurityBackgroundProps> = ({ className }) => {
  return (
    <div className={cn("absolute inset-0 z-[-15] opacity-20", className)}>
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(0,87,255,0.15)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      
      {/* Digital circuit lines */}
      <div className="absolute left-0 right-0 top-[20%] h-[1px] bg-gradient-to-r from-transparent via-secvo-blue/30 to-transparent"></div>
      <div className="absolute left-0 right-0 top-[60%] h-[1px] bg-gradient-to-r from-transparent via-secvo-accent/30 to-transparent"></div>
      <div className="absolute left-[30%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-secvo-blue/30 to-transparent"></div>
      <div className="absolute left-[70%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-secvo-accent/30 to-transparent"></div>
      
      {/* Binary code effect (subtle) */}
      <div className="absolute inset-0 mix-blend-overlay opacity-5" 
           style={{
             backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100%25\' height=\'100%25\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ctext x=\'10\' y=\'20\' font-family=\'monospace\' font-size=\'20\' fill=\'%230057FF\' opacity=\'0.5\'%3E10110%3C/text%3E%3Ctext x=\'60\' y=\'40\' font-family=\'monospace\' font-size=\'15\' fill=\'%2300D1FF\' opacity=\'0.4\'%3E01001%3C/text%3E%3Ctext x=\'100\' y=\'80\' font-family=\'monospace\' font-size=\'18\' fill=\'%230057FF\' opacity=\'0.3\'%3E11010%3C/text%3E%3C/svg%3E")',
             backgroundSize: '200px 200px'
           }}>
      </div>
    </div>
  );
};

export default CyberSecurityBackground;

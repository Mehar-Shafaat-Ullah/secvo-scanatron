
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import Footer from '@/components/Footer';
import CyberSecurityBackground from '@/components/ui-components/CyberSecurityBackground';

const Index: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-secvo-dark">
      <CyberSecurityBackground className="fixed" />
      <Header />
      <main className="flex-grow">
        <Hero />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

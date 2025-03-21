
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import Footer from '@/components/Footer';
import CyberSecurityBackground from '@/components/ui-components/CyberSecurityBackground';
import { Button } from '@/components/ui/button';

const Index: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="flex flex-col min-h-screen bg-secvo-dark">
      <CyberSecurityBackground className="fixed" />
      <Header />
      <main className="flex-grow">
        <Hero />
        <HowItWorks />
        
        {!user && (
          <div className="container mx-auto px-4 pb-20 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Ready to secure your website?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              Create a free account to track your scan history and receive detailed security reports.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link to="/signup">
                <Button className="bg-gradient-to-r from-secvo-blue to-secvo-accent text-white px-8 py-6 text-lg">
                  Create Free Account
                </Button>
              </Link>
              <Link to="/signin">
                <Button variant="outline" className="border-gray-700 text-white hover:bg-secvo-darker px-8 py-6 text-lg">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Index;

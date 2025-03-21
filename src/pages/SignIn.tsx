
import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import AuthForm from '@/components/AuthForm';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CyberSecurityBackground from '@/components/ui-components/CyberSecurityBackground';

const SignIn: React.FC = () => {
  const { user, loading } = useAuth();

  // If user is already logged in, redirect to dashboard
  if (user && !loading) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-secvo-dark">
      <CyberSecurityBackground className="fixed" />
      <Header />
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-secvo-darker/80 p-8 rounded-lg shadow-xl border border-gray-700/50">
          <h1 className="text-3xl font-bold text-center mb-6 text-white">Sign In to SECVO</h1>
          
          <AuthForm mode="signin" />
          
          <div className="mt-6 text-center text-sm">
            <span className="text-gray-400">Don't have an account? </span>
            <Link to="/signup" className="text-secvo-blue hover:text-secvo-accent transition-colors">
              Sign Up
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignIn;

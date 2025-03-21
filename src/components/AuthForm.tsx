
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Lock, Mail } from 'lucide-react';

type AuthFormProps = {
  mode: 'signin' | 'signup';
  onSuccess?: () => void;
  className?: string;
};

const AuthForm: React.FC<AuthFormProps> = ({ mode, onSuccess, className }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, signUp, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (mode === 'signin') {
        await signIn(email, password);
      } else {
        await signUp(email, password);
      }
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Authentication error:", error);
    }
  };

  return (
    <div className={cn("w-full max-w-md mx-auto", className)}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <Mail size={18} />
            </div>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="pl-10"
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <Lock size={18} />
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="pl-10"
              required
            />
          </div>
        </div>
        
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-secvo-blue to-secvo-accent text-white font-medium"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {mode === 'signin' ? 'Signing In...' : 'Signing Up...'}
            </span>
          ) : (
            <>{mode === 'signin' ? 'Sign In' : 'Sign Up'}</>
          )}
        </Button>
      </form>
    </div>
  );
};

export default AuthForm;

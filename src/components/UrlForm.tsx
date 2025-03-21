
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

const UrlForm: React.FC = () => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url) {
      toast({
        title: "Please enter a URL",
        description: "Enter a valid website URL to scan for vulnerabilities",
        variant: "destructive"
      });
      return;
    }

    // Check if user is authenticated
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to perform a security scan",
        variant: "destructive"
      });
      navigate('/signin');
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Create a new scan in the database
      const { data, error } = await supabase
        .from('scans')
        .insert({
          url: url,
          user_id: user.id,
          status: 'processing',
          risk_level: 'pending'
        })
        .select();
      
      if (error) throw error;
      
      // Redirect to the scan results page
      if (data && data.length > 0) {
        toast({
          title: "Scan initiated",
          description: "Your website is being scanned for vulnerabilities",
        });
        navigate(`/scan/${data[0].id}`);
      }
    } catch (error: any) {
      toast({
        title: "Scan Failed",
        description: error.message || "There was an error initiating the scan",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-4 relative">
      <div className="relative flex items-center">
        <div className="absolute left-4 text-gray-400">
          <Search size={20} />
        </div>
        
        <input
          type="url"
          placeholder="Enter your website URL (e.g., https://example.com)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className={cn(
            "w-full pl-12 pr-32 py-4 rounded-lg",
            "bg-secvo-darker/80 border border-gray-700/50",
            "text-white placeholder:text-gray-500",
            "focus:outline-none focus:ring-2 focus:ring-secvo-blue/50",
            "transition-all duration-200"
          )}
        />
        
        <button
          type="submit"
          disabled={isLoading}
          className={cn(
            "absolute right-3 px-6 py-2 rounded-md",
            "bg-gradient-to-r from-secvo-blue to-secvo-accent",
            "text-white font-medium text-sm",
            "focus:outline-none",
            "transition-all duration-300",
            "shadow-[0_0_15px_rgba(0,87,255,0.3)] hover:shadow-[0_0_25px_rgba(0,87,255,0.5)]",
            isLoading && "opacity-70"
          )}
        >
          {isLoading ? (
            <div className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Scanning</span>
            </div>
          ) : (
            "Scan Now"
          )}
        </button>
      </div>
      
      <p className="text-xs text-gray-500 mt-2 text-center">
        We respect your privacy. No data is stored and all scans are secure.
      </p>
    </form>
  );
};

export default UrlForm;

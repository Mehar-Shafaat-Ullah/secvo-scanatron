
import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CyberSecurityBackground from '@/components/ui-components/CyberSecurityBackground';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ExternalLink, Eye, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { formatDistanceToNow } from 'date-fns';

type Scan = {
  id: string;
  url: string;
  scan_date: string;
  status: string;
  risk_level: string | null;
};

const Dashboard: React.FC = () => {
  const { user, loading } = useAuth();
  const [scans, setScans] = useState<Scan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchScans = async () => {
      if (!user) return;

      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('scans')
          .select('*')
          .order('scan_date', { ascending: false });

        if (error) throw error;
        
        setScans(data || []);
      } catch (error: any) {
        toast({
          title: "Failed to load scans",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchScans();
  }, [user, toast]);

  // If user is not logged in, redirect to sign in page
  if (!user && !loading) {
    return <Navigate to="/signin" />;
  }

  const getRiskLevelColor = (riskLevel: string | null) => {
    switch (riskLevel) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-green-500';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusBadge = (status: string) => {
    let bgColor = 'bg-gray-600';
    
    switch (status) {
      case 'completed':
        bgColor = 'bg-green-600';
        break;
      case 'processing':
        bgColor = 'bg-blue-600';
        break;
      case 'failed':
        bgColor = 'bg-red-600';
        break;
    }
    
    return (
      <span className={`${bgColor} text-white text-xs px-2 py-1 rounded-full`}>
        {status}
      </span>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-secvo-dark">
      <CyberSecurityBackground className="fixed" />
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-secvo-darker/80 rounded-lg shadow-xl border border-gray-700/50 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-white">Security Scan Dashboard</h1>
            <Link to="/">
              <Button className="bg-gradient-to-r from-secvo-blue to-secvo-accent text-white">
                <Shield className="mr-2 h-4 w-4" />
                New Scan
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secvo-blue"></div>
            </div>
          ) : scans.length === 0 ? (
            <div className="bg-secvo-dark/50 rounded-lg p-8 text-center">
              <Shield className="mx-auto h-16 w-16 text-secvo-blue mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Scans Yet</h3>
              <p className="text-gray-400 mb-6">You haven't performed any security scans yet.</p>
              <Link to="/">
                <Button className="bg-gradient-to-r from-secvo-blue to-secvo-accent text-white">
                  Start Your First Scan
                </Button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Website URL</TableHead>
                    <TableHead>Scan Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Risk Level</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scans.map((scan) => (
                    <TableRow key={scan.id}>
                      <TableCell className="font-medium flex items-center">
                        <div className="truncate max-w-[200px]">{scan.url}</div>
                        <ExternalLink
                          className="ml-2 h-4 w-4 text-gray-400 hover:text-secvo-blue cursor-pointer"
                          onClick={() => window.open(scan.url, '_blank')}
                        />
                      </TableCell>
                      <TableCell>
                        {scan.scan_date ? formatDistanceToNow(new Date(scan.scan_date), { addSuffix: true }) : 'N/A'}
                      </TableCell>
                      <TableCell>{getStatusBadge(scan.status)}</TableCell>
                      <TableCell className={getRiskLevelColor(scan.risk_level)}>
                        {scan.risk_level ? scan.risk_level.charAt(0).toUpperCase() + scan.risk_level.slice(1) : 'Unknown'}
                      </TableCell>
                      <TableCell className="text-right">
                        <Link to={`/scan/${scan.id}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="mr-2 h-4 w-4" />
                            View Report
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;

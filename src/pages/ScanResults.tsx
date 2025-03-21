
import React, { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CyberSecurityBackground from '@/components/ui-components/CyberSecurityBackground';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, AlertTriangle, CheckCircle, Info, ExternalLink, Shield, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { formatDistanceToNow } from 'date-fns';

// Mock data for demonstration (will be replaced with real implementation)
const mockRecommendations = [
  {
    id: 1,
    title: "Update Web Server Software",
    description: "Your web server is running an outdated version with known vulnerabilities. Update to the latest version to patch security issues."
  },
  {
    id: 2,
    title: "Enable HTTPS",
    description: "Your website does not use HTTPS. Implement SSL/TLS to encrypt data transmission and protect user privacy."
  },
  {
    id: 3,
    title: "Close Unnecessary Ports",
    description: "Several unnecessary ports are open on your server, increasing the attack surface. Close ports 21, 8080, and 3306 if not required."
  }
];

type Scan = {
  id: string;
  url: string;
  scan_date: string;
  status: string;
  risk_level: string | null;
};

type Vulnerability = {
  id: string;
  scan_id: string;
  name: string;
  description: string;
  severity: string;
  recommendation: string;
};

const ScanResults: React.FC = () => {
  const { scanId } = useParams<{ scanId: string }>();
  const { user, loading } = useAuth();
  const [scan, setScan] = useState<Scan | null>(null);
  const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchScanDetails = async () => {
      if (!user || !scanId) return;

      try {
        setIsLoading(true);
        
        // Fetch scan details
        const { data: scanData, error: scanError } = await supabase
          .from('scans')
          .select('*')
          .eq('id', scanId)
          .single();

        if (scanError) throw scanError;
        
        setScan(scanData);

        // Fetch vulnerabilities
        const { data: vulnData, error: vulnError } = await supabase
          .from('vulnerabilities')
          .select('*')
          .eq('scan_id', scanId);

        if (vulnError) throw vulnError;
        
        setVulnerabilities(vulnData || []);

        // If scan is still processing, simulate some processing
        if (scanData.status === 'processing') {
          // For demo purposes, we'll simulate a scan completion after 5 seconds
          setTimeout(async () => {
            // Update scan status
            const { error: updateError } = await supabase
              .from('scans')
              .update({
                status: 'completed',
                risk_level: Math.random() > 0.5 ? 'medium' : 'low'
              })
              .eq('id', scanId);

            if (updateError) {
              console.error('Error updating scan status:', updateError);
              return;
            }

            // Create mock vulnerabilities
            const mockVulnerabilities = [
              {
                scan_id: scanId,
                name: 'Outdated Web Server',
                description: 'The web server is running an outdated version with known vulnerabilities.',
                severity: Math.random() > 0.5 ? 'high' : 'medium',
                recommendation: 'Update to the latest version to patch security issues.'
              },
              {
                scan_id: scanId,
                name: 'Missing HTTPS',
                description: 'The website does not use HTTPS, exposing data transmitted between the server and clients.',
                severity: 'medium',
                recommendation: 'Implement SSL/TLS to encrypt data transmission and protect user privacy.'
              }
            ];

            // Add vulnerabilities to database
            const { error: vulnInsertError } = await supabase
              .from('vulnerabilities')
              .insert(mockVulnerabilities);

            if (vulnInsertError) {
              console.error('Error inserting vulnerabilities:', vulnInsertError);
              return;
            }

            // Refresh the page data
            const { data: updatedScan } = await supabase
              .from('scans')
              .select('*')
              .eq('id', scanId)
              .single();
              
            const { data: updatedVulns } = await supabase
              .from('vulnerabilities')
              .select('*')
              .eq('scan_id', scanId);
              
            setScan(updatedScan || null);
            setVulnerabilities(updatedVulns || []);
            
            toast({
              title: "Scan Completed",
              description: "Your website has been analyzed for vulnerabilities.",
            });
          }, 5000);
        }
      } catch (error: any) {
        toast({
          title: "Failed to load scan details",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchScanDetails();
  }, [user, scanId, toast]);

  // If user is not logged in, redirect to sign in page
  if (!user && !loading) {
    return <Navigate to="/signin" />;
  }

  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-secvo-dark">
        <CyberSecurityBackground className="fixed" />
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 flex justify-center items-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-secvo-blue mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-white">Loading Scan Results...</h2>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Handle scan not found
  if (!scan) {
    return (
      <div className="flex flex-col min-h-screen bg-secvo-dark">
        <CyberSecurityBackground className="fixed" />
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 flex justify-center items-center">
          <div className="bg-secvo-darker/80 rounded-lg shadow-xl border border-gray-700/50 p-8 text-center max-w-lg">
            <AlertTriangle className="mx-auto h-16 w-16 text-yellow-500 mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Scan Not Found</h2>
            <p className="text-gray-400 mb-6">We couldn't find the scan you're looking for.</p>
            <Link to="/dashboard">
              <Button className="bg-gradient-to-r from-secvo-blue to-secvo-accent text-white">
                Return to Dashboard
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const countByRisk = {
    high: vulnerabilities.filter(v => v.severity === 'high').length,
    medium: vulnerabilities.filter(v => v.severity === 'medium').length,
    low: vulnerabilities.filter(v => v.severity === 'low').length,
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high':
        return <AlertTriangle className="text-red-500 h-5 w-5" />;
      case 'medium':
        return <AlertTriangle className="text-yellow-500 h-5 w-5" />;
      case 'low':
        return <Info className="text-blue-500 h-5 w-5" />;
      default:
        return <Info className="text-gray-400 h-5 w-5" />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-secvo-dark">
      <CyberSecurityBackground className="fixed" />
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/dashboard">
            <Button variant="ghost" className="text-gray-400 hover:text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Scan Overview */}
          <Card className="bg-secvo-darker/80 border-gray-700/50 text-white md:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">Security Scan Report</CardTitle>
                  <CardDescription className="text-gray-400">
                    {scan.scan_date ? formatDistanceToNow(new Date(scan.scan_date), { addSuffix: true }) : 'N/A'}
                  </CardDescription>
                </div>
                {scan.status === 'processing' ? (
                  <Badge className="bg-blue-600 text-white flex items-center px-3 py-1">
                    <Clock className="mr-1 h-4 w-4" />
                    Scanning in progress
                  </Badge>
                ) : scan.status === 'completed' ? (
                  <Badge className="bg-green-600 text-white flex items-center px-3 py-1">
                    <CheckCircle className="mr-1 h-4 w-4" />
                    Scan completed
                  </Badge>
                ) : (
                  <Badge className="bg-red-600 text-white flex items-center px-3 py-1">
                    <AlertTriangle className="mr-1 h-4 w-4" />
                    Scan failed
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-4">
                <h3 className="text-lg font-semibold mr-2">Target URL:</h3>
                <a 
                  href={scan.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-secvo-blue hover:text-secvo-accent flex items-center"
                >
                  {scan.url}
                  <ExternalLink className="ml-1 h-4 w-4" />
                </a>
              </div>

              {scan.status === 'processing' ? (
                <div className="bg-secvo-dark/50 rounded-lg p-6 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secvo-blue mx-auto mb-4"></div>
                  <h3 className="text-xl font-semibold mb-2">Scanning in Progress</h3>
                  <p className="text-gray-400">
                    We're analyzing {scan.url} for vulnerabilities. This may take a few minutes.
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-center">
                      <h3 className="text-lg font-semibold mb-1">High Risk</h3>
                      <p className="text-3xl font-bold text-red-500">{countByRisk.high}</p>
                    </div>
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 text-center">
                      <h3 className="text-lg font-semibold mb-1">Medium Risk</h3>
                      <p className="text-3xl font-bold text-yellow-500">{countByRisk.medium}</p>
                    </div>
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 text-center">
                      <h3 className="text-lg font-semibold mb-1">Low Risk</h3>
                      <p className="text-3xl font-bold text-blue-500">{countByRisk.low}</p>
                    </div>
                  </div>

                  <div className="bg-secvo-dark/50 rounded-lg p-4 flex items-center">
                    <Shield className="h-12 w-12 text-secvo-blue mr-4" />
                    <div>
                      <h3 className="text-lg font-semibold">Overall Security Risk:</h3>
                      <p className={`text-lg font-bold ${
                        scan.risk_level === 'high' ? 'text-red-500' : 
                        scan.risk_level === 'medium' ? 'text-yellow-500' : 
                        scan.risk_level === 'low' ? 'text-green-500' : 
                        'text-gray-400'
                      }`}>
                        {scan.risk_level ? scan.risk_level.charAt(0).toUpperCase() + scan.risk_level.slice(1) : 'Unknown'}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* AI Recommendations */}
          <Card className="bg-secvo-darker/80 border-gray-700/50 text-white">
            <CardHeader className="bg-gradient-to-r from-secvo-blue/20 to-secvo-accent/20 rounded-t-lg">
              <CardTitle className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2 text-secvo-blue">
                  <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"></path>
                  <path d="M8.5 8.5v.01"></path>
                  <path d="M16 15.5v.01"></path>
                  <path d="M12 12v.01"></path>
                  <path d="M11 17v.01"></path>
                  <path d="M7 14v.01"></path>
                </svg>
                AI Recommendations
              </CardTitle>
              <CardDescription className="text-gray-400">
                Automated security enhancement suggestions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {scan.status === 'processing' ? (
                <div className="text-center py-4">
                  <p className="text-gray-400">
                    AI recommendations will be available once the scan is complete.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {mockRecommendations.map((rec) => (
                    <div key={rec.id} className="border border-gray-700 rounded-lg p-3">
                      <h4 className="font-semibold mb-1 text-secvo-blue">{rec.title}</h4>
                      <p className="text-sm text-gray-400">{rec.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Vulnerabilities List */}
        <Card className="bg-secvo-darker/80 border-gray-700/50 text-white">
          <CardHeader>
            <CardTitle>Detected Vulnerabilities</CardTitle>
            <CardDescription className="text-gray-400">
              {vulnerabilities.length > 0 
                ? `${vulnerabilities.length} issues found requiring attention` 
                : scan.status === 'processing' 
                  ? 'Scan in progress...' 
                  : 'No vulnerabilities found'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {scan.status === 'processing' ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-secvo-blue mx-auto mb-4"></div>
                <p className="text-gray-400">
                  We're detecting vulnerabilities...
                </p>
              </div>
            ) : vulnerabilities.length === 0 ? (
              <div className="bg-secvo-dark/50 rounded-lg p-8 text-center">
                <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No Vulnerabilities Detected</h3>
                <p className="text-gray-400">
                  Great job! We didn't find any security issues with your website.
                </p>
              </div>
            ) : (
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="bg-secvo-dark/50">
                  <TabsTrigger value="all">All ({vulnerabilities.length})</TabsTrigger>
                  <TabsTrigger value="high">High ({countByRisk.high})</TabsTrigger>
                  <TabsTrigger value="medium">Medium ({countByRisk.medium})</TabsTrigger>
                  <TabsTrigger value="low">Low ({countByRisk.low})</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="mt-4">
                  <div className="space-y-4">
                    {vulnerabilities.map((vuln) => (
                      <div key={vuln.id} className={`border border-gray-700 rounded-lg p-4 ${
                        vuln.severity === 'high' ? 'bg-red-900/10' : 
                        vuln.severity === 'medium' ? 'bg-yellow-900/10' : 
                        'bg-blue-900/10'
                      }`}>
                        <div className="flex items-start">
                          {getSeverityIcon(vuln.severity)}
                          <div className="ml-3 flex-1">
                            <div className="flex justify-between">
                              <h4 className="font-semibold">{vuln.name}</h4>
                              <Badge className={`${
                                vuln.severity === 'high' ? 'bg-red-600' : 
                                vuln.severity === 'medium' ? 'bg-yellow-600' : 
                                'bg-blue-600'
                              } text-white`}>
                                {vuln.severity.charAt(0).toUpperCase() + vuln.severity.slice(1)}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-400 mt-1">{vuln.description}</p>
                            {vuln.recommendation && (
                              <div className="mt-3 bg-gray-800/50 p-3 rounded border-l-2 border-secvo-blue">
                                <p className="text-sm">
                                  <span className="font-semibold text-secvo-blue">Recommendation:</span> {vuln.recommendation}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="high" className="mt-4">
                  <div className="space-y-4">
                    {vulnerabilities.filter(v => v.severity === 'high').map((vuln) => (
                      <div key={vuln.id} className="border border-gray-700 rounded-lg p-4 bg-red-900/10">
                        <div className="flex items-start">
                          {getSeverityIcon(vuln.severity)}
                          <div className="ml-3 flex-1">
                            <div className="flex justify-between">
                              <h4 className="font-semibold">{vuln.name}</h4>
                              <Badge className="bg-red-600 text-white">
                                High
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-400 mt-1">{vuln.description}</p>
                            {vuln.recommendation && (
                              <div className="mt-3 bg-gray-800/50 p-3 rounded border-l-2 border-secvo-blue">
                                <p className="text-sm">
                                  <span className="font-semibold text-secvo-blue">Recommendation:</span> {vuln.recommendation}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="medium" className="mt-4">
                  <div className="space-y-4">
                    {vulnerabilities.filter(v => v.severity === 'medium').map((vuln) => (
                      <div key={vuln.id} className="border border-gray-700 rounded-lg p-4 bg-yellow-900/10">
                        <div className="flex items-start">
                          {getSeverityIcon(vuln.severity)}
                          <div className="ml-3 flex-1">
                            <div className="flex justify-between">
                              <h4 className="font-semibold">{vuln.name}</h4>
                              <Badge className="bg-yellow-600 text-white">
                                Medium
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-400 mt-1">{vuln.description}</p>
                            {vuln.recommendation && (
                              <div className="mt-3 bg-gray-800/50 p-3 rounded border-l-2 border-secvo-blue">
                                <p className="text-sm">
                                  <span className="font-semibold text-secvo-blue">Recommendation:</span> {vuln.recommendation}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="low" className="mt-4">
                  <div className="space-y-4">
                    {vulnerabilities.filter(v => v.severity === 'low').map((vuln) => (
                      <div key={vuln.id} className="border border-gray-700 rounded-lg p-4 bg-blue-900/10">
                        <div className="flex items-start">
                          {getSeverityIcon(vuln.severity)}
                          <div className="ml-3 flex-1">
                            <div className="flex justify-between">
                              <h4 className="font-semibold">{vuln.name}</h4>
                              <Badge className="bg-blue-600 text-white">
                                Low
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-400 mt-1">{vuln.description}</p>
                            {vuln.recommendation && (
                              <div className="mt-3 bg-gray-800/50 p-3 rounded border-l-2 border-secvo-blue">
                                <p className="text-sm">
                                  <span className="font-semibold text-secvo-blue">Recommendation:</span> {vuln.recommendation}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default ScanResults;

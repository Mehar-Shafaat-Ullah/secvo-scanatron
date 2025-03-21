
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      // Supabase API URL - env var injected by the Supabase platform when deployed
      Deno.env.get('SUPABASE_URL') ?? '',
      // Supabase API SERVICE ROLE KEY - env var injected by the Supabase platform when deployed
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get the request body
    const { scanId, url } = await req.json();

    console.log(`Processing scan ${scanId} for URL: ${url}`);

    if (!scanId || !url) {
      return new Response(
        JSON.stringify({ error: "Missing required parameters" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    // In a real implementation, we would call the Shodan/Censys API here
    // For demonstration, we'll simulate the scan with a delay and mock data
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Generate random risk level
    const riskLevels = ['low', 'medium', 'high'];
    const riskLevel = riskLevels[Math.floor(Math.random() * 3)];

    // Update scan status
    const { error: updateError } = await supabaseClient
      .from('scans')
      .update({
        status: 'completed',
        risk_level: riskLevel
      })
      .eq('id', scanId);

    if (updateError) {
      throw updateError;
    }

    // Generate mock vulnerabilities
    const vulnerabilityTypes = [
      {
        name: 'Outdated Web Server',
        description: 'The web server is running an outdated version with known vulnerabilities.',
        severity: 'high',
        recommendation: 'Update to the latest version to patch security issues.'
      },
      {
        name: 'Missing HTTPS',
        description: 'The website does not use HTTPS, exposing data transmitted between the server and clients.',
        severity: 'medium',
        recommendation: 'Implement SSL/TLS to encrypt data transmission and protect user privacy.'
      },
      {
        name: 'Open Ports',
        description: 'Several unnecessary ports are open on your server, increasing the attack surface.',
        severity: 'medium',
        recommendation: 'Close ports 21, 8080, and 3306 if not required for normal operation.'
      },
      {
        name: 'Cross-Site Scripting (XSS) Vulnerability',
        description: 'Input validation issues could allow attackers to inject malicious scripts.',
        severity: 'high',
        recommendation: 'Implement proper input validation and output encoding.'
      },
      {
        name: 'Weak Content Security Policy',
        description: 'The site lacks proper Content Security Policy headers.',
        severity: 'low',
        recommendation: 'Implement strong CSP headers to prevent XSS and data injection attacks.'
      },
      {
        name: 'Cookie Without Secure Flag',
        description: 'Cookies are set without the secure flag, which could expose them to theft over HTTP.',
        severity: 'low',
        recommendation: 'Set the Secure flag on all cookies to ensure they are only sent over HTTPS.'
      }
    ];

    // Select random subset of vulnerabilities based on risk level
    let numVulnerabilities;
    if (riskLevel === 'high') {
      numVulnerabilities = Math.floor(Math.random() * 3) + 3; // 3-5 vulnerabilities
    } else if (riskLevel === 'medium') {
      numVulnerabilities = Math.floor(Math.random() * 2) + 2; // 2-3 vulnerabilities
    } else {
      numVulnerabilities = Math.floor(Math.random() * 2) + 1; // 1-2 vulnerabilities
    }

    // Shuffle and select vulnerabilities
    const shuffled = [...vulnerabilityTypes].sort(() => 0.5 - Math.random());
    const selectedVulnerabilities = shuffled.slice(0, numVulnerabilities).map(vuln => ({
      scan_id: scanId,
      name: vuln.name,
      description: vuln.description,
      severity: vuln.severity,
      recommendation: vuln.recommendation
    }));

    // Insert vulnerabilities
    const { error: vulnError } = await supabaseClient
      .from('vulnerabilities')
      .insert(selectedVulnerabilities);

    if (vulnError) {
      throw vulnError;
    }

    console.log(`Scan ${scanId} completed with ${numVulnerabilities} vulnerabilities found`);

    return new Response(
      JSON.stringify({
        status: 'completed',
        risk_level: riskLevel,
        vulnerabilities_count: numVulnerabilities
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error('Error processing scan:', error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});

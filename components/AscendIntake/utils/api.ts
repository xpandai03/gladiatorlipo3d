import { SubmissionPayload, WEBHOOK_URL, REDIRECT_URL } from '../types';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function submitLead(payload: SubmissionPayload): Promise<{ success: boolean; error?: string }> {
  const retryDelays = [0, 300, 900, 2700]; // Initial attempt, then 3 retries with exponential backoff
  
  for (const delay of retryDelays) {
    if (delay > 0) {
      await sleep(delay);
    }
    
    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      
      // Any 2xx status is considered success
      if (response.ok || (response.status >= 200 && response.status < 300)) {
        // Redirect on success
        window.location.href = REDIRECT_URL;
        return { success: true };
      }
      
      // Log non-2xx responses
      console.error(`Submission failed with status: ${response.status}`);
      
    } catch (error) {
      console.error('Submission error:', error);
    }
  }
  
  // All retries failed
  return { 
    success: false, 
    error: "We couldn't submit right now. Please try again." 
  };
}

// Optional: Log client errors (best effort)
export async function logClientError(error: any): Promise<void> {
  try {
    await fetch('/api/log-client', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: error.toString(), timestamp: new Date().toISOString() })
    });
  } catch {
    // Silently fail - this is best effort
  }
}
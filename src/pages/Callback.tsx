import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Callback = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const requestedRef = useRef(false); // Use ref to track request status within component instance

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const errorParam = params.get('error');

    // Check for a general error param first
    if (errorParam) {
      const decodedError = decodeURIComponent(errorParam);
      console.error("Error from URL params:", decodedError);
      setError(decodedError);
      setLoading(false);
      // No need to navigate here, finally block will handle it
      return;
    }

    // Only proceed if we have a code and haven't already processed a request in this mount
    if (code && !requestedRef.current) {
      requestedRef.current = true; // Mark as requested

      const codeKey = `spotify_code_used_${code}`;
      const sessionCodeUsed = sessionStorage.getItem(codeKey);

      // Immediately remove code from URL to prevent re-processing on reloads/remounts
      window.history.replaceState({}, document.title, window.location.pathname);

      if (sessionCodeUsed) {
        console.log('Code already processed in this session:', code);
        // Code was already used in this session. Check if we have a roast/token from that successful attempt.
        const storedRoast = localStorage.getItem('spotify_roast');
        const storedToken = localStorage.getItem('spotify_access_token');

        if (storedRoast && storedToken) {
          console.log('Found existing roast, will navigate to tools.');
          // Navigation will happen in finally block
        } else {
          // Code used, but no roast found. This is unexpected, set error.
          console.error('Code already used, but no roast found.');
          setError('Código de autorização já utilizado ou inválido.');
        }
        setLoading(false);
        return; // Stop here
      }

      // If code is new for this session, mark it as used in sessionStorage
      sessionStorage.setItem(codeKey, 'true');

      console.log('Processing new code:', code);

      // Exchange code for access token
      fetch(`https://roast-my-spotify-eta.vercel.app/api/auth/callback?code=${code}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
        .then((res) => {
          if (!res.ok) {
             // Handle non-200 responses explicitly
             return res.json().then(errData => {
                 console.error('Error from backend callback:', errData);
                 // If the error is invalid_grant, check localStorage before throwing
                 if (errData.error === 'invalid_grant' || errData.error_description === 'Invalid authorization code') {
                     const storedRoast = localStorage.getItem('spotify_roast');
                     const storedToken = localStorage.getItem('spotify_access_token');
                     if (storedRoast && storedToken) {
                         console.log('Received invalid_grant but found existing roast. Proceeding.');
                         return { access_token: storedToken, fromInvalidGrant: true }; // Return token to proceed, add flag
                     }
                 }
                 // For other errors, or if no existing roast, throw
                 throw new Error(errData.error_description || errData.error || 'Failed to get access token');
             });
          }
          return res.json();
        })
        .then((data) => {
          // If we got here from an invalid_grant but had a stored token, set roast from storage and return
          if (data.fromInvalidGrant) {
             const storedRoast = localStorage.getItem('spotify_roast');
             if (storedRoast) {
                 localStorage.setItem('spotify_roast', storedRoast); // Re-set to ensure it's fresh (optional)
             }
             return; // Exit this chain, navigation and final state handling happen in finally
          }

          if (data.access_token) {
            localStorage.setItem('spotify_access_token', data.access_token);
            console.log('Successfully obtained access token. Calling roast endpoint.');
            // Call the roast endpoint
            return fetch('https://roast-my-spotify-eta.vercel.app/api/roast', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ accessToken: data.access_token }),
            })
              .then((res) => {
                  if (!res.ok) {
                      return res.json().then(errData => {
                          throw new Error(errData.error || 'Failed to get roast');
                      });
                  }
                  return res.json();
              })
              .then((roastData) => {
                if (roastData.roast) {
                  localStorage.setItem('spotify_roast', roastData.roast);
                  console.log('Successfully obtained roast.');
                  // Navigation happens in finally block
                } else {
                  throw new Error(roastData.error || 'No roast received');
                }
              });
          } else {
            throw new Error(data.error || 'No access token received');
          }
        })
        .catch((err) => {
          console.error('Error in callback flow:', err);
          // Set a user-facing error
          setError(err instanceof Error ? err.message : 'Ocorreu um erro desconhecido durante a autenticação.');
          // Navigation happens in finally block
        })
        .finally(() => {
           setLoading(false);
           // Always navigate to tools page after process, even on error,
           // so the tools page can display the error or existing roast.
           const finalRoast = localStorage.getItem('spotify_roast');
           const finalToken = localStorage.getItem('spotify_access_token'); // Also check for token just in case

           if (finalRoast && finalToken) {
                console.log('Navigating to tools with roast.');
                // Navigate with token so SpotifyRoaster can read it (even if not used, good practice)
                navigate('/tools?token=' + finalToken);
           } else if (error) {
                console.log('Navigating to tools with error:', error);
                // Navigate with the specific error message
                navigate('/tools?error=' + encodeURIComponent(error));
           } else {
                console.log('Navigating to tools with a generic error.');
                // Fallback to generic error if no roast/token and no explicit error was set
                 navigate('/tools?error=' + encodeURIComponent('Ocorreu um erro desconhecido durante a autenticação.'));
           }
        });
    } else if (!code && !errorParam) {
        // If no code and no error, maybe user landed here directly? Navigate away.
        console.log("Callback page loaded without code or error. Navigating to tools.");
        navigate('/tools');
        setLoading(false);
    }

  }, [navigate, error]); // Depend on navigate and error state for the finally block to see the latest error state

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-pulse text-lg">
        {loading ? 'Processando autenticação...' : error ? error : 'Redirecionando...'}
      </div>
    </div>
  );
};

export default Callback;
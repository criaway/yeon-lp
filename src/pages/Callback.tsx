import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Callback = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const requestedRef = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const errorParam = params.get('error');

    if (errorParam) {
      setError('Falha na autenticação. Por favor, tente novamente.');
      setLoading(false);
      navigate('/tools?error=' + encodeURIComponent('Falha na autenticação. Por favor, tente novamente.'));
      return;
    }

    if (code && !requestedRef.current) {
      requestedRef.current = true; // Block further requests in this session
      const codeKey = `spotify_code_used_${code}`;
      if (sessionStorage.getItem(codeKey)) {
        navigate('/tools?error=' + encodeURIComponent('Código de autorização já utilizado.'));
        return;
      }
      sessionStorage.setItem(codeKey, 'true');
      window.history.replaceState({}, document.title, window.location.pathname);

      fetch(`https://roast-my-spotify-eta.vercel.app/api/auth/callback?code=${code}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.access_token) {
            localStorage.setItem('spotify_access_token', data.access_token);
            return fetch('https://roast-my-spotify-eta.vercel.app/api/roast', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ accessToken: data.access_token }),
            })
              .then((res) => res.json())
              .then((roastData) => {
                if (roastData.roast) {
                  localStorage.setItem('spotify_roast', roastData.roast);
                  navigate('/tools?token=' + data.access_token);
                } else {
                  throw new Error(roastData.error || 'No roast received');
                }
              });
          } else {
            throw new Error(data.error || 'No access token received');
          }
        })
        .catch((err) => {
          setError('Falha na autenticação. Por favor, tente novamente.');
          navigate('/tools?error=' + encodeURIComponent('Falha na autenticação. Por favor, tente novamente.'));
        })
        .finally(() => setLoading(false));
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-pulse text-lg">
        {loading ? 'Processando autenticação...' : error ? error : 'Redirecionando...'}
      </div>
    </div>
  );
};

export default Callback;
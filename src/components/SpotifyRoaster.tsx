import React, { useState, useEffect } from "react";
import { CornerDownLeft, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useSearchParams } from "react-router-dom";

const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
// Use the exact redirect URI that's registered in Spotify
const REDIRECT_URI = 'https://yeon.live';
const CALLBACK_URI = `${REDIRECT_URI}/callback`;

interface SpotifyRoasterProps {
  onTabChange?: (tab: string) => void;
}

const SpotifyRoaster: React.FC<SpotifyRoasterProps> = ({ onTabChange }) => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [roast, setRoast] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Show roast from localStorage if present (e.g., after /callback redirect)
  useEffect(() => {
    const storedRoast = localStorage.getItem('spotify_roast');
    if (storedRoast) {
      setRoast(storedRoast);
      localStorage.removeItem('spotify_roast');
      if (onTabChange) {
        onTabChange('spotify');
      }
    }
  }, [onTabChange]);

  const handleSpotifyLogin = () => {
    const scope = 'user-read-private user-read-email user-top-read';
    const state = Math.random().toString(36).substring(7);
    
    // Store state in localStorage to verify on callback
    localStorage.setItem('spotify_auth_state', state);
    
    const authUrl = new URL('https://accounts.spotify.com/authorize');
    authUrl.searchParams.append('client_id', SPOTIFY_CLIENT_ID || '');
    authUrl.searchParams.append('response_type', 'code');
    authUrl.searchParams.append('redirect_uri', CALLBACK_URI);
    authUrl.searchParams.append('scope', scope);
    authUrl.searchParams.append('state', state);
    authUrl.searchParams.append('show_dialog', 'true');
    
    console.log('Starting Spotify auth with state:', state);
    console.log('Auth URL:', authUrl.toString());
    window.location.href = authUrl.toString();
  };

  useEffect(() => {
    // Check for token in URL or localStorage
    const token = searchParams.get('token');
    const error = searchParams.get('error');
    const state = searchParams.get('state');
    const storedState = localStorage.getItem('spotify_auth_state');

    console.log('Checking auth state:', { token, error, state, storedState });

    if (error) {
      setError(decodeURIComponent(error));
      // Clear the URL parameters
      window.history.replaceState({}, document.title, window.location.pathname);
      return;
    }

    // Only get roast if we have a new token from the callback
    if (token) {
      console.log('Got new token, requesting roast...');
      // Store token in localStorage to prevent duplicate requests
      const storedToken = localStorage.getItem('spotify_access_token');
      if (storedToken === token) {
        console.log('Token already used, skipping roast request');
        // Clear the URL parameters and stored state
        window.history.replaceState({}, document.title, window.location.pathname);
        localStorage.removeItem('spotify_auth_state');
        return;
      }
      localStorage.setItem('spotify_access_token', token);
      getRoast(token);
      // Clear the URL parameters and stored state
      window.history.replaceState({}, document.title, window.location.pathname);
      localStorage.removeItem('spotify_auth_state');
    }
  }, [searchParams]);

  const getRoast = async (accessToken: string) => {
    try {
      setLoading(true);
      setError(null);
      console.log('Making roast request with token:', accessToken.substring(0, 10) + '...');
      
      const response = await fetch('https://yeon.live/api/roast', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accessToken }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Roast request failed:', errorData);
        throw new Error(errorData.error || 'Failed to get roast');
      }

      const data = await response.json();
      console.log('Got roast response:', data);
      setRoast(data.roast);
      toast.success("Perfil foi fritado! 🔥");
      // Switch to the roast tab if the callback is provided
      if (onTabChange) {
        onTabChange('spotify');
      }
    } catch (err) {
      console.error("Error roasting Spotify profile:", err);
      setError(err instanceof Error ? err.message : "Ocorreu um erro ao fritar o perfil. Tente novamente.");
      // Clear the token on error
      localStorage.removeItem('spotify_access_token');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setRoast(null);
    setError(null);
    localStorage.removeItem('spotify_auth_state');
    localStorage.removeItem('spotify_access_token');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="space-y-6">
        <div className="flex flex-col items-center text-center">
          <div className="h-16 w-16 rounded-full bg-black flex items-center justify-center mb-4">
            <img
              src="/lovable-uploads/1fd42be2-1964-4cfd-b29b-946c4b596ef3.png"
              alt="Spotify Logo"
              className="h-10 w-10"
            />
          </div>
          <h2 className="text-2xl font-bold">Frite meu Spotify</h2>
        {
          !roast && (<p className="text-muted-foreground max-w-md">
            Conecte sua conta do Spotify e nossa IA vai fritar seu gosto musical
            sem dó.
          </p>)
        }
        </div>

        {!roast && (
        <Card>
          <CardHeader>
            <CardTitle>Conecte sua conta do Spotify</CardTitle>
            <CardDescription>
              Vamos analisar seu gosto musical e te dar uma fritada nada amigável.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              {!roast && !loading && (
                <Button 
                  onClick={handleSpotifyLogin}
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? "Fritando..." : "Conectar com Spotify"}
                  {!loading && <CornerDownLeft className="ml-2 h-4 w-4" />}
                </Button>
              )}

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>)}

        {loading && (
          <Card>
            <CardContent className="pt-6">
              <p className="text-lg font-medium text-center animate-pulse">
                Analisando seu gosto musical questionável...
              </p>
            </CardContent>
          </Card>
        )}

        {roast && (
          <Card className="border-green-600/30 bg-green-600/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <img
                  src="/lovable-uploads/1fd42be2-1964-4cfd-b29b-946c4b596ef3.png"
                  alt="Spotify Logo"
                  className="h-5 w-5"
                />
                Sua fritada está pronta
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-medium italic">{roast}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                É só uma brincadeira! Cada artista tem seu valor único. 💚
              </p>
              <Button 
                variant="outline" 
                onClick={handleReset}
                className="ml-4"
              >
                Fritar novamente
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SpotifyRoaster;

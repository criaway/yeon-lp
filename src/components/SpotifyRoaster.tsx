import React, { useState, useEffect, useRef } from "react";
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
const REDIRECT_URI =
  import.meta.env.VITE_FRONTEND_URL || "http://127.0.0.1:8080";
const CALLBACK_URI = `${REDIRECT_URI}/callback`;

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:3000";

interface SpotifyRoasterProps {
  onTabChange?: (tab: string) => void;
}

const SpotifyRoaster: React.FC<SpotifyRoasterProps> = ({ onTabChange }) => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [roast, setRoast] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const processedCodeRef = useRef<string | null>(null); // Ref to track the code that has been processed

  // Show roast from localStorage if present (e.g., after /callback redirect)
  useEffect(() => {
    const storedRoast = localStorage.getItem("spotify_roast");
    if (storedRoast) {
      setRoast(storedRoast);
      localStorage.removeItem("spotify_roast"); // Clear after displaying
      if (onTabChange) {
        onTabChange("spotify");
      }
    }
  }, [onTabChange]);

  const handleSpotifyLogin = () => {
    const scope = "user-read-private user-read-email user-top-read";
    const state = Math.random().toString(36).substring(7);

    // Store state in localStorage to verify on callback (optional with this flow, but good practice)
    localStorage.setItem("spotify_auth_state", state);

    const authUrl = new URL("https://accounts.spotify.com/authorize");
    authUrl.searchParams.append("client_id", SPOTIFY_CLIENT_ID || "");
    authUrl.searchParams.append("response_type", "code");
    // Spotify will redirect to this URI after authorization
    authUrl.searchParams.append("redirect_uri", CALLBACK_URI);
    authUrl.searchParams.append("scope", scope);
    authUrl.searchParams.append("state", state);
    authUrl.searchParams.append("show_dialog", "true");

    console.log("Starting Spotify auth with state:", state);
    console.log("Auth URL:", authUrl.toString());
    window.location.href = authUrl.toString();
  };

  // Modified getRoast to accept code instead of accessToken
  const getRoast = async (code: string) => {
    try {
      setLoading(true);
      setError(null);
      console.log(
        "Making roast request with code:",
        code?.substring(0, 10) + "...",
      );

      // Send the code to the backend's roast endpoint
      const response = await fetch(`${API_BASE_URL}/api/roast`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Send the code in the body
        body: JSON.stringify({ code, redirectUri: CALLBACK_URI }), // Pass redirectUri too
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Roast request failed:", errorData);
        throw new Error(errorData.error || "Failed to get roast");
      }

      const data = await response.json();
      console.log("Got roast response:", data);

      if (data.roast) {
        setRoast(data.roast);
        localStorage.setItem("spotify_roast", data.roast); // Store roast on success
        toast.success("Perfil foi fritado! 🔥");
        // Switch to the roast tab if the callback is provided
        if (onTabChange) {
          onTabChange("spotify");
        }
      } else if (data.error) {
        throw new Error(data.error);
      } else {
        throw new Error("No roast received in response.");
      }
    } catch (err) {
      console.error("Error roasting Spotify profile:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Ocorreu um erro ao fritar o perfil. Tente novamente.",
      );
      // Clear stored token/roast on error
      localStorage.removeItem("spotify_access_token");
      localStorage.removeItem("spotify_roast");
    } finally {
      setLoading(false);
    }
  };

  // Handle redirect from callback with code
  useEffect(() => {
    const code = searchParams.get("code");
    const errorParam = searchParams.get("error");

    // Clear code/error from URL after processing
    if (code || errorParam) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    if (errorParam) {
      const decodedError = decodeURIComponent(errorParam);
      console.error("Error from URL params:", decodedError);
      setError(decodedError);
      return;
    }

    // Only fetch if we have a new code, no roast yet, not already loading, and haven't processed this code
    if (code && !roast && !loading && processedCodeRef.current !== code) {
      console.log("Detected new code in URL, getting roast...");
      processedCodeRef.current = code; // Mark this code as processed
      getRoast(code); // Call getRoast with the code
    }
  }, [searchParams, roast, loading, getRoast]); // Depend on searchParams, roast, loading, and getRoast

  const handleReset = () => {
    setRoast(null);
    setError(null);
    localStorage.removeItem("spotify_auth_state"); // Optional to clear
    localStorage.removeItem("spotify_access_token");
    localStorage.removeItem("spotify_roast");
    // Clear processed code ref on reset to allow new login
    processedCodeRef.current = null;
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
          {!roast && (
            <p className="text-muted-foreground max-w-md">
              Conecte sua conta do Spotify e nossa IA vai fritar seu gosto
              musical sem dó.
            </p>
          )}
        </div>

        {!loading && !roast && (
          <Card>
            <CardHeader>
              <CardTitle>Conecte sua conta do Spotify</CardTitle>
              <CardDescription>
                Vamos analisar seu gosto musical e te dar uma fritada nada
                amigável.
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
          </Card>
        )}

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
                onClick={handleSpotifyLogin}
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

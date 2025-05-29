import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:3000";

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const errorParam = params.get("error");

    // Clear parameters from URL immediately
    window.history.replaceState({}, document.title, window.location.pathname);

    if (errorParam) {
      const decodedError = decodeURIComponent(errorParam);
      console.error("Error from URL params:", decodedError);
      // Navigate to tools page with the error
      navigate("/tools?error=" + encodeURIComponent(decodedError));
      return;
    }

    if (code) {
      console.log("Received code in callback:", code);
      // Navigate to tools page with the code
      navigate("/tools?code=" + code);
    } else {
      // Should not happen if Spotify redirects correctly, but handle anyway
      console.error("Callback page loaded without code or error.");
      navigate(
        "/tools?error=" +
          encodeURIComponent(
            "Ocorreu um erro inesperado durante a autenticação.",
          ),
      );
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-pulse text-lg">Processando autenticação...</div>
    </div>
  );
};

export default Callback;

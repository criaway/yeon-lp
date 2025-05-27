
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>Página não encontrada | Yeon Music</title>
        <meta name="description" content="A página que você está procurando não existe. Volte para a página inicial da Yeon Music." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-yeon-dark-bg">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-white">404</h1>
          <p className="text-xl text-gray-300 mb-4">Oops! Página não encontrada</p>
          <Link to="/" className="text-yeon-orange hover:text-yeon-dark-orange transition-colors underline">
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;

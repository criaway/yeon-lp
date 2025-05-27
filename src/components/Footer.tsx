import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Twitter, Facebook, Youtube, Mail } from "lucide-react";
import Logo from "@/components/Logo";
import { useLanguage } from "@/context/LanguageContext";

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0A0A0A] border-t border-white/10 pt-16 pb-8">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo e Sobre */}
          <div>
            <div className="mb-4">
              <Logo />
            </div>
            <p className="text-white/70 text-sm mb-4">
              Aceleradora de carreiras para artistas independentes.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/yeon.live"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://tiktok.com/@yeon.live"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>
              <a
                href="https://twitter.com/yeon.live"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
              >
                <Twitter size={18} />
              </a>
              {/* <a href="https://youtube.com/@yeon.live" target="_blank" rel="noopener noreferrer" 
                className="text-white/60 hover:text-white transition-colors">
                <Youtube size={18} />
              </a> */}
            </div>
          </div>

          {/* Links Úteis */}
          <div>
            <h3 className="text-white font-semibold mb-4">Links Úteis</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-white/70 hover:text-white transition-colors text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-white/70 hover:text-white transition-colors text-sm"
                >
                  Sobre Nós
                </Link>
              </li>
              {/* <li>
                <Link to="/tools" className="text-white/70 hover:text-white transition-colors text-sm">
                  Calculadora de Streaming
                </Link>
              </li> */}
              <li>
                <Link
                  to="/artists"
                  className="text-white/70 hover:text-white transition-colors text-sm"
                >
                  Artistas
                </Link>
              </li>
            </ul>
          </div>

          {/* Recursos */}
          {/* <div>
            <h3 className="text-white font-semibold mb-4">Recursos</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors text-sm">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors text-sm">
                  Guias e Tutoriais
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors text-sm">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors text-sm">
                  Suporte
                </a>
              </li>
            </ul>
          </div> */}

          {/* Contato */}
          <div>
            <h3 className="text-white font-semibold mb-4">Entre em Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <Mail size={16} className="text-yeon-orange mt-1" />
                <span className="text-white/70 text-sm">contato@yeon.live</span>
              </li>
              {/* <li className="text-white/70 text-sm">
                Brasil
              </li> */}
            </ul>
          </div>
        </div>

        {/* Direitos autorais e políticas */}
        <div className="pt-8 border-t border-white/10 text-center">
          <p className="text-white/50 text-xs">
            &copy; {year} Yeon Music. Todos os direitos reservados.
          </p>
          {/* <div className="flex justify-center space-x-4 mt-2 text-xs text-white/50">
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Política de Cookies</a>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;


import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';

const HeroSection: React.FC = () => {
  const {
    t
  } = useLanguage();
  
  const scrollToNextSection = () => {
    const nextSection = document.getElementById('value-proposition');
    if (nextSection) {
      nextSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  
  return <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden rounded-xl">
      {/* Background image with overlay */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 rounded-xl" style={{
      backgroundImage: "url('/lovable-uploads/81539f4f-c548-4030-92a8-20349de875ba.png')",
      backgroundPosition: '50% 30%'
    }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-yeon-dark-bg/80 to-yeon-dark-bg rounded-xl"></div>
      </div>
      
      {/* Content */}
      <div className="container relative z-10 px-4 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold mb-4 animate-fade-in tracking-tight">
          <span className="bg-gradient-to-r from-white to-white/90 bg-clip-text">Liberte seu </span>
          <span className="text-yeon-purple">potencial de artista</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-8 animate-fade-in">
          Gerencie sua carreira musical, maximize seus ganhos e conecte-se com seus fãs em uma plataforma completa pra botar ritmo na sua carreira.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-4 animate-fade-in">
          <Button size="lg" className="bg-yeon-purple hover:bg-yeon-dark-purple text-white font-medium px-8 py-6 text-lg" asChild>
            <RouterLink to="/waitlist">
              Comece Agora
            </RouterLink>
          </Button>
          
          <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg" onClick={scrollToNextSection}>
            Saiba Mais
          </Button>
        </div>
      </div>
      
      {/* Photo attribution - Reposicionada para o canto direito inferior */}
      <div className="absolute bottom-3 right-3 text-xs text-white/40 z-10 backdrop-blur-sm bg-black/30 px-2 py-1 rounded">
        Foto de <a href="https://unsplash.com/pt-br/@harryswales?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash" className="hover:text-white/60">Harry Swales</a> na <a href="https://unsplash.com/pt-br/fotografias/pessoa-negra-segurando-microfone-e-cantando-no-palco-0l0KjNoAfAk?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash" className="hover:text-white/60">Unsplash</a>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce cursor-pointer" onClick={scrollToNextSection}>
        <ChevronDown className="h-8 w-8 text-white/70" />
      </div>
    </section>;
};

export default HeroSection;

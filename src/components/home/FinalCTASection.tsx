
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const FinalCTASection: React.FC = () => {
  return (
    <section className="bg-yeon-dark-bg py-16 px-4 mt-16 rounded-lg">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-white">
          Liberte seu <span className="text-yeon-orange">potencial de artista</span>
        </h2>
        <p className="max-w-2xl mx-auto text-lg mb-8 text-gray-200">
          Gerencie sua carreira musical, distribua seu trabalho globalmente e maximize seus ganhos em uma única plataforma.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-yeon-orange hover:bg-yeon-dark-orange text-white px-8 py-6 text-lg" asChild>
            <Link to="/tools">
              Comece Agora
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg" asChild>
            <Link to="/about">
              Saiba Mais
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;

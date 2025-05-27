
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';

interface StatItemProps {
  value: string;
  label: string;
}

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  image: string;
}

const StatItem: React.FC<StatItemProps> = ({ value, label }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <span className="text-4xl md:text-5xl font-semibold text-yeon-orange mb-2">{value}</span>
      <span className="text-white/70">{label}</span>
    </div>
  );
};

const Testimonial: React.FC<TestimonialProps> = ({ quote, author, role, image }) => {
  return (
    <Card className="bg-yeon-card-bg border-white/5">
      <CardContent className="p-6 flex flex-col items-start">
        <p className="text-white/80 italic mb-4">"{quote}"</p>
        <div className="flex items-center gap-3 mt-4">
          <img 
            src={image} 
            alt={author}
            className="w-12 h-12 rounded-full object-cover" 
          />
          <div>
            <h4 className="font-semibold">{author}</h4>
            <p className="text-sm text-white/60">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const SocialProofSection: React.FC = () => {
  const { t } = useLanguage();
  
  const stats = [
    { value: "64", label: "Artistas Cadastrados" },
    { value: "27", label: "Cidades" },
    { value: "7", label: "Estados" }
  ];
  
  const testimonials = [
    {
      quote: "A Yeon Music transformou completamente minha carreira. Agora consigo gerir meus lançamentos e acompanhar meus ganhos de forma muito mais eficiente.",
      author: "Luísa Medeiros",
      role: "Artista Independente",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80"
    },
    {
      quote: "A ferramenta de cálculo de ganhos é incrivelmente precisa. Me ajudou a entender quais plataformas estão gerando mais receita para minha música.",
      author: "Rafael Costa",
      role: "Produtor Musical",
      image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80"
    },
    {
      quote: "O suporte ao artista e as ferramentas de marketing me ajudaram a alcançar novos públicos que eu nunca teria descoberto sozinho.",
      author: "Marina Silva",
      role: "Cantora e Compositora",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80"
    }
  ];
  
  const partners = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/1024px-Spotify_logo_without_text.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Apple_Music_icon.svg/2048px-Apple_Music_icon.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Youtube_Music_icon.svg/512px-Youtube_Music_icon.svg.png",
    "https://companieslogo.com/img/orig/DEEZR.PA-dbdcf2cf.png?t=1721547851",
    "https://images.icon-icons.com/2429/PNG/512/tidal_logo_icon_147227.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Amazon_Music_logo.svg/1200px-Amazon_Music_logo.svg.png"
  ];

  return (
    <section className="py-20 bg-yeon-dark-bg">
      <div className="container px-4">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              value={stat.value}
              label={stat.label}
            />
          ))}
        </div>
        
        {/* Testimonials */}
        {/* <h2 className="text-3xl font-semibold text-center mb-12">O Que Nossos Artistas Dizem</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              {...testimonial}
            />
          ))}
        </div> */}
        
        {/* Partners */}
        {/* <div className="mt-20">
          <h3 className="text-lg text-center text-white/50 mb-8">Integrações com as Principais Plataformas</h3>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {partners.map((logo, index) => (
              <img 
                key={index} 
                src={logo} 
                alt="Partner logo" 
                className="h-10 opacity-70 hover:opacity-100 transition-opacity" 
              />
            ))}
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default SocialProofSection;

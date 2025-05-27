
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PageLayout from '@/components/PageLayout';
import HeroSection from '@/components/home/HeroSection';
import ValuePropositionSection from '@/components/home/ValuePropositionSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import SocialProofSection from '@/components/home/SocialProofSection';
import FAQSection from '@/components/home/FAQSection';
import FinalCTASection from '@/components/home/FinalCTASection';
import { useLanguage } from '@/context/LanguageContext';

const IndexContent: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <main>
      <HeroSection />
      <ValuePropositionSection />
      <FeaturesSection />
      <SocialProofSection />
      <FAQSection />
      <FinalCTASection />
    </main>
  );
};

const Index: React.FC = () => {
    useEffect(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }, []);
    
  return (
    <>
      <Helmet>
        <title>Yeon Music - Nova Experiência Musical</title>
        <meta name="description" content="Yeon Music está trazendo uma nova experiência musical. Calcule seus ganhos de streaming e maximize sua receita como artista." />
        <link rel="canonical" href="https://yeon-music.com/" />
      </Helmet>
      <PageLayout>
        <IndexContent />
      </PageLayout>
    </>
  );
};

export default Index;


import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ArtistFeatures from './ArtistFeatures';
import FanFeatures from './FanFeatures';

const FeaturesSection: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-24 bg-yeon-dark-bg">
      <div className="container px-4">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-6">
         Tudo que você precisa pra botar pra F#
        </h2>
        <p className="text-white/70 text-center mb-16 max-w-2xl mx-auto">
          Desenvolvemos um arsenal de ferramentas fodas, pensadas especificamente para as necessidades do artista que busca crescimento e autonomia.
        </p>
        
        <Tabs defaultValue="artists" className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="bg-secondary/30 p-1 rounded-full">
              <TabsTrigger 
                value="artists" 
                className="rounded-full px-6 py-2 data-[state=active]:bg-yeon-purple data-[state=active]:text-white"
              >
                Para Artistas
              </TabsTrigger>
              <TabsTrigger 
                value="fans" 
                className="rounded-full px-6 py-2 data-[state=active]:bg-yeon-purple data-[state=active]:text-white"
              >
                Para Fãs e Contratantes
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="artists" className="mt-0">
            <ArtistFeatures />
          </TabsContent>
          
          <TabsContent value="fans" className="mt-0">
            <FanFeatures />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default FeaturesSection;

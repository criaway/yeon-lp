import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageLayout from "@/components/PageLayout";
import StreamingCalculator from "@/components/StreamingCalculator";
import ContractsSection from "@/components/ContractsSection";
import SpotifyRoaster from "@/components/SpotifyRoaster";
import { useLanguage } from "@/context/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLocation, useNavigate } from "react-router-dom";

const MusicTools: React.FC = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const code = searchParams.get("code");
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState<string>("calculator");

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    if (code) {
      setActiveTab("spotify");
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Ferramentas para Músicos | Yeon Music</title>
        <meta
          name="description"
          content="Ferramentas essenciais para artistas independentes: calculadora de royalties, modelos de contratos profissionais e mais."
        />
        <link rel="canonical" href="https://yeon-music.com/tools" />
        <meta
          name="keywords"
          content="ferramentas musicais, calculadora royalties, contratos musicais, artista independente, spotify analyzer"
        />
      </Helmet>
      <PageLayout>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-medium mb-3">
              Ferramentas para Músicos
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Recursos essenciais para artistas independentes gerenciarem suas
              carreiras musicais
            </p>
          </div>

          <Tabs
            defaultValue="calculator"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="flex justify-center mb-6">
              <TabsList
                className={`${isMobile ? "flex flex-wrap gap-2" : "grid grid-cols-1"} w-full max-w-md`}
              >
                <TabsTrigger
                  value="calculator"
                  className={`${isMobile ? "flex-1 min-w-[120px]" : ""}`}
                >
                  Calculadora de Royalties
                </TabsTrigger>
                {/* <TabsTrigger value="contracts" className={`${isMobile ? 'flex-1 min-w-[120px]' : ''}`}>
                  Modelos de Contratos
                </TabsTrigger> */}
                {/* <TabsTrigger
                  value="spotify"
                  className={`${isMobile ? "flex-1 min-w-[120px]" : ""}`}
                >
                  Frite meu Spotify
                </TabsTrigger> */}
              </TabsList>
            </div>

            <TabsContent value="calculator" className="mt-4">
              <StreamingCalculator />
            </TabsContent>

            {/* <TabsContent value="contracts" className="mt-4">
              <ContractsSection />
            </TabsContent> */}

            <TabsContent value="spotify" className="mt-4">
              <SpotifyRoaster onTabChange={setActiveTab} />
            </TabsContent>
          </Tabs>
        </div>
      </PageLayout>
    </>
  );
};

export default MusicTools;

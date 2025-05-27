import React from "react";
import FeatureItem, { FeatureItemProps } from "./FeatureItem";

const FanFeatures: React.FC = () => {
  const fanFeatures: Omit<FeatureItemProps, "size">[] = [
    {
      title: "Perfil Completo de Artistas",
      description:
        "Acesse informações detalhadas sobre seus artistas favoritos, incluindo biografia, discografia, próximos eventos e conteúdo exclusivo.",
    },
    {
      title: "Busca Inteligente",
      description:
        "Encontre o artista perfeito para seu evento com nossa ferramenta de busca avançada, filtrando por gênero, localização e disponibilidade.",
    },
    {
      title: "Financiamento Coletivo e Comunidade",
      description:
        "Apoie seus artistas favoritos através de financiamento coletivo e participe de uma comunidade vibrante de amantes da música.",
    },
    {
      title: "Marketplace Musical",
      description:
        "Adquira música, mercadorias e experiências exclusivas diretamente dos artistas que você ama, apoiando-os de forma direta.",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {fanFeatures.map((feature, index) => (
        <FeatureItem key={index} {...feature} size={"small"} />
      ))}
    </div>
  );
};

export default FanFeatures;

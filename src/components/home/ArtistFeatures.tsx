import React from "react";
import FeatureItem, { FeatureItemProps } from "./FeatureItem";

const ArtistFeatures: React.FC = () => {
  const artistFeatures: (Omit<FeatureItemProps, "size"> & { tag?: string })[] =
    [
      {
        title: "Ferramentas de Financiamento Coletivo",
        description:
          "Arrecade fundos para seus projetos musicais diretamente de seus fãs, oferecendo recompensas exclusivas e mantendo o controle criativo sobre sua música.",
      },
      {
        title: "Dashboard Inteligente",
        description:
          "Acompanhe o desempenho da sua música com estatísticas detalhadas, insights sobre seu público e tendências de crescimento em tempo real.",
      },
      {
        title: "Calculadora de Royalties",
        description:
          "Compare seus ganhos potenciais em todas as plataformas de streaming e descubra onde sua música gera mais receita.",
      },
      {
        title: "Planejador de lançamentos",
        description:
          "Organize seus lançamentos musicais com nossa ferramenta de planejamento assistida por IA, otimizando datas e estratégias para máximo impacto.",
        tag: "com IA",
      },
      {
        title: "Ferramentas de Marketing",
        description:
          "Promova sua música com ferramentas de marketing integradas para redes sociais e plataformas digitais de forma estratégica e eficiente.",
      },
      {
        title: "Gestão de Catálogo e Marketplace",
        description:
          "Gerencie seu catálogo musical com facilidade e venda diretamente aos seus fãs através do nosso marketplace integrado.",
      },
      {
        title: "Pitching para Playlists",
        description:
          "Aumente a visibilidade da sua música com ferramentas para submissão direta para curadores de playlists e oportunidades de exposição.",
      },
      {
        title: "Contratos e Splits",
        description:
          "Gerencie contratos, colaborações e divisões de royalties sem complicações, garantindo transparência e precisão nos pagamentos.",
      },
    ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {artistFeatures.map((feature, index) => (
        <FeatureItem
          key={index}
          {...feature}
          size={index === 0 || index === 3 || index > 5 ? "large" : "small"}
        />
      ))}
    </div>
  );
};

export default ArtistFeatures;

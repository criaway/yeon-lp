import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Upload, BarChart, CreditCard } from "lucide-react";

interface StepItemProps {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const StepItem: React.FC<StepItemProps> = ({
  number,
  title,
  description,
  icon,
}) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-16 h-16 rounded-full bg-yeon-orange/20 flex items-center justify-center mb-4 relative">
        {icon}
        <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-yeon-orange text-white text-sm flex items-center justify-center font-semibold">
          {number}
        </span>
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-white/70">{description}</p>
    </div>
  );
};

const HowItWorksSection: React.FC = () => {
  const { t } = useLanguage();

  const steps = [
    {
      number: 1,
      title: "Faça o Upload da Sua Música",
      description:
        "Envie suas faixas em alta qualidade diretamente pela nossa plataforma.",
      icon: <Upload className="h-6 w-6 text-yeon-orange" />,
    },
    {
      number: 2,
      title: "Acompanhe Seu Desempenho",
      description:
        "Monitore streams, receitas e crescimento de público em tempo real.",
      icon: <BarChart className="h-6 w-6 text-yeon-orange" />,
    },
    {
      number: 3,
      title: "Receba Seus Ganhos",
      description:
        "Pagamentos regulares e transparentes diretamente na sua conta bancária.",
      icon: <CreditCard className="h-6 w-6 text-yeon-orange" />,
    },
  ];

  return (
    <section className="py-20 bg-yeon-darker-bg">
      <div className="container px-4">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-6">
          Como Funciona
        </h2>
        <p className="text-white/70 text-center max-w-2xl mx-auto mb-16">
          Três passos simples para começar a distribuir sua música e acompanhar
          seus resultados
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <StepItem
                number={step.number}
                title={step.title}
                description={step.description}
                icon={step.icon}
              />
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute h-0.5 bg-gradient-to-r from-yeon-orange to-transparent top-8 left-[calc(16.67%+8rem)] right-[calc(16.67%+8rem)]" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface PlanFeature {
  included: boolean;
  text: string;
}

interface PricingPlan {
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  description: string;
  features: PlanFeature[];
  ctaText: string;
  popular?: boolean;
}

const PricingSection: React.FC = () => {
  const { t } = useLanguage();
  const [billingAnnually, setBillingAnnually] = useState(true);

  const plans: PricingPlan[] = [
    {
      name: "Básico",
      monthlyPrice: 9.99,
      annualPrice: 7.99,
      description: "Perfeito para artistas no início da carreira",
      features: [
        { included: true, text: "Distribuição para 30+ plataformas" },
        { included: true, text: "1 lançamento por mês" },
        { included: true, text: "Estatísticas básicas" },
        { included: true, text: "Pagamentos trimestrais" },
        { included: false, text: "Agendamento de lançamentos" },
        { included: false, text: "Suporte prioritário" },
      ],
      ctaText: "Comece Grátis",
    },
    {
      name: "Profissional",
      monthlyPrice: 19.99,
      annualPrice: 14.99,
      description: "Para artistas que buscam crescimento",
      features: [
        { included: true, text: "Distribuição para 50+ plataformas" },
        { included: true, text: "Lançamentos ilimitados" },
        { included: true, text: "Estatísticas avançadas" },
        { included: true, text: "Pagamentos mensais" },
        { included: true, text: "Agendamento de lançamentos" },
        { included: true, text: "Suporte prioritário" },
      ],
      ctaText: "Escolher Plano",
      popular: true,
    },
    {
      name: "Etiqueta",
      monthlyPrice: 39.99,
      annualPrice: 29.99,
      description: "Para selos e artistas estabelecidos",
      features: [
        { included: true, text: "Distribuição para todas as plataformas" },
        { included: true, text: "Lançamentos ilimitados" },
        { included: true, text: "Estatísticas avançadas + API" },
        { included: true, text: "Pagamentos semanais" },
        { included: true, text: "Agendamento avançado" },
        { included: true, text: "Suporte VIP 24/7" },
      ],
      ctaText: "Contato Personalizado",
    },
  ];

  return (
    <section className="py-20 bg-yeon-dark-bg">
      <div className="container px-4">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-6">
          Planos que Crescem com Você
        </h2>
        <p className="text-white/70 text-center max-w-2xl mx-auto mb-10">
          Escolha o plano ideal para o seu momento atual. Mude a qualquer
          momento conforme sua carreira evolui.
        </p>

        {/* Billing toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span
            className={`text-sm ${!billingAnnually ? "text-white" : "text-white/60"}`}
          >
            Mensal
          </span>
          <Switch
            checked={billingAnnually}
            onCheckedChange={setBillingAnnually}
          />
          <span
            className={`text-sm flex items-center gap-2 ${billingAnnually ? "text-white" : "text-white/60"}`}
          >
            Anual
            <span className="bg-yeon-orange/20 text-yeon-orange text-xs px-2 py-0.5 rounded-full">
              Economize 20%
            </span>
          </span>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`bg-yeon-card-bg border-white/5 relative ${plan.popular ? "md:scale-105 shadow-lg shadow-yeon-orange/5 border-yeon-orange/20 z-10" : ""}`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yeon-orange text-white px-4 py-1 rounded-full text-sm font-medium">
                  Mais Popular
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-center">
                  {plan.name}
                </CardTitle>
                <div className="text-center mt-4">
                  <div className="flex items-center justify-center">
                    <span className="text-3xl font-semibold">
                      R${" "}
                      {billingAnnually ? plan.annualPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-white/60 ml-1">/mês</span>
                  </div>
                  <p className="text-sm text-white/60 mt-2 mb-4">
                    {billingAnnually
                      ? "Cobrado anualmente"
                      : "Cobrado mensalmente"}
                  </p>
                  <p className="text-sm text-white/80">{plan.description}</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div
                      className={`rounded-full p-1 ${feature.included ? "text-yeon-orange bg-yeon-orange/10" : "text-white/30 bg-white/5"}`}
                    >
                      <Check className="h-4 w-4" />
                    </div>
                    <span
                      className={
                        feature.included ? "text-white/80" : "text-white/40"
                      }
                    >
                      {feature.text}
                    </span>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button
                  className={`w-full py-6 ${plan.popular ? "bg-yeon-orange hover:bg-yeon-dark-orange" : "bg-white/10 hover:bg-white/20"}`}
                >
                  {plan.ctaText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;

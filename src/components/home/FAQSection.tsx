import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
interface FAQItem {
  question: string;
  answer: string;
}
const FAQSection: React.FC = () => {
  const {
    t
  } = useLanguage();
  const faqs: FAQItem[] = [{
    question: "Quanto tempo leva para minha música estar disponível nas plataformas?",
    answer: "Geralmente, sua música estará disponível em todas as plataformas em 1-3 dias úteis após a aprovação. Para lançamentos importantes, recomendamos agendar com pelo menos 2 semanas de antecedência."
  }, {
    question: "Como são calculados os meus ganhos?",
    answer: "Seus ganhos são calculados com base nas taxas de streaming de cada plataforma multiplicadas pelo número de reproduções. Cada plataforma tem suas próprias taxas, que você pode conferir em detalhes na nossa Calculadora de Streams."
  }, {
    question: "Posso mudar de plano a qualquer momento?",
    answer: "Sim! Você pode atualizar seu plano a qualquer momento. Se optar por um downgrade, a mudança será aplicada no próximo ciclo de cobrança."
  }, {
    question: "Qual é a frequência de pagamento dos royalties?",
    answer: "A frequência de pagamento depende do seu plano: trimestral para o plano Básico, mensal para o plano Profissional e semanal para o plano Etiqueta."
  }, {
    question: "A Yeon Music cobra alguma porcentagem dos meus ganhos?",
    answer: "Não! Diferentemente de muitos distribuidores, cobramos apenas a assinatura fixa do plano. 100% dos seus royalties vão diretamente para você."
  }];
  return <section className="py-20 bg-yeon-darker-bg rounded-md">
      <div className="container px-4">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-6">
          Perguntas Frequentes
        </h2>
        <p className="text-white/70 text-center max-w-2xl mx-auto mb-12">
          Encontre respostas para as dúvidas mais comuns sobre nossos serviços
        </p>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => <AccordionItem key={index} value={`item-${index}`} className="border-white/10">
                <AccordionTrigger className="text-lg font-medium hover:text-yeon-orange">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-white/70">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>)}
          </Accordion>
        </div>
        
        {/* <div className="flex justify-center mt-10">
          <Button asChild variant="outline" className="border-yeon-orange/50 text-yeon-orange hover:bg-yeon-orange/10">
            <Link to="/about">Conheça Nossa Documentação Completa</Link>
          </Button>
        </div> */}
      </div>
    </section>;
};
export default FAQSection;
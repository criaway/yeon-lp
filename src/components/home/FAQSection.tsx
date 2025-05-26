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
    question: "O que é a Yeon, afinal?",
    answer: "A Yeon é uma plataforma que acelera a carreira de artistas independentes. Aqui você organiza sua vida musical, conecta com o mercado e monetiza sua arte de forma direta, clara e estratégica."
  }, {
    question: "A Yeon é uma distribuidora digital?",
    answer: "Ainda não — mas em breve, sim. No momento, somos uma central de gestão, monetização e conexão com oportunidades reais. A distribuição vem aí como parte do nosso plano de expansão."
  }, {
    question: "O que dá pra fazer na plataforma?",
    answer: "Você pode gerenciar seus lançamentos, contratos e finanças, criar campanhas de financiamento coletivo, vender direto aos fãs, encontrar oportunidades de GIGs e apresentar sua música para curadores. Tudo em um só lugar."
  }, {
    question: "Quem pode usar a Yeon?",
    answer: "Qualquer artista independente que esteja levando sua carreira a sério. Seja você solo, banda, produtora ou selo, se quer profissionalizar seu corre, a Yeon é pra você."
  }, {
    question: "A Yeon cobra alguma coisa?",
    answer: "Algumas funcionalidades são gratuitas, outras fazem parte de planos pagos ou cobram uma taxa justa sobre o que você monetiza. Nada escondido, tudo transparente — do jeito que artista merece."
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
                <AccordionTrigger className="text-lg font-medium hover:text-yeon-purple">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-white/70">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>)}
          </Accordion>
        </div>
        
        <div className="flex justify-center mt-10">
          <Button asChild variant="outline" className="border-yeon-purple/50 text-yeon-purple hover:bg-yeon-purple/10">
            <Link to="/about">Conheça Nossa Documentação Completa</Link>
          </Button>
        </div>
      </div>
    </section>;
};
export default FAQSection;

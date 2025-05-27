import React, { useState } from "react";
import { Download, File, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface ContractModel {
  id: string;
  title: string;
  description: string;
  category: string;
  fileUrl: string;
  fileType: string;
  updatedAt: string;
  downloadCount?: number;
}

const contractModels: ContractModel[] = [
  {
    id: "1",
    title: "Contrato de Produção Musical",
    description:
      "Modelo padrão de contrato para produção musical entre artista e produtor, incluindo direitos, royalties e prazos.",
    category: "produção",
    fileUrl: "/contracts/contrato-producao-musical.pdf",
    fileType: "PDF",
    updatedAt: "2023-03-15",
    downloadCount: 324,
  },
  {
    id: "2",
    title: "Contrato de Beatmaking",
    description:
      "Modelo de contrato para venda ou licenciamento de beats, incluindo direitos de uso comercial e não-comercial.",
    category: "beatmaking",
    fileUrl: "/contracts/contrato-beatmaking.pdf",
    fileType: "PDF",
    updatedAt: "2023-02-28",
    downloadCount: 456,
  },
  {
    id: "3",
    title: "Contrato de Show ao Vivo",
    description:
      "Modelo de contrato para apresentação musical ao vivo, incluindo cachê, rider técnico e obrigações das partes.",
    category: "live",
    fileUrl: "/contracts/contrato-show-ao-vivo.pdf",
    fileType: "PDF",
    updatedAt: "2023-04-10",
    downloadCount: 210,
  },
  {
    id: "4",
    title: "Contrato de Distribuição Digital",
    description:
      "Modelo de contrato para distribuição de música em plataformas digitais, incluindo termos e divisão de receitas.",
    category: "distribuição",
    fileUrl: "/contracts/contrato-distribuicao-digital.pdf",
    fileType: "PDF",
    updatedAt: "2023-05-20",
    downloadCount: 178,
  },
  {
    id: "5",
    title: "Contrato de Cessão de Direitos Autorais",
    description:
      "Modelo de contrato para cessão total ou parcial de direitos autorais sobre obra musical.",
    category: "direitos",
    fileUrl: "/contracts/contrato-cessao-direitos.pdf",
    fileType: "PDF",
    updatedAt: "2023-01-15",
    downloadCount: 387,
  },
  {
    id: "6",
    title: "Contrato de Gravação em Estúdio",
    description:
      "Modelo de contrato para serviços de gravação em estúdio, incluindo uso das instalações e equipamentos.",
    category: "estúdio",
    fileUrl: "/contracts/contrato-gravacao-estudio.pdf",
    fileType: "PDF",
    updatedAt: "2023-06-05",
    downloadCount: 142,
  },
  {
    id: "7",
    title: "Termo de Licenciamento para Sampling",
    description:
      "Modelo de termo para licenciamento legal de samples musicais, incluindo escopo de uso e compensação.",
    category: "sampling",
    fileUrl: "/contracts/termo-licenciamento-sampling.pdf",
    fileType: "PDF",
    updatedAt: "2023-07-12",
    downloadCount: 203,
  },
];

const ContractsSection: React.FC = () => {
  const { toast } = useToast();
  const [filter, setFilter] = useState<string>("all");

  const filteredContracts =
    filter === "all"
      ? contractModels
      : contractModels.filter((contract) => contract.category === filter);

  const categories = [
    { id: "all", name: "Todos" },
    { id: "produção", name: "Produção Musical" },
    { id: "beatmaking", name: "Beatmaking" },
    { id: "live", name: "Shows ao Vivo" },
    { id: "distribuição", name: "Distribuição Digital" },
    { id: "direitos", name: "Direitos Autorais" },
    { id: "estúdio", name: "Estúdio" },
    { id: "sampling", name: "Sampling" },
  ];

  const handleDownload = (contract: ContractModel) => {
    // In a real scenario, we would track downloads
    toast({
      title: "Download iniciado",
      description: `O contrato "${contract.title}" está sendo baixado.`,
    });

    // Simulate a download
    setTimeout(() => {
      toast({
        title: "Download concluído",
        description: `O contrato "${contract.title}" foi baixado com sucesso.`,
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <p className="text-lg text-gray-300">
          Modelos de contratos revisados por Gustavo Deppe, especialista em
          direitos musicais. Estes documentos ajudam artistas e produtores a
          estabelecer relações profissionais claras e proteger seus direitos.
        </p>

        <div className="bg-secondary/50 p-4 rounded-lg border border-white/10">
          <p className="text-sm text-gray-300">
            <strong className="text-white">Nota importante:</strong> Estes são
            apenas modelos genéricos que devem ser adaptados à sua situação
            específica. Recomendamos sempre consultar um advogado especializado
            antes de assinar qualquer documento legal.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 pb-4">
        {categories.map((category) => (
          <Badge
            key={category.id}
            variant={filter === category.id ? "default" : "secondary"}
            className="cursor-pointer px-3 py-1"
            onClick={() => setFilter(category.id)}
          >
            {category.name}
          </Badge>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContracts.map((contract) => (
          <Card
            key={contract.id}
            className="bg-secondary/50 border border-white/10 hover:border-white/20 transition-all"
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{contract.title}</CardTitle>
                <Badge variant="outline">{contract.fileType}</Badge>
              </div>
              <CardDescription className="text-gray-300 mt-2">
                {contract.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-400">
                <p>Última atualização: {contract.updatedAt}</p>
                {contract.downloadCount && (
                  <p>{contract.downloadCount} downloads</p>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => handleDownload(contract)}
                className="w-full"
              >
                <Download className="mr-2 h-4 w-4" />
                Baixar Contrato
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-8 bg-yeon-orange/10 p-6 rounded-lg border border-yeon-orange/30">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-2/3">
            <h2 className="text-2xl font-semibold mb-4">Curso KSM Musical</h2>
            <p className="text-gray-300 mb-4">
              Aprenda a sobreviver na indústria musical com o curso KSM Musical,
              criado pelo especialista em direitos musicais Gustavo Deppe.
            </p>
            <p className="text-gray-300">
              O curso oferece conhecimentos essenciais para artistas e
              profissionais da música navegarem com sucesso no mercado musical
              atual.
            </p>
            <Button
              className="mt-4 bg-yeon-orange hover:bg-yeon-dark-orange"
              variant="default"
              onClick={() =>
                window.open("https://www.ksmmusical.com/", "_blank")
              }
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Conheça o KSM Musical
            </Button>
          </div>
          <div className="md:w-1/3 flex items-center justify-center">
            <div className="bg-gradient-to-br from-yeon-orange/30 to-transparent p-6 rounded-full">
              <File className="h-16 w-16 text-yeon-orange" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractsSection;

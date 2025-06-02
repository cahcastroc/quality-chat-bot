
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { TestTube, Bug, Target, Zap, Shield, BarChart } from "lucide-react";

interface PromptSuggestionsProps {
  onSelectPrompt: (prompt: string) => void;
}

const PromptSuggestions = ({ onSelectPrompt }: PromptSuggestionsProps) => {
  const suggestions = [
    {
      icon: TestTube,
      title: "Estratégias de Teste",
      prompt: "Quais são as melhores estratégias para implementar testes automatizados em um projeto existente?"
    },
    {
      icon: Bug,
      title: "Debugging & QA",
      prompt: "Como identificar e corrigir bugs de forma mais eficiente durante o processo de QA?"
    },
    {
      icon: Target,
      title: "Casos de Teste",
      prompt: "Como criar casos de teste efetivos que cubram cenários críticos e de borda?"
    },
    {
      icon: Zap,
      title: "Performance Testing",
      prompt: "Quais ferramentas e técnicas você recomenda para testes de performance?"
    },
    {
      icon: Shield,
      title: "Testes de Segurança",
      prompt: "Como implementar testes de segurança no pipeline de desenvolvimento?"
    },
    {
      icon: BarChart,
      title: "Métricas de Qualidade",
      prompt: "Quais métricas são mais importantes para medir a qualidade do software?"
    }
  ];

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-green-700 mb-4 text-center">
        Sugestões para começar
      </h3>
      <Carousel className="w-full max-w-4xl mx-auto">
        <CarouselContent className="-ml-2 md:-ml-4">
          {suggestions.map((suggestion, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
              <Card 
                className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 h-full border-green-200 hover:border-green-300"
                onClick={() => onSelectPrompt(suggestion.prompt)}
              >
                <CardContent className="p-4 h-full flex flex-col">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <suggestion.icon className="w-5 h-5 text-green-600" />
                    </div>
                    <h4 className="font-medium text-green-800 text-sm">
                      {suggestion.title}
                    </h4>
                  </div>
                  <p className="text-xs text-green-600 leading-relaxed flex-1">
                    {suggestion.prompt}
                  </p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </div>
  );
};

export default PromptSuggestions;

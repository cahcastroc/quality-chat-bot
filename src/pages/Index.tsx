
import { useState } from "react";
import Header from "../components/Header";
import ChatMessage from "../components/ChatMessage";
import ChatInput from "../components/ChatInput";

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Olá! Sou seu assistente especializado em qualidade de testes de software. Como posso ajudá-lo hoje? Posso auxiliar com estratégias de teste, automação, casos de teste, ou qualquer outra questão relacionada à qualidade de software.",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simular resposta da IA após 1-2 segundos
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateBotResponse(content),
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 1000 + Math.random() * 1000);
  };

  const generateBotResponse = (userMessage: string): string => {
    const responses = [
      "Excelente pergunta sobre qualidade de testes! Para resolver isso, recomendo começar com uma análise dos requisitos e criar casos de teste que cubram os cenários principais e de borda.",
      "Em relação aos testes automatizados, sugiro implementar uma pirâmide de testes bem estruturada: muitos testes unitários, alguns testes de integração e poucos testes end-to-end.",
      "Para melhorar a cobertura de testes, é importante identificar as funcionalidades críticas do sistema e priorizar os testes baseados no risco e impacto no negócio.",
      "Quando falamos de estratégias de teste, devemos considerar diferentes tipos: funcionais, não-funcionais, de segurança, performance e usabilidade.",
      "A implementação de CI/CD com testes automatizados é fundamental para manter a qualidade do software. Recomendo integrar os testes no pipeline de desenvolvimento."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header />
      
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 min-h-[calc(100vh-12rem)] flex flex-col">
          
          {/* Messages Area */}
          <div className="flex-1 p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-20rem)]">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            
            {isLoading && (
              <div className="flex items-center space-x-2 text-slate-500">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
                <span className="text-sm">Assistente está digitando...</span>
              </div>
            )}
          </div>
          
          {/* Input Area */}
          <div className="border-t border-slate-200 p-6">
            <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
          </div>
          
        </div>
      </main>
    </div>
  );
};

export default Index;

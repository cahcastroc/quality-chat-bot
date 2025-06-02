import { useState } from "react";
import Header from "../components/Header";
import ChatMessage from "../components/ChatMessage";
import ChatInput from "../components/ChatInput";
import ChatSidebar from "../components/ChatSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import PromptSuggestions from "../components/PromptSuggestions";

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatHistory {
  id: string;
  title: string;
  lastMessage: string;
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
  const [currentChatId, setCurrentChatId] = useState("1");
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([
    {
      id: "1",
      title: "Chat sobre Qualidade de Testes",
      lastMessage: "Olá! Sou seu assistente especializado...",
      timestamp: new Date(),
    },
  ]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Atualizar histórico do chat atual
    setChatHistory(prev => prev.map(chat => 
      chat.id === currentChatId 
        ? { ...chat, lastMessage: content, timestamp: new Date() }
        : chat
    ));

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

  const handleNewChat = () => {
    const newChatId = Date.now().toString();
    const newChat: ChatHistory = {
      id: newChatId,
      title: `Novo Chat ${chatHistory.length + 1}`,
      lastMessage: "Novo chat iniciado",
      timestamp: new Date(),
    };
    
    setChatHistory(prev => [newChat, ...prev]);
    setCurrentChatId(newChatId);
    setMessages([
      {
        id: "1",
        content: "Olá! Sou seu assistente especializado em qualidade de testes de software. Como posso ajudá-lo hoje?",
        isBot: true,
        timestamp: new Date(),
      },
    ]);
  };

  const handleSelectChat = (chatId: string) => {
    setCurrentChatId(chatId);
    // Em uma aplicação real, você carregaria as mensagens deste chat específico
    setMessages([
      {
        id: "1",
        content: "Olá! Sou seu assistente especializado em qualidade de testes de software. Como posso ajudá-lo hoje?",
        isBot: true,
        timestamp: new Date(),
      },
    ]);
  };

  const handleDeleteChat = (chatId: string) => {
    setChatHistory(prev => prev.filter(chat => chat.id !== chatId));
    if (chatId === currentChatId && chatHistory.length > 1) {
      const remainingChats = chatHistory.filter(chat => chat.id !== chatId);
      if (remainingChats.length > 0) {
        setCurrentChatId(remainingChats[0].id);
      }
    }
  };

  const handlePromptSelection = (prompt: string) => {
    handleSendMessage(prompt);
  };

  // Verifica se há mensagens do usuário (não apenas do bot)
  const hasUserMessages = messages.some(message => !message.isBot);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <ChatSidebar
          chatHistory={chatHistory}
          currentChatId={currentChatId}
          onSelectChat={handleSelectChat}
          onNewChat={handleNewChat}
          onDeleteChat={handleDeleteChat}
        />
        
        <div className="flex-1 flex flex-col">
          <Header />
          
          <main className="flex-1 container mx-auto px-4 py-6 max-w-4xl">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 min-h-[calc(100vh-12rem)] flex flex-col">
              
              <div className="flex items-center p-4 border-b border-slate-200">
                <SidebarTrigger className="mr-3" />
                <h2 className="text-lg font-semibold text-slate-800">
                  {chatHistory.find(chat => chat.id === currentChatId)?.title || "Chat"}
                </h2>
              </div>
              
              {/* Messages Area */}
              <div className="flex-1 p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-20rem)]">
                {!hasUserMessages && (
                  <PromptSuggestions onSelectPrompt={handlePromptSelection} />
                )}
                
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
      </div>
    </SidebarProvider>
  );
};

export default Index;

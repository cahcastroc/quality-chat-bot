
import { MessageCircle, Bot } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-white/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Bot className="w-8 h-8 text-blue-600" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">QA Assistant</h1>
              <p className="text-sm text-slate-600">Especialista em Qualidade de Testes</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-slate-600">
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm font-medium">Online</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

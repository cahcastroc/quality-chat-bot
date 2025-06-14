
import { Bot, User } from "lucide-react";

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const { content, isBot, timestamp } = message;

  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} animate-fade-in`}>
      <div className={`flex items-start space-x-3 max-w-[80%] ${isBot ? 'flex-row' : 'flex-row-reverse space-x-reverse'}`}>
        
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isBot ? 'bg-green-100 text-green-600' : 'bg-emerald-100 text-emerald-600'
        }`}>
          {isBot ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
        </div>
        
        {/* Message Content */}
        <div className={`rounded-2xl px-4 py-3 ${
          isBot 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
        }`}>
          <p className="text-sm leading-relaxed">{content}</p>
          <div className={`text-xs mt-2 ${
            isBot ? 'text-green-500' : 'text-green-100'
          }`}>
            {timestamp.toLocaleTimeString('pt-BR', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default ChatMessage;

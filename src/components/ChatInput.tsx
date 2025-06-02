
import { useState } from "react";
import { Send, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const ChatInput = ({ onSendMessage, disabled = false }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-end space-x-3">
      
      {/* Input Field */}
      <div className="flex-1 relative">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Digite sua pergunta sobre qualidade de testes..."
          disabled={disabled}
          rows={1}
          className="w-full px-4 py-3 pr-12 border border-green-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ minHeight: '48px', maxHeight: '120px' }}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = '48px';
            target.style.height = target.scrollHeight + 'px';
          }}
        />
        
        {/* Attach Button */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-2 bottom-2 p-2 h-8 w-8 text-green-400 hover:text-green-600"
        >
          <Paperclip className="w-4 h-4" />
        </Button>
      </div>
      
      {/* Send Button */}
      <Button
        type="submit"
        disabled={!message.trim() || disabled}
        className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
      >
        <Send className="w-5 h-5" />
      </Button>
      
    </form>
  );
};

export default ChatInput;

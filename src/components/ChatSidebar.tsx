
import { MessageCircle, Plus, Trash2 } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatHistory {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
}

interface ChatSidebarProps {
  chatHistory: ChatHistory[];
  currentChatId: string;
  onSelectChat: (chatId: string) => void;
  onNewChat: () => void;
  onDeleteChat: (chatId: string) => void;
}

const ChatSidebar = ({ 
  chatHistory, 
  currentChatId, 
  onSelectChat, 
  onNewChat, 
  onDeleteChat 
}: ChatSidebarProps) => {
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Button 
          onClick={onNewChat}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo Chat
        </Button>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup className="h-full">
          <SidebarGroupLabel>Histórico de Conversas</SidebarGroupLabel>
          <SidebarGroupContent className="flex-1">
            <ScrollArea className="h-full">
              <SidebarMenu className="space-y-1 pr-2">
                {chatHistory.map((chat) => (
                  <SidebarMenuItem key={chat.id}>
                    <div className="flex items-center justify-between group p-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                      <div 
                        className="flex items-center space-x-3 flex-1 min-w-0 cursor-pointer"
                        onClick={() => onSelectChat(chat.id)}
                      >
                        <MessageCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium truncate ${chat.id === currentChatId ? 'text-blue-600' : ''}`}>
                            {chat.title}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {chat.lastMessage}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {chat.timestamp.toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteChat(chat.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-1"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </ScrollArea>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default ChatSidebar;

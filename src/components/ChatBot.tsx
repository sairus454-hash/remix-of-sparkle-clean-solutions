import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2, Phone, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import ReactMarkdown from 'react-markdown';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface LeadForm {
  name: string;
  contact: string;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadForm, setLeadForm] = useState<LeadForm>({ name: '', contact: '' });
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Здравствуйте! 👋 Я AI-консультант MasterClean. Чем могу помочь? Расскажите о вашей задаче, и я подберу подходящее решение.',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const conversationHistory = messages
        .filter((m) => m.id !== 'welcome')
        .map((m) => ({ role: m.role, content: m.content }));

      conversationHistory.push({ role: 'user', content: userMessage.content });

      const { data, error } = await supabase.functions.invoke('chat-bot', {
        body: { messages: conversationHistory },
      });

      if (error) throw error;

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message || 'Извините, не удалось получить ответ.',
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Извините, произошла ошибка. Пожалуйста, попробуйте позже или свяжитесь с нами по телефону.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleLeadSubmit = async () => {
    if (!leadForm.name.trim() || !leadForm.contact.trim()) return;
    
    // Add lead submission message to chat
    const leadMessage: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: `Спасибо, ${leadForm.name}! 🎉 Ваша заявка принята. Мы свяжемся с вами по контакту: ${leadForm.contact} в ближайшее время!`,
    };
    setMessages((prev) => [...prev, leadMessage]);
    setLeadSubmitted(true);
    setShowLeadForm(false);
    
    // Here you could also send to Telegram or save to database
    console.log('Lead captured:', leadForm);
  };

  const openContactManager = () => {
    setShowLeadForm(true);
    const botMessage: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: 'Чтобы помочь дальше, подскажите, как с вами связаться 👇',
    };
    setMessages((prev) => [...prev, botMessage]);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-20 right-4 z-50 w-14 h-14 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center",
          "bg-gradient-to-br from-primary to-fresh hover:scale-110 hover:shadow-glow",
          isOpen && "rotate-180"
        )}
        aria-label={isOpen ? "Закрыть чат" : "Открыть чат"}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-primary-foreground" />
        ) : (
          <MessageCircle className="w-6 h-6 text-primary-foreground" />
        )}
      </button>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-36 right-4 z-50 w-[calc(100vw-2rem)] sm:w-96 h-[500px] max-h-[70vh]",
          "bg-card border border-border rounded-2xl shadow-2xl overflow-hidden",
          "transition-all duration-300 origin-bottom-right",
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-fresh p-4 flex items-center gap-3 relative">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-primary-foreground">AI-консультант</h3>
            <p className="text-xs text-primary-foreground/80">MasterClean</p>
          </div>
          {/* Close button in header */}
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            aria-label="Закрыть чат"
          >
            <X className="w-4 h-4 text-primary-foreground" />
          </button>
        </div>

        {/* Messages */}
        <ScrollArea className="h-[calc(100%-12rem)] p-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-2",
                  message.role === 'user' ? "justify-end" : "justify-start"
                )}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-fresh flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-primary-foreground" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-2 text-sm",
                    message.role === 'user'
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-muted text-foreground rounded-bl-md"
                  )}
                >
                  {message.role === 'assistant' ? (
                    <div className="prose prose-sm dark:prose-invert max-w-none [&>p]:m-0 [&>ul]:my-1 [&>ol]:my-1">
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>
                  ) : (
                    message.content
                  )}
                </div>
                {message.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2 justify-start">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-fresh flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary-foreground" />
                </div>
                <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
                  <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Lead Form */}
        {showLeadForm && !leadSubmitted && (
          <div className="absolute bottom-16 left-0 right-0 p-4 bg-card border-t border-border">
            <div className="space-y-3">
              <div>
                <Label htmlFor="lead-name" className="text-xs text-muted-foreground">Имя</Label>
                <Input
                  id="lead-name"
                  value={leadForm.name}
                  onChange={(e) => setLeadForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Ваше имя"
                  className="h-9"
                />
              </div>
              <div>
                <Label htmlFor="lead-contact" className="text-xs text-muted-foreground">Телефон / Email / Telegram</Label>
                <Input
                  id="lead-contact"
                  value={leadForm.contact}
                  onChange={(e) => setLeadForm(prev => ({ ...prev, contact: e.target.value }))}
                  placeholder="+7... или @username"
                  className="h-9"
                />
              </div>
              <Button
                onClick={handleLeadSubmit}
                disabled={!leadForm.name.trim() || !leadForm.contact.trim()}
                className="w-full bg-gradient-to-r from-primary to-fresh hover:opacity-90"
                size="sm"
              >
                <FileText className="w-4 h-4 mr-2" />
                Отправить заявку
              </Button>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {!showLeadForm && (
          <div className="absolute bottom-16 left-0 right-0 px-4 py-2 bg-card border-t border-border flex gap-2">
            <Button
              onClick={openContactManager}
              variant="outline"
              size="sm"
              className="flex-1 text-xs"
              disabled={leadSubmitted}
            >
              <Phone className="w-3 h-3 mr-1" />
              Связаться с менеджером
            </Button>
            <Button
              onClick={() => setShowLeadForm(true)}
              size="sm"
              className="flex-1 text-xs bg-gradient-to-r from-primary to-fresh hover:opacity-90"
              disabled={leadSubmitted}
            >
              <FileText className="w-3 h-3 mr-1" />
              Оставить заявку
            </Button>
          </div>
        )}

        {/* Input */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-card border-t border-border">
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Напишите сообщение..."
              disabled={isLoading}
              className="flex-1 h-9"
            />
            <Button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              size="icon"
              className="h-9 w-9 bg-gradient-to-r from-primary to-fresh hover:opacity-90"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBot;

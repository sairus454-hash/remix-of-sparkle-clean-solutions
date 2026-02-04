import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2, Phone, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/i18n/LanguageContext';
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

// Notification sound using Web Audio API
const playNotificationSound = () => {
  try {
    const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  } catch (e) {
    // Silently fail if audio not supported
    console.log('Audio notification not supported');
  }
};

const ChatBot = () => {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadForm, setLeadForm] = useState<LeadForm>({ name: '', contact: '' });
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize welcome message when language changes
  useEffect(() => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: t.chatbot.welcome,
      },
    ]);
  }, [language, t.chatbot.welcome]);

  useEffect(() => {
    // Scroll to bottom when messages change
    const scrollToBottom = () => {
      if (scrollRef.current) {
        const scrollContainer = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
        if (scrollContainer) {
          scrollContainer.scrollTop = scrollContainer.scrollHeight;
        }
      }
    };
    // Small delay to ensure content is rendered
    setTimeout(scrollToBottom, 50);
  }, [messages, isLoading]);

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
        body: { messages: conversationHistory, language },
      });

      if (error) throw error;

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message || t.chatbot.error,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      playNotificationSound();
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: t.chatbot.error,
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
    
    setIsLoading(true);
    
    try {
      const chatSummary = messages
        .filter(m => m.id !== 'welcome')
        .slice(-6)
        .map(m => `${m.role === 'user' ? 'Client' : 'Bot'}: ${m.content}`)
        .join('\n');

      const { error } = await supabase.functions.invoke('send-telegram', {
        body: {
          name: leadForm.name.trim(),
          phone: leadForm.contact.trim(),
          service: 'Заявка из чат-бота',
          message: chatSummary ? `📝 История чата:\n${chatSummary}` : 'Заявка из чат-бота (без истории)',
        },
      });

      if (error) {
        console.error('Telegram send error:', error);
      }

      const leadMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: `${t.chatbot.thankYou}, ${leadForm.name}! 🎉 ${t.chatbot.requestAccepted}: ${leadForm.contact} ${t.chatbot.soon}`,
      };
      setMessages((prev) => [...prev, leadMessage]);
      setLeadSubmitted(true);
      setShowLeadForm(false);
      setLeadForm({ name: '', contact: '' });
    } catch (error) {
      console.error('Lead submit error:', error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: t.chatbot.error,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const openContactManager = () => {
    setShowLeadForm(true);
    const botMessage: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: t.chatbot.contactPrompt,
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
        aria-label={isOpen ? t.chatbot.closeChat : t.chatbot.openChat}
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
            <h3 className="font-semibold text-primary-foreground">{t.chatbot.title}</h3>
            <p className="text-xs text-primary-foreground/80">{t.chatbot.subtitle}</p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            aria-label={t.chatbot.closeChat}
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
                <Label htmlFor="lead-name" className="text-xs text-muted-foreground">{t.chatbot.name}</Label>
                <Input
                  id="lead-name"
                  value={leadForm.name}
                  onChange={(e) => setLeadForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder={t.chatbot.namePlaceholder}
                  className="h-9"
                />
              </div>
              <div>
                <Label htmlFor="lead-contact" className="text-xs text-muted-foreground">{t.chatbot.contact}</Label>
                <Input
                  id="lead-contact"
                  value={leadForm.contact}
                  onChange={(e) => setLeadForm(prev => ({ ...prev, contact: e.target.value }))}
                  placeholder={t.chatbot.contactPlaceholder}
                  className="h-9"
                />
              </div>
              <Button
                onClick={handleLeadSubmit}
                disabled={!leadForm.name.trim() || !leadForm.contact.trim() || isLoading}
                className="w-full bg-gradient-to-r from-primary to-fresh hover:opacity-90"
                size="sm"
              >
                <FileText className="w-4 h-4 mr-2" />
                {t.chatbot.sendRequest}
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
              {t.chatbot.contactManager}
            </Button>
            <Button
              onClick={() => setShowLeadForm(true)}
              size="sm"
              className="flex-1 text-xs bg-gradient-to-r from-primary to-fresh hover:opacity-90"
              disabled={leadSubmitted}
            >
              <FileText className="w-3 h-3 mr-1" />
              {t.chatbot.submitRequest}
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
              placeholder={t.chatbot.placeholder}
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
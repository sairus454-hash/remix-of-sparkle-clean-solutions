import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MessageCircle, X, Send, Bot, User, Loader2, Phone, FileText, Sofa, Car, Wind, Wrench, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/i18n/LanguageContext';
import { useIsMobile } from '@/hooks/use-mobile';
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

interface QuickReply {
  icon: React.ReactNode;
  label: string;
  message: string;
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
    console.log('Audio notification not supported');
  }
};

const ChatBot = () => {
  const { t, language } = useLanguage();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [hasAutoOpened, setHasAutoOpened] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadForm, setLeadForm] = useState<LeadForm>({ name: '', contact: '' });
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputReadonly, setInputReadonly] = useState(true);

  // Block body scroll when chat is open on mobile
  useEffect(() => {
    if (isMobile && isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, [isMobile, isOpen]);

  // Listen for custom event to open chatbot from navigation menu
  useEffect(() => {
    const handleOpenChat = () => {
      setIsOpen(true);
    };
    
    window.addEventListener('openChatBot', handleOpenChat);
    return () => window.removeEventListener('openChatBot', handleOpenChat);
  }, []);

  // Quick reply buttons configuration
  const quickReplies: QuickReply[] = [
    {
      icon: <Sofa className="w-4 h-4" />,
      label: t.chatbot.quickReplies?.furniture || '🛋 Мебель',
      message: t.chatbot.quickMessages?.furniture || 'Интересует химчистка мебели'
    },
    {
      icon: <Car className="w-4 h-4" />,
      label: t.chatbot.quickReplies?.auto || '🚗 Авто',
      message: t.chatbot.quickMessages?.auto || 'Интересует химчистка авто'
    },
    {
      icon: <Sparkles className="w-4 h-4" />,
      label: t.chatbot.quickReplies?.windows || '🪟 Окна',
      message: t.chatbot.quickMessages?.windows || 'Интересует мойка окон'
    },
    {
      icon: <Wrench className="w-4 h-4" />,
      label: t.chatbot.quickReplies?.handyman || '🔧 Мастер',
      message: t.chatbot.quickMessages?.handyman || 'Нужен мастер на час'
    }
  ];

  // Initialize welcome message when language changes
  useEffect(() => {
    const welcomeMessage = isMobile 
      ? (t.chatbot.welcomeMobile || 'Здравствуйте 👋\n\nПомогу с уборкой и химчисткой.\n\nЧто нужно?')
      : t.chatbot.welcome;
    
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: welcomeMessage,
      },
    ]);
    setShowQuickReplies(true);
  }, [language, t.chatbot.welcome, t.chatbot.welcomeMobile, isMobile]);

  // Auto-open chatbot after delay
  // Desktop: all pages after 8 seconds
  // Mobile: disabled (no auto-open)
  useEffect(() => {
    if (hasAutoOpened) return;
    
    // Disable auto-open on mobile completely
    if (isMobile) return;
    
    // Desktop: 8 seconds delay
    const timer = setTimeout(() => {
      setIsOpen(true);
      setHasAutoOpened(true);
    }, 8000);

    return () => clearTimeout(timer);
  }, [hasAutoOpened, isMobile]);

  // Reset readonly state when chat opens (for mobile keyboard prevention)
  useEffect(() => {
    if (isOpen && isMobile) {
      setInputReadonly(true);
    }
  }, [isOpen, isMobile]);

  useEffect(() => {
    const scrollToBottom = () => {
      if (scrollRef.current) {
        const scrollContainer = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
        if (scrollContainer) {
          scrollContainer.scrollTop = scrollContainer.scrollHeight;
        }
      }
    };
    setTimeout(scrollToBottom, 50);
  }, [messages, isLoading]);

  useEffect(() => {
    // Only auto-focus on desktop, not mobile (prevents keyboard popup)
    if (isOpen && inputRef.current && !isMobile) {
      inputRef.current.focus();
    }
  }, [isOpen, isMobile]);

  // Handle input focus on mobile - remove readonly when user taps
  const handleInputFocus = () => {
    if (isMobile && inputReadonly) {
      setInputReadonly(false);
    }
  };

  const sendMessage = async (messageText?: string) => {
    const text = messageText || input.trim();
    if (!text || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setShowQuickReplies(false);

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

  const handleQuickReply = (reply: QuickReply) => {
    sendMessage(reply.message);
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
        content: `${t.chatbot.thankYou}, ${leadForm.name}! 🎉\n\n${t.chatbot.requestAccepted}: ${leadForm.contact}\n\n${t.chatbot.soon}`,
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
          "fixed z-50 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center",
          "bg-gradient-to-br from-primary to-fresh hover:scale-110 hover:shadow-glow",
          // Mobile: right side, slightly below center; Desktop: bottom right
          isMobile 
            ? "right-3 top-[55%] -translate-y-1/2 w-14 h-14" 
            : "bottom-20 right-4 w-14 h-14",
          isOpen ? "rotate-180" : "animate-pulse-slow"
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
          "fixed z-50 bg-card border border-border shadow-2xl overflow-hidden",
          "origin-bottom-right",
          // Smooth animation with opacity and transform
          "transition-[transform,opacity] duration-500 ease-out",
          // Mobile: full screen for better UX on iOS/Android
          isMobile 
            ? "inset-0 rounded-none pb-safe pt-safe" 
            : "bottom-36 right-4 w-96 h-[500px] max-h-[70vh] rounded-2xl",
          isOpen 
            ? "scale-100 opacity-100 translate-y-0" 
            : "scale-95 opacity-0 translate-y-4 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-fresh p-3 sm:p-4 flex items-center gap-3 relative">
          <div className={cn(
            "rounded-full bg-white/20 flex items-center justify-center",
            isMobile ? "w-9 h-9" : "w-10 h-10"
          )}>
            <Bot className={cn(
              "text-primary-foreground",
              isMobile ? "w-4 h-4" : "w-5 h-5"
            )} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className={cn(
              "font-semibold text-primary-foreground truncate",
              isMobile && "text-sm"
            )}>
              {t.chatbot.title}
            </h3>
            <p className={cn(
              "text-primary-foreground/80 truncate",
              isMobile ? "text-[10px]" : "text-xs"
            )}>
              {t.chatbot.subtitle}
            </p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className={cn(
              "rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors",
              isMobile ? "w-9 h-9" : "w-8 h-8"
            )}
            aria-label={t.chatbot.closeChat}
          >
            <X className={cn(
              "text-primary-foreground",
              isMobile ? "w-4 h-4" : "w-4 h-4"
            )} />
          </button>
        </div>

        {/* Messages */}
        <ScrollArea 
          className={cn(
            "p-3 sm:p-4",
            showLeadForm ? "h-[calc(100%-14rem)]" : "h-[calc(100%-12rem)]"
          )} 
          ref={scrollRef}
        >
          <div className="space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-2",
                  message.role === 'user' ? "justify-end" : "justify-start"
                )}
              >
                {message.role === 'assistant' && (
                  <div className={cn(
                    "rounded-full bg-gradient-to-br from-primary to-fresh flex items-center justify-center flex-shrink-0",
                    isMobile ? "w-7 h-7" : "w-8 h-8"
                  )}>
                    <Bot className={cn(
                      "text-primary-foreground",
                      isMobile ? "w-3.5 h-3.5" : "w-4 h-4"
                    )} />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-3 py-2",
                    isMobile ? "text-sm" : "text-sm",
                    message.role === 'user'
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-muted text-foreground rounded-bl-md"
                  )}
                >
                  {message.role === 'assistant' ? (
                    <div className={cn(
                      "prose dark:prose-invert max-w-none [&>p]:m-0 [&>ul]:my-1 [&>ol]:my-1",
                      isMobile ? "prose-sm [&>p]:text-sm [&>p]:leading-relaxed" : "prose-sm"
                    )}>
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>
                  ) : (
                    message.content
                  )}
                </div>
                {message.role === 'user' && (
                  <div className={cn(
                    "rounded-full bg-muted flex items-center justify-center flex-shrink-0",
                    isMobile ? "w-7 h-7" : "w-8 h-8"
                  )}>
                    <User className={cn(
                      "text-muted-foreground",
                      isMobile ? "w-3.5 h-3.5" : "w-4 h-4"
                    )} />
                  </div>
                )}
              </div>
            ))}
            
            {/* Quick Reply Buttons */}
            {showQuickReplies && !isLoading && messages.length <= 2 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply)}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-2 rounded-full",
                      "bg-primary/10 hover:bg-primary/20 text-primary",
                      "border border-primary/20 hover:border-primary/40",
                      "transition-all duration-200 active:scale-95",
                      isMobile ? "text-xs min-h-[44px]" : "text-xs"
                    )}
                  >
                    {reply.icon}
                    <span>{reply.label}</span>
                  </button>
                ))}
              </div>
            )}
            
            {isLoading && (
              <div className="flex gap-2 justify-start">
                <div className={cn(
                  "rounded-full bg-gradient-to-br from-primary to-fresh flex items-center justify-center",
                  isMobile ? "w-7 h-7" : "w-8 h-8"
                )}>
                  <Bot className={cn(
                    "text-primary-foreground",
                    isMobile ? "w-3.5 h-3.5" : "w-4 h-4"
                  )} />
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
          <div className="absolute bottom-16 left-0 right-0 p-3 bg-card border-t border-border">
            <div className="space-y-2">
              <div>
                <Label htmlFor="lead-name" className="text-xs text-muted-foreground">{t.chatbot.name}</Label>
                <Input
                  id="lead-name"
                  value={leadForm.name}
                  onChange={(e) => setLeadForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder={t.chatbot.namePlaceholder}
                  className={cn("h-10", isMobile && "text-base")}
                />
              </div>
              <div>
                <Label htmlFor="lead-contact" className="text-xs text-muted-foreground">{t.chatbot.contact}</Label>
                <Input
                  id="lead-contact"
                  value={leadForm.contact}
                  onChange={(e) => setLeadForm(prev => ({ ...prev, contact: e.target.value }))}
                  placeholder={t.chatbot.contactPlaceholder}
                  className={cn("h-10", isMobile && "text-base")}
                />
              </div>
              <Button
                onClick={handleLeadSubmit}
                disabled={!leadForm.name.trim() || !leadForm.contact.trim() || isLoading}
                className={cn(
                  "w-full bg-gradient-to-r from-primary to-fresh hover:opacity-90",
                  isMobile && "h-12 text-base"
                )}
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
          <div className={cn(
            "absolute bottom-16 left-0 right-0 px-3 py-2 bg-card border-t border-border flex gap-2",
            isMobile && "px-2"
          )}>
            <Button
              onClick={openContactManager}
              variant="outline"
              size="sm"
              className={cn(
                "flex-1",
                isMobile ? "text-xs h-11 px-2" : "text-xs"
              )}
              disabled={leadSubmitted}
            >
              <Phone className="w-3.5 h-3.5 mr-1" />
              <span className="truncate">{t.chatbot.contactManager}</span>
            </Button>
            <Button
              onClick={() => setShowLeadForm(true)}
              size="sm"
              className={cn(
                "flex-1 bg-gradient-to-r from-primary to-fresh hover:opacity-90",
                isMobile ? "text-xs h-11 px-2" : "text-xs"
              )}
              disabled={leadSubmitted}
            >
              <FileText className="w-3.5 h-3.5 mr-1" />
              <span className="truncate">{t.chatbot.submitRequest}</span>
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
              onFocus={handleInputFocus}
              readOnly={isMobile && inputReadonly}
              placeholder={t.chatbot.placeholder}
              disabled={isLoading}
              className={cn(
                "flex-1",
                isMobile ? "h-11 text-base" : "h-9"
              )}
            />
            <Button
              onClick={() => sendMessage()}
              disabled={!input.trim() || isLoading}
              size="icon"
              className={cn(
                "bg-gradient-to-r from-primary to-fresh hover:opacity-90",
                isMobile ? "h-11 w-11" : "h-9 w-9"
              )}
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

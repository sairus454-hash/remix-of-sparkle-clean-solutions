import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { MessageCircle, X, Send, Bot, User, Loader2, Camera, FileText, Sofa, Car, Wind, Wrench, Sparkles, Brush, Mic, MicOff, ImageIcon, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/i18n/LanguageContext';
import { useIsMobile } from '@/hooks/use-mobile';
import ReactMarkdown from 'react-markdown';
import chatbotGirl from '@/assets/chatbot-girl.png';

// Web Speech API types
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onend: (() => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognition;
}

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface LeadForm {
  name: string;
  phone: string;
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
  const [isDismissed, setIsDismissed] = useState(false);
  const [hasAutoOpened, setHasAutoOpened] = useState(() => {
    try { return !!sessionStorage.getItem('chatbot_auto_opened'); } catch { return false; }
  });
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadForm, setLeadForm] = useState<LeadForm>({ name: '', phone: '', contact: '' });
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSendingPhoto, setIsSendingPhoto] = useState(false);
  const [pendingPhotos, setPendingPhotos] = useState<File[]>([]);
  const [photoCaption, setPhotoCaption] = useState('');
  const [photoPhone, setPhotoPhone] = useState('');
  const [showPhotoPreview, setShowPhotoPreview] = useState(false);
  const [inputReadonly, setInputReadonly] = useState(true);
  
  // Voice input state
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Check if speech recognition is supported
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      setSpeechSupported(true);
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      
      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        setInput(transcript);
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
    }
  }, []);

  // Update recognition language when language changes
  useEffect(() => {
    if (recognitionRef.current) {
      const langMap: Record<string, string> = {
        ru: 'ru-RU',
        en: 'en-US',
        pl: 'pl-PL',
        uk: 'uk-UA',
      };
      recognitionRef.current.lang = langMap[language] || 'ru-RU';
    }
  }, [language]);

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
        // Remove readonly on mobile when using voice
        if (isMobile) {
          setInputReadonly(false);
        }
      } catch (error) {
        console.error('Failed to start speech recognition:', error);
      }
    }
  };

  // Block body scroll when chat is open on mobile
  useEffect(() => {
    if (isMobile && isOpen) {
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '0px';
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isMobile, isOpen]);

  // Listen for custom event to open chatbot from navigation menu
  useEffect(() => {
    const handleOpenChat = () => {
      setIsOpen(true);
      import('@/lib/gtm').then(m => m.gtmEvents.chatbotOpen('manual'));
    };
    
    window.addEventListener('openChatBot', handleOpenChat);
    return () => window.removeEventListener('openChatBot', handleOpenChat);
  }, []);

  // Quick reply buttons configuration
  const quickReplies: QuickReply[] = [
    {
      icon: <Brush className="w-4 h-4" />,
      label: t.chatbot.quickReplies?.cleaning || '🧹 Уборка',
      message: t.chatbot.quickMessages?.cleaning || 'Интересует уборка помещений'
    },
    {
      icon: <Wind className="w-4 h-4" />,
      label: t.chatbot.quickReplies?.ozone || '💨 Озон',
      message: t.chatbot.quickMessages?.ozone || 'Интересует озонирование'
    },
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
  // Mobile: after 30 seconds
  useEffect(() => {
    if (hasAutoOpened) return;

    // Disable auto-open on contacts page (has its own form)
    if (location.pathname === '/contacts') return;
    
    // Mobile: 30 seconds, Desktop: 8 seconds
    const delay = isMobile ? 30000 : 8000;
    const timer = setTimeout(() => {
      setIsOpen(true);
      setHasAutoOpened(true);
      try { sessionStorage.setItem('chatbot_auto_opened', '1'); } catch {}
      import('@/lib/gtm').then(m => m.gtmEvents.chatbotOpen('auto'));
    }, delay);

    return () => clearTimeout(timer);
  }, [hasAutoOpened, isMobile, location.pathname]);

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
    import('@/lib/gtm').then(m => m.gtmEvents.chatbotMessage());

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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleLeadSubmit = async () => {
    if (!leadForm.name.trim() || !leadForm.phone.trim() || !leadForm.contact.trim()) return;
    
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
          phone: leadForm.phone.trim(),
          service: 'Заявка из чат-бота',
          message: `📞 Телефон: ${leadForm.phone.trim()}\n📧 Контакт: ${leadForm.contact.trim()}${chatSummary ? `\n\n📝 История чата:\n${chatSummary}` : ''}`,
        },
      });

      if (error) {
        console.error('Telegram send error:', error);
      }

      import('@/lib/gtm').then(m => m.gtmEvents.chatbotLeadSubmit());

      const leadMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: `${t.chatbot.thankYou}, ${leadForm.name}! 🎉\n\n${t.chatbot.requestAccepted}: ${leadForm.contact}\n\n${t.chatbot.soon}`,
      };
      setMessages((prev) => [...prev, leadMessage]);
      setLeadSubmitted(true);
      setShowLeadForm(false);
      setLeadForm({ name: '', phone: '', contact: '' });
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

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const imageFiles = Array.from(files).filter(f => f.type.startsWith('image/'));
    if (imageFiles.length === 0) return;
    setPendingPhotos(imageFiles);
    setPhotoCaption('');
    setShowPhotoPreview(true);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const cancelPhotoUpload = () => {
    setPendingPhotos([]);
    setPhotoCaption('');
    setPhotoPhone('');
    setShowPhotoPreview(false);
  };

  const sendPhotosWithCaption = async () => {
    if (pendingPhotos.length === 0 || !photoPhone.trim()) return;
    setIsSendingPhoto(true);
    setShowPhotoPreview(false);

    const caption = photoCaption.trim();
    const phone = photoPhone.trim();

    for (const file of pendingPhotos) {
      try {
        const photoMsg: Message = {
          id: Date.now().toString() + Math.random(),
          role: 'user',
          content: caption ? `📷 ${file.name}\n💬 ${caption}` : `📷 ${file.name}`,
        };
        setMessages((prev) => [...prev, photoMsg]);

        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            const result = reader.result as string;
            resolve(result.split(',')[1]);
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

        const { error } = await supabase.functions.invoke('send-telegram-photo', {
          body: {
            imageBase64: base64,
            fileName: file.name,
            caption: `📷 Фото из чат-бота\n📞 ${phone}${caption ? `\n💬 ${caption}` : ''}`,
          },
        });

        if (error) throw error;

        const successMsg: Message = {
          id: Date.now().toString() + Math.random(),
          role: 'assistant',
          content: t.chatbot?.photoSent || '✅ Фото отправлено менеджеру!',
        };
        setMessages((prev) => [...prev, successMsg]);
        playNotificationSound();
      } catch (error) {
        console.error('Photo upload error:', error);
        const errorMsg: Message = {
          id: Date.now().toString() + Math.random(),
          role: 'assistant',
          content: t.chatbot?.photoError || '❌ Не удалось отправить фото. Попробуйте ещё раз.',
        };
        setMessages((prev) => [...prev, errorMsg]);
      }
    }

    setPendingPhotos([]);
    setPhotoCaption('');
    setPhotoPhone('');
    setIsSendingPhoto(false);
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

  const [mobileExpanded, setMobileExpanded] = useState(false);

  const handleMobileToggle = () => {
    if (mobileExpanded) {
      // Second tap on expanded → open chat
      setIsOpen(true);
      setMobileExpanded(false);
    } else {
      // First tap → expand to show full widget
      setMobileExpanded(true);
    }
  };

  // Auto-collapse mobile expanded after 5 seconds
  useEffect(() => {
    if (mobileExpanded) {
      const timer = setTimeout(() => setMobileExpanded(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [mobileExpanded]);

  return (
    <>
      {/* Chat Toggle Button */}
      {isMobile ? (
        // Mobile: Circular button, expands horizontally on tap
        !isOpen && !isDismissed && (
          <>
            {/* Expanded text pill - separate fixed element */}
            <motion.div
              className="fixed z-50 bottom-24 right-[68px] flex items-center rounded-full bg-gradient-to-r from-primary to-fresh shadow-lg cursor-pointer"
              animate={{ 
                opacity: mobileExpanded ? 1 : 0,
                x: mobileExpanded ? 0 : 40,
              }}
              transition={{ type: 'spring', stiffness: 150, damping: 20 }}
              onClick={() => { setIsOpen(true); setMobileExpanded(false); }}
              style={{ 
                height: 56, 
                pointerEvents: mobileExpanded ? 'auto' : 'none',
              }}
            >
              <div className="flex items-center gap-2 px-4" style={{ whiteSpace: 'nowrap' }}>
                <div>
                  <div className="text-xs font-semibold text-primary-foreground leading-tight">
                    {language === 'ru' ? 'Только в MasterClean' : language === 'pl' ? 'Tylko w MasterClean' : language === 'uk' ? 'Тільки в MasterClean' : 'Only at MasterClean'}
                  </div>
                  <div className="text-[10px] text-primary-foreground/80">
                    {language === 'ru' ? 'Твой персональный консультант' : language === 'pl' ? 'Twój osobisty konsultant' : language === 'uk' ? 'Твій особистий консультант' : 'Your personal consultant'}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-primary-foreground flex-shrink-0" />
              </div>
            </motion.div>

            {/* Circle icon button */}
            <motion.div
              className="fixed z-50 right-3 bottom-24"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 60, damping: 12, delay: 1.5 }}
            >
              <div className="relative">
                <button
                  onClick={handleMobileToggle}
                  className={cn(
                    "w-14 h-14 rounded-full shadow-lg bg-gradient-to-br from-primary to-fresh flex items-center justify-center overflow-hidden",
                    !mobileExpanded && "animate-pulse-slow animate-glow-ring"
                  )}
                  aria-label={t.chatbot.openChat}
                >
                  <img 
                    src={chatbotGirl} 
                    alt="Consultant" 
                    className="w-14 h-14 object-cover object-top rounded-full"
                  />
                </button>

                {/* Close button */}
                <button
                  onClick={(e) => { e.stopPropagation(); setIsDismissed(true); setMobileExpanded(false); }}
                  className={cn(
                    "absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 rounded-full shadow-md transition-all duration-300",
                    "bg-foreground/80 hover:bg-foreground",
                    mobileExpanded ? "opacity-100" : "opacity-0 pointer-events-none"
                  )}
                  aria-label={t.chatbot.closeChat}
                >
                  <X className="w-3 h-3 text-background" />
                </button>
              </div>
            </motion.div>
          </>
        )
      ) : (
        // Desktop: Extended button with girl image, text and "More" arrow
        <motion.div 
          className="fixed z-50 bottom-20 right-4"
          initial={{ x: 300, opacity: 0, rotate: 90 }}
          animate={{ x: 0, opacity: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 60, damping: 12, delay: 1.5 }}
        >
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "flex items-center gap-1 pl-1 pr-3 py-1 rounded-full shadow-lg transition-all duration-300",
                "bg-gradient-to-br from-primary to-fresh hover:scale-105 hover:shadow-glow",
                isOpen ? "opacity-0 pointer-events-none" : "animate-pulse-slow animate-glow-ring"
              )}
              aria-label={t.chatbot.openChat}
            >
              {/* Girl with phone image - overflows the button */}
              <img 
                src={chatbotGirl} 
                alt="Consultant" 
                className="w-24 h-24 -my-8 -ml-3 object-cover object-top rounded-full drop-shadow-lg"
              />
              
              {/* Text */}
              <div className="text-left mx-1">
                <div className="text-sm font-semibold text-primary-foreground leading-tight">
                  {language === 'ru' ? 'Только в MasterClean' : language === 'pl' ? 'Tylko w MasterClean' : language === 'uk' ? 'Тільки в MasterClean' : 'Only at MasterClean'}
                </div>
                <div className="text-xs text-primary-foreground/80">
                  {language === 'ru' ? 'Твой персональный консультант' : language === 'pl' ? 'Twój osobisty konsultant' : language === 'uk' ? 'Твій особистий консультант' : 'Your personal consultant'}
                </div>
              </div>
              
              {/* "More" arrow */}
              <div className="flex flex-col items-center gap-0 ml-1">
                <ChevronRight className="w-4 h-4 text-primary-foreground animate-bounce" style={{ animationDuration: '2s' }} />
                <span className="text-[9px] font-medium text-primary-foreground/90">
                  {language === 'ru' ? 'Ещё' : language === 'pl' ? 'Więcej' : language === 'uk' ? 'Більше' : 'More'}
                </span>
              </div>
            </button>
            
            {/* Close button overlay */}
            <button
              onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
              className={cn(
                "absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 rounded-full shadow-md transition-all duration-300",
                "bg-foreground/80 hover:bg-foreground hover:scale-125",
              )}
              aria-label={t.chatbot.closeChat}
              title={t.chatbot.closeChat}
            >
              <X className="w-3 h-3 text-background" />
            </button>
          </div>
        </motion.div>
      )}

      {/* Chat Window */}
      <div
        className={cn(
          "fixed z-50 bg-card border border-border shadow-2xl overflow-hidden",
          "origin-bottom-right",
          // Smooth animation with opacity and transform
          "transition-[transform,opacity] duration-500 ease-out",
          // Mobile: compact bottom modal, Desktop: side window
          isMobile 
            ? "inset-0 w-full h-full rounded-none" 
            : "bottom-[120px] right-4 w-96 h-[500px] max-h-[70vh] rounded-2xl",
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
                <Label htmlFor="lead-phone" className="text-xs text-muted-foreground">
                  {language === 'ru' ? 'Телефон' : language === 'pl' ? 'Telefon' : language === 'uk' ? 'Телефон' : 'Phone'} <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="lead-phone"
                  type="tel"
                  inputMode="tel"
                  value={leadForm.phone}
                  onChange={(e) => setLeadForm(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+48 ..."
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
                disabled={!leadForm.name.trim() || !leadForm.phone.trim() || !leadForm.contact.trim() || isLoading}
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

        {/* Photo Preview with Caption */}
        {showPhotoPreview && pendingPhotos.length > 0 && (
          <div className="absolute bottom-16 left-0 right-0 p-3 bg-card border-t border-border">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Camera className="w-4 h-4" />
                <span>{pendingPhotos.length} {t.chatbot?.photosSelected || 'фото выбрано'}</span>
                <button onClick={cancelPhotoUpload} className="ml-auto text-destructive hover:text-destructive/80">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div>
                <Label htmlFor="photo-phone" className="text-xs text-muted-foreground">
                  {language === 'ru' ? 'Телефон' : language === 'pl' ? 'Telefon' : language === 'uk' ? 'Телефон' : 'Phone'} <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="photo-phone"
                  type="tel"
                  inputMode="tel"
                  value={photoPhone}
                  onChange={(e) => setPhotoPhone(e.target.value)}
                  placeholder="+48 ..."
                  className={cn("h-10", isMobile && "text-base")}
                  autoFocus
                />
              </div>
              <Input
                value={photoCaption}
                onChange={(e) => setPhotoCaption(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && photoPhone.trim()) sendPhotosWithCaption(); }}
                placeholder={t.chatbot?.captionPlaceholder || 'Добавьте описание (необязательно)...'}
                className={cn("h-10", isMobile && "text-base")}
              />
              <Button
                onClick={sendPhotosWithCaption}
                disabled={!photoPhone.trim()}
                className={cn(
                  "w-full bg-gradient-to-r from-primary to-fresh hover:opacity-90",
                  isMobile && "h-12 text-base"
                )}
                size="sm"
              >
                <Send className="w-4 h-4 mr-2" />
                {t.chatbot?.sendPhoto || 'Отправить фото'}
              </Button>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {!showLeadForm && !showPhotoPreview && (
          <div className={cn(
            "absolute bottom-16 left-0 right-0 px-3 py-2 bg-card border-t border-border flex gap-2",
            isMobile && "px-2"
          )}>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handlePhotoSelect}
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              size="sm"
              className={cn(
                "flex-1",
                isMobile ? "text-xs h-11 px-2" : "text-xs"
              )}
              disabled={isSendingPhoto}
            >
              {isSendingPhoto ? (
                <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" />
              ) : (
                <Camera className="w-3.5 h-3.5 mr-1" />
              )}
              <span className="truncate">{isSendingPhoto ? (t.chatbot?.sending || 'Отправка...') : (t.chatbot?.addPhoto || '📷 Фото')}</span>
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
              onKeyDown={handleKeyDown}
              onFocus={handleInputFocus}
              readOnly={isMobile && inputReadonly}
              placeholder={isListening ? (t.chatbot?.listening || 'Говорите...') : t.chatbot.placeholder}
              disabled={isLoading}
              className={cn(
                "flex-1",
                isMobile ? "h-11 text-base" : "h-9",
                isListening && "border-primary ring-2 ring-primary/20"
              )}
            />
            {speechSupported && (
              <Button
                onClick={toggleListening}
                disabled={isLoading}
                size="icon"
                variant={isListening ? "destructive" : "outline"}
                className={cn(
                  isMobile ? "h-11 w-11" : "h-9 w-9",
                  isListening && "animate-pulse"
                )}
                title={isListening ? (t.chatbot?.stopListening || 'Остановить') : (t.chatbot?.startListening || 'Голосовой ввод')}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </Button>
            )}
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

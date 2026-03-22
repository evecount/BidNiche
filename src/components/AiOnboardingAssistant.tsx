'use client';

import { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, MessageCircle, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { onboardingAssistant } from '@/ai/flows/onboarding-assistant-flow';
import { cn } from '@/lib/utils';

type Message = {
  role: 'user' | 'model';
  text: string;
};

export function AiOnboardingAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'model', 
      text: "Hi! I'm your RFPCentral Strategic Orchestrator. I can help you draft a mission-critical RFP, analyze a complex tender, or find the right fractional capacity block for your next sprint. How can I help you outsource your anxiety today?" 
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const result = await onboardingAssistant({
        message: userMessage,
        history: messages.slice(-5), // Send last few messages for context
      });

      setMessages((prev) => [...prev, { role: 'model', text: result.reply }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'model', text: "I'm sorry, I'm having a little trouble connecting right now. Please try again in a moment!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <Card className="mb-4 w-80 sm:w-96 shadow-2xl border-primary/20 animate-in slide-in-from-bottom-5 duration-300">
          <CardHeader className="bg-primary px-4 py-3 flex flex-row justify-between items-center text-primary-foreground rounded-t-lg">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              RFPCentral Orchestrator
            </CardTitle>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/10" 
              onClick={() => setIsOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[350px] p-4" ref={scrollRef}>
              <div className="space-y-4">
                {messages.map((msg, i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "flex gap-3 max-w-[85%]",
                      msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
                    )}
                  >
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                      msg.role === 'user' ? "bg-primary/10" : "bg-muted"
                    )}>
                      {msg.role === 'user' ? <MessageCircle className="w-4 h-4 text-primary" /> : <Bot className="w-4 h-4 text-muted-foreground" />}
                    </div>
                    <div className={cn(
                      "p-3 rounded-2xl text-sm leading-relaxed shadow-sm",
                      msg.role === 'user' 
                        ? "bg-primary text-primary-foreground rounded-tr-none" 
                        : "bg-muted rounded-tl-none text-foreground"
                    )}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-3 max-w-[85%] animate-pulse">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <Bot className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="bg-muted p-3 rounded-2xl rounded-tl-none h-10 w-24" />
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter className="p-3 border-t bg-muted/20">
            <form onSubmit={handleSendMessage} className="flex w-full gap-2">
              <Input 
                placeholder="Ask me to help write an RFP..." 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="bg-background focus-visible:ring-primary"
                disabled={isLoading}
              />
              <Button size="icon" type="submit" disabled={isLoading || !input.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}

      <Button 
        onClick={() => setIsOpen(!isOpen)} 
        size="lg" 
        className={cn(
          "h-14 w-14 rounded-full shadow-2xl transition-all duration-300",
          isOpen ? "rotate-90 scale-0 opacity-0" : "scale-100 opacity-100"
        )}
      >
        <Sparkles className="w-6 h-6" />
      </Button>

      {isOpen && (
         <Button 
         onClick={() => setIsOpen(false)} 
         size="lg" 
         variant="secondary"
         className="h-14 w-14 rounded-full shadow-2xl md:hidden"
       >
         <X className="w-6 h-6" />
       </Button>
      )}
    </div>
  );
}

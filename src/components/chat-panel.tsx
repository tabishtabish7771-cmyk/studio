'use client';

import { answerHealthQuery } from "@/ai/flows/answer-health-queries";
import { useUserProfile } from "@/hooks/use-user-profile";
import { Bot, Send, User } from "lucide-react";
import { FormEvent, useRef, useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

export function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { profile, isLoaded: profileLoaded } = useUserProfile();
  const { toast } = useToast();
  const scrollViewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollViewportRef.current) {
        scrollViewportRef.current.scrollTop = scrollViewportRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    if (!profile.name) {
      toast({
        title: "Profile Needed",
        description: "Please create a health profile to chat with the AI assistant.",
        action: <Button asChild variant="secondary"><Link href="/profile">Create Profile</Link></Button>
      });
      return;
    }

    const userMessage: Message = { id: Date.now().toString(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await answerHealthQuery({
        query: input,
        healthConditions: profile.medicalConditions,
      });
      const aiMessage: Message = { id: (Date.now() + 1).toString(), text: response.answer, sender: 'ai' };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = { id: (Date.now() + 1).toString(), text: "Sorry, I couldn't process that. Please try again.", sender: 'ai' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-4" viewportRef={scrollViewportRef}>
        <div className="space-y-6">
          {messages.map((message) => (
            <div key={message.id} className={cn("flex items-start gap-3", message.sender === 'user' ? "justify-end" : "")}>
              {message.sender === 'ai' && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback><Bot /></AvatarFallback>
                </Avatar>
              )}
              <div className={cn(
                "p-3 rounded-lg max-w-sm md:max-w-md",
                message.sender === 'user' ? "bg-primary text-primary-foreground" : "bg-muted"
              )}>
                <p className="text-sm whitespace-pre-wrap">{message.text}</p>
              </div>
              {message.sender === 'user' && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback><User /></AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-3">
              <Avatar className="h-8 w-8">
                 <AvatarFallback><Bot /></AvatarFallback>
              </Avatar>
              <div className="p-3 rounded-lg bg-muted space-y-2">
                 <Skeleton className="h-4 w-48" />
                 <Skeleton className="h-4 w-32" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="p-4 border-t">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a health question..."
            disabled={isLoading || !profileLoaded}
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}

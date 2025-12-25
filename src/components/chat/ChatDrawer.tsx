import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Send, Check, X, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ChatMessage, PendingChange } from '@/types/report';

interface ChatDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const mockMessages: ChatMessage[] = [
  {
    id: '1',
    role: 'assistant',
    content: "Hi Dishita! I'm here to help you modify your report. What would you like to update?",
    timestamp: new Date(),
  },
];

export function ChatDrawer({ open, onOpenChange }: ChatDrawerProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);
  const [inputValue, setInputValue] = useState('');
  const [pendingChange, setPendingChange] = useState<PendingChange | null>(null);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate AI response with pending change
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I can help with that! Here's a suggested change:",
        timestamp: new Date(),
        pendingChanges: [{
          id: 'change-1',
          section: 'Universities',
          field: 'Target Year',
          oldValue: '2025',
          newValue: '2026',
          status: 'pending',
        }],
      };
      setMessages(prev => [...prev, aiMessage]);
      setPendingChange(aiMessage.pendingChanges![0]);
    }, 1000);
  };

  const handleAcceptChange = () => {
    if (pendingChange) {
      const confirmMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'assistant',
        content: `✅ Done! I've updated ${pendingChange.field} from "${pendingChange.oldValue}" to "${pendingChange.newValue}".`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, confirmMessage]);
      setPendingChange(null);
    }
  };

  const handleRejectChange = () => {
    if (pendingChange) {
      const rejectMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'assistant',
        content: "No problem! The change has been discarded. What else can I help you with?",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, rejectMessage]);
      setPendingChange(null);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[80vh] rounded-t-3xl p-0">
        <SheetHeader className="p-4 border-b border-border">
          <SheetTitle className="flex items-center gap-2 font-display">
            <Sparkles className="h-5 w-5 text-primary" />
            Edit Report
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-[calc(100%-4rem)]">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-3",
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-md'
                      : 'bg-muted rounded-bl-md'
                  )}
                >
                  <p className="text-sm">{message.content}</p>
                  
                  {message.pendingChanges && message.pendingChanges.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {message.pendingChanges.map((change) => (
                        <div key={change.id} className="bg-background/50 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary" className="text-xs">{change.section}</Badge>
                            <span className="text-xs text-muted-foreground">{change.field}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="line-through text-muted-foreground">{change.oldValue}</span>
                            <span>→</span>
                            <span className="font-medium text-accent">{change.newValue}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pending change actions */}
          {pendingChange && (
            <div className="px-4 py-3 bg-muted/50 border-t border-border">
              <p className="text-sm text-muted-foreground mb-2">Apply this change?</p>
              <div className="flex gap-2">
                <Button variant="accent" size="sm" className="flex-1" onClick={handleAcceptChange}>
                  <Check className="h-4 w-4 mr-1" />
                  Accept
                </Button>
                <Button variant="outline" size="sm" className="flex-1" onClick={handleRejectChange}>
                  <X className="h-4 w-4 mr-1" />
                  Reject
                </Button>
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask to modify your report..."
                className="flex-1 bg-muted rounded-xl px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <Button variant="warm" size="icon" onClick={handleSend} disabled={!inputValue.trim()}>
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

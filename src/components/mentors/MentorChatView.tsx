import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ActiveMentor } from '@/types/navigation';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'mentor';
  content: string;
  timestamp: Date;
}

interface MentorChatViewProps {
  mentor: ActiveMentor;
}

export function MentorChatView({ mentor }: MentorChatViewProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'mentor',
      content: `Hi! I'm ${mentor.name} from ${mentor.university}. I'm here to help you with any questions about law school applications, student life, or anything else. What would you like to know?`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate mentor response
    setTimeout(() => {
      const mentorResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'mentor',
        content: getMockResponse(input.trim(), mentor.name),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, mentorResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-180px)]">
      {/* Mentor Header */}
      <div className="bg-card border-b border-border px-4 py-3 flex items-center gap-3">
        {mentor.avatar ? (
          <img 
            src={mentor.avatar} 
            alt={mentor.name}
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-bold text-primary">
              {mentor.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
        )}
        <div className="flex-1">
          <h3 className="font-semibold text-base">{mentor.name}</h3>
          <p className="text-xs text-muted-foreground">{mentor.university}</p>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-safe/10 text-safe text-xs font-medium">
          <Sparkles className="h-3 w-3" />
          FREE Session
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
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
                "max-w-[80%] rounded-2xl px-4 py-3",
                message.role === 'user'
                  ? "bg-primary text-primary-foreground rounded-br-md"
                  : "bg-muted rounded-bl-md"
              )}
            >
              <p className="text-sm leading-relaxed">{message.content}</p>
              <p className={cn(
                "text-xs mt-1",
                message.role === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
              )}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border bg-card px-4 py-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 bg-muted rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Button 
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            size="icon"
            className="h-12 w-12 rounded-xl"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function getMockResponse(userInput: string, mentorName: string): string {
  const lowerInput = userInput.toLowerCase();
  
  if (lowerInput.includes('lnat') || lowerInput.includes('test')) {
    return `Great question! For LNAT prep, I'd recommend starting 3-4 months before. Focus on reading quality newspapers daily and practice the MCQ section under timed conditions. The essay section is equally important - practice writing argumentative essays on current affairs topics. Would you like some specific resources?`;
  }
  
  if (lowerInput.includes('personal statement') || lowerInput.includes('application')) {
    return `The personal statement is crucial! My top tips: Be genuine about why law interests you, show critical thinking through specific examples, and demonstrate intellectual curiosity. Don't just list achievements - explain what you learned. Would you like me to share what worked for me?`;
  }
  
  if (lowerInput.includes('interview') || lowerInput.includes('interviews')) {
    return `Interviews can be nerve-wracking but they're actually quite enjoyable! They want to see how you think, not what you know. Practice thinking out loud and be comfortable saying "let me think about that." Read up on current legal debates. Want me to share some typical questions?`;
  }
  
  if (lowerInput.includes('day') || lowerInput.includes('life') || lowerInput.includes('like')) {
    return `A typical day involves lectures in the morning, tutorials or seminars in the afternoon, and lots of reading in the evening. The workload is intense but manageable if you're organized. Weekends are for catching up and societies. The college system makes it feel like a close community. Any specific aspect you're curious about?`;
  }
  
  return `That's a really thoughtful question! From my experience, the key is to stay focused on your goals while being open to learning. Every student's journey is different, but preparation and genuine enthusiasm make a huge difference. Is there anything specific about ${mentorName.split(' ')[0]}'s experience you'd like to know more about?`;
}

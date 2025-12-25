import { MessageCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { chatMentors } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { ActiveMentor } from '@/types/navigation';

interface ChatMentorSectionProps {
  onStartChat: (mentor: ActiveMentor) => void;
}

export function ChatMentorSection({ onStartChat }: ChatMentorSectionProps) {
  const handleChatNow = (mentor: typeof chatMentors[0]) => {
    onStartChat({
      id: mentor.id,
      name: mentor.name,
      avatar: mentor.avatar,
      university: mentor.university,
    });
  };

  return (
    <div className="space-y-4 px-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="h-12 w-12 rounded-2xl bg-accent/10 flex items-center justify-center">
          <MessageCircle className="h-6 w-6 text-accent" />
        </div>
        <div>
          <h2 className="font-display font-bold text-xl">Chat with Mentors</h2>
          <p className="text-sm text-muted-foreground">1:1 sessions with real law students</p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-accent/20 to-primary/20 rounded-2xl p-4 mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-5 w-5 text-accent" />
          <Badge className="bg-accent text-accent-foreground">FREE</Badge>
        </div>
        <p className="text-sm font-medium">Your first mentor chat is free!</p>
        <p className="text-xs text-muted-foreground mt-1">
          Try a 30-minute session with any mentor at no cost.
        </p>
      </div>

      <div className="space-y-3">
        {chatMentors.map((mentor, index) => (
          <div 
            key={mentor.id}
            className="bg-card rounded-2xl p-4 shadow-soft animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start gap-3">
              {mentor.avatar ? (
                <img 
                  src={mentor.avatar} 
                  alt={mentor.name}
                  className="h-12 w-12 rounded-full object-cover shrink-0"
                />
              ) : (
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-primary">{mentor.initials}</span>
                </div>
              )}
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-base">{mentor.name}</h3>
                  <Badge variant="outline" className="text-xs">{mentor.year}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{mentor.university}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{mentor.program}</p>
                
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {mentor.specializations.map((spec) => (
                    <span 
                      key={spec}
                      className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <Button 
              onClick={() => handleChatNow(mentor)}
              className="w-full mt-4 h-11"
              size="lg"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Chat Now
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

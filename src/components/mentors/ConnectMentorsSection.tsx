import { Link2, Star } from 'lucide-react';
import { connectMentors } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ConnectMentorsSectionProps {
  onBookMentor?: (mentorId: string) => void;
  onBuyCredits?: () => void;
}

export function ConnectMentorsSection({ onBookMentor, onBuyCredits }: ConnectMentorsSectionProps) {
  return (
    <div className="px-4 space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Link2 className="h-6 w-6 text-primary" />
        <h2 className="font-display font-bold text-xl">Connect with Mentors</h2>
      </div>
      
      <p className="text-base text-muted-foreground">
        Book premium 1-on-1 sessions with experienced mentors using your credits.
      </p>

      {/* Credits prompt */}
      <div className="bg-primary/10 rounded-2xl p-4 border border-primary/20">
        <div className="flex items-center gap-2 mb-2">
          <Star className="h-5 w-5 text-primary" />
          <span className="font-semibold">Premium Mentorship</span>
        </div>
        <p className="text-sm text-muted-foreground mb-3">
          Each session uses credits from your balance. Get personalized advice from verified law students.
        </p>
        <Button 
          variant="default" 
          size="sm"
          onClick={onBuyCredits}
          className="w-full"
        >
          Buy Credits
        </Button>
      </div>

      <div className="space-y-4">
        {connectMentors.map((mentor, index) => (
          <div
            key={mentor.id}
            className="bg-card rounded-2xl p-4 shadow-soft border border-border/50 animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start gap-4">
              {mentor.avatar ? (
                <img 
                  src={mentor.avatar} 
                  alt={mentor.name}
                  className="h-14 w-14 rounded-full object-cover shrink-0"
                />
              ) : (
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-lg font-bold text-primary">{mentor.initials}</span>
                </div>
              )}
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-display font-semibold text-lg">{mentor.name}</h3>
                  <Badge variant="secondary" className="text-xs">
                    <Star className="h-3 w-3 mr-1" />
                    Premium
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {mentor.university} · {mentor.program}
                </p>
                <p className="text-sm text-muted-foreground mb-3">
                  {mentor.year}
                </p>
                
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {mentor.specializations.map((spec) => (
                    <Badge key={spec} variant="outline" className="text-xs">
                      {spec}
                    </Badge>
                  ))}
                </div>
                
                <Button 
                  variant="default"
                  size="sm"
                  className="w-full"
                  onClick={() => onBookMentor?.(mentor.id)}
                >
                  Book a 30 minute session
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { MessageCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Scholarship } from '@/types/report';
import { cn } from '@/lib/utils';

interface ScholarshipsSectionProps {
  scholarships: Scholarship[];
  onChatIntent?: (intent: string) => void;
}

export function ScholarshipsSection({ scholarships, onChatIntent }: ScholarshipsSectionProps) {
  return (
    <div className="bg-card rounded-2xl p-4 shadow-soft animate-slide-up">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <h2 className="font-display font-semibold text-lg">Scholarships & Financial Aid</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            High-impact, competitive options you can realistically aim for with a strong profile.
          </p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="shrink-0 text-xs"
          onClick={() => onChatIntent?.('scholarship-questions')}
        >
          <MessageCircle className="h-3.5 w-3.5 mr-1" />
          Ask which ones you fit
        </Button>
      </div>

      <div className="space-y-3">
        {scholarships.map((scholarship, index) => (
          <div
            key={scholarship.id}
            className={cn(
              "bg-muted/50 rounded-xl p-3 animate-slide-up"
            )}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <h3 className="font-semibold text-sm">{scholarship.name}</h3>
            <p className="text-xs text-muted-foreground mb-2">{scholarship.university}</p>
            
            <p className="text-xs text-foreground/90 mb-2">
              {scholarship.description}
              {scholarship.mentorLink && (
                <a 
                  href={scholarship.mentorLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline ml-1 inline-flex items-center gap-0.5"
                >
                  {scholarship.mentorLinkText}
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </p>
            
            <p className="text-xs text-muted-foreground mb-2">
              <strong>Key fit:</strong> {scholarship.keyFit}
            </p>
            
            <a 
              href={scholarship.officialLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary hover:underline inline-flex items-center gap-0.5"
            >
              View official details →
            </a>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-1.5 mt-3">
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted border border-border text-muted-foreground">
          Scholarship deadlines timeline
        </span>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted border border-border text-muted-foreground">
          EduMentors help on essays
        </span>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted border border-border text-muted-foreground">
          Document checklist
        </span>
      </div>
    </div>
  );
}

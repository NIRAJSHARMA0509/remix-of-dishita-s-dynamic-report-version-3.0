import { MessageCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AIInLawAction {
  text: string;
  mentorLink?: string;
  mentorLinkText?: string;
}

interface AIInLawSectionProps {
  actions: AIInLawAction[];
  onChatIntent?: (intent: string) => void;
}

export function AIInLawSection({ actions, onChatIntent }: AIInLawSectionProps) {
  return (
    <div className="bg-card rounded-2xl p-4 shadow-soft animate-slide-up">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <h2 className="font-display font-semibold text-lg">AI in Law · Your Differentiator</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Turn your interest in legal tech into a clear, credible advantage.
          </p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="shrink-0 text-xs"
          onClick={() => onChatIntent?.('ai-law-projects')}
        >
          <MessageCircle className="h-3.5 w-3.5 mr-1" />
          Brainstorm projects
        </Button>
      </div>

      <div className="bg-muted/50 rounded-xl p-3">
        <p className="text-xs font-semibold mb-2">Core Actions:</p>
        <ul className="space-y-1.5">
          {actions.map((action, index) => (
            <li key={index} className="flex items-start gap-2 text-xs text-foreground/90">
              <span className="h-1.5 w-1.5 rounded-full bg-foreground/50 shrink-0 mt-1.5" />
              <span className="flex-1">
                {action.text}
                {action.mentorLink && (
                  <a 
                    href={action.mentorLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline ml-1 inline-flex items-center gap-0.5"
                  >
                    {action.mentorLinkText}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

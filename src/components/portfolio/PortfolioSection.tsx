import { MessageCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PortfolioItem, HowToGuide } from '@/types/report';
import { cn } from '@/lib/utils';

interface PortfolioSectionProps {
  items: PortfolioItem[];
  guides: HowToGuide[];
  onChatIntent?: (intent: string) => void;
}

const markerStyles = {
  mandatory: 'border-primary text-primary',
  recommended: 'border-muted-foreground text-muted-foreground',
  optional: 'border-muted-foreground/50 text-muted-foreground',
  bonus: 'border-accent text-accent',
};

const markerLabels = {
  mandatory: 'Mandatory',
  recommended: 'Strongly Recommended',
  optional: 'Optional',
  bonus: 'Bonus Edge',
};

export function PortfolioSection({ items, guides, onChatIntent }: PortfolioSectionProps) {
  return (
    <div className="bg-card rounded-2xl p-4 shadow-soft animate-slide-up">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <h2 className="font-display font-semibold text-lg">Portfolio Builder & How-To Guides</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Clear actions, labelled as <strong>mandatory</strong>, <strong>recommended</strong> and <strong>bonus</strong>.
          </p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="shrink-0 text-xs"
          onClick={() => onChatIntent?.('portfolio-update')}
        >
          <MessageCircle className="h-3.5 w-3.5 mr-1" />
          Update Progress
        </Button>
      </div>

      <div className="space-y-4">
        {/* Portfolio Items */}
        <div className="bg-muted/50 rounded-xl p-3">
          <h3 className="font-semibold text-sm mb-2">1. Law & Profile Portfolio</h3>
          <p className="text-xs text-muted-foreground mb-3">
            What you'll show to admissions tutors beyond grades.
            <a 
              href="https://www.edumentor.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline ml-1 inline-flex items-center gap-0.5"
            >
              See a real portfolio example
              <ExternalLink className="h-3 w-3" />
            </a>
          </p>
          
          <ul className="space-y-2">
            {items.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-foreground/50 shrink-0 mt-1.5" />
                <span className="flex-1">{item.text}</span>
                <span className={cn(
                  "text-[10px] px-1.5 py-0.5 rounded-full border shrink-0",
                  markerStyles[item.marker]
                )}>
                  {markerLabels[item.marker]}
                </span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-1.5 mt-3">
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-background border border-border text-muted-foreground">
              Portfolio checklist
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-background border border-border text-muted-foreground">
              Upload certificates
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-background border border-border text-muted-foreground">
              Track competitions
            </span>
          </div>
        </div>

        {/* How-To Guides */}
        <div className="bg-muted/50 rounded-xl p-3">
          <h3 className="font-semibold text-sm mb-2">2. "How To" Mini-Guides</h3>
          <p className="text-xs text-muted-foreground mb-3">
            Step-by-step tutorials so you never wonder what to click next.
            <a 
              href="https://www.edumentor.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline ml-1 inline-flex items-center gap-0.5"
            >
              Walk through this with a mentor
              <ExternalLink className="h-3 w-3" />
            </a>
          </p>
          
          <ul className="space-y-1.5">
            {guides.map((guide, index) => (
              <li key={index} className="flex items-start gap-2 text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-foreground/50 shrink-0 mt-1.5" />
                <span>
                  <strong>{guide.title}</strong>
                  {guide.description && <span className="text-muted-foreground"> — {guide.description}</span>}
                </span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-1.5 mt-3">
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-background border border-border text-muted-foreground">
              UCAS walkthrough
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-background border border-border text-muted-foreground">
              LNAT registration
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-background border border-border text-muted-foreground">
              Scholarship checklist
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

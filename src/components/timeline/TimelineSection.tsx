import { Calendar, ExternalLink, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TimelinePhase } from '@/types/report';
import { cn } from '@/lib/utils';

interface TimelineSectionProps {
  phases: TimelinePhase[];
  onAddToCalendar?: () => void;
  onChatIntent?: (intent: string) => void;
}

export function TimelineSection({ phases, onAddToCalendar, onChatIntent }: TimelineSectionProps) {
  return (
    <div className="bg-card rounded-2xl p-4 shadow-soft animate-slide-up">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <h2 className="font-display font-semibold text-lg">The Master Timeline</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Aug 2025 – Sep 2027 · Four phases from foundation to pre-university transition
          </p>
        </div>
        <Button 
          variant="default" 
          size="sm" 
          className="shrink-0 text-xs"
          onClick={onAddToCalendar}
        >
          <Calendar className="h-3.5 w-3.5 mr-1" />
          Add to Calendar
        </Button>
      </div>

      <div className="space-y-3">
        {phases.map((phase, phaseIndex) => (
          <div
            key={phase.id}
            className={cn(
              "bg-muted/50 rounded-xl p-3 animate-slide-up"
            )}
            style={{ animationDelay: `${phaseIndex * 0.1}s` }}
          >
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
              {phase.phase}
            </p>
            <h3 className="font-semibold text-sm mb-1">{phase.title}</h3>
            <p className="text-xs text-muted-foreground mb-2">{phase.dateRange} · {phase.description}</p>
            
            <ul className="space-y-1.5 text-xs text-foreground/90">
              {phase.tasks.map((task, taskIndex) => (
                <li key={taskIndex} className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                  <span className="flex-1">
                    {task.isBold ? <strong>{task.text}</strong> : task.text}
                    {task.mentorLink && (
                      <a 
                        href={task.mentorLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline ml-1 inline-flex items-center gap-0.5"
                      >
                        {task.mentorLinkText}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                    {task.chatIntent && (
                      <button
                        onClick={() => onChatIntent?.(task.chatIntent!)}
                        className="text-primary hover:underline ml-1 inline-flex items-center gap-0.5"
                      >
                        {task.chatIntentText}
                        <MessageCircle className="h-3 w-3" />
                      </button>
                    )}
                  </span>
                </li>
              ))}
            </ul>

            {phase.chips && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {phase.chips.map((chip) => (
                  <span
                    key={chip}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-background border border-border text-muted-foreground"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-1.5 mt-3">
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted border border-border text-muted-foreground">
          Timeline re-orders as your context changes
        </span>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted border border-border text-muted-foreground">
          Chat with your report if you miss a milestone
        </span>
      </div>
    </div>
  );
}

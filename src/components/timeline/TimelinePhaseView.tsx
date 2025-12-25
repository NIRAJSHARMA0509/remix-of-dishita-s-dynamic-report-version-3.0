import { Calendar, ExternalLink, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockTimeline } from '@/data/mockData';

interface TimelinePhaseViewProps {
  phaseIndex: number;
  onAddToCalendar?: () => void;
  onChatIntent?: (intent: string) => void;
}

export function TimelinePhaseView({ phaseIndex, onAddToCalendar, onChatIntent }: TimelinePhaseViewProps) {
  const phase = mockTimeline[phaseIndex];
  
  if (!phase) return null;

  return (
    <div className="space-y-4 px-4">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
            {phase.phase}
          </p>
          <h2 className="font-display font-bold text-xl">{phase.title}</h2>
          <p className="text-sm text-muted-foreground mt-1">{phase.dateRange}</p>
        </div>
        <Button 
          variant="default" 
          size="sm" 
          className="shrink-0"
          onClick={onAddToCalendar}
        >
          <Calendar className="h-4 w-4 mr-1.5" />
          Add to Calendar
        </Button>
      </div>

      <div className="bg-card rounded-2xl p-4 shadow-soft">
        <p className="text-sm text-muted-foreground mb-4">{phase.description}</p>
        
        <ul className="space-y-3">
          {phase.tasks.map((task, taskIndex) => (
            <li 
              key={taskIndex} 
              className="flex items-start gap-3 animate-slide-up"
              style={{ animationDelay: `${taskIndex * 0.1}s` }}
            >
              <span className="h-2.5 w-2.5 rounded-full bg-primary shrink-0 mt-2" />
              <div className="flex-1">
                <span className={task.isBold ? "font-semibold text-base" : "text-base"}>
                  {task.text}
                </span>
                {task.mentorLink && (
                  <a 
                    href={task.mentorLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline ml-2 inline-flex items-center gap-1 text-sm"
                  >
                    {task.mentorLinkText}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
                {task.chatIntent && (
                  <button
                    onClick={() => onChatIntent?.(task.chatIntent!)}
                    className="text-primary hover:underline ml-2 inline-flex items-center gap-1 text-sm"
                  >
                    {task.chatIntentText}
                    <MessageCircle className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>

        {phase.chips && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
            {phase.chips.map((chip) => (
              <span
                key={chip}
                className="text-xs px-3 py-1.5 rounded-full bg-muted border border-border text-muted-foreground"
              >
                {chip}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

import { ExternalLink } from 'lucide-react';
import { ExecutiveStat } from '@/types/report';
import { cn } from '@/lib/utils';

interface ExecutiveSummaryProps {
  stats: ExecutiveStat[];
  summary: string;
}

export function ExecutiveSummary({ stats, summary }: ExecutiveSummaryProps) {
  return (
    <div className="bg-card rounded-3xl p-6 shadow-elevated animate-slide-up border border-border/50">
      <div className="flex items-start justify-between gap-3 mb-5">
        <div>
          <h2 className="font-display font-bold text-xl">Executive Summary</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Academics, LNAT, portfolio & mentorship insights.
          </p>
        </div>
        <span className="shrink-0 text-sm px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent flex items-center gap-2 font-medium">
          <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
          EduMentors
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 mb-5">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={cn(
              "bg-muted/50 rounded-2xl p-4 animate-slide-up"
            )}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <p className="text-sm text-muted-foreground mb-1 font-medium">{stat.label}</p>
            <p className="font-display font-bold text-lg">{stat.value}</p>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <p className="text-sm text-muted-foreground">{stat.description}</p>
              {stat.mentorLink && (
                <a 
                  href={stat.mentorLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline flex items-center gap-1 font-medium"
                >
                  {stat.mentorLinkText}
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="text-base text-muted-foreground leading-relaxed">
        {summary.split('\n\n').map((paragraph, i) => (
          <p key={i} className={i > 0 ? 'mt-4' : ''}>
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}

import { Mentor } from '@/types/report';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MentorCardProps {
  mentor: Mentor;
  onConnect: (id: string) => void;
  onViewProfile: (id: string) => void;
}

export function MentorCard({ mentor, onConnect, onViewProfile }: MentorCardProps) {
  return (
    <div className="bg-card rounded-2xl p-5 shadow-soft animate-fade-in border border-border/50 active:scale-[0.99] transition-transform">
      <div className="flex items-start gap-4">
        <div className="h-14 w-14 rounded-full gradient-cool flex items-center justify-center shrink-0">
          {mentor.avatar ? (
            <img src={mentor.avatar} alt={mentor.name} className="h-full w-full rounded-full object-cover" />
          ) : (
            <span className="text-base font-display font-bold text-secondary-foreground">
              {mentor.initials}
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-base truncate">{mentor.name}</h3>
          <p className="text-sm text-muted-foreground">
            {mentor.program}, {mentor.university} · {mentor.year}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {mentor.specializations.map((spec) => (
          <Badge key={spec} variant="secondary" className="text-sm px-2.5 py-1">
            {spec}
          </Badge>
        ))}
      </div>

      <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
        {mentor.description}
      </p>

      <a
        href={mentor.ctaLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 text-sm text-primary hover:underline inline-flex items-center gap-1.5 font-medium"
      >
        {mentor.ctaText}
        <ExternalLink className="h-4 w-4" />
      </a>
    </div>
  );
}

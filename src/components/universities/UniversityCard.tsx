import { University } from '@/types/report';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, ChevronRight, ExternalLink, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UniversityCardProps {
  university: University;
  onSelect: (id: string) => void;
  isSelected?: boolean;
}

export function UniversityCard({ university, onSelect, isSelected = false }: UniversityCardProps) {
  return (
    <div 
      onClick={() => onSelect(university.id)}
      className={cn(
        "bg-card rounded-2xl p-5 shadow-soft border-2 transition-all duration-200 cursor-pointer animate-fade-in active:scale-[0.98]",
        isSelected ? "border-primary shadow-glow" : "border-transparent hover:border-primary/30"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="font-display font-bold text-lg leading-tight mb-1">
            {university.name}
          </h3>
          <p className="text-base text-muted-foreground">{university.program}</p>
        </div>
        <Badge 
          variant="outline" 
          className={cn(
            "shrink-0 text-sm py-1 px-2.5 capitalize font-medium",
            university.category === 'aspirational' && "border-primary/40 text-primary bg-primary/5",
            university.category === 'reach' && "border-accent/40 text-accent bg-accent/5",
            university.category === 'safety' && "border-safe/40 text-safe bg-safe/5"
          )}
        >
          {university.category}
        </Badge>
      </div>

      <div className="mt-4 space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          {university.cbseRequirement && (
            <span className="bg-muted/50 px-2 py-0.5 rounded-lg">CBSE: {university.cbseRequirement}</span>
          )}
          {university.lnatRequired && (
            <span className="bg-muted/50 px-2 py-0.5 rounded-lg">LNAT {university.lnatNote || 'required'}</span>
          )}
          <span className="flex items-center gap-1 bg-muted/50 px-2 py-0.5 rounded-lg">
            <MapPin className="h-4 w-4" />
            {university.location}
          </span>
        </div>

        <p className="text-sm text-foreground/80 line-clamp-2 leading-relaxed">
          {university.description}
          {university.mentorLink && (
            <a 
              href={university.mentorLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-primary hover:underline ml-1 inline-flex items-center gap-1 font-medium"
            >
              {university.mentorLinkText}
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </p>

        {/* Financials Section */}
        <div className="border-t border-border/50 pt-3 mt-3">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Financials</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-muted-foreground">Application Fee:</span>
              <p className="font-medium">{university.applicationFee || '—'}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Annual Tuition Fee:</span>
              <p className="font-medium">{university.programmeFee || '—'}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Annual Living Cost:</span>
              <p className="font-medium">{university.annualCostOfLiving || '—'}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Scholarships & Grants:</span>
              <p className="font-medium text-primary">{university.scholarships || '—'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <CheckCircle2 className="h-4 w-4 text-safe" />
          {university.fitNote}
        </span>
        {university.officialLink && (
          <a
            href={university.officialLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-sm text-primary hover:underline flex items-center gap-1 font-medium"
          >
            Official page <ChevronRight className="h-4 w-4" />
          </a>
        )}
      </div>
    </div>
  );
}

import { useState } from 'react';
import { University } from '@/types/report';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Plus, MapPin, FileText, CheckCircle2, Wallet } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CompareViewProps {
  universities: University[];
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
}

type CompareField = 'requirements' | 'location' | 'program' | 'fit' | 'financials';

const fieldConfig: Record<CompareField, { label: string; icon: React.ElementType }> = {
  requirements: { label: 'Requirements', icon: FileText },
  location: { label: 'Location', icon: MapPin },
  program: { label: 'Program', icon: FileText },
  fit: { label: 'Fit Assessment', icon: CheckCircle2 },
  financials: { label: 'Financials', icon: Wallet },
};

export function CompareView({ universities, selectedIds, onToggleSelect }: CompareViewProps) {
  const [activeField, setActiveField] = useState<CompareField>('requirements');
  const selectedUniversities = universities.filter(u => selectedIds.includes(u.id));

  const renderFieldValue = (uni: University, field: CompareField) => {
    switch (field) {
      case 'requirements':
        const reqs = [];
        if (uni.cbseRequirement) reqs.push(`CBSE: ${uni.cbseRequirement}`);
        if (uni.lnatRequired) reqs.push(`LNAT ${uni.lnatNote || 'required'}`);
        return reqs.join(' · ') || 'N/A';
      case 'location':
        return `${uni.location}, ${uni.country}`;
      case 'program':
        return uni.program;
      case 'fit':
        return uni.fitNote;
      case 'financials':
        const financials = [];
        if (uni.programmeFee) financials.push(`Programme Fee: ${uni.programmeFee}`);
        if (uni.annualCostOfLiving) financials.push(`Annual Cost of Living: ${uni.annualCostOfLiving}`);
        return financials.length > 0 ? (
          <div className="space-y-1">
            {financials.map((f, i) => (
              <div key={i}>{f}</div>
            ))}
          </div>
        ) : 'N/A';
    }
  };

  if (selectedIds.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <Plus className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="font-display text-lg font-semibold mb-2">Select universities to compare</h3>
        <p className="text-sm text-muted-foreground max-w-xs">
          Go to the Universities tab and tap on cards to select them for comparison
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-4">
      {/* Field selector */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 py-2">
        {(Object.keys(fieldConfig) as CompareField[]).map((field) => {
          const { label, icon: Icon } = fieldConfig[field];
          const isActive = activeField === field;
          return (
            <button
              key={field}
              onClick={() => setActiveField(field)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap shrink-0",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              <Icon className="h-4 w-4" />
              <span className="text-sm font-medium">{label}</span>
            </button>
          );
        })}
      </div>

      {/* Comparison cards */}
      <div className="space-y-3 px-4">
        {selectedUniversities.map((uni, index) => (
          <div 
            key={uni.id}
            className="bg-card rounded-xl p-4 shadow-soft animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <Badge 
                  variant="outline" 
                  className={cn(
                    "mb-2 text-xs capitalize",
                    uni.category === 'aspirational' && "border-primary/30 text-primary",
                    uni.category === 'reach' && "border-accent/30 text-accent",
                    uni.category === 'safety' && "border-safe/30 text-safe"
                  )}
                >
                  {uni.category}
                </Badge>
                <h4 className="font-display font-semibold">{uni.name}</h4>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => onToggleSelect(uni.id)}
                className="text-muted-foreground hover:text-destructive"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-base font-medium">
              {renderFieldValue(uni, activeField)}
            </div>
          </div>
        ))}
      </div>

      {selectedIds.length < 3 && (
        <div className="px-4">
          <Button variant="outline" className="w-full" onClick={() => {}}>
            <Plus className="h-4 w-4 mr-2" />
            Add more to compare
          </Button>
        </div>
      )}
    </div>
  );
}
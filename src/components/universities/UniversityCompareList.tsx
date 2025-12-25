import { GitCompare, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { mockUniversities } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/sonner';

interface UniversityCompareListProps {
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onCompareNow: () => void;
}

export function UniversityCompareList({ selectedIds, onToggleSelect, onCompareNow }: UniversityCompareListProps) {
  const handleSelect = (id: string) => {
    if (!selectedIds.includes(id) && selectedIds.length >= 4) {
      toast.error('Maximum 4 universities can be compared');
      return;
    }
    onToggleSelect(id);
  };

  return (
    <div className="space-y-4 px-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
          <GitCompare className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="font-display font-bold text-xl">Compare Universities</h2>
          <p className="text-sm text-muted-foreground">Select up to 4 universities to compare</p>
        </div>
      </div>

      {selectedIds.length > 0 && (
        <div className="bg-primary/10 rounded-2xl p-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-base">{selectedIds.length} selected</p>
              <p className="text-xs text-muted-foreground">
                {selectedIds.length < 2 ? 'Select at least 2 to compare' : 'Ready to compare'}
              </p>
            </div>
            <Button 
              onClick={onCompareNow}
              disabled={selectedIds.length < 2}
              size="lg"
              className="h-11"
            >
              <GitCompare className="h-4 w-4 mr-2" />
              Compare Now
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {mockUniversities.map((uni, index) => {
          const isSelected = selectedIds.includes(uni.id);
          return (
            <button
              key={uni.id}
              onClick={() => handleSelect(uni.id)}
              className={cn(
                "w-full bg-card rounded-2xl p-4 shadow-soft animate-slide-up text-left transition-all",
                isSelected && "ring-2 ring-primary bg-primary/5"
              )}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "h-6 w-6 rounded-lg border-2 flex items-center justify-center transition-colors",
                  isSelected ? "bg-primary border-primary" : "border-border"
                )}>
                  {isSelected && <Check className="h-4 w-4 text-primary-foreground" />}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-base truncate">{uni.name}</h3>
                  <p className="text-sm text-muted-foreground">{uni.program} • {uni.location}</p>
                </div>
                
                <span className={cn(
                  "text-xs px-2 py-1 rounded-full capitalize shrink-0",
                  uni.category === 'aspirational' && "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
                  uni.category === 'reach' && "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
                  uni.category === 'safety' && "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                )}>
                  {uni.category}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

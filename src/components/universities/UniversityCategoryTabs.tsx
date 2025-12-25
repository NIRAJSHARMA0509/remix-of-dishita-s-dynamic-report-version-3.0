import { cn } from '@/lib/utils';
import { Sparkles, Target, Shield } from 'lucide-react';

type Category = 'aspirational' | 'reach' | 'safety';

interface UniversityCategoryTabsProps {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
  counts: Record<Category, number>;
}

const categories = [
  { id: 'aspirational' as Category, label: 'Aspirational', icon: Sparkles, color: 'text-primary' },
  { id: 'reach' as Category, label: 'Reach', icon: Target, color: 'text-accent' },
  { id: 'safety' as Category, label: 'Safety', icon: Shield, color: 'text-safe' },
];

export function UniversityCategoryTabs({ activeCategory, onCategoryChange, counts }: UniversityCategoryTabsProps) {
  return (
    <div className="flex gap-3 px-4 py-4 overflow-x-auto no-scrollbar">
      {categories.map((cat) => {
        const Icon = cat.icon;
        const isActive = activeCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className={cn(
              "flex items-center gap-2 px-5 py-3 rounded-2xl transition-all duration-200 whitespace-nowrap shrink-0 active:scale-95",
              isActive
                ? "bg-card shadow-elevated border border-border"
                : "bg-muted/50 hover:bg-muted"
            )}
          >
            <Icon className={cn("h-5 w-5", isActive ? cat.color : "text-muted-foreground")} />
            <span className={cn(
              "text-base font-semibold",
              isActive ? "text-foreground" : "text-muted-foreground"
            )}>
              {cat.label}
            </span>
            <span className={cn(
              "text-sm px-2 py-0.5 rounded-full font-medium",
              isActive ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
            )}>
              {counts[cat.id]}
            </span>
          </button>
        );
      })}
    </div>
  );
}

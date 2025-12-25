import { GraduationCap, Clock, BookOpen, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Stat {
  label: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
  bgColor: string;
}

interface QuickStatsProps {
  stats: Stat[];
}

export function QuickStats({ stats }: QuickStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className={cn(
              "bg-card rounded-2xl p-5 shadow-soft animate-slide-up border border-border/50 active:scale-[0.98] transition-transform",
            )}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center mb-4", stat.bgColor)}>
              <Icon className={cn("h-6 w-6", stat.color)} />
            </div>
            <p className="text-3xl font-display font-bold leading-none">{stat.value}</p>
            <p className="text-base text-muted-foreground mt-1">{stat.label}</p>
          </div>
        );
      })}
    </div>
  );
}

export const defaultStats: Stat[] = [
  { label: 'Universities', value: 7, icon: GraduationCap, color: 'text-primary', bgColor: 'bg-primary/10' },
  { label: 'Mentors Available', value: 4, icon: Target, color: 'text-accent', bgColor: 'bg-accent/10' },
  { label: 'Scholarships', value: 4, icon: BookOpen, color: 'text-safe', bgColor: 'bg-safe/10' },
  { label: 'Timeline Phases', value: 4, icon: Clock, color: 'text-warning', bgColor: 'bg-warning/10' },
];

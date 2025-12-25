import { Home, GraduationCap, Calendar, Users, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

type TabId = 'home' | 'universities' | 'timeline' | 'mentors' | 'resources';

interface BottomNavProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const tabs = [
  { id: 'home' as TabId, label: 'Home', icon: Home },
  { id: 'universities' as TabId, label: 'Universities', icon: GraduationCap },
  { id: 'timeline' as TabId, label: 'Timeline', icon: Calendar },
  { id: 'mentors' as TabId, label: 'Mentors', icon: Users },
  { id: 'resources' as TabId, label: 'Resources', icon: BookOpen },
];

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/98 backdrop-blur-xl border-t border-border shadow-elevated pb-safe">
      <div className="flex items-center justify-around px-1 py-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 min-w-[64px] py-2 px-2 rounded-2xl transition-all duration-300 active:scale-95",
                isActive 
                  ? "text-primary-foreground bg-primary shadow-soft" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <Icon className={cn(
                "h-6 w-6 transition-all duration-300",
                isActive && "scale-110"
              )} />
              <span className={cn(
                "text-[11px] font-semibold transition-all leading-tight",
                isActive ? "opacity-100" : "opacity-80"
              )}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

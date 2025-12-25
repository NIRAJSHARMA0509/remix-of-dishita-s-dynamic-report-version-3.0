import { Home, GraduationCap, Calendar, Users, BookOpen, ArrowLeft, GitCompare, Award, Plus, MessageCircle, CreditCard, Book, Headphones, Monitor, Link2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MainNavId, SubNavId, NavigationState } from '@/types/navigation';

interface DynamicBottomNavProps {
  navState: NavigationState;
  onNavigate: (mainNav: MainNavId, subNav?: SubNavId | null) => void;
}

const mainTabs = [
  { id: 'home' as MainNavId, label: 'Home', icon: Home },
  { id: 'universities' as MainNavId, label: 'Universities', icon: GraduationCap },
  { id: 'timeline' as MainNavId, label: 'Timeline', icon: Calendar },
  { id: 'mentors' as MainNavId, label: 'Mentors', icon: Users },
  { id: 'resources' as MainNavId, label: 'Resources', icon: BookOpen },
];

const universitySubTabs = [
  { id: 'list' as SubNavId, label: 'List', icon: GraduationCap },
  { id: 'compare' as SubNavId, label: 'Compare', icon: GitCompare },
  { id: 'scholarships' as SubNavId, label: 'Scholarships', icon: Award },
  { id: 'add' as SubNavId, label: 'Add New', icon: Plus },
];

const timelineSubTabs = [
  { id: 'phase1' as SubNavId, label: 'Phase 1', icon: Calendar },
  { id: 'phase2' as SubNavId, label: 'Phase 2', icon: Calendar },
  { id: 'phase3' as SubNavId, label: 'Phase 3', icon: Calendar },
  { id: 'phase4' as SubNavId, label: 'Phase 4', icon: Calendar },
];

const mentorsSubTabs: Array<{ id: SubNavId; label: string; icon: typeof MessageCircle; badge?: string }> = [
  { id: 'connect', label: 'Connect', icon: Link2 },
  { id: 'chat-mentor', label: 'Chat', icon: MessageCircle, badge: 'FREE' },
  { id: 'credits', label: 'Credits', icon: CreditCard },
];

const resourcesSubTabs = [
  { id: 'reading' as SubNavId, label: 'Reading', icon: Book },
  { id: 'podcasts' as SubNavId, label: 'Podcasts', icon: Headphones },
  { id: 'courses' as SubNavId, label: 'Courses', icon: Monitor },
];

function getSubTabs(mainNav: MainNavId) {
  switch (mainNav) {
    case 'universities': return universitySubTabs;
    case 'timeline': return timelineSubTabs;
    case 'mentors': return mentorsSubTabs;
    case 'resources': return resourcesSubTabs;
    default: return null;
  }
}

function getDefaultSubNav(mainNav: MainNavId): SubNavId | null {
  switch (mainNav) {
    case 'universities': return 'list';
    case 'timeline': return 'phase1';
    case 'mentors': return 'connect';
    case 'resources': return 'courses';
    default: return null;
  }
}

export function DynamicBottomNav({ navState, onNavigate }: DynamicBottomNavProps) {
  const { mainNav, subNav } = navState;
  const subTabs = getSubTabs(mainNav);
  const isInSubMenu = subNav !== null && mainNav !== 'home';
  const isMentorChat = mainNav === 'mentor-chat';

  const handleMainTabClick = (tabId: MainNavId) => {
    if (tabId === 'home') {
      onNavigate('home', null);
    } else {
      const defaultSubNav = getDefaultSubNav(tabId);
      onNavigate(tabId, defaultSubNav);
    }
  };

  const handleBack = () => {
    if (isMentorChat) {
      onNavigate('mentors', 'chat-mentor');
    } else {
      onNavigate('home', null);
    }
  };

  const handleSubTabClick = (subId: SubNavId) => {
    onNavigate(mainNav, subId);
  };

  // Mentor chat view - simplified nav with back button
  if (isMentorChat) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/98 backdrop-blur-xl border-t border-border shadow-elevated pb-safe">
        <div className="flex items-center justify-around px-1 py-1">
          <button
            onClick={handleBack}
            className="flex flex-col items-center justify-center gap-0.5 min-w-[56px] py-2 px-2 rounded-2xl transition-all duration-300 active:scale-95 text-muted-foreground hover:text-foreground hover:bg-muted/50"
          >
            <ArrowLeft className="h-6 w-6" />
            <span className="text-[11px] font-semibold leading-tight opacity-80">Back</span>
          </button>
          {mainTabs.slice(0, 4).map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => handleMainTabClick(tab.id)}
                className="flex flex-col items-center justify-center gap-0.5 min-w-[56px] py-2 px-2 rounded-2xl transition-all duration-300 active:scale-95 text-muted-foreground hover:text-foreground hover:bg-muted/50"
              >
                <Icon className="h-5 w-5" />
                <span className="text-[10px] font-semibold leading-tight opacity-80">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/98 backdrop-blur-xl border-t border-border shadow-elevated pb-safe">
      <div className="flex items-center justify-around px-1 py-1">
        {isInSubMenu ? (
          <>
            <button
              onClick={handleBack}
              className="flex flex-col items-center justify-center gap-0.5 min-w-[56px] py-2 px-2 rounded-2xl transition-all duration-300 active:scale-95 text-muted-foreground hover:text-foreground hover:bg-muted/50"
            >
              <ArrowLeft className="h-6 w-6" />
              <span className="text-[11px] font-semibold leading-tight opacity-80">Back</span>
            </button>
            
            {subTabs?.map((tab) => {
              const Icon = tab.icon;
              const isActive = subNav === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleSubTabClick(tab.id)}
                  className={cn(
                    "flex flex-col items-center justify-center gap-0.5 min-w-[56px] py-2 px-2 rounded-2xl transition-all duration-300 active:scale-95 relative",
                    isActive 
                      ? "text-primary-foreground bg-primary shadow-soft" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  {'badge' in tab && (tab as { badge?: string }).badge && (
                    <span className="absolute -top-1 -right-1 text-[8px] font-bold bg-accent text-accent-foreground px-1.5 py-0.5 rounded-full">
                      {(tab as { badge?: string }).badge}
                    </span>
                  )}
                  <Icon className={cn(
                    "h-5 w-5 transition-all duration-300",
                    isActive && "scale-110"
                  )} />
                  <span className={cn(
                    "text-[10px] font-semibold transition-all leading-tight",
                    isActive ? "opacity-100" : "opacity-80"
                  )}>
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </>
        ) : (
          mainTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = mainNav === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleMainTabClick(tab.id)}
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
          })
        )}
      </div>
    </nav>
  );
}

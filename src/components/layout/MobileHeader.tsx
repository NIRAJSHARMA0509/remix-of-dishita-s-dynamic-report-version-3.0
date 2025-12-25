import { ChevronLeft, Bell, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import edumentorLogo from '@/assets/edumentor-logo.png';

interface MobileHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
}

export function MobileHeader({ title, subtitle, showBack = false, onBack }: MobileHeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-xl border-b border-border/30 shadow-soft">
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          {showBack ? (
            <Button variant="ghost" size="icon" onClick={onBack} className="shrink-0 h-11 w-11">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          ) : (
            <img src={edumentorLogo} alt="eduMentor" className="h-10 w-auto" />
          )}
          <div className="min-w-0">
            <h1 className="font-display text-xl font-bold truncate">{title}</h1>
            {subtitle && (
              <p className="text-sm text-muted-foreground truncate">{subtitle}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="relative h-11 w-11">
            <Bell className="h-6 w-6" />
            <span className="absolute top-2 right-2 h-2.5 w-2.5 bg-primary rounded-full animate-pulse" />
          </Button>
          <Button variant="ghost" size="icon" className="h-11 w-11">
            <MoreVertical className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </header>
  );
}
import { CheckCircle2, Circle, XCircle, ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface YourProgressProps {
  total: number;
  completed: number;
  inProcess: number;
  yetToStart: number;
  givenUp: number;
  percentage: number;
  onUpdateNow?: () => void;
}

export function YourProgress({ total, completed, inProcess, yetToStart, givenUp, percentage, onUpdateNow }: YourProgressProps) {
  return (
    <div className="bg-card rounded-2xl p-5 shadow-soft animate-slide-up border border-border/50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-lg">Your Progress</h3>
        <Button 
          variant="default" 
          size="sm"
          onClick={onUpdateNow}
          className="gap-1.5"
        >
          Update Now
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Progress bar */}
      <div className="h-4 bg-muted rounded-full overflow-hidden mb-4">
        <div 
          className="h-full bg-gradient-to-r from-primary to-safe transition-all duration-500 ease-out rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      {/* Percentage display */}
      <p className="text-3xl font-display font-bold text-center mb-4">
        {percentage}%
        <span className="text-base font-normal text-muted-foreground ml-2">complete</span>
      </p>
      
      {/* Stats breakdown */}
      <div className="grid grid-cols-4 gap-2 text-center">
        <div className="bg-safe/10 rounded-xl p-3">
          <CheckCircle2 className="h-5 w-5 text-safe mx-auto mb-1" />
          <p className="text-xl font-bold text-safe">{completed}</p>
          <p className="text-xs text-muted-foreground">Done</p>
        </div>
        <div className="bg-accent/10 rounded-xl p-3">
          <Play className="h-5 w-5 text-accent mx-auto mb-1" />
          <p className="text-xl font-bold text-accent">{inProcess}</p>
          <p className="text-xs text-muted-foreground">In Process</p>
        </div>
        <div className="bg-muted rounded-xl p-3">
          <Circle className="h-5 w-5 text-muted-foreground mx-auto mb-1" />
          <p className="text-xl font-bold">{yetToStart}</p>
          <p className="text-xs text-muted-foreground">Yet to Start</p>
        </div>
        <div className="bg-destructive/10 rounded-xl p-3">
          <XCircle className="h-5 w-5 text-destructive mx-auto mb-1" />
          <p className="text-xl font-bold text-destructive">{givenUp}</p>
          <p className="text-xs text-muted-foreground">Skipped</p>
        </div>
      </div>
    </div>
  );
}

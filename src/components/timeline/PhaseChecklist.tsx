import { useState } from 'react';
import { Check, X, ChevronDown, Play } from 'lucide-react';
import { ChecklistTask, TaskStatus } from '@/types/checklist';
import { cn } from '@/lib/utils';

interface PhaseChecklistProps {
  tasks: ChecklistTask[];
  onUpdateStatus: (taskId: string, status: TaskStatus) => void;
}

export function PhaseChecklist({ tasks, onUpdateStatus }: PhaseChecklistProps) {
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  // Debug: Log task statuses
  console.log('PhaseChecklist tasks:', tasks.map(t => ({ id: t.id, status: t.status })));

  const handleTaskClick = (taskId: string, currentStatus: TaskStatus) => {
    console.log('Task clicked:', taskId, 'status:', currentStatus, 'canModify:', canModify(currentStatus));
    if (currentStatus === 'completed' || currentStatus === 'given-up') return;
    setSelectedTaskId(selectedTaskId === taskId ? null : taskId);
  };

  const handleAction = (taskId: string, status: TaskStatus) => {
    onUpdateStatus(taskId, status);
    setSelectedTaskId(null);
  };

  const canModify = (status: TaskStatus) => status === 'yet-to-start' || status === 'in-process';

  return (
    <div className="bg-card rounded-2xl p-4 shadow-soft mt-4">
      <h3 className="font-display font-semibold text-lg mb-3 flex items-center gap-2">
        <Check className="h-5 w-5 text-primary" />
        Action Checklist
      </h3>
      
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li key={task.id} className="animate-fade-in">
            <button
              onClick={() => handleTaskClick(task.id, task.status)}
              disabled={!canModify(task.status)}
              className={cn(
                "w-full text-left p-3 rounded-xl transition-all flex items-start gap-3",
                task.status === 'yet-to-start' && "bg-muted/50 hover:bg-muted active:scale-[0.99]",
                task.status === 'in-process' && "bg-accent/10 hover:bg-accent/20 active:scale-[0.99]",
                task.status === 'completed' && "bg-safe/10",
                task.status === 'given-up' && "bg-destructive/10",
                selectedTaskId === task.id && "ring-2 ring-primary"
              )}
            >
              {/* Status indicator */}
              <span className={cn(
                "h-6 w-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5",
                task.status === 'yet-to-start' && "border-muted-foreground",
                task.status === 'in-process' && "border-accent bg-accent",
                task.status === 'completed' && "border-safe bg-safe",
                task.status === 'given-up' && "border-destructive bg-destructive"
              )}>
                {task.status === 'in-process' && <Play className="h-3 w-3 text-white fill-white" />}
                {task.status === 'completed' && <Check className="h-4 w-4 text-white" />}
                {task.status === 'given-up' && <X className="h-4 w-4 text-white" />}
              </span>
              
              {/* Task text */}
              <span className={cn(
                "flex-1 text-base",
                task.status === 'in-process' && "text-accent font-medium",
                task.status === 'completed' && "text-safe font-medium",
                task.status === 'given-up' && "text-destructive line-through"
              )}>
                {task.text}
              </span>
              
              {/* Expand indicator for modifiable tasks */}
              {canModify(task.status) && (
                <ChevronDown className={cn(
                  "h-5 w-5 text-muted-foreground transition-transform shrink-0",
                  selectedTaskId === task.id && "rotate-180"
                )} />
              )}
            </button>
            
            {/* Action buttons - show for selected modifiable task */}
            {selectedTaskId === task.id && canModify(task.status) && (
              <div className="flex flex-col gap-2 mt-2 ml-9 animate-fade-in">
                {task.status === 'yet-to-start' && (
                  <button
                    onClick={() => handleAction(task.id, 'in-process')}
                    className="w-full py-2.5 px-4 rounded-xl bg-accent text-white font-medium text-base flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
                  >
                    <Play className="h-5 w-5" />
                    Mark Started
                  </button>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAction(task.id, 'completed')}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-safe text-white font-medium text-base flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
                  >
                    <Check className="h-5 w-5" />
                    Completed
                  </button>
                  <button
                    onClick={() => handleAction(task.id, 'given-up')}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-destructive text-white font-medium text-base flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
                  >
                    <X className="h-5 w-5" />
                    Give Up
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

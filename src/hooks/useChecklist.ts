import { useState, useEffect, useCallback } from 'react';
import { PhaseChecklist, TaskStatus, initialChecklists } from '@/types/checklist';

const STORAGE_KEY = 'edumentor-checklist';

// Migrate old 'pending' status to 'yet-to-start'
function migrateChecklists(checklists: PhaseChecklist[]): PhaseChecklist[] {
  return checklists.map(phase => ({
    ...phase,
    tasks: phase.tasks.map(task => ({
      ...task,
      status: (task.status as string) === 'pending' ? 'yet-to-start' : task.status
    }))
  }));
}

export function useChecklist() {
  const [checklists, setChecklists] = useState<PhaseChecklist[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return migrateChecklists(parsed);
      } catch {
        return initialChecklists;
      }
    }
    return initialChecklists;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checklists));
  }, [checklists]);

  const updateTaskStatus = useCallback((taskId: string, status: TaskStatus) => {
    setChecklists(prev => 
      prev.map(phase => ({
        ...phase,
        tasks: phase.tasks.map(task => 
          task.id === taskId ? { ...task, status } : task
        ),
      }))
    );
  }, []);

  const getPhaseChecklist = useCallback((phaseId: string) => {
    return checklists.find(c => c.phaseId === phaseId)?.tasks || [];
  }, [checklists]);

  const getProgress = useCallback(() => {
    const allTasks = checklists.flatMap(c => c.tasks);
    const total = allTasks.length;
    const completed = allTasks.filter(t => t.status === 'completed').length;
    const inProcess = allTasks.filter(t => t.status === 'in-process').length;
    const yetToStart = allTasks.filter(t => t.status === 'yet-to-start').length;
    const givenUp = allTasks.filter(t => t.status === 'given-up').length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    return { total, completed, inProcess, yetToStart, givenUp, percentage };
  }, [checklists]);

  const getPhaseProgress = useCallback((phaseId: string) => {
    const tasks = getPhaseChecklist(phaseId);
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'completed').length;
    return { total, completed };
  }, [getPhaseChecklist]);

  return {
    checklists,
    updateTaskStatus,
    getPhaseChecklist,
    getProgress,
    getPhaseProgress,
  };
}

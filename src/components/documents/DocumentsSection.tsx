import { FileText, Upload, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface Document {
  id: string;
  name: string;
  type: string;
  status: 'complete' | 'in-progress' | 'pending' | 'missing';
  progress?: number;
}

const mockDocuments: Document[] = [
  { id: '1', name: 'Personal Statement', type: 'Essay', status: 'complete' },
  { id: '2', name: 'Portfolio', type: 'Creative', status: 'in-progress', progress: 60 },
  { id: '3', name: 'Recommendation Letter 1', type: 'Reference', status: 'pending' },
  { id: '4', name: 'Academic Transcript', type: 'Official', status: 'missing' },
];

const statusConfig = {
  complete: { icon: CheckCircle2, color: 'text-safe', bgColor: 'bg-safe/10', label: 'Complete' },
  'in-progress': { icon: Clock, color: 'text-warning', bgColor: 'bg-warning/10', label: 'In Progress' },
  pending: { icon: Clock, color: 'text-muted-foreground', bgColor: 'bg-muted', label: 'Pending' },
  missing: { icon: AlertCircle, color: 'text-destructive', bgColor: 'bg-destructive/10', label: 'Missing' },
};

export function DocumentsSection() {
  const completedCount = mockDocuments.filter(d => d.status === 'complete').length;
  const totalCount = mockDocuments.length;
  const overallProgress = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="px-4 pb-4 space-y-4">
      {/* Overview */}
      <div className="bg-card rounded-2xl p-4 shadow-soft">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display font-semibold">Documents Overview</h3>
          <span className="text-sm text-muted-foreground">{completedCount}/{totalCount}</span>
        </div>
        <Progress value={overallProgress} className="h-2 mb-3" />
        <p className="text-sm text-muted-foreground">
          {overallProgress}% of required documents ready
        </p>
      </div>

      {/* Document list */}
      <div className="space-y-2">
        {mockDocuments.map((doc, index) => {
          const status = statusConfig[doc.status];
          const StatusIcon = status.icon;
          return (
            <div
              key={doc.id}
              className="bg-card rounded-xl p-4 shadow-soft animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-3">
                <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center shrink-0", status.bgColor)}>
                  <FileText className={cn("h-5 w-5", status.color)} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-sm truncate">{doc.name}</p>
                    <span className="text-xs text-muted-foreground px-2 py-0.5 bg-muted rounded-full">
                      {doc.type}
                    </span>
                  </div>
                  {doc.status === 'in-progress' && doc.progress !== undefined ? (
                    <div className="flex items-center gap-2">
                      <Progress value={doc.progress} className="h-1.5 flex-1" />
                      <span className="text-xs text-muted-foreground">{doc.progress}%</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <StatusIcon className={cn("h-3.5 w-3.5", status.color)} />
                      <span className={cn("text-xs", status.color)}>{status.label}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Upload button */}
      <Button variant="outline" className="w-full">
        <Upload className="h-4 w-4 mr-2" />
        Upload Document
      </Button>
    </div>
  );
}

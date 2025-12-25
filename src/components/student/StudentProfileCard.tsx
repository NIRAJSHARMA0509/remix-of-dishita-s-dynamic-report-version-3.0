import { Student } from '@/types/report';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface StudentProfileCardProps {
  student: Student;
}

export function StudentProfileCard({ student }: StudentProfileCardProps) {
  return (
    <div className="bg-card rounded-3xl p-6 shadow-elevated animate-slide-up border border-border/50">
      <div className="flex items-center gap-2 mb-4">
        <span className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse" />
        <span className="text-sm text-muted-foreground uppercase tracking-wider font-medium">
          {student.currentStage} · {student.program}
        </span>
      </div>

      <h1 className="font-display text-2xl font-bold mb-2 leading-tight">
        Your Strategic Roadmap, {student.name.split(' ')[0]}
      </h1>
      <p className="text-base text-muted-foreground mb-5 leading-relaxed">
        A multi-year plan to reach a top UK law school by September 2027. This report evolves as you chat with it.
      </p>

      <div className="flex flex-wrap gap-2.5 mb-5">
        <Badge variant="secondary" className="text-sm py-1.5 px-3">
          <strong className="mr-1">Target</strong> · {student.targetIntake}
        </Badge>
        <Badge variant="secondary" className="text-sm py-1.5 px-3">
          <strong className="mr-1">CBSE</strong> · {student.cbseGoal}
        </Badge>
        <Badge variant="secondary" className="text-sm py-1.5 px-3">
          <strong className="mr-1">LNAT</strong> · {student.lnatTarget}
        </Badge>
        <Badge variant="outline" className="text-sm py-1.5 px-3">
          <strong className="mr-1">EduMentors</strong> · Real students
        </Badge>
        <Badge variant="outline" className="text-sm py-1.5 px-3">
          <strong className="mr-1">Chat</strong> · Update anytime
        </Badge>
      </div>
    </div>
  );
}

import { Monitor, ExternalLink } from 'lucide-react';
import { onlineCourses } from '@/data/resourcesData';
import { Badge } from '@/components/ui/badge';

export function OnlineCoursesSection() {
  return (
    <div className="space-y-4 px-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="h-12 w-12 rounded-2xl bg-secondary/50 flex items-center justify-center">
          <Monitor className="h-6 w-6 text-foreground" />
        </div>
        <div>
          <h2 className="font-display font-bold text-xl">Online Courses</h2>
          <p className="text-sm text-muted-foreground">The gold standard for pre-law students</p>
        </div>
      </div>

      <div className="space-y-3">
        {onlineCourses.map((course, index) => (
          <div 
            key={course.id}
            className="bg-card rounded-2xl p-4 shadow-soft animate-slide-up"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-semibold text-base flex-1">{course.title}</h3>
              <Badge variant="outline" className="text-xs shrink-0">
                {course.platform}
              </Badge>
            </div>
            
            <p className="text-sm text-muted-foreground mb-2">{course.university}</p>
            
            <div className="bg-muted/50 rounded-xl p-3 mb-3">
              <p className="text-xs font-medium text-primary mb-1">Best For:</p>
              <p className="text-sm">{course.bestFor}</p>
            </div>
            
            <p className="text-sm text-foreground/90 mb-3">{course.description}</p>
            
            {course.link && (
              <a 
                href={course.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline inline-flex items-center gap-1"
              >
                View Course <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

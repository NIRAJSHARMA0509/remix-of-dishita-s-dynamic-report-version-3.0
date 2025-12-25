import { Book } from 'lucide-react';
import { essentialReadings } from '@/data/resourcesData';

export function EssentialReadingSection() {
  return (
    <div className="space-y-4 px-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
          <Book className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="font-display font-bold text-xl">Essential Reading</h2>
          <p className="text-sm text-muted-foreground">Must-read books for aspiring law students</p>
        </div>
      </div>

      <div className="space-y-3">
        {essentialReadings.map((book, index) => (
          <div 
            key={book.id}
            className="bg-card rounded-2xl p-4 shadow-soft animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <h3 className="font-semibold text-base">{book.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">by {book.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

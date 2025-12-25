import { Headphones } from 'lucide-react';
import { podcasts } from '@/data/resourcesData';

export function PodcastsSection() {
  return (
    <div className="space-y-4 px-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="h-12 w-12 rounded-2xl bg-accent/10 flex items-center justify-center">
          <Headphones className="h-6 w-6 text-accent" />
        </div>
        <div>
          <h2 className="font-display font-bold text-xl">Listen & Learn</h2>
          <p className="text-sm text-muted-foreground">Podcasts to expand your legal knowledge</p>
        </div>
      </div>

      <div className="space-y-3">
        {podcasts.map((podcast, index) => (
          <div 
            key={podcast.id}
            className="bg-card rounded-2xl p-4 shadow-soft animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <h3 className="font-semibold text-base">{podcast.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{podcast.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

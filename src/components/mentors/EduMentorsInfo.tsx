import { Search, ExternalLink } from 'lucide-react';

interface EduMentorsInfoProps {
  title: string;
  description: string;
  link: string;
  linkText: string;
}

export function EduMentorsInfo({ title, description, link, linkText }: EduMentorsInfoProps) {
  return (
    <div className="bg-muted/30 rounded-xl p-3 border border-dashed border-border animate-slide-up">
      <div className="flex items-start gap-3">
        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
          <Search className="h-4 w-4 text-primary" />
        </div>
        <div className="text-xs">
          <p className="font-semibold mb-1">{title}</p>
          <p className="text-muted-foreground leading-relaxed">
            {description}
            <a 
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline ml-1 inline-flex items-center gap-0.5"
            >
              {linkText}
              <ExternalLink className="h-3 w-3" />
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

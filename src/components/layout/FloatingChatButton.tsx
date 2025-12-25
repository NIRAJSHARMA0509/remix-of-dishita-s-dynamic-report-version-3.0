import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FloatingChatButtonProps {
  onClick: () => void;
  hasUnread?: boolean;
}

export function FloatingChatButton({ onClick, hasUnread = false }: FloatingChatButtonProps) {
  return (
    <Button
      variant="fab"
      size="fab"
      onClick={onClick}
      className="fixed right-4 bottom-28 z-50 animate-float h-16 w-16"
    >
      <MessageCircle className="h-7 w-7" />
      {hasUnread && (
        <span className="absolute -top-1 -right-1 h-5 w-5 bg-accent rounded-full flex items-center justify-center text-xs font-bold text-accent-foreground">
          1
        </span>
      )}
    </Button>
  );
}

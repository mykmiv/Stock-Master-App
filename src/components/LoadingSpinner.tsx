import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  text?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
};

export function LoadingSpinner({ 
  text, 
  size = 'md', 
  className 
}: LoadingSpinnerProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-4 py-12', className)}>
      <Loader2 className={cn('animate-spin text-primary', sizeMap[size])} />
      {text && <p className="text-sm text-muted-foreground">{text}</p>}
    </div>
  );
}

export function LoadingPage({ text = 'Loading...' }: { text?: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <LoadingSpinner text={text} size="lg" />
    </div>
  );
}

export function LoadingOverlay({ text }: { text?: string }) {
  return (
    <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <LoadingSpinner text={text} />
    </div>
  );
}

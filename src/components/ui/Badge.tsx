import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

export type BadgeTone = 'green' | 'red' | 'purple' | 'indigo';

const tones: Record<BadgeTone, string> = {
  green: 'bg-emerald-400 text-emerald-950',
  red: 'bg-rose-400 text-rose-950',
  purple: 'bg-violet-300 text-violet-950',
  indigo: 'bg-indigo-600 text-white',
};

export function Badge({ tone, children, className }: { tone: BadgeTone; children: ReactNode; className?: string }) {
  return (
    <span className={cn('inline-block rounded-full px-3 py-1 text-xs font-semibold', tones[tone], className)}>
      {children}
    </span>
  );
}

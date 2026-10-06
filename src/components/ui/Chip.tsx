import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

export function Chip({ icon, children, className }: { icon?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-lg bg-white px-2.5 py-1 text-xs font-medium text-slate-800',
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}

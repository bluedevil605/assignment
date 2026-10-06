import type { HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  highlighted?: boolean;
}

export function Card({ highlighted, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border bg-white shadow-sm',
        highlighted ? 'border-indigo-300 bg-indigo-50/60' : 'border-slate-200',
        className,
      )}
      {...props}
    />
  );
}

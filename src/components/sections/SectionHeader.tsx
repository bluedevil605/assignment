import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  align?: 'left' | 'center';
  actions?: ReactNode; // e.g. carousel arrows
}

export function SectionHeader({ eyebrow, title, subtitle, align = 'left', actions }: SectionHeaderProps) {
  return (
    <div className={cn('flex items-start justify-between gap-4', align === 'center' && 'flex-col items-center text-center')}>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">{eyebrow}</p>
        <h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">{title}</h2>
        <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
      </div>
      {actions && <div className="flex shrink-0 gap-3">{actions}</div>}
    </div>
  );
}

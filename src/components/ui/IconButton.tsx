import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  'aria-label': string; // required for accessibility
  bordered?: boolean;
}

export function IconButton({ icon, bordered = true, className, ...props }: IconButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        'flex h-10 w-10 items-center justify-center rounded-full text-slate-800 transition',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
        'disabled:cursor-not-allowed disabled:opacity-40',
        bordered ? 'border border-slate-200 bg-white hover:bg-slate-50' : 'hover:bg-slate-100',
        className,
      )}
      {...props}
    >
      {icon}
    </button>
  );
}

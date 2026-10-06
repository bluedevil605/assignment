import { Box, Check, Users, Zap } from 'lucide-react';
import type { ReactNode } from 'react';
import type { Plan } from '../../types';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { cn } from '../../utils/cn';

const PLAN_ICONS: Record<string, ReactNode> = {
  starter: <Box size={20} />,
  pro: <Zap size={20} />,
  enterprise: <Users size={20} />,
};

interface PricingCardProps {
  plan: Plan;
  onSelect?: (planId: string) => void;
}

export function PricingCard({ plan, onSelect }: PricingCardProps) {
  return (
    <Card highlighted={plan.highlighted} className="relative flex flex-col p-6">
      {plan.popular && (
        <Badge tone="indigo" className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap">
          Most Popular
        </Badge>
      )}

      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              'flex h-11 w-11 items-center justify-center rounded-xl',
              plan.highlighted ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-700',
            )}
          >
            {PLAN_ICONS[plan.id] ?? <Box size={20} />}
          </span>
          <div>
            <h3 className="font-semibold text-slate-900">{plan.name}</h3>
            <p className="text-xs text-slate-500">{plan.tagline}</p>
          </div>
        </div>
        <p className="text-right">
          <span className="text-2xl font-bold text-slate-900">
            {plan.currency}
            {plan.price.toLocaleString('en-IN')}
          </span>
          <span className="block text-xs text-slate-500">/ {plan.period}</span>
        </p>
      </div>

      <ul className="mt-6 space-y-3">
        {plan.features.map(feature => (
          <li key={feature} className="flex items-center gap-3 text-sm text-slate-600">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-700">
              <Check size={12} strokeWidth={3} />
            </span>
            {feature}
          </li>
        ))}
      </ul>

      <Button
        variant={plan.highlighted ? 'primary' : 'outline'}
        fullWidth
        className="mt-8"
        onClick={() => onSelect?.(plan.id)}
      >
        {plan.ctaLabel}
      </Button>
    </Card>
  );
}

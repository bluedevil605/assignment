import { usePlans } from '../../hooks/usePlans';
import { SectionHeader } from '../sections/SectionHeader';
import { EmptyState, ErrorState } from '../ui/StateViews';
import { Skeleton } from '../ui/Skeleton';
import { PricingCard } from './PricingCard';

export function PricingSection() {
  const { data: plans, loading, error, refetch } = usePlans();

  return (
    <section className="min-w-0 rounded-3xl border border-slate-200 bg-white p-8" aria-labelledby="pricing-title">
      <SectionHeader
        align="center"
        eyebrow="Choose Your Plan"
        title="Simple Plans for Everyone"
        subtitle="Get started with the plan that suits your needs. Upgrade anytime."
      />

      <div className="mt-10">
        {error ? (
          <ErrorState message="We couldn't load pricing. Check your connection and try again." onRetry={refetch} />
        ) : loading ? (
          <div className="grid gap-6 md:grid-cols-3">
            {Array.from({ length: 3 }, (_, i) => (
              <Skeleton key={i} className="h-80 rounded-2xl" />
            ))}
          </div>
        ) : !plans || plans.length === 0 ? (
          <EmptyState message="Plans are not available right now." />
        ) : (
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            {plans.map(plan => (
              <PricingCard key={plan.id} plan={plan} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

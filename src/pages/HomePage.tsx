import { EventsSection } from '../components/events/EventsSection';
import { TeamSection } from '../components/team/TeamSection';
import { PricingSection } from '../components/pricing/PricingSection';

export function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 p-4 text-slate-900 sm:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
          <EventsSection />
          <TeamSection />
        </div>
        <PricingSection />
      </div>
    </main>
  );
}

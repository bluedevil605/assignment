import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTeam } from '../../hooks/useTeam';
import { SectionHeader } from '../sections/SectionHeader';
import { CarouselArrows } from '../sections/CarouselArrows';
import { IconButton } from '../ui/IconButton';
import { EmptyState, ErrorState } from '../ui/StateViews';
import { Skeleton } from '../ui/Skeleton';
import { TeamMemberCard } from './TeamMemberCard';

export function TeamSection() {
  const { data: team, loading, error, refetch } = useTeam();
  const [index, setIndex] = useState(0);
  const count = team?.length ?? 0;

  // Keep the index valid if the data changes.
  useEffect(() => {
    if (index > 0 && index >= count) setIndex(0);
  }, [count, index]);

  const canPrev = index > 0;
  const canNext = index < count - 1;
  const prev = () => setIndex(i => Math.max(0, i - 1));
  const next = () => setIndex(i => Math.min(count - 1, i + 1));

  return (
    <section
      className="min-w-0 rounded-3xl border border-slate-200 bg-gradient-to-br from-indigo-50 via-violet-50 to-rose-50 p-8"
      aria-labelledby="team-title"
    >
      <SectionHeader
        eyebrow="Our Team"
        title="Meet Our Team"
        subtitle="Passionate builders, creators and problem solvers working together to build a better future."
        actions={<CarouselArrows canPrev={canPrev} canNext={canNext} onPrev={prev} onNext={next} />}
      />

      <div className="relative mt-6">
        {error ? (
          <ErrorState message="We couldn't load the team. Check your connection and try again." onRetry={refetch} />
        ) : loading ? (
          <Skeleton className="h-72 w-full rounded-2xl" />
        ) : count === 0 ? (
          <EmptyState message="Team members will appear here soon." />
        ) : (
          <>
            <div aria-live="polite">
              <TeamMemberCard key={team![index].id} member={team![index]} />
            </div>
            {count > 1 && (
              <>
                <IconButton
                  aria-label="Previous team member"
                  icon={<ChevronLeft size={18} />}
                  disabled={!canPrev}
                  onClick={prev}
                  className="absolute -left-4 top-1/2 hidden -translate-y-1/2 shadow-sm sm:flex"
                />
                <IconButton
                  aria-label="Next team member"
                  icon={<ChevronRight size={18} />}
                  disabled={!canNext}
                  onClick={next}
                  className="absolute -right-4 top-1/2 hidden -translate-y-1/2 shadow-sm sm:flex"
                />
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
}

import { useNavigate } from 'react-router-dom';
import { useEvents } from '../../hooks/useEvents';
import { useBookmarks } from '../../hooks/useBookmarks';
import { useCarousel } from '../../hooks/useCarousel';
import { SectionHeader } from '../sections/SectionHeader';
import { CarouselArrows } from '../sections/CarouselArrows';
import { EmptyState, ErrorState } from '../ui/StateViews';
import { EventCard } from './EventCard';
import { EventCardSkeleton } from './EventCardSkeleton';

export function EventsSection() {
  const { data: events, loading, error, refetch } = useEvents();
  const { isBookmarked, toggle } = useBookmarks();
  const navigate = useNavigate();
  const carousel = useCarousel<HTMLDivElement>(events?.length ?? 0);

  return (
    <section className="min-w-0 rounded-3xl border border-slate-200 bg-white p-8" aria-labelledby="events-title">
      <SectionHeader
        eyebrow="Discover"
        title="Upcoming Events"
        subtitle="Explore and join the most exciting events happening on campus."
        actions={
          <CarouselArrows
            canPrev={carousel.canPrev}
            canNext={carousel.canNext}
            onPrev={carousel.prev}
            onNext={carousel.next}
          />
        }
      />

      <div className="mt-6">
        {error ? (
          <ErrorState message="We couldn't load events. Check your connection and try again." onRetry={refetch} />
        ) : !loading && events?.length === 0 ? (
          <EmptyState message="No upcoming events right now. Check back soon." />
        ) : (
          <div ref={carousel.ref} className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none]">
            {loading
              ? Array.from({ length: 3 }, (_, i) => <EventCardSkeleton key={i} />)
              : events!.map(event => (
                  <EventCard
                    key={event.id}
                    event={event}
                    bookmarked={isBookmarked(event.id)}
                    onToggleBookmark={toggle}
                    onViewDetails={id => navigate(`/events/${id}`)}
                  />
                ))}
          </div>
        )}
      </div>
    </section>
  );
}

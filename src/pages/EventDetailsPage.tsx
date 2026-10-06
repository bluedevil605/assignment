import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Bookmark, Calendar, MapPin, Users } from 'lucide-react';
import { useEvents } from '../hooks/useEvents';
import { useBookmarks } from '../hooks/useBookmarks';
import { useRegistrations } from '../hooks/useRegistrations';
import { getEventStatus, STATUS_LABEL } from '../utils/eventStatus';
import { AvatarGroup } from '../components/ui/AvatarGroup';
import { Badge, type BadgeTone } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Skeleton } from '../components/ui/Skeleton';
import { ErrorState } from '../components/ui/StateViews';
import { cn } from '../utils/cn';

const STATUS_TONE: Record<string, BadgeTone> = {
  open: 'green',
  full: 'red',
  'coming-soon': 'purple',
};

const longDate = (iso: string) =>
  new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(
    new Date(iso),
  );

export function EventDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: events, loading, error, refetch } = useEvents();
  const { isBookmarked, toggle: toggleBookmark } = useBookmarks();
  const { isRegistered, toggle: toggleRegistration } = useRegistrations();
  const [imgFailed, setImgFailed] = useState(false);

  const event = events?.find(e => e.id === id);

  return (
    <main className="min-h-screen bg-slate-50 p-4 text-slate-900 sm:p-6">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/"
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-indigo-600"
        >
          <ArrowLeft size={16} /> All events
        </Link>

        {error ? (
          <ErrorState message="We couldn't load this event. Check your connection and try again." onRetry={refetch} />
        ) : loading ? (
          <Skeleton className="h-96 w-full rounded-2xl" />
        ) : !event ? (
          <Card className="p-10 text-center">
            <h1 className="text-xl font-semibold">Event not found</h1>
            <p className="mt-2 text-sm text-slate-500">It may have been removed or the link is incorrect.</p>
          </Card>
        ) : (
          (() => {
            const status = getEventStatus(event);
            const registered = isRegistered(event.id);
            const count = event.attendeeCount + (registered ? 1 : 0);
            const spotsLeft = Math.max(0, event.capacity - count);
            const percent = Math.min(100, Math.round((count / event.capacity) * 100));

            let action;
            if (status === 'coming-soon' && event.registrationOpensAt) {
              action = (
                <Button disabled fullWidth>
                  Registration opens {longDate(event.registrationOpensAt)}
                </Button>
              );
            } else if (status === 'full' && !registered) {
              action = (
                <Button disabled fullWidth>
                  This event is full
                </Button>
              );
            } else if (registered) {
              action = (
                <Button variant="outline" fullWidth onClick={() => toggleRegistration(event.id)}>
                  You're registered · Cancel registration
                </Button>
              );
            } else {
              action = (
                <Button fullWidth onClick={() => toggleRegistration(event.id)}>
                  Register for this event
                </Button>
              );
            }

            return (
              <Card className="overflow-hidden p-0">
                <div className="relative h-56 bg-gradient-to-br from-indigo-900 to-violet-700 sm:h-72">
                  {!imgFailed && (
                    <img
                      src={event.image}
                      alt=""
                      onError={() => setImgFailed(true)}
                      className="h-full w-full object-cover"
                    />
                  )}
                  <Badge tone={STATUS_TONE[status]} className="absolute left-4 top-4">
                    {STATUS_LABEL[status]}
                  </Badge>
                </div>

                <div className="space-y-6 p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <h1 className="text-3xl font-bold tracking-tight">{event.title}</h1>
                    <button
                      type="button"
                      onClick={() => toggleBookmark(event.id)}
                      aria-pressed={isBookmarked(event.id)}
                      aria-label={isBookmarked(event.id) ? 'Remove bookmark' : 'Bookmark this event'}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600"
                    >
                      <Bookmark
                        size={18}
                        className={cn(isBookmarked(event.id) && 'fill-indigo-600 text-indigo-600')}
                      />
                    </button>
                  </div>

                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex items-center gap-2">
                      <Calendar size={16} className="text-indigo-600" /> {longDate(event.date)}
                    </li>
                    <li className="flex items-center gap-2">
                      <MapPin size={16} className="text-indigo-600" /> {event.venue}
                    </li>
                  </ul>

                  <p className="leading-7 text-slate-600">{event.description}</p>

                  <div>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-slate-600">
                        <Users size={16} className="text-indigo-600" />
                        {count} of {event.capacity} spots taken
                      </span>
                      <span className="font-medium text-slate-900">
                        {spotsLeft === 0 ? 'No spots left' : `${spotsLeft} left`}
                      </span>
                    </div>
                    <div
                      role="progressbar"
                      aria-valuenow={count}
                      aria-valuemin={0}
                      aria-valuemax={event.capacity}
                      className="h-2 overflow-hidden rounded-full bg-slate-100"
                    >
                      <div className="h-full rounded-full bg-indigo-600" style={{ width: `${percent}%` }} />
                    </div>
                    <div className="mt-3">
                      <AvatarGroup avatars={event.attendeeAvatars} />
                    </div>
                  </div>

                  <div>
                    {action}
                    <p className="mt-2 text-center text-xs text-slate-400">
                      Registration is saved in this browser only until a backend is connected.
                    </p>
                  </div>
                </div>
              </Card>
            );
          })()
        )}
      </div>
    </main>
  );
}

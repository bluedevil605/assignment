import { useState } from 'react';
import { ArrowRight, Bookmark, Calendar, MapPin } from 'lucide-react';
import type { EventItem } from '../../types';
import { formatEventDate, getEventStatus, STATUS_LABEL } from '../../utils/eventStatus';
import { Badge, type BadgeTone } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Chip } from '../ui/Chip';
import { IconButton } from '../ui/IconButton';
import { AvatarGroup } from '../ui/AvatarGroup';
import { cn } from '../../utils/cn';

const STATUS_TONE: Record<string, BadgeTone> = {
  open: 'green',
  full: 'red',
  'coming-soon': 'purple',
};

interface EventCardProps {
  event: EventItem;
  bookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onViewDetails?: (id: string) => void;
}

export function EventCard({ event, bookmarked, onToggleBookmark, onViewDetails }: EventCardProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const status = getEventStatus(event);

  return (
    <Card className="w-[280px] shrink-0 snap-start p-0">
      {/* No overflow-hidden here, so the date chip can hang over the image edge.
          The image is clipped in its own layer instead. */}
      <div className="relative h-40">
        <div className="absolute inset-0 overflow-hidden rounded-t-2xl bg-gradient-to-br from-indigo-900 to-violet-700">
          {!imgFailed && (
            <img
              src={event.image}
              alt=""
              onError={() => setImgFailed(true)}
              className="h-full w-full object-cover"
            />
          )}
        </div>

        <Badge tone={STATUS_TONE[status]} className="absolute left-3 top-3">
          {STATUS_LABEL[status]}
        </Badge>
        <IconButton
          bordered={false}
          aria-label={bookmarked ? `Remove bookmark: ${event.title}` : `Bookmark ${event.title}`}
          aria-pressed={bookmarked}
          onClick={() => onToggleBookmark(event.id)}
          className="absolute right-3 top-3 h-8 w-8 bg-white/90 hover:bg-white"
          icon={<Bookmark size={15} className={cn(bookmarked && 'fill-indigo-600 text-indigo-600')} />}
        />
        <Chip
          icon={<Calendar size={13} />}
          className="absolute bottom-0 left-3 translate-y-1/2 shadow-sm ring-1 ring-slate-100"
        >
          {formatEventDate(event.date)}
        </Chip>
      </div>

      <div className="px-4 pb-4 pt-6">
        <h3 className="text-base font-semibold text-slate-900">{event.title}</h3>
        <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
          <MapPin size={12} /> {event.venue}
        </p>
        <p className="mt-3 line-clamp-3 min-h-[3.75rem] text-xs leading-5 text-slate-500">{event.description}</p>
        <div className="mt-4 flex items-center justify-between gap-2">
          <AvatarGroup avatars={event.attendeeAvatars} extraCount={event.attendeeCount} />
          <Button
            variant="soft"
            size="sm"
            icon={<ArrowRight size={12} />}
            onClick={() => onViewDetails?.(event.id)}
          >
            View Details
          </Button>
        </div>
      </div>
    </Card>
  );
}

import type { EventItem, EventStatus } from '../types';

// Status is derived from the data, never stored in the JSON.
export function getEventStatus(event: EventItem, now = new Date()): EventStatus {
  if (event.registrationOpensAt && new Date(event.registrationOpensAt) > now) {
    return 'coming-soon';
  }
  if (event.attendeeCount >= event.capacity) return 'full';
  return 'open';
}

export const STATUS_LABEL: Record<EventStatus, string> = {
  open: 'Open',
  full: 'Full',
  'coming-soon': 'Coming Soon',
};

export function formatEventDate(iso: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(iso));
}

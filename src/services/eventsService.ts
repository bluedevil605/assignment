import { fetchJson } from './api';
import type { EventItem } from '../types';

export const getEvents = (signal?: AbortSignal) =>
  fetchJson<EventItem[]>('events.json', signal);

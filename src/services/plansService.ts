import { fetchJson } from './api';
import type { Plan } from '../types';

export const getPlans = (signal?: AbortSignal) =>
  fetchJson<Plan[]>('plans.json', signal);

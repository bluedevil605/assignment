import { fetchJson } from './api';
import type { TeamMember } from '../types';

export const getTeam = (signal?: AbortSignal) =>
  fetchJson<TeamMember[]>('team.json', signal);

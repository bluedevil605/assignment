export type EventStatus = 'open' | 'full' | 'coming-soon';

export interface EventItem {
  id: string;
  title: string;
  venue: string;
  description: string;
  date: string; // ISO date, e.g. "2026-10-12"
  image: string;
  capacity: number;
  attendeeCount: number;
  attendeeAvatars: string[];
  registrationOpensAt: string | null; // ISO datetime or null
}

export interface TeamSocials {
  github?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
}

export interface TeamStat {
  label: string;
  value: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photo: string;
  bio: string;
  skills: string[];
  socials: TeamSocials;
  stats: TeamStat[];
}

export interface Plan {
  id: string;
  name: string;
  tagline: string;
  price: number;
  currency: string;
  period: string;
  features: string[];
  ctaLabel: string;
  highlighted: boolean;
  popular: boolean;
}

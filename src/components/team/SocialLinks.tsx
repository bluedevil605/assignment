import { Globe } from 'lucide-react';
import type { ReactNode } from 'react';
import type { TeamSocials } from '../../types';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '../ui/BrandIcons';

const ITEMS: Array<{ key: keyof TeamSocials; label: string; icon: ReactNode }> = [
  { key: 'github', label: 'GitHub', icon: <GithubIcon size={16} /> },
  { key: 'linkedin', label: 'LinkedIn', icon: <LinkedinIcon size={16} /> },
  { key: 'twitter', label: 'Twitter', icon: <TwitterIcon size={16} /> },
  { key: 'website', label: 'Website', icon: <Globe size={16} /> },
];

// Only renders the links a member actually has.
export function SocialLinks({ socials, name }: { socials: TeamSocials; name: string }) {
  return (
    <ul className="flex gap-2">
      {ITEMS.filter(i => socials[i.key]).map(i => (
        <li key={i.key}>
          <a
            href={socials[i.key]}
            target="_blank"
            rel="noreferrer"
            aria-label={`${name} on ${i.label}`}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-50 text-slate-800 transition hover:bg-indigo-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600"
          >
            {i.icon}
          </a>
        </li>
      ))}
    </ul>
  );
}

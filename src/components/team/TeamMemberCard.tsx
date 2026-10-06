import { useState } from 'react';
import type { TeamMember } from '../../types';
import { Card } from '../ui/Card';
import { SocialLinks } from './SocialLinks';

export function TeamMemberCard({ member }: { member: TeamMember }) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <Card className="flex flex-col gap-5 p-5 sm:flex-row">
      <div className="h-64 w-full shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-orange-300 via-slate-700 to-slate-900 sm:h-auto sm:w-44">
        {!imgFailed && (
          <img
            src={member.photo}
            alt={member.name}
            onError={() => setImgFailed(true)}
            className="h-full w-full object-cover"
          />
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <h3 className="text-2xl font-bold text-slate-900">{member.name}</h3>
        <p className="text-sm text-slate-500">{member.role}</p>

        <div className="mt-4">
          <SocialLinks socials={member.socials} name={member.name} />
        </div>

        <p className="mt-4 text-sm leading-6 text-slate-500">{member.bio}</p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {member.skills.map(skill => (
            <li key={skill} className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
              {skill}
            </li>
          ))}
        </ul>

        <dl className="mt-auto grid grid-cols-3 gap-2 border-t border-slate-100 pt-4">
          {member.stats.map(stat => (
            <div key={stat.label}>
              <dd className="text-xl font-bold text-slate-900">{stat.value}</dd>
              <dt className="text-xs leading-tight text-slate-500">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </Card>
  );
}

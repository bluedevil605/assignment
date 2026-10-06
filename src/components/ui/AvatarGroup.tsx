import { useState } from 'react';

function Avatar({ src }: { src: string }) {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <span className="h-8 w-8 rounded-full border-2 border-white bg-gradient-to-br from-indigo-300 to-violet-400" />
  ) : (
    <img
      src={src}
      alt=""
      onError={() => setFailed(true)}
      className="h-8 w-8 rounded-full border-2 border-white object-cover"
    />
  );
}

interface AvatarGroupProps {
  avatars: string[];
  extraCount?: number;
}

export function AvatarGroup({ avatars, extraCount }: AvatarGroupProps) {
  return (
    <div className="flex items-center">
      <div className="flex -space-x-2">
        {avatars.slice(0, 3).map((src, i) => (
          <Avatar key={`${src}-${i}`} src={src} />
        ))}
      </div>
      {extraCount !== undefined && (
        <span className="ml-2 rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600">+{extraCount}</span>
      )}
    </div>
  );
}

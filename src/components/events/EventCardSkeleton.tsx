import { Card } from '../ui/Card';
import { Skeleton } from '../ui/Skeleton';

export function EventCardSkeleton() {
  return (
    <Card className="w-[280px] shrink-0 snap-start p-0">
      <Skeleton className="h-40 rounded-b-none rounded-t-2xl" />
      <div className="space-y-3 p-4">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-8 w-full" />
      </div>
    </Card>
  );
}

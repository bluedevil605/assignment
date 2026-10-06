import { ChevronLeft, ChevronRight } from 'lucide-react';
import { IconButton } from '../ui/IconButton';

interface CarouselArrowsProps {
  canPrev: boolean;
  canNext: boolean;
  onPrev: () => void;
  onNext: () => void;
}

export function CarouselArrows({ canPrev, canNext, onPrev, onNext }: CarouselArrowsProps) {
  return (
    <>
      <IconButton aria-label="Previous" icon={<ChevronLeft size={18} />} disabled={!canPrev} onClick={onPrev} />
      <IconButton aria-label="Next" icon={<ChevronRight size={18} />} disabled={!canNext} onClick={onNext} />
    </>
  );
}

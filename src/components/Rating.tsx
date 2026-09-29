import { Star } from 'lucide-react';

interface Props {
  rating: number;
  size?: number;
  showValue?: boolean;
  reviewCount?: number;
  className?: string;
}

export function Rating({ rating, size = 14, showValue = false, reviewCount, className = '' }: Props) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={size}
            className={
              i <= Math.round(rating)
                ? 'fill-amber-400 text-amber-400'
                : 'fill-gray-200 text-gray-200'
            }
          />
        ))}
      </div>
      {showValue && (
        <span className="text-xs text-neutral-500 ml-1">
          {rating.toFixed(1)}{reviewCount !== undefined && ` (${reviewCount})`}
        </span>
      )}
    </div>
  );
}

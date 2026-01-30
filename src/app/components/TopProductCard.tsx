import { Star } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

interface TopProductCardProps {
  image: string;
  name: string;
  price: string;
  rating: number;
  reviews: number;
  onClick?: () => void;
}

export function TopProductCard({ image, name, price, rating, reviews, onClick }: TopProductCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm cursor-pointer" onClick={onClick}>
      <div className="flex flex-col">
        <div className="w-full h-40 bg-[#F8F8F8] rounded-xl overflow-hidden mb-3">
          <ImageWithFallback
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="px-1">
          <h3 className="text-sm text-gray-900 mb-2">{name}</h3>
          <p className="text-sm text-gray-900">{price}</p>
        </div>
      </div>
    </div>
  );
}
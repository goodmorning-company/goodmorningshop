import { Heart } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

interface ProductCardProps {
  image: string;
  name: string;
  price: string;
  category: string;
  onClick?: () => void;
}

export function ProductCard({ image, name, price, category, onClick }: ProductCardProps) {
  return (
    <div className="relative group cursor-pointer" onClick={onClick}>
      <div className="relative aspect-[3/4] bg-[#F8F8F8] rounded-2xl overflow-hidden shadow-sm">
        <ImageWithFallback
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Heart className="w-4 h-4 text-gray-700" />
        </button>
      </div>
      <div className="mt-3 space-y-1">
        <p className="text-xs text-gray-500 tracking-wide uppercase">{category}</p>
        <h3 className="text-sm text-gray-900">{name}</h3>
        <p className="text-sm text-gray-900">{price}</p>
      </div>
    </div>
  );
}
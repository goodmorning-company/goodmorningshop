import { ChevronLeft } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

interface Category {
  id: number;
  name: string;
  image: string;
  itemCount: number;
}

interface AllCategoriesProps {
  onClose: () => void;
  onSelectCategory?: (category: string) => void;
}

const categoryData: Category[] = [
  {
    id: 1,
    name: 'Mujer',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMGZhc2hpb24lMjBzdG9yZXxlbnwxfHx8fDE3Mzc5OTIzNjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    itemCount: 245,
  },
  {
    id: 2,
    name: 'Hombre',
    image: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW4lMjBmYXNoaW9uJTIwc3RvcmV8ZW58MXx8fHwxNzM3OTkyMzY0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    itemCount: 189,
  },
  {
    id: 3,
    name: 'Accesorios',
    image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwYWNjZXNzb3JpZXMlMjBzdG9yZXxlbnwxfHx8fDE3Mzc5OTIzNjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    itemCount: 312,
  },
  {
    id: 4,
    name: 'Calzado',
    image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaG9lcyUyMHN0b3JlJTIwZGlzcGxheXxlbnwxfHx8fDE3Mzc5OTIzNjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    itemCount: 156,
  },
  {
    id: 5,
    name: 'Beauty',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBwcm9kdWN0cyUyMGRpc3BsYXl8ZW58MXx8fHwxNzM3OTkyMzY0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    itemCount: 198,
  },
  {
    id: 6,
    name: 'Technology',
    image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwcHJvZHVjdHMlMjBkaXNwbGF5fGVufDF8fHx8MTczNzk5MjM2NHww&ixlib=rb-4.1.0&q=80&w=1080',
    itemCount: 134,
  },
  {
    id: 7,
    name: 'Bags',
    image: 'https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiYWdzJTIwZGlzcGxheXxlbnwxfHx8fDE3Mzc5OTIzNjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    itemCount: 167,
  },
  {
    id: 8,
    name: 'Novedades',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXclMjBhcnJpdmFscyUyMGZhc2hpb258ZW58MXx8fHwxNzM3OTkyMzY0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    itemCount: 89,
  },
];

export function AllCategories({ onClose, onSelectCategory }: AllCategoriesProps) {
  return (
    <div className="absolute inset-0 bg-white z-50 overflow-y-auto">
      <div className="w-full max-w-xl mx-auto min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 left-0 right-0 bg-white z-20 px-4 sm:px-5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full"
          >
            <ChevronLeft className="w-6 h-6 text-gray-900" />
          </button>
          <h1 className="text-xl text-gray-900">All Categories</h1>
        </div>
      </header>

      {/* Categories Grid */}
      <div className="px-4 sm:px-5 py-6 flex-1">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {categoryData.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onSelectCategory?.(category.name)}
            >
              <div className="relative h-40 bg-[#F8F8F8] overflow-hidden">
                <ImageWithFallback
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-lg text-white mb-1">{category.name}</h3>
                  <p className="text-xs text-white/80">{category.itemCount} items</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}

import { ChevronLeft } from 'lucide-react';
import { ProductCard } from '@/app/components/ProductCard';

interface Product {
  id: number;
  image: string;
  images: string[];
  name: string;
  price: string;
  category: string;
  description: string;
}

interface CategoryPageProps {
  category: string;
  products: Product[];
  onClose: () => void;
  onProductClick: (product: Product) => void;
}

export function CategoryPage({ category, products, onClose, onProductClick }: CategoryPageProps) {
  const filteredProducts = category === 'All' 
    ? products 
    : products.filter(p => p.category === category);

  return (
    <div className="absolute inset-0 bg-white z-50 overflow-y-auto">
      {/* Header */}
      <header className="sticky top-0 left-0 right-0 bg-white z-20 px-5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full"
          >
            <ChevronLeft className="w-6 h-6 text-gray-900" />
          </button>
          <div>
            <h1 className="text-xl text-gray-900">{category}</h1>
            <p className="text-xs text-gray-500">{filteredProducts.length} products</p>
          </div>
        </div>
      </header>

      {/* Products Grid */}
      <div className="px-5 py-6">
        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={`${product.category}-${product.id}-${index}`}
              image={product.image}
              name={product.name}
              price={product.price}
              category={product.category}
              onClick={() => onProductClick(product)}
            />
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found in this category</p>
          </div>
        )}
      </div>
    </div>
  );
}
import { useState, useMemo } from 'react';
import { X, Search } from 'lucide-react';
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

interface SearchPageProps {
  products: Product[];
  onClose: () => void;
  onProductClick: (product: Product) => void;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
}

export function SearchPage({ products, onClose, onProductClick, searchQuery, onSearchQueryChange }: SearchPageProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Get matched products based on search query
  const matchedProducts = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase();
    return products.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    );
  }, [searchQuery, products]);

  // Get unique suggestions from product names and categories
  const suggestions = useMemo(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) return [];
    
    const query = searchQuery.toLowerCase();
    const suggestionSet = new Set<string>();
    
    products.forEach(product => {
      // Add matching product names
      if (product.name.toLowerCase().includes(query)) {
        suggestionSet.add(product.name);
      }
      // Add matching categories
      if (product.category.toLowerCase().includes(query)) {
        suggestionSet.add(product.category);
      }
    });
    
    return Array.from(suggestionSet).slice(0, 5);
  }, [searchQuery, products]);

  const handleSuggestionClick = (suggestion: string) => {
    onSearchQueryChange(suggestion);
    setShowSuggestions(false);
    // Force input to blur to prevent suggestions from reopening
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  return (
    <div className="absolute inset-0 bg-white z-30 flex flex-col">
      <div className="w-full max-w-xl mx-auto min-h-screen flex flex-col">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 px-4 sm:px-5 pt-8 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center"
          >
            <X className="w-5 h-5 text-gray-900" />
          </button>
          <h2 className="text-lg text-gray-900 flex-1">Search Products</h2>
        </div>

        {/* Search Input */}
        <div className="relative">
          <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 rounded-2xl">
            <Search className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => {
                onSearchQueryChange(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              className="flex-1 bg-transparent outline-none text-gray-900 placeholder-gray-500"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => {
                  onSearchQueryChange('');
                  setShowSuggestions(false);
                }}
                className="w-5 h-5 flex items-center justify-center"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            )}
          </div>

          {/* Autocomplete Suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-900">{suggestion}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto w-full">
        {!searchQuery.trim() ? (
          <div className="px-4 sm:px-5 pt-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500">Start typing to search products</p>
          </div>
        ) : matchedProducts.length > 0 ? (
          <div className="px-4 sm:px-5 pt-4 pb-8">
            <p className="text-sm text-gray-500 mb-4">
              {matchedProducts.length} {matchedProducts.length === 1 ? 'product' : 'products'} found
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {matchedProducts.map((product, index) => (
                <ProductCard
                  key={`${product.id}-${product.name}-${index}`}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  category={product.category}
                  onClick={() => {
                    onProductClick(product);
                    onClose();
                  }}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="px-4 sm:px-5 pt-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-900 mb-1">No products found</p>
            <p className="text-sm text-gray-500">Try searching with different keywords</p>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}

import { ChevronLeft, Trash2 } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

interface CheckoutProps {
  cartItems: any[];
  onClose: () => void;
  onRemoveItem: (productId: number) => void;
}

export function Checkout({ cartItems, onClose, onRemoveItem }: CheckoutProps) {
  // Calculate total
  const total = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('$', ''));
    return sum + price;
  }, 0);

  return (
    <div className="absolute inset-0 bg-white z-50 overflow-y-auto scrollbar-hide">
      {/* Header */}
      <header className="sticky top-0 left-0 right-0 bg-white/95 backdrop-blur-md z-20 px-5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-gray-900" />
          </button>
          <h1 className="text-xl text-gray-900">Shopping Cart</h1>
        </div>
      </header>

      {/* Cart Content */}
      <div className="px-5 py-6">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h2 className="text-xl text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-sm text-gray-500 text-center">
              Start adding products to your cart
            </p>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="space-y-4 mb-6">
              {cartItems.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm text-gray-900 mb-1 truncate">
                            {item.name}
                          </h3>
                          <p className="text-xs text-gray-500 mb-2">
                            {item.category}
                          </p>
                          <p className="text-base text-gray-900">
                            {item.price}
                          </p>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="w-8 h-8 flex items-center justify-center bg-red-50 rounded-full hover:bg-red-100 transition-colors flex-shrink-0"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-gray-50 rounded-2xl p-5 mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-600">Subtotal</span>
                <span className="text-sm text-gray-900">${total.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-600">Shipping</span>
                <span className="text-sm text-gray-900">Free</span>
              </div>
              <div className="border-t border-gray-200 pt-3 mt-3">
                <div className="flex items-center justify-between">
                  <span className="text-base text-gray-900">Total</span>
                  <span className="text-xl text-gray-900">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Checkout Button */}
            <button className="w-full bg-gray-900 text-white py-4 rounded-2xl hover:bg-gray-800 transition-colors shadow-lg">
              Proceed to Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
}
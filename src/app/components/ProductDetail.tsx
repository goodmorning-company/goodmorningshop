import { ChevronLeft, ShoppingBag } from "lucide-react";
import Slider from "react-slick";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface ProductDetailProps {
  images: string[];
  name: string;
  price: string;
  description: string;
  category: string;
  onClose: () => void;
  fromSearch?: boolean;
  onBackToSearch?: () => void;
  onAddToCart?: () => void;
  cartCount: number;
  isInCart: boolean;
  onOpenCheckout?: () => void;
  productId: number;
  allProducts?: any[];
  onProductClick?: (product: any) => void;
}

export function ProductDetail({
  images,
  name,
  price,
  description,
  category,
  onClose,
  fromSearch,
  onBackToSearch,
  onAddToCart,
  cartCount,
  isInCart,
  onOpenCheckout,
  productId,
  allProducts,
  onProductClick,
}: ProductDetailProps) {
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationStart, setAnimationStart] = useState({
    x: 0,
    y: 0,
  });
  const [animationEnd, setAnimationEnd] = useState({
    x: 0,
    y: 0,
  });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFloating, setIsFloating] = useState(true);
  const cartIconRef = useRef<HTMLButtonElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const sliderRef = useRef<Slider | null>(null);
  const buttonContainerRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  // Keep all sections (header, content, CTA) aligned with the app's main container width (same as app shell)
  const frameClasses = "w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto px-4 sm:px-5 md:px-6";
  const headerPadding = "px-6 sm:px-8 md:px-10";

  const handleAddToCart = () => {
    if (buttonRef.current && cartIconRef.current) {
      const buttonRect =
        buttonRef.current.getBoundingClientRect();
      const cartRect =
        cartIconRef.current.getBoundingClientRect();

      setAnimationStart({
        x: buttonRect.left + buttonRect.width / 2,
        y: buttonRect.top + buttonRect.height / 2,
      });

      setAnimationEnd({
        x: cartRect.left + cartRect.width / 2,
        y: cartRect.top + cartRect.height / 2,
      });

      setShowAnimation(true);
      onAddToCart?.();
      setTimeout(() => setShowAnimation(false), 800);
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    swipeToSlide: true,
    customPaging: () => (
      <div className="w-2 h-2 bg-gray-300 rounded-full mt-4" />
    ),
    dotsClass: "slick-dots custom-dots",
  };

  // Filter related products from the same category
  const relatedProducts = allProducts
    ? allProducts
        .filter(
          (product) =>
            product.category === category &&
            product.id !== productId,
        )
        .slice(0, 4)
    : [];

  useEffect(() => {
    const currentRef = buttonContainerRef.current;
    const scrollRef = scrollContainerRef.current;

    const handleScroll = () => {
      if (currentRef && scrollRef) {
        const rect = currentRef.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        // Button is at bottom-24 (96px from bottom) when floating
        // Switch to static when container reaches that position
        const floatingButtonPosition = windowHeight - 96 - 64; // 64px is approximate button height with padding
        setIsFloating(rect.top > floatingButtonPosition);
      }
    };

    if (scrollRef) {
      scrollRef.addEventListener("scroll", handleScroll);
      // Initial check
      handleScroll();
    }

    return () => {
      if (scrollRef) {
        scrollRef.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  // Ensure view resets to top and first image when product changes
  useEffect(() => {
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: "auto" });
    sliderRef.current?.slickGoTo(0, true);
    setCurrentSlide(0);
  }, [productId]);

  return (
    <div
      ref={scrollContainerRef}
      className="absolute inset-0 bg-white z-50 overflow-y-auto scrollbar-hide"
    >
      {/* Animated Icon */}
      <AnimatePresence>
        {showAnimation && (
          <motion.div
            initial={{
              position: "fixed",
              left: animationStart.x,
              top: animationStart.y,
              x: "-50%",
              y: "-50%",
            }}
            animate={{
              left: animationEnd.x,
              top: animationEnd.y,
              x: "-50%",
              y: "-50%",
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.4, 0.0, 0.2, 1],
            }}
            className="z-[100] pointer-events-none"
          >
            <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center shadow-2xl">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={frameClasses}>
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 bg-transparent z-50">
          <div className={`${frameClasses} ${headerPadding} pt-12 pb-4 flex items-center justify-between`}>
            <button
              onClick={
                fromSearch && onBackToSearch
                  ? onBackToSearch
                  : onClose
              }
              className="w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-md rounded-full shadow-lg"
            >
              <ChevronLeft className="w-6 h-6 text-gray-900" />
            </button>

            {/* Cart Icon */}
            <button
              ref={cartIconRef}
              onClick={onOpenCheckout}
              className="w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-md rounded-full shadow-lg relative"
            >
              <ShoppingBag className="w-5 h-5 text-gray-900" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gray-900 text-white text-[10px] rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </header>

        {/* Image Carousel - Full Width */}
        <div className="w-full bg-[#F8F8F8] overflow-hidden relative z-10 px-0">
          <Slider
            key={productId} // force slick to rebuild when product changes so images refresh
            {...sliderSettings}
            ref={sliderRef}
            afterChange={(index) => setCurrentSlide(index)}
          >
            {images.map((image, index) => (
              <div key={index} className="outline-none">
                <div className="w-full aspect-[3/4] sm:aspect-[4/5] min-h-[22rem] overflow-hidden relative">
                  <ImageWithFallback
                    src={image}
                    alt={`${name} - Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Product Info */}
        <div
          className={`${frameClasses} py-6 bg-white rounded-t-3xl -mt-25 relative z-10 min-h-[35vh] w-full ${
            relatedProducts.length === 0 ? "pb-32" : ""
          }`}
        >
        {/* Image Indicator - Only show if multiple images */}
        {images.length > 1 && (
          <div className="flex items-center justify-center pt-1 pb-4 px-5">
            <div className="flex items-center gap-1 bg-gray-200 px-2 py-1.5 rounded-full">
              {images.map((_, idx) => (
                <div
                  key={idx}
                  className={`transition-all ${
                    idx === currentSlide
                      ? "w-5 h-1 bg-gray-900 rounded-full"
                      : "w-1 h-1 bg-gray-400 rounded-full"
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        <div className="mb-4">
          <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full mb-3">
            {category}
          </span>
          <h1 className="text-2xl text-gray-900 mb-2">
            {name}
          </h1>
          <p className="text-2xl text-gray-900">{price}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-base text-gray-900 mb-2">
            Description
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Add to Cart Button */}
        <div
          ref={buttonContainerRef}
          className={`${frameClasses} relative ${isFloating ? "pb-6" : "pb-0"} ${
            isFloating ? "fixed bottom-4 left-1/2 -translate-x-1/2 z-40" : ""
          }`}
        >
          <button
            ref={buttonRef}
              onClick={isInCart ? undefined : handleAddToCart}
              disabled={isInCart}
              className={`py-4 rounded-2xl shadow-lg transition-all duration-200 w-full ${
              isInCart
                ? "bg-green-600 text-white cursor-not-allowed"
                : "bg-gray-900 text-white hover:bg-gray-800"
            }`}
          >
            {isInCart ? "✓ Added to Cart" : "Add to Cart"}
          </button>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="pt-6 border-t border-gray-100">
            <h2 className="text-lg text-gray-900 mb-4">
              Similar Products
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {relatedProducts.map((product) => (
                <button
                  key={product.id}
                  onClick={() => {
                    scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
                    onProductClick?.(product);
                  }}
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all text-left"
                >
                  <div className="w-full aspect-square bg-gray-100 overflow-hidden">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-xs text-gray-500 mb-1">
                      {product.category}
                    </p>
                    <h3 className="text-sm text-gray-900 mb-1 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-900">
                      {product.price}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
  );
}

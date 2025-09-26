import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { FiHeart, FiShoppingCart, FiShare2, FiRotateCw, FiArrowLeft, FiArrowRight } from 'react-icons/fi';

const MobileGestures = ({ children, onSwipeLeft, onSwipeRight, onPullToRefresh, className = '' }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [hapticEnabled, setHapticEnabled] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const containerRef = useRef(null);

  // Haptic feedback simulation
  const triggerHaptic = (type = 'light') => {
    if (hapticEnabled && 'vibrate' in navigator) {
      const patterns = {
        light: [10],
        medium: [20],
        heavy: [30],
        success: [10, 50, 10],
        error: [50, 50, 50]
      };
      navigator.vibrate(patterns[type] || patterns.light);
    }
  };

  // Swipe detection
  const handleDragEnd = (event, info) => {
    const threshold = 50;
    
    if (Math.abs(info.offset.x) > threshold) {
      if (info.offset.x > 0) {
        setSwipeDirection('right');
        onSwipeRight?.();
        triggerHaptic('medium');
      } else {
        setSwipeDirection('left');
        onSwipeLeft?.();
        triggerHaptic('medium');
      }
    }
    
    // Reset position
    x.set(0);
    y.set(0);
    
    // Reset swipe direction after animation
    setTimeout(() => setSwipeDirection(null), 300);
  };

  // Pull to refresh
  const handleDragEndY = (event, info) => {
    if (info.offset.y > 100 && !isRefreshing) {
      setIsRefreshing(true);
      triggerHaptic('heavy');
      
      // Simulate refresh
      setTimeout(() => {
        setIsRefreshing(false);
        onPullToRefresh?.();
        triggerHaptic('success');
      }, 2000);
    }
    
    y.set(0);
  };

  // Enable haptic feedback on mobile
  useEffect(() => {
    if ('vibrate' in navigator) {
      setHapticEnabled(true);
    }
  }, []);

  return (
    <div className={`relative ${className}`}>
      {/* Pull to Refresh Indicator */}
      <AnimatePresence>
        {isRefreshing && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="absolute top-0 left-0 right-0 z-50 bg-orange-500 text-white py-2 text-center text-sm font-medium"
          >
            <div className="flex items-center justify-center space-x-2">
              <FiRotateCw className="w-4 h-4 animate-spin" />
              <span>Refreshing...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Swipe Indicators */}
      <AnimatePresence>
        {swipeDirection && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className={`absolute top-1/2 transform -translate-y-1/2 z-40 ${
              swipeDirection === 'left' ? 'right-4' : 'left-4'
            }`}
          >
            <div className={`p-3 rounded-full ${
              swipeDirection === 'left' 
                ? 'bg-red-500 text-white' 
                : 'bg-green-500 text-white'
            }`}>
              {swipeDirection === 'left' ? (
                <FiArrowLeft className="w-6 h-6" />
              ) : (
                <FiArrowRight className="w-6 h-6" />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Draggable Content */}
      <motion.div
        ref={containerRef}
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        style={{ x, y }}
        className="relative"
      >
        {children}
      </motion.div>
    </div>
  );
};

// Swipeable Product Card
export const SwipeableProductCard = ({ product, onAddToCart, onAddToWishlist, onShare }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onAddToWishlist?.(product);
  };

  const handleAddToCart = () => {
    setIsInCart(!isInCart);
    onAddToCart?.(product);
  };

  const handleShare = () => {
    onShare?.(product);
  };

  return (
    <MobileGestures
      onSwipeLeft={() => handleLike()}
      onSwipeRight={() => handleAddToCart()}
      className="mb-4"
    >
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          
          {/* Action Buttons */}
          <div className="absolute top-2 right-2 flex flex-col space-y-2">
            <motion.button
              className={`p-2 rounded-full shadow-md ${
                isLiked 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleLike}
            >
              <FiHeart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            </motion.button>
            
            <motion.button
              className={`p-2 rounded-full shadow-md ${
                isInCart 
                  ? 'bg-green-500 text-white' 
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleAddToCart}
            >
              <FiShoppingCart className={`w-4 h-4 ${isInCart ? 'fill-current' : ''}`} />
            </motion.button>
            
            <motion.button
              className="p-2 rounded-full shadow-md bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleShare}
            >
              <FiShare2 className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-medium text-gray-900 dark:text-white mb-2 line-clamp-2">
            {product.name}
          </h3>
          
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300 dark:text-gray-600'
                  }`}
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
              {product.rating} ({product.reviews})
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="ml-2 text-sm text-gray-500 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">Swipe left to like</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">Swipe right to cart</span>
            </div>
          </div>
        </div>
      </motion.div>
    </MobileGestures>
  );
};

// Swipeable Image Gallery
export const SwipeableImageGallery = ({ images, className = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const x = useMotionValue(0);
  const containerRef = useRef(null);

  const handleDragEnd = (event, info) => {
    const threshold = 50;
    
    if (Math.abs(info.offset.x) > threshold) {
      if (info.offset.x > 0 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      } else if (info.offset.x < 0 && currentIndex < images.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    }
    
    x.set(0);
  };

  return (
    <div className={`relative ${className}`}>
      <motion.div
        ref={containerRef}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        style={{ x }}
        className="overflow-hidden rounded-lg"
      >
        <motion.div
          className="flex"
          animate={{ x: -currentIndex * 100 + '%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {images.map((image, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <img
                src={image}
                alt={`Product image ${index + 1}`}
                className="w-full h-64 object-cover"
              />
            </div>
          ))}
        </motion.div>
      </motion.div>
      
      {/* Dots Indicator */}
      <div className="flex justify-center space-x-2 mt-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex
                ? 'bg-orange-500'
                : 'bg-gray-300 dark:bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// Haptic Button
export const HapticButton = ({ children, onClick, hapticType = 'medium', className = '' }) => {
  const triggerHaptic = () => {
    if ('vibrate' in navigator) {
      const patterns = {
        light: [10],
        medium: [20],
        heavy: [30],
        success: [10, 50, 10],
        error: [50, 50, 50]
      };
      navigator.vibrate(patterns[hapticType] || patterns.medium);
    }
  };

  const handleClick = () => {
    triggerHaptic();
    onClick?.();
  };

  return (
    <motion.button
      className={className}
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
};

export default MobileGestures;
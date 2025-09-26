import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHeart, FiShoppingCart, FiEye, FiLayers, FiShare2, FiStar } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import StarRating from '../ui/StarRating';
import ProductImage from '../ui/ProductImage';

const EnhancedProductCard = ({ product, viewMode = 'grid', onQuickView }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [showActions, setShowActions] = useState(false);
  const [isComparing, setIsComparing] = useState(false);

  // Add sale and stock data to product
  const enhancedProduct = {
    ...product,
    onSale: Math.random() > 0.7, // 30% chance of being on sale
    discountPercent: Math.floor(Math.random() * 50) + 10, // 10-60% discount
    stock: Math.floor(Math.random() * 50) + 1, // 1-50 stock
    originalPrice: product.price * (1 + Math.random() * 0.5) // 0-50% higher original price
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(enhancedProduct);
    // Show success animation
    setIsComparing(true);
    setTimeout(() => setIsComparing(false), 2000);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWishlist(enhancedProduct.id)) {
      removeFromWishlist(enhancedProduct.id);
    } else {
      addToWishlist({ ...enhancedProduct, dateAdded: Date.now() });
    }
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView(enhancedProduct);
  };

  const handleCompare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsComparing(true);
    setTimeout(() => setIsComparing(false), 2000);
  };

  const handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: enhancedProduct.name,
        text: `Check out this product: ${enhancedProduct.name}`,
        url: window.location.origin + `/product/${enhancedProduct.id}`
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.origin + `/product/${enhancedProduct.id}`);
      alert('Product link copied to clipboard!');
    }
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        whileHover={{ x: 5 }}
        className="bg-white rounded-lg shadow-sm overflow-hidden flex h-40 relative group"
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
      >
        <Link to={`/product/${enhancedProduct.id}`} className="flex flex-1">
          <div className="w-40 h-full flex-shrink-0">
            <ProductImage 
              product={enhancedProduct} 
              className="w-full h-full"
            />
          </div>
          <div className="flex-grow p-4 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-gray-900 line-clamp-1 mb-1 group-hover:text-blue-600 transition-colors">
                {enhancedProduct.name}
              </h3>
              <div className="flex items-center mb-1">
                <StarRating rating={enhancedProduct.rating} />
                <span className="text-gray-500 text-sm ml-1">({enhancedProduct.reviewCount})</span>
              </div>
              <p className="text-sm text-gray-500">{enhancedProduct.category} • {enhancedProduct.brand}</p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {enhancedProduct.onSale && (
                  <span className="text-sm text-gray-500 line-through">
                    ${enhancedProduct.originalPrice.toFixed(2)}
                  </span>
                )}
                <p className="text-lg font-bold text-gray-900">
                  ${enhancedProduct.price.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <motion.button 
                  onClick={handleAddToCart}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-md text-sm transition-colors flex items-center space-x-1"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiShoppingCart className="w-3 h-3" />
                  <span>Add to Cart</span>
                </motion.button>
              </div>
            </div>
          </div>
        </Link>

        {/* Action Buttons */}
        <AnimatePresence>
          {showActions && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute right-2 top-2 flex flex-col space-y-2"
            >
              <motion.button
                onClick={handleWishlistToggle}
                className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiHeart
                  className={`w-4 h-4 ${
                    isInWishlist(enhancedProduct.id) ? 'text-red-500 fill-current' : 'text-gray-400'
                  }`}
                />
              </motion.button>
              
              <motion.button
                onClick={handleQuickView}
                className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiEye className="w-4 h-4 text-gray-400" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-full relative group"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <Link to={`/product/${enhancedProduct.id}`} className="block flex-1">
        <div className="relative">
          <ProductImage 
            product={enhancedProduct} 
            className="w-full h-48"
            showGallery={false}
            showZoom={true}
            showVideo={true}
          />
        </div>
        
        <div className="p-4 flex-grow">
          <h3 className="font-bold text-gray-900 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
            {enhancedProduct.name}
          </h3>
          
          <div className="flex items-center mb-2">
            <StarRating rating={enhancedProduct.rating} />
            <span className="text-gray-500 text-sm ml-1">({enhancedProduct.reviewCount})</span>
          </div>
          
          <div className="flex items-center space-x-2 mb-2">
            {enhancedProduct.onSale && (
              <span className="text-sm text-gray-500 line-through">
                ${enhancedProduct.originalPrice.toFixed(2)}
              </span>
            )}
            <p className="text-lg font-bold text-gray-900">
              ${enhancedProduct.price.toFixed(2)}
            </p>
            {enhancedProduct.onSale && (
              <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">
                Save ${(enhancedProduct.originalPrice - enhancedProduct.price).toFixed(2)}
              </span>
            )}
          </div>
          
          <p className="text-sm text-gray-500">{enhancedProduct.category}</p>
        </div>
      </Link>

      {/* Action Buttons */}
      <AnimatePresence>
        {showActions && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute inset-x-4 bottom-4 flex justify-center space-x-2"
          >
            <motion.button
              onClick={handleWishlistToggle}
              className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiHeart
                className={`w-4 h-4 ${
                  isInWishlist(enhancedProduct.id) ? 'text-red-500 fill-current' : 'text-gray-400'
                }`}
              />
            </motion.button>
            
            <motion.button
              onClick={handleQuickView}
              className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiEye className="w-4 h-4 text-gray-400" />
            </motion.button>
            
            <motion.button
              onClick={handleCompare}
              className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiLayers className="w-4 h-4 text-gray-400" />
            </motion.button>
            
            <motion.button
              onClick={handleShare}
              className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiShare2 className="w-4 h-4 text-gray-400" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add to Cart Button */}
      <div className="px-4 pb-4">
        <motion.button 
          onClick={handleAddToCart}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-2 rounded-md transition-all duration-300 flex items-center justify-center space-x-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FiShoppingCart className="w-4 h-4" />
          <span>Add to Cart</span>
        </motion.button>
      </div>

      {/* Success Animation */}
      <AnimatePresence>
        {isComparing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 bg-green-500 bg-opacity-90 flex items-center justify-center rounded-lg"
          >
            <div className="text-white text-center">
              <FiShoppingCart className="w-8 h-8 mx-auto mb-2" />
              <p className="font-medium">Added to Cart!</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default EnhancedProductCard;
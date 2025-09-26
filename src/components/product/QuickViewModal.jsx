import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiHeart, FiShoppingCart, FiShare2, FiLayers, FiStar } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import StarRating from '../ui/StarRating';
import ProductImage from '../ui/ProductImage';

const QuickViewModal = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    onClose();
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({ ...product, dateAdded: Date.now() });
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out this product: ${product.name}`,
        url: window.location.origin + `/product/${product.id}`
      });
    } else {
      navigator.clipboard.writeText(window.location.origin + `/product/${product.id}`);
      alert('Product link copied to clipboard!');
    }
  };

  const variants = [
    { id: 1, name: 'Color', options: ['Black', 'White', 'Blue', 'Red'] },
    { id: 2, name: 'Size', options: ['S', 'M', 'L', 'XL'] },
    { id: 3, name: 'Storage', options: ['64GB', '128GB', '256GB', '512GB'] }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Quick View</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FiX className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Product Images */}
              <div>
                <ProductImage 
                  product={product} 
                  className="w-full h-96"
                  showGallery={true}
                  showZoom={true}
                  showVideo={true}
                />
              </div>

              {/* Product Details */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h3>
                  <div className="flex items-center mb-4">
                    <StarRating rating={product.rating} />
                    <span className="ml-2 text-blue-600 underline">{product.reviewCount} ratings</span>
                  </div>
                  <p className="text-3xl font-bold text-gray-900 mb-4">${product.price.toFixed(2)}</p>
                </div>

                {/* Variants */}
                <div className="space-y-4">
                  {variants.map((variant) => (
                    <div key={variant.id}>
                      <h4 className="font-medium text-gray-900 mb-2">{variant.name}</h4>
                      <div className="flex flex-wrap gap-2">
                        {variant.options.map((option) => (
                          <button
                            key={option}
                            onClick={() => setSelectedVariant({ ...selectedVariant, [variant.name]: option })}
                            className={`px-4 py-2 border rounded-lg text-sm transition-colors ${
                              selectedVariant?.[variant.name] === option
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quantity */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Quantity</h4>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50"
                    >
                      -
                    </button>
                    <span className="text-lg font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <motion.button
                    onClick={handleAddToCart}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-4 rounded-md transition-all duration-300 flex items-center justify-center space-x-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FiShoppingCart className="w-5 h-5" />
                    <span>Add to Cart</span>
                  </motion.button>

                  <div className="flex space-x-3">
                    <motion.button
                      onClick={handleWishlistToggle}
                      className={`flex-1 py-2 px-4 rounded-md border transition-colors flex items-center justify-center space-x-2 ${
                        isInWishlist(product.id)
                          ? 'border-red-500 text-red-500 bg-red-50'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FiHeart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                      <span>{isInWishlist(product.id) ? 'In Wishlist' : 'Add to Wishlist'}</span>
                    </motion.button>

                    <motion.button
                      onClick={handleShare}
                      className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FiShare2 className="w-4 h-4" />
                      <span>Share</span>
                    </motion.button>
                  </div>
                </div>

                {/* Product Features */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Key Features</h4>
                  <ul className="space-y-1">
                    {product.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start">
                        <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Product Info */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-900">Brand:</span>
                      <span className="ml-2 text-gray-600">{product.brand}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Category:</span>
                      <span className="ml-2 text-gray-600">{product.category}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Weight:</span>
                      <span className="ml-2 text-gray-600">{product.weight}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Dimensions:</span>
                      <span className="ml-2 text-gray-600">{product.dimensions}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuickViewModal;
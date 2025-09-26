import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiZoomIn, FiPlay, FiImage } from 'react-icons/fi';

const ProductImage = ({ 
  product, 
  className = '', 
  showGallery = false,
  showZoom = false,
  showVideo = false 
}) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Generate placeholder images based on product category
  const getPlaceholderImages = (category) => {
    const categoryImages = {
      'Electronics': [
        'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop'
      ],
      'Computers': [
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop'
      ],
      'Smart Home': [
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop'
      ],
      'default': [
        'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop'
      ]
    };
    
    return categoryImages[category] || categoryImages.default;
  };

  const images = getPlaceholderImages(product.category);
  const currentImage = images[selectedImage];

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/400x400/f3f4f6/9ca3af?text=Image+Not+Available';
  };

  return (
    <div className={`relative ${className}`}>
      {/* Main Image */}
      <div className="relative group">
        <motion.img
          src={currentImage}
          alt={product.name}
          onError={handleImageError}
          className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
          whileHover={{ scale: 1.02 }}
        />
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
            {showZoom && (
              <motion.button
                onClick={() => setIsZoomed(true)}
                className="p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiZoomIn className="w-5 h-5 text-gray-700" />
              </motion.button>
            )}
            
            {showVideo && (
              <motion.button
                onClick={() => setIsVideoPlaying(true)}
                className="p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiPlay className="w-5 h-5 text-gray-700" />
              </motion.button>
            )}
          </div>
        </div>

        {/* Sale Badge */}
        {product.onSale && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-bold">
            {product.discountPercent}% OFF
          </div>
        )}

        {/* Stock Indicator */}
        <div className="absolute top-2 right-2">
          {product.stock > 10 ? (
            <div className="bg-green-500 text-white px-2 py-1 rounded-md text-xs font-medium">
              In Stock
            </div>
          ) : product.stock > 0 ? (
            <div className="bg-yellow-500 text-white px-2 py-1 rounded-md text-xs font-medium">
              Only {product.stock} left
            </div>
          ) : (
            <div className="bg-red-500 text-white px-2 py-1 rounded-md text-xs font-medium">
              Out of Stock
            </div>
          )}
        </div>
      </div>

      {/* Image Gallery */}
      {showGallery && images.length > 1 && (
        <div className="flex space-x-2 mt-3 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                selectedImage === index 
                  ? 'border-blue-500 ring-2 ring-blue-200' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <img
                src={image}
                alt={`${product.name} ${index + 1}`}
                className="w-full h-full object-cover"
                onError={handleImageError}
              />
            </button>
          ))}
        </div>
      )}

      {/* Zoom Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={() => setIsZoomed(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={currentImage}
                alt={product.name}
                className="w-full h-full object-contain rounded-lg"
                onError={handleImageError}
              />
              <button
                onClick={() => setIsZoomed(false)}
                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
              >
                <FiZoomIn className="w-6 h-6 text-gray-700" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={() => setIsVideoPlaying(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gray-900 rounded-lg p-8 text-center">
                <FiPlay className="w-16 h-16 text-white mx-auto mb-4" />
                <p className="text-white text-lg">Product Video Coming Soon</p>
                <p className="text-gray-400 text-sm mt-2">This feature will show product demonstrations</p>
              </div>
              <button
                onClick={() => setIsVideoPlaying(false)}
                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
              >
                <FiZoomIn className="w-6 h-6 text-gray-700" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductImage;
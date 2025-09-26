import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiPlus, FiTrash2, FiCheck, FiStar } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import StarRating from '../ui/StarRating';
import ProductImage from '../ui/ProductImage';

const ProductComparison = ({ isOpen, onClose, products = [] }) => {
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  const [selectedProducts, setSelectedProducts] = useState(products);

  const maxProducts = 4;

  const handleAddProduct = (product) => {
    if (selectedProducts.length < maxProducts && !selectedProducts.find(p => p.id === product.id)) {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const handleRemoveProduct = (productId) => {
    setSelectedProducts(selectedProducts.filter(p => p.id !== productId));
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handleAddToWishlist = (product) => {
    addToWishlist(product);
  };

  const getComparisonFeatures = () => {
    const allFeatures = new Set();
    selectedProducts.forEach(product => {
      product.features.forEach(feature => allFeatures.add(feature));
    });
    return Array.from(allFeatures);
  };

  const getComparisonData = () => {
    const features = getComparisonFeatures();
    return features.map(feature => ({
      feature,
      products: selectedProducts.map(product => ({
        hasFeature: product.features.includes(feature),
        product
      }))
    }));
  };

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
            className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Compare Products</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FiX className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-x-auto">
              {selectedProducts.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No products to compare</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">Add products to compare their features</p>
                  <div className="text-sm text-gray-500">
                    Click the compare button on product cards to add them here
                  </div>
                </div>
              ) : (
                <div className="min-w-full">
                  {/* Product Headers */}
                  <div className="flex">
                    <div className="w-64 p-4 border-r border-gray-200 bg-gray-50">
                      <div className="text-sm font-medium text-gray-500">Features</div>
                    </div>
                    {selectedProducts.map((product) => (
                      <div key={product.id} className="flex-1 p-4 border-r border-gray-200 bg-gray-50">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-gray-900 text-sm line-clamp-2">
                            {product.name}
                          </h3>
                          <button
                            onClick={() => handleRemoveProduct(product.id)}
                            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="w-20 h-20 bg-gray-200 rounded-lg mb-2">
                          <ProductImage product={product} className="w-full h-full" />
                        </div>
                        
                        <div className="space-y-1 mb-3">
                          <div className="flex items-center">
                            <StarRating rating={product.rating} />
                            <span className="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
                          </div>
                          <div className="text-lg font-bold text-gray-900">
                            ${product.price.toFixed(2)}
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="w-full bg-blue-600 text-white py-1 px-2 rounded text-xs hover:bg-blue-700 transition-colors"
                          >
                            Add to Cart
                          </button>
                          <button
                            onClick={() => handleAddToWishlist(product)}
                            className={`w-full py-1 px-2 rounded text-xs transition-colors flex items-center justify-center space-x-1 ${
                              isInWishlist(product.id)
                                ? 'bg-red-100 text-red-600'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            <FiStar className={`w-3 h-3 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                            <span>{isInWishlist(product.id) ? 'In Wishlist' : 'Add to Wishlist'}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Comparison Features */}
                  <div className="max-h-96 overflow-y-auto">
                    {getComparisonData().map((item, index) => (
                      <div key={index} className="flex border-b border-gray-200">
                        <div className="w-64 p-4 border-r border-gray-200 bg-gray-50">
                          <div className="text-sm text-gray-700">{item.feature}</div>
                        </div>
                        {item.products.map((productData) => (
                          <div key={productData.product.id} className="flex-1 p-4 border-r border-gray-200">
                            <div className="flex items-center justify-center">
                              {productData.hasFeature ? (
                                <FiCheck className="w-5 h-5 text-green-500" />
                              ) : (
                                <FiX className="w-5 h-5 text-red-500" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>

                  {/* Product Specifications */}
                  <div className="flex border-b border-gray-200">
                    <div className="w-64 p-4 border-r border-gray-200 bg-gray-50">
                      <div className="text-sm font-medium text-gray-500">Specifications</div>
                    </div>
                    {selectedProducts.map((product) => (
                      <div key={product.id} className="flex-1 p-4 border-r border-gray-200">
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="font-medium text-gray-700">Brand:</span>
                            <span className="ml-2 text-gray-600">{product.brand}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Category:</span>
                            <span className="ml-2 text-gray-600">{product.category}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Weight:</span>
                            <span className="ml-2 text-gray-600">{product.weight}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Dimensions:</span>
                            <span className="ml-2 text-gray-600">{product.dimensions}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  {selectedProducts.length} of {maxProducts} products selected
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Close
                  </button>
                  {selectedProducts.length > 0 && (
                    <button
                      onClick={() => {
                        selectedProducts.forEach(product => handleAddToCart(product));
                        onClose();
                      }}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Add All to Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductComparison;
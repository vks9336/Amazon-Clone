import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiStar, FiEye, FiArrowRight, FiTruck, FiShield, FiZap } from 'react-icons/fi';

const ProductShowcase = ({ products = [] }) => {
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const getProductColor = (index) => {
    const colors = [
      'from-blue-400 to-cyan-500',
      'from-purple-400 to-pink-500',
      'from-green-400 to-emerald-500',
      'from-orange-400 to-red-500',
      'from-indigo-400 to-purple-500',
      'from-teal-400 to-blue-500',
      'from-rose-400 to-pink-500',
      'from-yellow-400 to-orange-500'
    ];
    return colors[index % colors.length];
  };

  const ProductCard = ({ product, index }) => {
    const colorClass = getProductColor(index);
    
    return (
      <div
        className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-200 cursor-pointer"
        onClick={() => {
          setSelectedProduct(product);
          setShowProductModal(true);
        }}
      >
        {/* Product Image */}
        <div className="relative h-48 overflow-hidden">
          {/* Placeholder for product image */}
          <div className="relative z-10 w-full h-full flex items-center justify-center bg-gray-50">
            <div className={`w-20 h-20 rounded-lg bg-gradient-to-br ${colorClass} flex items-center justify-center text-white shadow-sm`}>
              <FiShoppingCart size={32} />
            </div>
          </div>

          {/* Overlay Actions */}
          <div className="absolute top-3 right-3 flex flex-col space-y-2">
            <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors duration-200">
              <FiHeart size={14} className="text-gray-600" />
            </button>
            <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors duration-200">
              <FiEye size={14} className="text-gray-600" />
            </button>
          </div>

          {/* Badge */}
          <div className="absolute top-3 left-3 bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium shadow-sm">
            Featured
          </div>
        </div>

        {/* Product Info */}
        <div className="p-6">
          <div className="mb-3">
            <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-gray-900 transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-gray-500 line-clamp-2">
              {product.description || 'Premium quality product with excellent features and modern design.'}
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-2 mb-4">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    scale: i < 4 ? 1 : 0.8,
                    color: i < 4 ? '#fbbf24' : '#d1d5db'
                  }}
                  transition={{ duration: 0.2, delay: i * 0.1 }}
                >
                  <FiStar size={16} fill="currentColor" />
                </motion.div>
              ))}
            </div>
            <span className="text-sm text-gray-500">4.{8 + index}</span>
            <span className="text-sm text-gray-400">({120 + index * 15})</span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-2xl font-bold text-gray-800">${product.price}</span>
              {product.originalPrice && (
                <span className="text-lg text-gray-400 line-through ml-2">${product.originalPrice}</span>
              )}
            </div>
            {product.discount && (
              <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-bold">
                -{product.discount}%
              </span>
            )}
          </div>

          {/* Features */}
          <div className="flex items-center space-x-4 mb-4 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <FiTruck size={12} />
              <span>Free shipping</span>
            </div>
            <div className="flex items-center space-x-1">
              <FiShield size={12} />
              <span>Warranty</span>
            </div>
            <div className="flex items-center space-x-1">
              <FiZap size={12} />
              <span>Fast delivery</span>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button className={`w-full bg-gradient-to-r ${colorClass} text-white font-bold py-3 rounded-xl hover:shadow-lg transition-shadow duration-200 flex items-center justify-center space-x-2 group`}>
            <FiShoppingCart size={18} />
            <span>Add to Cart</span>
            <span className="group-hover:translate-x-1 transition-transform duration-200">
              <FiArrowRight size={16} />
            </span>
          </button>
        </div>

        {/* Hover Effect Border */}
        <div
          className="absolute inset-0 rounded-2xl border-2 border-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{
            background: `linear-gradient(white, white) padding-box, linear-gradient(45deg, ${colorClass.replace('from-', '').replace(' to-', ', ')}) border-box`
          }}
        />
      </div>
    );
  };

  return (
    <div className="relative w-full py-20 bg-gray-50">
      {/* Clean Background */}
      <div className="absolute inset-0 bg-white/50" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            Featured Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium products with unbeatable quality and value
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} index={index} />
          ))}
        </div>


        {/* Product Modal */}
        {showProductModal && selectedProduct && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowProductModal(false)}
          >
            <motion.div
              className="bg-white rounded-2xl p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div className={`w-20 h-20 rounded-xl bg-gradient-to-br ${getProductColor(products.findIndex(p => p.name === selectedProduct.name))} flex items-center justify-center text-white shadow-lg`}>
                  <FiShoppingCart size={40} />
                </div>
                <button
                  onClick={() => setShowProductModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {selectedProduct.name}
              </h3>
              <p className="text-gray-600 mb-6">
                {selectedProduct.description || 'This premium product offers exceptional quality and innovative features that make it stand out from the competition.'}
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Price</span>
                  <span className="text-2xl font-bold text-gray-800">${selectedProduct.price}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Rating</span>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-3 h-3 bg-yellow-400 rounded-full" />
                    ))}
                    <span className="text-sm text-gray-500 ml-2">4.{8 + products.findIndex(p => p.name === selectedProduct.name)}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Availability</span>
                  <span className="text-sm text-green-600 font-medium">In Stock</span>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button className="flex-1 bg-gradient-to-r from-orange-400 to-orange-500 text-white font-bold py-3 px-6 rounded-lg hover:from-orange-500 hover:to-orange-600 transition-colors duration-200">
                  Add to Cart
                </button>
                <button
                  onClick={() => setShowProductModal(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* View All Products Button */}
        <div className="text-center mt-12">
          <button className="group bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-8 rounded-full hover:from-purple-700 hover:to-pink-700 transition-colors duration-200 shadow-lg hover:shadow-xl">
            <span className="flex items-center space-x-2">
              <span>View All Products</span>
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductShowcase;
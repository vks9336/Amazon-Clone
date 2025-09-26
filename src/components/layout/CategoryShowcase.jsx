import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FiPhone, 
  FiMonitor, 
  FiHome, 
  FiEdit3, 
  FiTruck, 
  FiHeart,
  FiBook,
  FiUser,
  FiSun,
  FiActivity,
  FiCoffee,
  FiSettings,
  FiStar,
  FiCode,
  FiTarget,
  FiTool,
  FiUsers,
  FiShoppingBag
} from 'react-icons/fi';

const CategoryShowcase = ({ categories = [] }) => {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const getCategoryIcon = (iconName) => {
    const icons = {
      'electronics': FiPhone,
      'computers': FiMonitor,
      'smart-home': FiHome,
      'arts-crafts': FiEdit3,
      'automotive': FiTruck,
      'baby': FiUsers,
      'beauty': FiHeart,
      'books': FiBook,
      'fashion': FiUser,
      'garden': FiSun,
      'health': FiActivity,
      'home': FiCoffee,
      'industrial': FiSettings,
      'luxury-beauty': FiStar,
      'pet-supplies': FiShoppingBag,
      'software': FiCode,
      'sports': FiTarget,
      'tools': FiTool
    };
    return icons[iconName] || FiPhone;
  };

  const getCategoryColor = (index) => {
    const colors = [
      'from-red-400 to-pink-500',
      'from-blue-400 to-cyan-500',
      'from-green-400 to-emerald-500',
      'from-yellow-400 to-orange-500',
      'from-purple-400 to-violet-500',
      'from-indigo-400 to-blue-500',
      'from-teal-400 to-green-500',
      'from-rose-400 to-pink-500',
      'from-amber-400 to-yellow-500',
      'from-lime-400 to-green-500',
      'from-sky-400 to-blue-500',
      'from-emerald-400 to-teal-500',
      'from-violet-400 to-purple-500',
      'from-fuchsia-400 to-pink-500',
      'from-cyan-400 to-blue-500',
      'from-orange-400 to-red-500',
      'from-green-400 to-lime-500',
      'from-blue-400 to-indigo-500'
    ];
    return colors[index % colors.length];
  };

  return (
    <motion.div
      className="relative w-full py-20 bg-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Clean Background */}
      <div className="absolute inset-0 bg-gray-50/30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover amazing products across all categories with our curated selection
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {categories.map((category, index) => {
            const IconComponent = getCategoryIcon(category.icon);
            const colorClass = getCategoryColor(index);
            
            return (
            <div
              key={index}
              className="group relative"
              onMouseEnter={() => setHoveredCategory(index)}
              onMouseLeave={() => setHoveredCategory(null)}
              onClick={() => {
                setSelectedCategory(category);
                setShowModal(true);
              }}
            >
                <div className="relative bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200 group-hover:border-gray-300 overflow-hidden cursor-pointer h-48 flex flex-col justify-between">
                  {/* Icon */}
                  <div className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${colorClass} flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform duration-200`}>
                    <IconComponent size={24} />
                  </div>

                  {/* Category Info */}
                  <div className="text-center">
                    <h3 className="font-semibold text-base text-gray-800 mb-1">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">
                      {category.count} items
                    </p>
                    
                    {/* Explore Button */}
                    <div className={`inline-flex items-center px-3 py-1.5 rounded-lg bg-gradient-to-r ${colorClass} text-white text-xs font-medium`}>
                      <span>Explore</span>
                      <span className="ml-1 group-hover:translate-x-1 transition-transform duration-200">→</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Category Modal */}
        {showModal && selectedCategory && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[80vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${getCategoryColor(categories.findIndex(c => c.name === selectedCategory.name))} flex items-center justify-center text-white shadow-lg`}>
                  {React.createElement(getCategoryIcon(selectedCategory.icon), { size: 32 })}
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {selectedCategory.name}
              </h3>
              <p className="text-gray-600 mb-6">
                {selectedCategory.description || `Discover amazing ${selectedCategory.name.toLowerCase()} products`}
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Items Available</span>
                  <span className="font-semibold text-gray-800">{selectedCategory.count} products</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Rating</span>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-3 h-3 bg-yellow-400 rounded-full" />
                    ))}
                    <span className="text-sm text-gray-500 ml-2">4.8</span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <Link
                  to={`/category/${selectedCategory.slug}`}
                  className="flex-1 bg-gradient-to-r from-orange-400 to-orange-500 text-white font-bold py-3 px-6 rounded-lg hover:from-orange-500 hover:to-orange-600 transition-colors duration-200 text-center"
                  onClick={() => setShowModal(false)}
                >
                  Browse Products
                </Link>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* View All Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center space-x-2">
              <span>View All Categories</span>
              <motion.span
                className="group-hover:translate-x-1 transition-transform"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CategoryShowcase;
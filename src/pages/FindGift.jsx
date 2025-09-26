import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGift, FiHeart, FiShoppingCart, FiStar, FiFilter, FiSearch, FiUsers, FiClock, FiTag, FiTrendingUp } from 'react-icons/fi';
import { products } from '../lib/mockData';

const FindGift = () => {
  const [activeTab, setActiveTab] = useState('recommended');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    category: 'all',
    priceRange: 'all',
    occasion: 'all',
    recipient: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);

  const giftCategories = [
    { id: 'electronics', name: 'Electronics', icon: '📱' },
    { id: 'home', name: 'Home & Kitchen', icon: '🏠' },
    { id: 'fashion', name: 'Fashion', icon: '👕' },
    { id: 'books', name: 'Books', icon: '📚' },
    { id: 'toys', name: 'Toys & Games', icon: '🧸' },
    { id: 'beauty', name: 'Beauty & Personal Care', icon: '💄' },
    { id: 'sports', name: 'Sports & Outdoors', icon: '⚽' },
    { id: 'automotive', name: 'Automotive', icon: '🚗' }
  ];

  const occasions = [
    { id: 'birthday', name: 'Birthday' },
    { id: 'anniversary', name: 'Anniversary' },
    { id: 'wedding', name: 'Wedding' },
    { id: 'graduation', name: 'Graduation' },
    { id: 'holiday', name: 'Holiday' },
    { id: 'valentine', name: "Valentine's Day" },
    { id: 'mothers', name: "Mother's Day" },
    { id: 'fathers', name: "Father's Day" }
  ];

  const recipients = [
    { id: 'kids', name: 'Kids (0-12)' },
    { id: 'teens', name: 'Teens (13-19)' },
    { id: 'adults', name: 'Adults (20-64)' },
    { id: 'seniors', name: 'Seniors (65+)' },
    { id: 'men', name: 'Men' },
    { id: 'women', name: 'Women' },
    { id: 'couples', name: 'Couples' }
  ];

  const priceRanges = [
    { id: 'under25', name: 'Under $25' },
    { id: '25-50', name: '$25 - $50' },
    { id: '50-100', name: '$50 - $100' },
    { id: '100-200', name: '$100 - $200' },
    { id: 'over200', name: 'Over $200' }
  ];

  // Mock gift recommendations
  const giftRecommendations = [
    {
      id: 1,
      title: 'Trending Gifts',
      subtitle: 'What everyone is buying right now',
      products: products.slice(0, 6),
      icon: <FiTrendingUp className="w-6 h-6" />
    },
    {
      id: 2,
      title: 'Perfect for Her',
      subtitle: 'Thoughtful gifts she\'ll love',
      products: products.slice(6, 12),
      icon: <FiHeart className="w-6 h-6" />
    },
    {
      id: 3,
      title: 'Perfect for Him',
      subtitle: 'Gifts he\'ll actually use',
      products: products.slice(12, 18),
      icon: <FiUsers className="w-6 h-6" />
    },
    {
      id: 4,
      title: 'Last-Minute Gifts',
      subtitle: 'Great gifts with fast shipping',
      products: products.slice(18, 24),
      icon: <FiClock className="w-6 h-6" />
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedFilters.category === 'all' || 
                           product.category.toLowerCase() === selectedFilters.category;
    
    const matchesPrice = selectedFilters.priceRange === 'all' || 
                        (selectedFilters.priceRange === 'under25' && product.price < 25) ||
                        (selectedFilters.priceRange === '25-50' && product.price >= 25 && product.price <= 50) ||
                        (selectedFilters.priceRange === '50-100' && product.price > 50 && product.price <= 100) ||
                        (selectedFilters.priceRange === '100-200' && product.price > 100 && product.price <= 200) ||
                        (selectedFilters.priceRange === 'over200' && product.price > 200);
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setSelectedFilters({
      category: 'all',
      priceRange: 'all',
      occasion: 'all',
      recipient: 'all'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center">
                <FiGift className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Find the Perfect Gift
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover thoughtful gifts for every occasion and recipient. From trending items to personalized recommendations, we'll help you find something special.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-6">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for gifts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
            </div>
          </div>

          {/* Filter Toggle */}
          <div className="flex justify-center mb-6">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <FiFilter className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>
        </motion.div>

        {/* Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Category
                  </label>
                  <select
                    value={selectedFilters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  >
                    <option value="all">All Categories</option>
                    {giftCategories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.icon} {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Price Range
                  </label>
                  <select
                    value={selectedFilters.priceRange}
                    onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  >
                    <option value="all">Any Price</option>
                    {priceRanges.map(range => (
                      <option key={range.id} value={range.id}>
                        {range.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Occasion Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Occasion
                  </label>
                  <select
                    value={selectedFilters.occasion}
                    onChange={(e) => handleFilterChange('occasion', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  >
                    <option value="all">Any Occasion</option>
                    {occasions.map(occasion => (
                      <option key={occasion.id} value={occasion.id}>
                        {occasion.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Recipient Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Recipient
                  </label>
                  <select
                    value={selectedFilters.recipient}
                    onChange={(e) => handleFilterChange('recipient', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  >
                    <option value="all">Anyone</option>
                    {recipients.map(recipient => (
                      <option key={recipient.id} value={recipient.id}>
                        {recipient.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex space-x-1 mb-8"
        >
          <button
            onClick={() => setActiveTab('recommended')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'recommended'
                ? 'bg-blue-600 dark:bg-orange-500 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            Recommended
          </button>
          <button
            onClick={() => setActiveTab('search')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'search'
                ? 'bg-blue-600 dark:bg-orange-500 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            Search Results ({filteredProducts.length})
          </button>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'recommended' && (
            <motion.div
              key="recommended"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-8"
            >
              {giftRecommendations.map((section, sectionIndex) => (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: sectionIndex * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="text-blue-600 dark:text-orange-500">
                      {section.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {section.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {section.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                    {section.products.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.05 }}
                        className="group cursor-pointer"
                      >
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 h-full">
                          <div className="aspect-square mb-3">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover rounded-lg"
                              onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/200x200?text=No+Image';
                              }}
                            />
                          </div>
                          <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-1 line-clamp-2">
                            {product.name}
                          </h4>
                          <div className="flex items-center space-x-1 mb-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <FiStar
                                  key={i}
                                  className={`w-3 h-3 ${
                                    i < Math.floor(product.rating)
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-gray-300 dark:text-gray-600'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              ({product.reviews})
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-gray-900 dark:text-white">
                              ${product.price}
                            </span>
                            <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-blue-600 dark:text-orange-500 hover:text-blue-700 dark:hover:text-orange-600">
                              <FiHeart className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'search' && (
            <motion.div
              key="search"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              {filteredProducts.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
                  <FiGift className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No gifts found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Try adjusting your search or filter criteria.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <div className="aspect-square mb-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover rounded-lg"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/200x200?text=No+Image';
                          }}
                        />
                      </div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2 line-clamp-2">
                        {product.name}
                      </h4>
                      <div className="flex items-center space-x-1 mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <FiStar
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(product.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300 dark:text-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          ({product.reviews})
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-900 dark:text-white">
                          ${product.price}
                        </span>
                        <button className="p-2 text-blue-600 dark:text-orange-500 hover:text-blue-700 dark:hover:text-orange-600 transition-colors">
                          <FiHeart className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FindGift;
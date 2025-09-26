import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiClock, FiTrash2, FiEye, FiHeart, FiShoppingCart, FiSearch, FiFilter, FiCalendar, FiTrendingUp, FiStar } from 'react-icons/fi';
import { useRecentlyViewed } from '../context/RecentlyViewedContext';
import { products } from '../lib/mockData';

const BrowsingHistory = () => {
  const { recentlyViewed, clearHistory, removeFromHistory } = useRecentlyViewed();
  const [activeTab, setActiveTab] = useState('recent');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock browsing history data (combining with recently viewed)
  const browsingHistory = [
    ...recentlyViewed.map(item => ({
      ...item,
      viewedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000), // Random date within last week
      category: products.find(p => p.id === item.id)?.category || 'Electronics',
      price: products.find(p => p.id === item.id)?.price || 99.99,
      rating: products.find(p => p.id === item.id)?.rating || 4.5,
      reviews: products.find(p => p.id === item.id)?.reviews || 123
    })),
    // Add some additional mock data
    ...products.slice(0, 10).map(product => ({
      id: product.id + 1000, // Ensure unique IDs
      name: product.name,
      image: product.image,
      viewedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000), // Random date within last month
      category: product.category,
      price: product.price,
      rating: product.rating,
      reviews: product.reviews
    }))
  ].sort((a, b) => new Date(b.viewedAt) - new Date(a.viewedAt));

  const categories = ['all', ...new Set(browsingHistory.map(item => item.category))];
  
  const dateFilters = [
    { id: 'all', name: 'All Time' },
    { id: 'today', name: 'Today' },
    { id: 'week', name: 'This Week' },
    { id: 'month', name: 'This Month' },
    { id: 'year', name: 'This Year' }
  ];

  const filteredHistory = browsingHistory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    
    const now = new Date();
    const itemDate = new Date(item.viewedAt);
    let matchesDate = true;
    
    switch (selectedDate) {
      case 'today':
        matchesDate = itemDate.toDateString() === now.toDateString();
        break;
      case 'week':
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        matchesDate = itemDate >= weekAgo;
        break;
      case 'month':
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        matchesDate = itemDate >= monthAgo;
        break;
      case 'year':
        const yearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        matchesDate = itemDate >= yearAgo;
        break;
      default:
        matchesDate = true;
    }
    
    return matchesSearch && matchesCategory && matchesDate;
  });

  const getTimeAgo = (date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return date.toLocaleDateString();
  };

  const getCategoryStats = () => {
    const stats = {};
    browsingHistory.forEach(item => {
      stats[item.category] = (stats[item.category] || 0) + 1;
    });
    return Object.entries(stats).sort((a, b) => b[1] - a[1]);
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
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-500 rounded-full flex items-center justify-center">
                <FiClock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Browsing History
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Your recently viewed items and browsing activity
                </p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearHistory}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
            >
              <FiTrash2 className="w-4 h-4" />
              <span>Clear History</span>
            </motion.button>
          </div>

          {/* Search and Filters */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search your browsing history..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                >
                  {dateFilters.map(filter => (
                    <option key={filter.id} value={filter.id}>
                      {filter.name}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                >
                  <option value="all">All Categories</option>
                  {categories.slice(1).map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex space-x-1 mb-8"
        >
          <button
            onClick={() => setActiveTab('recent')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'recent'
                ? 'bg-blue-600 dark:bg-orange-500 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            Recent ({filteredHistory.length})
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'stats'
                ? 'bg-blue-600 dark:bg-orange-500 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            Statistics
          </button>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'recent' && (
            <motion.div
              key="recent"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              {filteredHistory.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
                  <FiClock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No browsing history found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Start browsing products to see your history here.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredHistory.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-lg"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/100x100?text=No+Image';
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                            {item.name}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                            <span className="flex items-center space-x-1">
                              <FiCalendar className="w-4 h-4" />
                              <span>{getTimeAgo(item.viewedAt)}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <FiTrendingUp className="w-4 h-4" />
                              <span>{item.category}</span>
                            </span>
                          </div>
                          <div className="flex items-center space-x-1 mb-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <FiStar
                                  key={i}
                                  className={`w-3 h-3 ${
                                    i < Math.floor(item.rating)
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-gray-300 dark:text-gray-600'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-gray-600 dark:text-gray-400 ml-1">
                              ({item.reviews})
                            </span>
                          </div>
                          <p className="text-lg font-semibold text-gray-900 dark:text-white">
                            ${item.price}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
                            <FiEye className="w-5 h-5" />
                          </button>
                          <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
                            <FiHeart className="w-5 h-5" />
                          </button>
                          <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
                            <FiShoppingCart className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => removeFromHistory(item.id)}
                            className="p-2 text-red-600 hover:text-red-700 dark:hover:text-red-500 transition-colors"
                          >
                            <FiTrash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'stats' && (
            <motion.div
              key="stats"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              {/* Overview Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                      <FiEye className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {browsingHistory.length}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Total Items Viewed
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                      <FiTrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {categories.length - 1}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Categories Explored
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                      <FiClock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {Math.floor((Date.now() - Math.min(...browsingHistory.map(item => new Date(item.viewedAt)))) / (1000 * 60 * 60 * 24))}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Days Active
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Category Breakdown */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Most Viewed Categories
                </h3>
                <div className="space-y-4">
                  {getCategoryStats().slice(0, 5).map(([category, count], index) => (
                    <motion.div
                      key={category}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                            {index + 1}
                          </span>
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {category}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-32 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div
                            className="bg-blue-600 dark:bg-orange-500 h-2 rounded-full"
                            style={{ width: `${(count / Math.max(...getCategoryStats().map(([, c]) => c))) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-8 text-right">
                          {count}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Recent Activity Timeline */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  {browsingHistory.slice(0, 10).map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center space-x-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <div className="w-10 h-10 bg-gray-100 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-8 h-8 object-cover rounded"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/50x50?text=No+Image';
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          Viewed {item.name}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {getTimeAgo(item.viewedAt)} • {item.category}
                        </p>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        ${item.price}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BrowsingHistory;
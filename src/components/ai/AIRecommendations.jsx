import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiArrowUp, FiUsers, FiClock, FiStar, FiShoppingCart, FiHeart } from 'react-icons/fi';
import { products } from '../../lib/mockData';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useRecentlyViewed } from '../../context/RecentlyViewedContext';

const AIRecommendations = ({ userId, className = '' }) => {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const { recentlyViewed } = useRecentlyViewed();
  
  const [recommendations, setRecommendations] = useState({
    personalized: [],
    trending: [],
    similar: [],
    frequentlyBought: [],
    seasonal: [],
    priceDrop: []
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('personalized');

  // Simulate AI recommendation engine
  useEffect(() => {
    const generateRecommendations = () => {
      // Personalized recommendations based on user behavior
      const personalized = generatePersonalizedRecommendations();
      
      // Trending products
      const trending = products
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 6);
      
      // Similar to recently viewed
      const similar = generateSimilarRecommendations();
      
      // Frequently bought together
      const frequentlyBought = generateFrequentlyBought();
      
      // Seasonal recommendations
      const seasonal = generateSeasonalRecommendations();
      
      // Price drop alerts
      const priceDrop = generatePriceDropRecommendations();

      setRecommendations({
        personalized,
        trending,
        similar,
        frequentlyBought,
        seasonal,
        priceDrop
      });
      
      setIsLoading(false);
    };

    generateRecommendations();
  }, [userId, recentlyViewed]);

  const generatePersonalizedRecommendations = () => {
    // Simulate AI analysis of user preferences
    const userPreferences = {
      categories: ['Electronics', 'Computers', 'Smart Home'],
      priceRange: [50, 500],
      brands: ['Apple', 'Samsung', 'Sony'],
      features: ['Wireless', 'Bluetooth', 'Smart']
    };

    return products
      .filter(product => 
        userPreferences.categories.includes(product.category) &&
        product.price >= userPreferences.priceRange[0] &&
        product.price <= userPreferences.priceRange[1] &&
        product.rating >= 4.0
      )
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 6);
  };

  const generateSimilarRecommendations = () => {
    if (recentlyViewed.length === 0) return [];
    
    const lastViewed = recentlyViewed[0];
    return products
      .filter(product => 
        product.category === lastViewed.category &&
        product.id !== lastViewed.id &&
        product.rating >= 4.0
      )
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 6);
  };

  const generateFrequentlyBought = () => {
    // Simulate "customers also bought" logic
    return products
      .filter(product => product.category === 'Electronics' || product.category === 'Computers')
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 6);
  };

  const generateSeasonalRecommendations = () => {
    const currentMonth = new Date().getMonth();
    const seasonalCategories = {
      0: ['Home & Kitchen', 'Fashion'], // January - Winter
      1: ['Home & Kitchen', 'Fashion'], // February - Winter
      2: ['Garden & Outdoor', 'Sports'], // March - Spring
      3: ['Garden & Outdoor', 'Sports'], // April - Spring
      4: ['Garden & Outdoor', 'Sports'], // May - Spring
      5: ['Garden & Outdoor', 'Sports'], // June - Summer
      6: ['Garden & Outdoor', 'Sports'], // July - Summer
      7: ['Garden & Outdoor', 'Sports'], // August - Summer
      8: ['Home & Kitchen', 'Fashion'], // September - Fall
      9: ['Home & Kitchen', 'Fashion'], // October - Fall
      10: ['Home & Kitchen', 'Fashion'], // November - Fall
      11: ['Home & Kitchen', 'Fashion'] // December - Winter
    };

    const currentSeasonalCategories = seasonalCategories[currentMonth] || ['Electronics'];
    
    return products
      .filter(product => currentSeasonalCategories.includes(product.category))
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 6);
  };

  const generatePriceDropRecommendations = () => {
    return products
      .filter(product => product.price < 100 && product.rating >= 4.0)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 6);
  };

  const tabs = [
    { id: 'personalized', name: 'For You', icon: FiMessageSquare, count: recommendations.personalized.length },
    { id: 'trending', name: 'Trending', icon: FiArrowUp, count: recommendations.trending.length },
    { id: 'similar', name: 'Similar', icon: FiUsers, count: recommendations.similar.length },
    { id: 'frequentlyBought', name: 'Frequently Bought', icon: FiShoppingCart, count: recommendations.frequentlyBought.length },
    { id: 'seasonal', name: 'Seasonal', icon: FiClock, count: recommendations.seasonal.length },
    { id: 'priceDrop', name: 'Price Drop', icon: FiStar, count: recommendations.priceDrop.length }
  ];

  const RecommendationCard = ({ product, type = 'default' }) => {
    const [isHovered, setIsHovered] = useState(false);

    const getRecommendationReason = () => {
      switch (type) {
        case 'personalized':
          return 'Based on your preferences';
        case 'trending':
          return 'Trending now';
        case 'similar':
          return 'Similar to your recent views';
        case 'frequentlyBought':
          return 'Customers also bought';
        case 'seasonal':
          return 'Perfect for this season';
        case 'priceDrop':
          return 'Great deal!';
        default:
          return 'Recommended for you';
      }
    };

    return (
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow"
        whileHover={{ y: -2 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
            {getRecommendationReason()}
          </div>
          <motion.button
            className="absolute top-2 right-2 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => addToWishlist(product)}
          >
            <FiHeart className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </motion.button>
        </div>
        
        <div className="p-4">
          <h3 className="font-medium text-gray-900 dark:text-white mb-2 line-clamp-2">
            {product.name}
          </h3>
          
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300 dark:text-gray-600'
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
              {product.rating} ({product.reviews} reviews)
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
            
            <motion.button
              className="bg-orange-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-orange-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  };

  if (isLoading) {
    return (
      <div className={`${className}`}>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-4">
          <FiMessageSquare className="w-6 h-6 text-orange-500" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">AI Recommendations</h2>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-gray-700 text-orange-500 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.name}</span>
              <span className="bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400 text-xs px-2 py-1 rounded-full">
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Recommendations Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {recommendations[activeTab].map((product) => (
            <RecommendationCard
              key={product.id}
              product={product}
              type={activeTab}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* AI Insights */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">AI Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">87%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Accuracy Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">2.3x</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Higher Conversion</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">15%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">More Engagement</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIRecommendations;
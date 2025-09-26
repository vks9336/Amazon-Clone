import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHeart, FiShoppingCart, FiTrash2, FiSearch, FiFilter } from 'react-icons/fi';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import StarRating from '../components/ui/StarRating';

const Wishlist = () => {
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('dateAdded');
  const [filterCategory, setFilterCategory] = useState('all');

  const categories = [
    'Electronics', 'Computers', 'Smart Home', 'Arts & Crafts', 
    'Automotive', 'Baby', 'Beauty & Personal Care', 'Books',
    'Fashion', 'Garden & Outdoor', 'Health & Household', 
    'Home & Kitchen', 'Industrial & Scientific', 'Luxury Beauty',
    'Pet Supplies', 'Software', 'Sports & Outdoors', 
    'Tools & Home Improvement', 'Toys & Games', 'Video Games'
  ];

  const filteredAndSortedItems = items
    .filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.brand.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price':
          return a.price - b.price;
        case 'rating':
          return b.rating - a.rating;
        case 'dateAdded':
        default:
          return b.dateAdded - a.dateAdded;
      }
    });

  const handleMoveToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  const handleRemoveFromWishlist = (id) => {
    removeFromWishlist(id);
  };

  const handleClearWishlist = () => {
    if (window.confirm('Are you sure you want to clear your entire wishlist?')) {
      clearWishlist();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Wishlist</h1>
          <p className="text-gray-600">
            {items.length} item{items.length !== 1 ? 's' : ''} saved for later
          </p>
        </div>

        {items.length > 0 ? (
          <>
            {/* Controls */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="flex-1">
                  <div className="relative">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search your wishlist..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Filters */}
                <div className="flex gap-4">
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="dateAdded">Recently Added</option>
                    <option value="name">Name A-Z</option>
                    <option value="price">Price: Low to High</option>
                    <option value="rating">Highest Rated</option>
                  </select>

                  <button
                    onClick={handleClearWishlist}
                    className="px-4 py-2 text-red-600 hover:text-red-800 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </div>

            {/* Wishlist Items */}
            <div className="space-y-4">
              <AnimatePresence>
                {filteredAndSortedItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-lg shadow-sm p-6"
                  >
                    <div className="flex items-start space-x-4">
                      {/* Product Image */}
                      <Link to={`/product/${item.id}`} className="flex-shrink-0">
                        <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                          <div className="bg-gray-300 border-2 border-dashed rounded-lg w-20 h-20 flex items-center justify-center">
                            <span className="text-gray-500 text-xs">Image</span>
                          </div>
                        </div>
                      </Link>

                      {/* Product Info */}
                      <div className="flex-grow min-w-0">
                        <Link to={`/product/${item.id}`}>
                          <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 line-clamp-2 mb-2">
                            {item.name}
                          </h3>
                        </Link>
                        
                        <div className="flex items-center mb-2">
                          <StarRating rating={item.rating} />
                          <span className="text-gray-500 text-sm ml-1">({item.reviewCount})</span>
                        </div>
                        
                        <p className="text-sm text-gray-500 mb-2">{item.category} • {item.brand}</p>
                        
                        <div className="flex items-center justify-between">
                          <p className="text-xl font-bold text-gray-900">${item.price.toFixed(2)}</p>
                          
                          <div className="flex items-center space-x-2">
                            <motion.button
                              onClick={() => handleMoveToCart(item)}
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <FiShoppingCart />
                              <span>Move to Cart</span>
                            </motion.button>
                            
                            <motion.button
                              onClick={() => handleRemoveFromWishlist(item.id)}
                              className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <FiTrash2 />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Bulk Actions */}
            {filteredAndSortedItems.length > 1 && (
              <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Bulk Actions</h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      filteredAndSortedItems.forEach(item => handleMoveToCart(item));
                    }}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <FiShoppingCart />
                    <span>Move All to Cart</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      if (window.confirm('Remove all items from wishlist?')) {
                        filteredAndSortedItems.forEach(item => handleRemoveFromWishlist(item.id));
                      }
                    }}
                    className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                  >
                    <FiTrash2 />
                    <span>Remove All</span>
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          /* Empty Wishlist */
          <div className="text-center py-12">
            <div className="text-gray-400 text-8xl mb-6">💝</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Your wishlist is empty</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Save items you love for later! Click the heart icon on any product to add it to your wishlist.
            </p>
            <Link
              to="/"
              className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Start Shopping
            </Link>
          </div>
        )}

        {/* No Results */}
        {items.length > 0 && filteredAndSortedItems.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search terms or filters.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterCategory('all');
                setSortBy('dateAdded');
              }}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
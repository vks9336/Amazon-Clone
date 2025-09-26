import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFilter, FiX, FiArrowDown, FiArrowUp, FiSearch, FiStar } from 'react-icons/fi';
import { products } from '../../lib/mockData';

const AdvancedSearchFilters = ({ onFiltersChange, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    brands: [],
    categories: [],
    rating: 0,
    availability: 'all',
    sortBy: 'relevance',
    features: []
  });

  // Get unique brands and categories from products
  const brands = [...new Set(products.map(p => p.brand))].sort();
  const categories = [...new Set(products.map(p => p.category))].sort();
  
  // Get all unique features
  const allFeatures = [...new Set(products.flatMap(p => p.features))];

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleMultiSelect = (filterType, value) => {
    const currentValues = filters[filterType];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    handleFilterChange(filterType, newValues);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      priceRange: [0, 1000],
      brands: [],
      categories: [],
      rating: 0,
      availability: 'all',
      sortBy: 'relevance',
      features: []
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.brands.length > 0) count++;
    if (filters.categories.length > 0) count++;
    if (filters.rating > 0) count++;
    if (filters.availability !== 'all') count++;
    if (filters.features.length > 0) count++;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className={`relative ${className}`}>
      {/* Filter Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <FiFilter className="w-4 h-4" />
        <span className="text-sm font-medium">Filters</span>
        {activeFiltersCount > 0 && (
          <span className="bg-orange-500 text-white text-xs rounded-full px-2 py-1">
            {activeFiltersCount}
          </span>
        )}
        {isOpen ? <FiArrowUp className="w-4 h-4" /> : <FiArrowDown className="w-4 h-4" />}
      </button>

      {/* Filter Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h3>
              <button
                onClick={clearAllFilters}
                className="text-sm text-orange-500 hover:text-orange-600"
              >
                Clear All
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Price Range
                </label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={filters.priceRange[1]}
                    onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>${filters.priceRange[0]}</span>
                    <span>${filters.priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Brands */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Brands
                </label>
                <div className="max-h-32 overflow-y-auto space-y-1">
                  {brands.map(brand => (
                    <label key={brand} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={filters.brands.includes(brand)}
                        onChange={() => handleMultiSelect('brands', brand)}
                        className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Categories
                </label>
                <div className="max-h-32 overflow-y-auto space-y-1">
                  {categories.map(category => (
                    <label key={category} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={filters.categories.includes(category)}
                        onChange={() => handleMultiSelect('categories', category)}
                        className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Minimum Rating
                </label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map(rating => (
                    <button
                      key={rating}
                      onClick={() => handleFilterChange('rating', rating)}
                      className={`p-1 ${
                        filters.rating >= rating
                          ? 'text-yellow-400'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                    >
                      <FiStar className="w-5 h-5" />
                    </button>
                  ))}
                  {filters.rating > 0 && (
                    <button
                      onClick={() => handleFilterChange('rating', 0)}
                      className="text-sm text-gray-500 hover:text-gray-700"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Availability */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Availability
                </label>
                <select
                  value={filters.availability}
                  onChange={(e) => handleFilterChange('availability', e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="all">All Products</option>
                  <option value="in-stock">In Stock</option>
                  <option value="low-stock">Low Stock</option>
                  <option value="out-of-stock">Out of Stock</option>
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Sort By
                </label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="relevance">Relevance</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                  <option value="newest">Newest Arrivals</option>
                  <option value="popularity">Most Popular</option>
                </select>
              </div>
            </div>

            {/* Features Filter */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Features
              </label>
              <div className="max-h-32 overflow-y-auto space-y-1">
                {allFeatures.slice(0, 20).map(feature => (
                  <label key={feature} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters.features.includes(feature)}
                      onChange={() => handleMultiSelect('features', feature)}
                      className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Apply Filters Button */}
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdvancedSearchFilters;
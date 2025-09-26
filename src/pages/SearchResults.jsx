import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiFilter, FiGrid, FiList, FiStar } from 'react-icons/fi';
import { products } from '../lib/mockData';
import ProductCard from '../components/product/ProductCard';
import AdvancedSearchFilters from '../components/search/AdvancedSearchFilters';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: 'all',
    rating: 'all',
    brand: 'all',
    sortBy: 'relevance'
  });
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [advancedFilters, setAdvancedFilters] = useState({});

  const categories = [
    'Electronics', 'Computers', 'Smart Home', 'Arts & Crafts', 
    'Automotive', 'Baby', 'Beauty & Personal Care', 'Books',
    'Fashion', 'Garden & Outdoor', 'Health & Household', 
    'Home & Kitchen', 'Industrial & Scientific', 'Luxury Beauty',
    'Pet Supplies', 'Software', 'Sports & Outdoors', 
    'Tools & Home Improvement', 'Toys & Games', 'Video Games'
  ];

  const brands = [...new Set(products.map(p => p.brand))];
  const priceRanges = [
    { label: 'Under $25', value: '0-25' },
    { label: '$25 - $50', value: '25-50' },
    { label: '$50 - $100', value: '50-100' },
    { label: '$100 - $200', value: '100-200' },
    { label: '$200 - $500', value: '200-500' },
    { label: 'Over $500', value: '500+' }
  ];

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q') || '';
    setQuery(q);
    performSearch(q, filters);
  }, [location.search, filters]);

  const performSearch = (searchQuery, currentFilters) => {
    let results = products;

    // Text search
    if (searchQuery) {
      results = results.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.features.some(feature => 
          feature.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Category filter
    if (currentFilters.category !== 'all') {
      results = results.filter(product => product.category === currentFilters.category);
    }

    // Brand filter
    if (currentFilters.brand !== 'all') {
      results = results.filter(product => product.brand === currentFilters.brand);
    }

    // Price range filter
    if (currentFilters.priceRange !== 'all') {
      const [min, max] = currentFilters.priceRange.split('-');
      if (max === '+') {
        results = results.filter(product => product.price >= parseInt(min));
      } else {
        results = results.filter(product => 
          product.price >= parseInt(min) && product.price <= parseInt(max)
        );
      }
    }

    // Rating filter
    if (currentFilters.rating !== 'all') {
      const minRating = parseFloat(currentFilters.rating);
      results = results.filter(product => product.rating >= minRating);
    }

    // Sorting
    switch (currentFilters.sortBy) {
      case 'price-low':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        results.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        results.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'name':
        results.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Keep original order for relevance
        break;
    }

    setSearchResults(results);
    setCurrentPage(1);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: 'all',
      priceRange: 'all',
      rating: 'all',
      brand: 'all',
      sortBy: 'relevance'
    });
  };

  const paginatedResults = searchResults.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(searchResults.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Search Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <AdvancedSearchFilters 
                onFiltersChange={setAdvancedFilters}
                className="flex-1"
              />
              <div className="flex border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
                >
                  <FiGrid />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
                >
                  <FiList />
                </button>
              </div>
            </div>
          </div>

          {/* Advanced Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 pt-6 border-t border-gray-200"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={filters.category}
                      onChange={(e) => handleFilterChange('category', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Categories</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  {/* Brand Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                    <select
                      value={filters.brand}
                      onChange={(e) => handleFilterChange('brand', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Brands</option>
                      {brands.map(brand => (
                        <option key={brand} value={brand}>{brand}</option>
                      ))}
                    </select>
                  </div>

                  {/* Price Range Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                    <select
                      value={filters.priceRange}
                      onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Prices</option>
                      {priceRanges.map(range => (
                        <option key={range.value} value={range.value}>{range.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Rating Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Rating</label>
                    <select
                      value={filters.rating}
                      onChange={(e) => handleFilterChange('rating', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">Any Rating</option>
                      <option value="4.5">4.5+ Stars</option>
                      <option value="4.0">4.0+ Stars</option>
                      <option value="3.5">3.5+ Stars</option>
                      <option value="3.0">3.0+ Stars</option>
                    </select>
                  </div>

                  {/* Sort By */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                    <select
                      value={filters.sortBy}
                      onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="relevance">Relevance</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Customer Rating</option>
                      <option value="reviews">Most Reviews</option>
                      <option value="name">Name A-Z</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={clearFilters}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Clear all filters
                  </button>
                  <span className="text-sm text-gray-600">
                    {searchResults.length} results found
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            {query ? `Search results for "${query}"` : 'All Products'}
          </h1>
          <div className="text-sm text-gray-600">
            Showing {paginatedResults.length} of {searchResults.length} results
          </div>
        </div>

        {/* Results Grid/List */}
        {paginatedResults.length > 0 ? (
          <>
            <div className={`${
              viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
                : 'space-y-4'
            }`}>
              <AnimatePresence>
                {paginatedResults.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ProductCard 
                      product={product} 
                      viewMode={viewMode}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  
                  {[...Array(totalPages)].map((_, index) => {
                    const page = index + 1;
                    const isCurrentPage = page === currentPage;
                    const shouldShow = page === 1 || page === totalPages || 
                      (page >= currentPage - 1 && page <= currentPage + 1);
                    
                    if (!shouldShow) {
                      if (page === currentPage - 2 || page === currentPage + 2) {
                        return <span key={page} className="px-3 py-2 text-gray-500">...</span>;
                      }
                      return null;
                    }
                    
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-2 text-sm font-medium rounded-md ${
                          isCurrentPage
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <button
              onClick={clearFilters}
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

export default SearchResults;

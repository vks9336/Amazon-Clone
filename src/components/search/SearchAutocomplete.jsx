import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiMic, FiMicOff, FiClock, FiArrowUp, FiX } from 'react-icons/fi';
import { products } from '../../lib/mockData';

const SearchAutocomplete = ({ onSearch, className = '' }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [popularSearches, setPopularSearches] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);

  // Popular searches (mock data)
  const mockPopularSearches = [
    'iPhone 15 Pro', 'MacBook Air', 'AirPods Pro', 'Samsung Galaxy S23',
    'Nike Air Max', 'Adidas Ultraboost', 'Sony WH-1000XM5', 'iPad Pro'
  ];

  // Search history from localStorage
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    setSearchHistory(savedHistory);
  }, []);

  // Popular searches
  useEffect(() => {
    setPopularSearches(mockPopularSearches);
  }, []);

  // Speech recognition setup
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        handleSearch(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  // Generate search suggestions
  const generateSuggestions = (searchQuery) => {
    if (!searchQuery.trim()) {
      return [];
    }

    const query = searchQuery.toLowerCase();
    const productSuggestions = products
      .filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      )
      .slice(0, 5)
      .map(product => ({
        type: 'product',
        title: product.name,
        subtitle: `${product.brand} • ${product.category}`,
        price: product.price,
        image: null, // Would be product image in real app
        action: () => onSearch(product.name)
      }));

    const categorySuggestions = [
      'Electronics', 'Computers', 'Smart Home', 'Fashion', 'Home & Garden',
      'Sports & Outdoors', 'Books & Media', 'Beauty & Personal Care'
    ]
      .filter(category => category.toLowerCase().includes(query))
      .slice(0, 3)
      .map(category => ({
        type: 'category',
        title: `Shop ${category}`,
        subtitle: `Browse ${category} products`,
        action: () => onSearch(category)
      }));

    return [...productSuggestions, ...categorySuggestions];
  };

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.trim()) {
      const newSuggestions = generateSuggestions(value);
      setSuggestions(newSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
    
    setSelectedIndex(-1);
  };

  // Handle search
  const handleSearch = (searchQuery = query) => {
    if (!searchQuery.trim()) return;

    // Add to search history
    const newHistory = [searchQuery, ...searchHistory.filter(item => item !== searchQuery)].slice(0, 10);
    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));

    // Clear suggestions and search
    setShowSuggestions(false);
    setQuery('');
    onSearch(searchQuery);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          suggestions[selectedIndex].action();
        } else {
          handleSearch();
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  // Handle voice search
  const handleVoiceSearch = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition not supported in this browser');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  // Clear search history
  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  return (
    <div className={`relative ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <div className="flex relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Search Amazon"
            className="w-full px-4 py-2 rounded-l-md text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:focus:ring-orange-400 transition-all duration-300 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
          />
          
          {/* Voice Search Button */}
          <button
            onClick={handleVoiceSearch}
            className={`px-3 py-2 border-l border-gray-300 transition-colors ${
              isListening 
                ? 'bg-red-500 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            title="Voice Search"
          >
            {isListening ? <FiMicOff className="w-4 h-4" /> : <FiMic className="w-4 h-4" />}
          </button>
          
          {/* Search Button */}
          <motion.button 
            onClick={() => handleSearch()}
            className="bg-gradient-to-r from-orange-400 to-orange-500 px-4 rounded-r-md hover:from-orange-500 hover:to-orange-600 transition-all duration-300 shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiSearch size={20} />
          </motion.button>
        </div>
      </div>

      {/* Suggestions Dropdown */}
      <AnimatePresence>
        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50 max-h-96 overflow-y-auto"
          >
            {/* Search Suggestions */}
            {suggestions.length > 0 && (
              <div className="p-2">
                <div className="text-xs text-gray-500 dark:text-gray-400 px-3 py-2 font-medium">Suggestions</div>
                {suggestions.map((suggestion, index) => (
                  <motion.button
                    key={index}
                    onClick={suggestion.action}
                    className={`w-full text-left px-3 py-2 rounded-md flex items-center space-x-3 transition-colors ${
                      selectedIndex === index 
                        ? 'bg-blue-50 text-blue-700' 
                        : 'hover:bg-gray-50'
                    }`}
                    whileHover={{ x: 4 }}
                  >
                    <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                      <span className="text-gray-500 dark:text-gray-400 text-xs">
                        {suggestion.type === 'product' ? '📦' : '🏷️'}
                      </span>
                    </div>
                    <div className="flex-grow">
                      <div className="font-medium text-gray-900 dark:text-white">{suggestion.title}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{suggestion.subtitle}</div>
                      {suggestion.price && (
                        <div className="text-sm font-medium text-green-600">
                          ${suggestion.price.toFixed(2)}
                        </div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {/* Search History */}
            {query === '' && searchHistory.length > 0 && (
              <div className="p-2 border-t border-gray-100">
                <div className="flex items-center justify-between px-3 py-2">
                  <div className="text-xs text-gray-500 dark:text-gray-400 font-medium flex items-center space-x-1">
                    <FiClock className="w-3 h-3" />
                    <span>Recent Searches</span>
                  </div>
                  <button
                    onClick={clearHistory}
                    className="text-xs text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    Clear
                  </button>
                </div>
                {searchHistory.slice(0, 5).map((item, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleSearch(item)}
                    className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-3"
                    whileHover={{ x: 4 }}
                  >
                    <FiClock className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </motion.button>
                ))}
              </div>
            )}

            {/* Popular Searches */}
            {query === '' && (
              <div className="p-2 border-t border-gray-100">
                <div className="text-xs text-gray-500 dark:text-gray-400 px-3 py-2 font-medium flex items-center space-x-1">
                  <FiArrowUp className="w-3 h-3" />
                  <span>Popular Searches</span>
                </div>
                <div className="px-3 py-2">
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.slice(0, 8).map((item, index) => (
                      <motion.button
                        key={index}
                        onClick={() => handleSearch(item)}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full text-sm text-gray-700 dark:text-gray-300 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {item}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* No Results */}
            {query !== '' && suggestions.length === 0 && (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                <div className="text-sm">No suggestions found for "{query}"</div>
                <div className="text-xs mt-1">Try a different search term</div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Voice Search Status */}
      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-full left-0 right-0 mt-2 bg-red-500 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-pulse w-2 h-2 bg-white rounded-full"></div>
              <span>Listening... Speak now</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchAutocomplete;
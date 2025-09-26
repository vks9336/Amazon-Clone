import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiShoppingCart, FiMenu, FiX, FiStar, FiHeart } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';
import MegaMenu from './MegaMenu';
import SearchAutocomplete from '../search/SearchAutocomplete';
import { NotificationBell } from '../../context/NotificationContext';
import ThemeToggle from '../ui/ThemeToggle';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const { items } = useCart();
  const { user, logout } = useAuth();
  const { getWishlistCount } = useWishlist();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <motion.header 
      className={`sticky top-0 z-50 text-gray-800 dark:text-white transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-black/95 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-gray-800' 
          : 'bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Top Navigation */}
      <div className="hidden md:flex items-center justify-between px-4 py-2 text-xs bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-4">
          <Link to="/signin" className="hover:text-orange-500 cursor-pointer text-gray-600 dark:text-gray-300">Hello, {user ? user.name : 'Sign in'}</Link>
          <Link to="/returns-orders" className="hover:text-orange-500 cursor-pointer text-gray-600 dark:text-gray-300">Returns & Orders</Link>
          <Link to="/your-prime" className="hover:text-orange-500 cursor-pointer text-gray-600 dark:text-gray-300">Your Prime</Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/lists" className="hover:text-orange-500 cursor-pointer text-gray-600 dark:text-gray-300">Your Lists</Link>
          <Link to="/create-list" className="hover:text-orange-500 cursor-pointer text-gray-600 dark:text-gray-300">Create a List</Link>
          <Link to="/find-gift" className="hover:text-orange-500 cursor-pointer text-gray-600 dark:text-gray-300">Find a Gift</Link>
          <Link to="/browsing-history" className="hover:text-orange-500 cursor-pointer text-gray-600 dark:text-gray-300">Browsing History</Link>
          <Link to="/gift-cards" className="hover:text-orange-500 cursor-pointer text-gray-600 dark:text-gray-300">Gift Cards</Link>
          <Link to="/sell" className="hover:text-orange-500 cursor-pointer text-gray-600 dark:text-gray-300">Sell</Link>
          <Link to="/disability-support" className="hover:text-orange-500 cursor-pointer text-gray-600 dark:text-gray-300">Disability Customer Support</Link>
        </div>
      </div>

      {/* Main Header */}
      <div className="px-4 py-3 flex items-center">
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden mr-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <motion.div 
            className="text-2xl font-bold text-orange-500 dark:text-orange-400 dark:drop-shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            amazon
          </motion.div>
        </Link>

        {/* Search Bar */}
        <motion.div 
          className="flex-grow mx-4 md:mx-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <SearchAutocomplete onSearch={handleSearch} />
        </motion.div>

        {/* Right Icons */}
        <div className="flex items-center space-x-4 ml-auto">
          {/* Theme Toggle */}
          <ThemeToggle className="hidden md:block" />
          
          {/* Notifications */}
          <NotificationBell className="hidden md:block" />
          
          <div className="hidden md:block">
            <Link to="/signin" className="text-xs text-center text-gray-800 dark:text-gray-200">
              <p>Hello, {user ? user.name.split(' ')[0] : 'Sign in'}</p>
              <p className="font-bold">Account & Lists</p>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <Link to="/returns-orders" className="text-xs text-center text-gray-800 dark:text-gray-200">
              <p>Returns</p>
              <p className="font-bold">& Orders</p>
            </Link>
          </div>
          
          <Link to="/wishlist" className="relative">
            <motion.div 
              className="flex flex-col items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiHeart size={28} />
              <motion.span 
                className="absolute -top-1 -right-2 bg-gradient-to-r from-red-400 to-pink-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shadow-lg"
                animate={{ scale: getWishlistCount() > 0 ? [1, 1.2, 1] : 1 }}
                transition={{ duration: 0.3 }}
              >
                {getWishlistCount()}
              </motion.span>
              <span className="mt-1 text-xs font-bold text-gray-800 dark:text-gray-200">Wishlist</span>
            </motion.div>
          </Link>
          
          <Link 
            to="/cart"
            className="relative"
          >
            <motion.div 
              className="flex flex-col items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiShoppingCart size={28} />
              <motion.span 
                className="absolute -top-1 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shadow-lg"
                animate={{ scale: items.length > 0 ? [1, 1.2, 1] : 1 }}
                transition={{ duration: 0.3 }}
              >
                {items.length > 0 ? items.reduce((sum, item) => sum + item.quantity, 0) : 0}
              </motion.span>
              <span className="mt-1 text-xs font-bold text-gray-800 dark:text-gray-200">Cart</span>
            </motion.div>
          </Link>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="bg-blue-900 dark:bg-gray-800 text-white px-4 py-2 text-sm">
        <div className="max-w-7xl mx-auto">
          <MegaMenu />
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-blue-900"
          >
            <div className="px-4 py-3 space-y-3">
              <Link to="/signin" className="block hover:underline">Account & Lists</Link>
              <Link to="/returns-orders" className="block hover:underline">Returns & Orders</Link>
              <Link to="/cart" className="block hover:underline">Cart</Link>
              {user ? (
                <button 
                  onClick={logout}
                  className="block w-full text-left hover:underline"
                >
                  Sign Out
                </button>
              ) : (
                <Link to="/login" className="block hover:underline">Sign In</Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.header>
  );
};

export default Header;

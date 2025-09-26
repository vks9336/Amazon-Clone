import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHome, FiSearch, FiHeart, FiShoppingCart, FiUser, FiMenu } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

const MobileBottomNav = () => {
  const location = useLocation();
  const { items } = useCart();
  const { getWishlistCount } = useWishlist();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    {
      name: 'Home',
      icon: FiHome,
      path: '/',
      badge: null
    },
    {
      name: 'Search',
      icon: FiSearch,
      path: '/search',
      badge: null
    },
    {
      name: 'Wishlist',
      icon: FiHeart,
      path: '/wishlist',
      badge: getWishlistCount()
    },
    {
      name: 'Cart',
      icon: FiShoppingCart,
      path: '/cart',
      badge: items.reduce((sum, item) => sum + item.quantity, 0)
    },
    {
      name: 'Account',
      icon: FiUser,
      path: '/account',
      badge: null
    }
  ];

  const quickMenuItems = [
    { name: 'Orders', path: '/orders', icon: '📦' },
    { name: 'Prime', path: '/prime', icon: '👑' },
    { name: 'Deals', path: '/deals', icon: '🔥' },
    { name: 'Help', path: '/help', icon: '❓' },
    { name: 'Settings', path: '/settings', icon: '⚙️' }
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Bottom Navigation */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 md:hidden"
      >
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <Link
                key={item.name}
                to={item.path}
                className="flex flex-col items-center space-y-1 p-2 relative"
              >
                <motion.div
                  className="relative"
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon 
                    className={`w-6 h-6 transition-colors ${
                      active ? 'text-blue-600' : 'text-gray-500'
                    }`} 
                  />
                  
                  {/* Badge */}
                  {item.badge > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                    >
                      {item.badge > 99 ? '99+' : item.badge}
                    </motion.div>
                  )}
                </motion.div>
                
                <span className={`text-xs transition-colors ${
                  active ? 'text-blue-600 font-medium' : 'text-gray-500'
                }`}>
                  {item.name}
                </span>
                
                {/* Active Indicator */}
                {active && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-blue-600 rounded-full"
                  />
                )}
              </Link>
            );
          })}
        </div>
      </motion.div>

      {/* Quick Menu Button */}
      <motion.button
        onClick={() => setIsMenuOpen(true)}
        className="fixed bottom-20 right-4 w-14 h-14 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full shadow-lg z-50 md:hidden"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FiMenu className="w-6 h-6 mx-auto" />
      </motion.button>

      {/* Quick Menu Modal */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-50"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="fixed bottom-20 right-4 bg-white rounded-lg shadow-xl z-50 p-4 min-w-48"
            >
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-500 mb-3">Quick Access</div>
                {quickMenuItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-gray-700">{item.name}</span>
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Bottom Padding for Mobile */}
      <div className="h-16 md:hidden" />
    </>
  );
};

export default MobileBottomNav;
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className={`relative p-3 rounded-xl transition-all duration-300 ${
        isDark 
          ? 'bg-gradient-to-r from-gray-800 to-gray-700 text-yellow-400 hover:from-gray-700 hover:to-gray-600 shadow-xl border border-gray-600' 
          : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300 shadow-lg'
      } ${className}`}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <motion.div
        className="relative w-6 h-6"
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <FiMoon className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <FiSun className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
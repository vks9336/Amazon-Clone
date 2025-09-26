import React from 'react';
import { motion } from 'framer-motion';

const Prime = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to Prime</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Get unlimited fast, free delivery, exclusive access to movies, TV shows, and more.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <motion.div 
          className="bg-white rounded-lg shadow-sm p-6 text-center"
          whileHover={{ y: -10 }}
        >
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🚚</span>
          </div>
          <h3 className="text-xl font-bold mb-2">Fast, Free Delivery</h3>
          <p className="text-gray-600">Get unlimited FREE Two-Day Delivery on millions of items.</p>
        </motion.div>
        
        <motion.div 
          className="bg-white rounded-lg shadow-sm p-6 text-center"
          whileHover={{ y: -10 }}
        >
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🎬</span>
          </div>
          <h3 className="text-xl font-bold mb-2">Prime Video</h3>
          <p className="text-gray-600">Stream thousands of movies and TV shows, including Amazon Originals.</p>
        </motion.div>
        
        <motion.div 
          className="bg-white rounded-lg shadow-sm p-6 text-center"
          whileHover={{ y: -10 }}
        >
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🎵</span>
          </div>
          <h3 className="text-xl font-bold mb-2">Prime Music</h3>
          <p className="text-gray-600">Enjoy 100 million songs ad-free, or listen offline with Prime Music.</p>
        </motion.div>
      </div>
      
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-8 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Start your 30-day free trial</h2>
        <p className="text-xl mb-6">After your trial, Prime is just $14.99/month.</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-yellow-400 text-black font-bold py-3 px-8 rounded-md hover:bg-yellow-500 transition-colors"
        >
          Try Prime for Free
        </motion.button>
        <p className="mt-4 text-sm opacity-80">Cancel anytime</p>
      </div>
    </div>
  );
};

export default Prime;

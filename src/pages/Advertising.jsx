import React from 'react';
import { motion } from 'framer-motion';

const Advertising = () => {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 text-center">
            Amazon Advertising
          </h1>
          <p className="text-xl text-gray-600 text-center mb-12">
            Reach customers when they're ready to buy
          </p>
          
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Advertising Solutions</h2>
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Sponsored Products</h3>
                <p className="text-gray-600">Promote individual products to customers actively searching</p>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Sponsored Brands</h3>
                <p className="text-gray-600">Showcase your brand and multiple products</p>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Sponsored Display</h3>
                <p className="text-gray-600">Reach customers both on and off Amazon</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Advertising;
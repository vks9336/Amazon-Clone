import React from 'react';
import { motion } from 'framer-motion';

const Returns = () => {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 text-center">
            Returns & Replacements
          </h1>
          <p className="text-xl text-gray-600 text-center mb-12">
            Easy returns and exchanges for your peace of mind
          </p>
          
          <div className="space-y-8">
            <div className="bg-orange-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Return Policy</h2>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">30-Day Return Window</h3>
                  <p className="text-gray-600">Most items can be returned within 30 days of delivery</p>
                </div>
                <div className="bg-white rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Free Returns</h3>
                  <p className="text-gray-600">No return shipping fees for eligible items</p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">How to Return</h2>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Online Return Center</h3>
                  <p className="text-gray-600">Start your return process online</p>
                </div>
                <div className="bg-white rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Drop-off Locations</h3>
                  <p className="text-gray-600">Return items at convenient locations</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Returns;
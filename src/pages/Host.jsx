import React from 'react';
import { motion } from 'framer-motion';

const Host = () => {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 text-center">
            Host an Amazon Hub
          </h1>
          <p className="text-xl text-gray-600 text-center mb-12">
            Provide convenient package pickup locations for your community
          </p>
          
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Amazon Hub Program</h2>
            <p className="text-gray-600 mb-6">
              Join thousands of businesses that provide secure package pickup for Amazon customers.
            </p>
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Benefits</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• Increased foot traffic to your business</li>
                  <li>• Additional revenue opportunities</li>
                  <li>• Enhanced customer satisfaction</li>
                </ul>
              </div>
              <button className="bg-orange-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-orange-600 transition-colors duration-200">
                Apply to Host
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Host;
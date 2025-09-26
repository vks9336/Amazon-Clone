import React from 'react';
import { motion } from 'framer-motion';

const Cookies = () => {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 text-center">
            Cookie Preferences
          </h1>
          <p className="text-xl text-gray-600 text-center mb-12">
            Manage your cookie preferences and privacy settings
          </p>
          
          <div className="space-y-8">
            <div className="bg-blue-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Essential Cookies</h2>
              <p className="text-gray-600 mb-4">
                These cookies are necessary for the website to function and cannot be switched off.
              </p>
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-800">Always Active</span>
                  <div className="w-12 h-6 bg-green-500 rounded-full"></div>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Analytics Cookies</h2>
              <p className="text-gray-600 mb-4">
                These cookies help us understand how visitors interact with our website.
              </p>
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-800">Optional</span>
                  <div className="w-12 h-6 bg-gray-300 rounded-full"></div>
                </div>
              </div>
            </div>
            
            <div className="bg-purple-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Marketing Cookies</h2>
              <p className="text-gray-600 mb-4">
                These cookies are used to deliver advertisements more relevant to you.
              </p>
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-800">Optional</span>
                  <div className="w-12 h-6 bg-gray-300 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Cookies;
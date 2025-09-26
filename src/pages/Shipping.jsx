import React from 'react';
import { motion } from 'framer-motion';

const Shipping = () => {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 text-center">
            Shipping Rates & Policies
          </h1>
          <p className="text-xl text-gray-600 text-center mb-12">
            Fast, reliable shipping options for every need
          </p>
          
          <div className="space-y-8">
            <div className="bg-blue-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Free Shipping Options</h2>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Amazon Prime</h3>
                  <p className="text-gray-600">Free 2-day shipping on millions of items</p>
                </div>
                <div className="bg-white rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Free Shipping</h3>
                  <p className="text-gray-600">Free shipping on orders over $35</p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Express Shipping</h2>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Same-Day Delivery</h3>
                  <p className="text-gray-600">Available in select cities</p>
                </div>
                <div className="bg-white rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Next-Day Delivery</h3>
                  <p className="text-gray-600">Fast delivery for Prime members</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Shipping;
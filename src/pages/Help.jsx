import React from 'react';
import { motion } from 'framer-motion';

const Help = () => {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 text-center">
            Help & Customer Service
          </h1>
          <p className="text-xl text-gray-600 text-center mb-12">
            Get the support you need, when you need it
          </p>
          
          <div className="space-y-8">
            <div className="bg-blue-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h2>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Phone Support</h3>
                  <p className="text-gray-600">Call us at 1-888-280-4331</p>
                </div>
                <div className="bg-white rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Live Chat</h3>
                  <p className="text-gray-600">Chat with our support team online</p>
                </div>
                <div className="bg-white rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Email Support</h3>
                  <p className="text-gray-600">Send us an email for assistance</p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">How do I track my order?</h3>
                  <p className="text-gray-600">Visit "Your Orders" to track your package</p>
                </div>
                <div className="bg-white rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">How do I return an item?</h3>
                  <p className="text-gray-600">Use our online return center to start the process</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Help;
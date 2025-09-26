import React from 'react';
import { motion } from 'framer-motion';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 text-center">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600 text-center mb-12">
            How we collect, use, and protect your information
          </p>
          
          <div className="prose prose-lg max-w-none">
            <div className="bg-gray-50 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Information We Collect</h2>
              <p className="text-gray-600 leading-relaxed">
                We collect information you provide directly to us, such as when you create an account, 
                make a purchase, or contact us for support.
              </p>
            </div>
            
            <div className="bg-blue-50 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">How We Use Your Information</h2>
              <p className="text-gray-600 leading-relaxed">
                We use your information to provide, maintain, and improve our services, process 
                transactions, and communicate with you.
              </p>
            </div>
            
            <div className="bg-green-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Data Protection</h2>
              <p className="text-gray-600 leading-relaxed">
                We implement appropriate security measures to protect your personal information 
                against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;
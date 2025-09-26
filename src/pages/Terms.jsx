import React from 'react';
import { motion } from 'framer-motion';

const Terms = () => {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 text-center">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-600 text-center mb-12">
            Terms and conditions for using Amazon services
          </p>
          
          <div className="prose prose-lg max-w-none">
            <div className="bg-gray-50 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Acceptance of Terms</h2>
              <p className="text-gray-600 leading-relaxed">
                By accessing and using Amazon services, you accept and agree to be bound by the 
                terms and provision of this agreement.
              </p>
            </div>
            
            <div className="bg-blue-50 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Use License</h2>
              <p className="text-gray-600 leading-relaxed">
                Permission is granted to temporarily use Amazon services for personal, 
                non-commercial transitory viewing only.
              </p>
            </div>
            
            <div className="bg-green-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Disclaimer</h2>
              <p className="text-gray-600 leading-relaxed">
                The materials on Amazon are provided on an 'as is' basis. Amazon makes no 
                warranties, expressed or implied, and hereby disclaims all other warranties.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Terms;
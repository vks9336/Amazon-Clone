import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8 text-center">
            About Amazon
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gray-50 rounded-2xl p-8 mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                To be Earth's most customer-centric company, where customers can find and discover 
                anything they might want to buy online, and endeavors to offer its customers the 
                lowest possible prices.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-blue-50 rounded-2xl p-8 mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Story</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Amazon was founded in 1994 by Jeff Bezos with the vision of creating an online 
                marketplace that would revolutionize how people shop. What started as an online 
                bookstore has grown into one of the world's largest e-commerce platforms.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, Amazon serves millions of customers worldwide with a vast selection of 
                products, innovative services, and cutting-edge technology that makes shopping 
                convenient, fast, and enjoyable.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-green-50 rounded-2xl p-8 mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Values</h2>
              <ul className="text-gray-600 leading-relaxed space-y-2">
                <li>• <strong>Customer Obsession:</strong> We start with the customer and work backwards</li>
                <li>• <strong>Innovation:</strong> We embrace new ideas and technologies</li>
                <li>• <strong>Quality:</strong> We strive for excellence in everything we do</li>
                <li>• <strong>Trust:</strong> We build trust through transparency and reliability</li>
                <li>• <strong>Accessibility:</strong> We make shopping accessible to everyone</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="bg-purple-50 rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Impact</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500 mb-2">200M+</div>
                  <div className="text-gray-600">Active Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500 mb-2">12M+</div>
                  <div className="text-gray-600">Products Available</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500 mb-2">190+</div>
                  <div className="text-gray-600">Countries Served</div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
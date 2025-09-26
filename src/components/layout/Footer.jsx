import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHeart, FiStar, FiShield, FiTruck } from 'react-icons/fi';

const Footer = () => {
  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.footer 
      className="bg-gradient-to-b from-gray-900 to-black border-t border-gray-700 mt-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={footerVariants}
    >
      {/* Top Section with Features */}
      <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <motion.div 
              className="text-center text-white"
              variants={itemVariants}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <FiTruck className="text-black text-xl" />
              </div>
              <h3 className="font-bold mb-2">Fast Delivery</h3>
              <p className="text-sm text-gray-300">Same-day delivery available</p>
            </motion.div>
            
            <motion.div 
              className="text-center text-white"
              variants={itemVariants}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <FiShield className="text-white text-xl" />
              </div>
              <h3 className="font-bold mb-2">Secure Shopping</h3>
              <p className="text-sm text-gray-300">Your data is protected</p>
            </motion.div>
            
            <motion.div 
              className="text-center text-white"
              variants={itemVariants}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <FiHeart className="text-white text-xl" />
              </div>
              <h3 className="font-bold mb-2">Customer Love</h3>
              <p className="text-sm text-gray-300">Millions of happy customers</p>
            </motion.div>
            
            <motion.div 
              className="text-center text-white"
              variants={itemVariants}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <FiStar className="text-white text-xl" />
              </div>
              <h3 className="font-bold mb-2">Premium Quality</h3>
              <p className="text-sm text-gray-300">Only the best products</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <motion.div variants={itemVariants}>
            <h3 className="font-bold mb-4 text-white gradient-text">Get to Know Us</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/about" className="hover:text-yellow-400 transition-colors">Careers</Link></li>
              <li><Link to="/blog" className="hover:text-yellow-400 transition-colors">Blog</Link></li>
              <li><Link to="/about" className="hover:text-yellow-400 transition-colors">About Amazon</Link></li>
              <li><Link to="/investor" className="hover:text-yellow-400 transition-colors">Investor Relations</Link></li>
              <li><Link to="/devices" className="hover:text-yellow-400 transition-colors">Amazon Devices</Link></li>
            </ul>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h3 className="font-bold mb-4 text-white gradient-text">Make Money with Us</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/sell" className="hover:text-yellow-400 transition-colors">Sell products on Amazon</Link></li>
              <li><Link to="/services" className="hover:text-yellow-400 transition-colors">Sell on Amazon Business</Link></li>
              <li><Link to="/services" className="hover:text-yellow-400 transition-colors">Sell apps on Amazon</Link></li>
              <li><Link to="/advertising" className="hover:text-yellow-400 transition-colors">Become an Affiliate</Link></li>
              <li><Link to="/advertising" className="hover:text-yellow-400 transition-colors">Advertise Your Products</Link></li>
              <li><Link to="/services" className="hover:text-yellow-400 transition-colors">Self-Publish with Us</Link></li>
              <li><Link to="/host" className="hover:text-yellow-400 transition-colors">Host an Amazon Hub</Link></li>
            </ul>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h3 className="font-bold mb-4 text-white gradient-text">Amazon Payment Products</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/prime" className="hover:text-yellow-400 transition-colors">Amazon Business Card</Link></li>
              <li><Link to="/prime" className="hover:text-yellow-400 transition-colors">Shop with Points</Link></li>
              <li><Link to="/prime" className="hover:text-yellow-400 transition-colors">Reload Your Balance</Link></li>
              <li><Link to="/prime" className="hover:text-yellow-400 transition-colors">Amazon Currency Converter</Link></li>
            </ul>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h3 className="font-bold mb-4 text-white gradient-text">Let Us Help You</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/account" className="hover:text-yellow-400 transition-colors">Your Account</Link></li>
              <li><Link to="/orders" className="hover:text-yellow-400 transition-colors">Your Orders</Link></li>
              <li><Link to="/shipping" className="hover:text-yellow-400 transition-colors">Shipping Rates & Policies</Link></li>
              <li><Link to="/returns" className="hover:text-yellow-400 transition-colors">Returns & Replacements</Link></li>
              <li><Link to="/prime" className="hover:text-yellow-400 transition-colors">Manage Your Content and Devices</Link></li>
              <li><Link to="/help" className="hover:text-yellow-400 transition-colors">Amazon Assistant</Link></li>
              <li><Link to="/help" className="hover:text-yellow-400 transition-colors">Help</Link></li>
            </ul>
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-12 pt-8 border-t border-gray-700 text-center"
          variants={itemVariants}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400 mb-4 md:mb-0">
              © 2024, Amazon.com, Inc. or its affiliates
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <Link to="/privacy" className="hover:text-yellow-400 transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-yellow-400 transition-colors">Terms of Service</Link>
              <Link to="/cookies" className="hover:text-yellow-400 transition-colors">Cookie Preferences</Link>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;

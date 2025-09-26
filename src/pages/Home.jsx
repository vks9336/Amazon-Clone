import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import ProductCarousel from '../components/product/ProductCarousel';
import CategoryBanner from '../components/product/CategoryBanner';
import DealOfTheDay from '../components/product/DealOfTheDay';
import Hero from '../components/layout/Hero';
import ProductShowcase from '../components/layout/ProductShowcase';
import CategoryShowcase from '../components/layout/CategoryShowcase';
import EnhancedProductCard from '../components/product/EnhancedProductCard';
import QuickViewModal from '../components/product/QuickViewModal';
import Breadcrumb from '../components/ui/Breadcrumb';
import { products } from '../lib/mockData';

const Home = () => {
  const [featuredProduct, setFeaturedProduct] = useState(products[0]);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setFeaturedProduct(products[Math.floor(Math.random() * products.length)]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleQuickView = (product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  // Sample categories for showcase component
  const categories = [
    { name: 'Electronics', icon: 'electronics', count: 1250, description: 'Latest gadgets and devices', slug: 'electronics' },
    { name: 'Computers', icon: 'computers', count: 890, description: 'Laptops, desktops, and accessories', slug: 'computers' },
    { name: 'Smart Home', icon: 'smart-home', count: 650, description: 'IoT devices and automation', slug: 'smart-home' },
    { name: 'Arts & Crafts', icon: 'arts-crafts', count: 2100, description: 'Creative supplies and tools', slug: 'arts-crafts' },
    { name: 'Automotive', icon: 'automotive', count: 1800, description: 'Car parts and accessories', slug: 'automotive' },
    { name: 'Baby', icon: 'baby', count: 950, description: 'Baby care and essentials', slug: 'baby' },
    { name: 'Beauty & Personal Care', icon: 'beauty', count: 1200, description: 'Beauty products and personal care', slug: 'beauty' },
    { name: 'Books', icon: 'books', count: 3500, description: 'Books, magazines, and digital content', slug: 'books' },
    { name: 'Fashion', icon: 'fashion', count: 2800, description: 'Clothing, shoes, and accessories', slug: 'fashion' },
    { name: 'Garden & Outdoor', icon: 'garden', count: 750, description: 'Gardening tools and outdoor equipment', slug: 'garden' },
    { name: 'Health & Household', icon: 'health', count: 1600, description: 'Health products and household items', slug: 'health' },
    { name: 'Home & Kitchen', icon: 'home', count: 2200, description: 'Home decor and kitchen appliances', slug: 'home' },
    { name: 'Industrial & Scientific', icon: 'industrial', count: 450, description: 'Industrial equipment and scientific tools', slug: 'industrial' },
    { name: 'Luxury Beauty', icon: 'luxury-beauty', count: 320, description: 'Premium beauty and luxury products', slug: 'luxury-beauty' },
    { name: 'Pet Supplies', icon: 'pet-supplies', count: 800, description: 'Pet food, toys, and accessories', slug: 'pet-supplies' },
    { name: 'Software', icon: 'software', count: 1200, description: 'Software, apps, and digital products', slug: 'software' },
    { name: 'Sports & Outdoors', icon: 'sports', count: 1400, description: 'Sports equipment and outdoor gear', slug: 'sports' },
    { name: 'Tools & Home Improvement', icon: 'tools', count: 950, description: 'Tools and home improvement supplies', slug: 'tools' },
  ];

  // Sample products for showcase component
  const featuredProducts = products.slice(0, 8).map(product => ({
    ...product,
    color: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF9FF3', '#A8E6CF', '#FFB6C1'][Math.floor(Math.random() * 8)]
  }));

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 pt-4">
        <Breadcrumb />
      </div>

      {/* Enhanced Hero Section */}
      <Hero />

      {/* Enhanced Categories Section */}
      <CategoryShowcase categories={categories} />

      {/* Enhanced Featured Products */}
      <ProductShowcase products={featuredProducts} />

      {/* Deal of the Day */}
      <div className="bg-gradient-to-r from-purple-900 to-blue-900 dark:from-purple-800 dark:to-blue-800 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <DealOfTheDay />
          </motion.div>
        </div>
      </div>

      {/* Traditional Product Carousels */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-8 text-center text-white dark:text-white">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 dark:from-orange-400 dark:to-orange-500 bg-clip-text text-transparent">
              Recommended for You
            </span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.slice(8, 16).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <EnhancedProductCard 
                  product={product} 
                  onQuickView={handleQuickView}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Best Sellers Section */}
      <div className="bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
              <span className="bg-gradient-to-r from-green-500 to-emerald-500 dark:from-orange-400 dark:to-orange-500 bg-clip-text text-transparent">
                Best Sellers
              </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.slice(16, 24).map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <EnhancedProductCard 
                    product={product} 
                    onQuickView={handleQuickView}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* New Arrivals Section */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 dark:from-orange-400 dark:to-orange-500 bg-clip-text text-transparent">
                New Arrivals
              </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.slice(0, 8).map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <EnhancedProductCard 
                    product={product} 
                    onQuickView={handleQuickView}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Electronics Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
              <span className="bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-orange-400 dark:to-orange-500 bg-clip-text text-transparent">
                Electronics & Gadgets
              </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.filter(p => p.category === 'Electronics').slice(0, 8).map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <EnhancedProductCard 
                    product={product} 
                    onQuickView={handleQuickView}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Fashion Section */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
              <span className="bg-gradient-to-r from-pink-500 to-rose-500 dark:from-orange-400 dark:to-orange-500 bg-clip-text text-transparent">
                Fashion & Style
              </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.filter(p => p.category === 'Fashion').slice(0, 8).map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <EnhancedProductCard 
                    product={product} 
                    onQuickView={handleQuickView}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Home & Kitchen Section */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
              <span className="bg-gradient-to-r from-green-500 to-emerald-500 dark:from-orange-400 dark:to-orange-500 bg-clip-text text-transparent">
                Home & Kitchen
              </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.filter(p => p.category === 'Home & Kitchen').slice(0, 8).map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <EnhancedProductCard 
                    product={product} 
                    onQuickView={handleQuickView}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal 
        product={quickViewProduct}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </div>
  );
};

export default Home;

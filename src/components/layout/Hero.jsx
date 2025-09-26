import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiShoppingBag, FiTruck, FiShield, FiStar, FiArrowRight } from 'react-icons/fi';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "Welcome to Amazon",
      subtitle: "Discover millions of products with fast, free delivery",
      bg: "from-blue-50 to-indigo-100",
      accent: "from-blue-600 to-indigo-600"
    },
    {
      title: "Premium Quality",
      subtitle: "Shop with confidence knowing you're getting the best",
      bg: "from-green-50 to-emerald-100",
      accent: "from-green-600 to-emerald-600"
    },
    {
      title: "Fast & Secure",
      subtitle: "Lightning-fast delivery with secure payment options",
      bg: "from-purple-50 to-pink-100",
      accent: "from-purple-600 to-pink-600"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <motion.div
      className="relative w-full h-[500px] md:h-[600px] overflow-hidden bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Clean Background */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].bg}`}
        key={currentSlide}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      
      {/* Static Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-24 h-24 bg-blue-100/20 rounded-full blur-sm" />
        <div className="absolute top-40 right-32 w-16 h-16 bg-green-100/20 rounded-full blur-sm" />
        <div className="absolute bottom-32 left-1/3 w-12 h-12 bg-purple-100/20 rounded-full blur-sm" />
      </div>

      {/* Remove heavy pattern overlay for better performance */}

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <motion.div
          className="text-center text-gray-800 max-w-6xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {/* Slide Indicators */}
          <div className="flex justify-center mb-8 space-x-2">
            {slides.map((_, index) => (
              <motion.button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-gray-800 scale-125' : 'bg-gray-400'
                }`}
                onClick={() => setCurrentSlide(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>

          {/* Title */}
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
            key={currentSlide}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className={`bg-gradient-to-r ${slides[currentSlide].accent} bg-clip-text text-transparent`}>
              {slides[currentSlide].title}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-xl lg:text-2xl mb-12 text-gray-600 max-w-4xl mx-auto leading-relaxed"
            key={`subtitle-${currentSlide}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {slides[currentSlide].subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group bg-gradient-to-r from-orange-400 to-orange-500 text-white font-bold py-4 px-8 rounded-lg hover:from-orange-500 hover:to-orange-600 transition-colors duration-200 shadow-lg flex items-center space-x-2">
              <FiShoppingBag size={20} />
              <span>Start Shopping</span>
              <FiArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            
            <button className="group bg-white border-2 border-gray-300 text-gray-700 font-bold py-4 px-8 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200 shadow-lg flex items-center space-x-2">
              <FiStar size={20} />
              <span>Explore Features</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Feature Cards */}
      <div className="absolute bottom-8 left-0 right-0 px-4">
        <div className="flex flex-wrap justify-center gap-4 max-w-6xl mx-auto">
          {[
            { icon: FiTruck, text: "Free Delivery", color: "from-green-500 to-emerald-600" },
            { icon: FiShield, text: "Secure Payment", color: "from-blue-500 to-cyan-600" },
            { icon: FiStar, text: "Premium Quality", color: "from-orange-500 to-red-500" }
          ].map((feature, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-gray-700 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
            >
              <div className={`p-2 rounded-full bg-gradient-to-r ${feature.color}`}>
                <feature.icon size={16} className="text-white" />
              </div>
              <span className="text-sm font-medium">{feature.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Static Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2" />
        </div>
      </div>
    </motion.div>
  );
};

export default Hero;
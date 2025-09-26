import React from 'react';
import { motion } from 'framer-motion';
import { FiPhone, FiTv, FiVolume2, FiImage, FiWifi } from 'react-icons/fi';

const Devices = () => {
  const devices = [
    {
      name: "Echo Dot",
      description: "Smart speaker with Alexa",
      price: "$49.99",
      icon: FiVolume2,
      color: "from-blue-400 to-cyan-500",
      features: ["Voice control", "Music streaming", "Smart home control"]
    },
    {
      name: "Fire TV Stick",
      description: "Streaming media player",
      price: "$39.99",
      icon: FiTv,
      color: "from-purple-400 to-pink-500",
      features: ["4K streaming", "Voice remote", "Thousands of apps"]
    },
    {
      name: "Ring Video Doorbell",
      description: "Smart home security",
      price: "$99.99",
      icon: FiImage,
      color: "from-green-400 to-emerald-500",
      features: ["HD video", "Motion detection", "Two-way talk"]
    },
    {
      name: "Kindle Paperwhite",
      description: "E-reader with backlight",
      price: "$139.99",
      icon: FiPhone,
      color: "from-orange-400 to-red-500",
      features: ["Waterproof", "Weeks of battery", "Adjustable light"]
    },
    {
      name: "Eero WiFi System",
      description: "Whole-home WiFi coverage",
      price: "$199.99",
      icon: FiWifi,
      color: "from-indigo-400 to-blue-500",
      features: ["Mesh network", "Easy setup", "Fast speeds"]
    }
  ];

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 text-center">
            Amazon Devices
          </h1>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Discover our innovative devices designed to make your life easier and more connected
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {devices.map((device, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className={`h-48 ${device.color} flex items-center justify-center`}>
                  <device.icon size={64} className="text-white" />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{device.name}</h3>
                  <p className="text-gray-600 mb-4">{device.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Features:</h4>
                    <ul className="space-y-1">
                      {device.features.map((feature, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-center">
                          <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-800">{device.price}</span>
                    <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-200">
                      Learn More
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <button className="bg-gradient-to-r from-orange-400 to-orange-500 text-white font-bold py-3 px-8 rounded-lg hover:from-orange-500 hover:to-orange-600 transition-colors duration-200">
              View All Devices
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Devices;
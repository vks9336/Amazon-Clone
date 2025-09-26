import React from 'react';
import { motion } from 'framer-motion';

const Services = () => {
  const services = [
    {
      title: "Amazon Business",
      description: "B2B marketplace for business customers",
      features: ["Business pricing", "Bulk discounts", "Tax exemptions"]
    },
    {
      title: "Amazon Appstore",
      description: "Mobile app distribution platform",
      features: ["App publishing", "Developer tools", "Global reach"]
    },
    {
      title: "Self-Publishing",
      description: "Publish and sell your books",
      features: ["Kindle Direct Publishing", "Print on demand", "Royalty tracking"]
    }
  ];

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 text-center">
            Amazon Services
          </h1>
          <p className="text-xl text-gray-600 text-center mb-12">
            Comprehensive solutions for businesses and creators
          </p>
          
          <div className="space-y-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 rounded-2xl p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{service.title}</h2>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-gray-600 flex items-center">
                      <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Services;
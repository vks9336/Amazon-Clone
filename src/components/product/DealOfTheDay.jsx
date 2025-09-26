import React from 'react';
import { motion } from 'framer-motion';
import { products } from '../../lib/mockData';
import ProductCard from './ProductCard';

const DealOfTheDay = () => {
  const dealProduct = products[0];
  
  return (
    <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg p-6">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/4 mb-4 md:mb-0">
          <h2 className="text-2xl font-bold text-gray-900">Deal of the Day</h2>
          <p className="text-gray-800">Limited time offer</p>
        </div>
        
        <div className="md:w-3/4">
          <div className="bg-white rounded-lg p-4">
            <ProductCard product={dealProduct} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealOfTheDay;

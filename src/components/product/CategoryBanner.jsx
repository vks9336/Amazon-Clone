import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CategoryBanner = ({ category }) => {
  return (
    <Link to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}>
      <motion.div
        whileHover={{ scale: 1.03 }}
        className="bg-white rounded-lg shadow-sm p-4 text-center hover:shadow-md transition-shadow"
      >
        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-3" />
        <h3 className="font-bold">{category.name}</h3>
      </motion.div>
    </Link>
  );
};

export default CategoryBanner;

import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';

const ProductCarousel = ({ products }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </div>
  );
};

export default ProductCarousel;

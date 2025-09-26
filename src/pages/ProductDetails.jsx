import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { products } from '../lib/mockData';
import StarRating from '../components/ui/StarRating';
import ProductCarousel from '../components/product/ProductCarousel';
import ReviewsSection from '../components/product/ReviewsSection';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
  const product = products.find(p => p.id === parseInt(id));
  
  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center bg-white dark:bg-black min-h-screen">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Product not found</h2>
        <button 
          onClick={() => navigate('/')}
          className="mt-4 bg-blue-600 dark:bg-orange-500 text-white px-4 py-2 rounded hover:bg-blue-700 dark:hover:bg-orange-600 transition-colors"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    // Navigate to cart page after adding
    navigate('/cart');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-white dark:bg-black min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          <div className="mb-4">
            <div className="w-full h-96 bg-gray-100 dark:bg-gray-800 flex items-center justify-center p-4 rounded-lg">
              <div className="bg-gray-300 dark:bg-gray-700 border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-xl w-full h-full flex items-center justify-center">
                <span className="text-gray-500 dark:text-gray-400">Product Image</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-2 overflow-x-auto hide-scrollbar">
            {[0, 1, 2].map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 ${
                  selectedImage === index ? 'border-blue-600 dark:border-orange-500' : 'border-gray-200 dark:border-gray-600'
                }`}
              >
                <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <span className="text-gray-500 dark:text-gray-400 text-xs">Img {index + 1}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{product.name}</h1>
          
          <div className="flex items-center mb-4">
            <StarRating rating={product.rating} />
            <span className="ml-2 text-blue-600 dark:text-orange-500 underline">{product.reviewCount} ratings</span>
          </div>
          
          <p className="text-3xl font-bold text-gray-900 dark:text-white mb-4">${product.price.toFixed(2)}</p>
          
          <div className="mb-6">
            <h3 className="font-bold mb-2 text-gray-900 dark:text-white">About this item</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
          
          <div className="mb-6">
            <label className="block font-bold mb-2 text-gray-900 dark:text-white">Quantity:</label>
            <select
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              className="flex-1 bg-yellow-400 dark:bg-orange-500 text-black dark:text-white font-bold py-3 px-4 rounded-md hover:bg-yellow-500 dark:hover:bg-orange-600 transition-colors"
            >
              Add to Cart
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                addToCart({ ...product, quantity });
                navigate('/checkout');
              }}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-orange-600 dark:to-orange-800 text-white font-bold py-3 px-4 rounded-md hover:from-blue-700 hover:to-blue-900 dark:hover:from-orange-700 dark:hover:to-orange-900 transition-colors"
            >
              Buy Now
            </motion.button>
          </div>
          
          <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <h3 className="font-bold mb-2 text-gray-900 dark:text-white">Product details</h3>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 dark:text-gray-300">
              <div><span className="font-semibold">Brand:</span> {product.brand}</div>
              <div><span className="font-semibold">Category:</span> {product.category}</div>
              <div><span className="font-semibold">Weight:</span> {product.weight}</div>
              <div><span className="font-semibold">Dimensions:</span> {product.dimensions}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-16">
        <ReviewsSection productId={product.id} productName={product.name} />
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Customers also viewed</h2>
        <ProductCarousel products={products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 6)} />
      </div>
    </div>
  );
};

export default ProductDetails;

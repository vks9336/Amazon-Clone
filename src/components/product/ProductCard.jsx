import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHeart } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import StarRating from '../ui/StarRating';

const ProductCard = ({ product, viewMode = 'grid' }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    // Navigate to cart page after adding
    navigate('/cart');
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({ ...product, dateAdded: Date.now() });
    }
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        whileHover={{ x: 5 }}
        className="bg-white rounded-lg shadow-sm overflow-hidden flex h-32 relative"
      >
        <button
          onClick={handleWishlistToggle}
          className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all"
        >
          <FiHeart
            className={`w-4 h-4 ${
              isInWishlist(product.id) ? 'text-red-500 fill-current' : 'text-gray-400'
            }`}
          />
        </button>
        <Link to={`/product/${product.id}`} className="flex">
          <div className="w-32 h-full bg-gray-100 flex items-center justify-center flex-shrink-0">
            <div className="bg-gray-300 border-2 border-dashed rounded-lg w-24 h-24 flex items-center justify-center">
              <span className="text-gray-500 text-xs">Image</span>
            </div>
          </div>
          <div className="flex-grow p-4 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-gray-900 line-clamp-1 mb-1">{product.name}</h3>
              <div className="flex items-center mb-1">
                <StarRating rating={product.rating} />
                <span className="text-gray-500 text-sm ml-1">({product.reviewCount})</span>
              </div>
              <p className="text-sm text-gray-500">{product.category} • {product.brand}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</p>
              <button 
                onClick={handleAddToCart}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-md text-sm transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-full relative"
    >
      <button
        onClick={handleWishlistToggle}
        className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all"
      >
        <FiHeart
          className={`w-4 h-4 ${
            isInWishlist(product.id) ? 'text-red-500 fill-current' : 'text-gray-400'
          }`}
        />
      </button>
      <Link to={`/product/${product.id}`} className="block">
        <div className="h-48 bg-gray-100 flex items-center justify-center p-4">
          <div className="bg-gray-300 border-2 border-dashed rounded-xl w-full h-full flex items-center justify-center">
            <span className="text-gray-500">Product Image</span>
          </div>
        </div>
        <div className="p-4 flex-grow">
          <h3 className="font-bold text-gray-900 line-clamp-2 mb-2">{product.name}</h3>
          <div className="flex items-center mb-2">
            <StarRating rating={product.rating} />
            <span className="text-gray-500 text-sm ml-1">({product.reviewCount})</span>
          </div>
          <p className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</p>
          <p className="text-sm text-gray-500 mt-1">{product.category}</p>
        </div>
      </Link>
      <div className="px-4 pb-4">
        <button 
          onClick={handleAddToCart}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 rounded-md transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;

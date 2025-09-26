import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiTrash2, FiHeart, FiMinus, FiPlus, FiEdit3 } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { addToWishlist } = useWishlist();
  const [isRemoving, setIsRemoving] = useState(false);
  const [isMovingToWishlist, setIsMovingToWishlist] = useState(false);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) {
      handleRemove();
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      removeFromCart(item.id);
      setIsRemoving(false);
    }, 300);
  };

  const handleMoveToWishlist = () => {
    setIsMovingToWishlist(true);
    setTimeout(() => {
      addToWishlist(item);
      removeFromCart(item.id);
      setIsMovingToWishlist(false);
    }, 300);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 1, scale: 1 }}
      animate={{ 
        opacity: isRemoving ? 0 : 1, 
        scale: isRemoving ? 0.8 : 1,
        x: isRemoving ? -100 : 0
      }}
      exit={{ opacity: 0, scale: 0.8, x: -100 }}
      transition={{ duration: 0.3 }}
      className="flex p-6 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
    >
      {/* Product Image */}
      <div className="w-24 h-24 flex-shrink-0">
        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg w-full h-full flex items-center justify-center overflow-hidden">
          <img
            src={item.image || 'https://via.placeholder.com/96x96'}
            alt={item.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
      
      {/* Product Details */}
      <div className="ml-4 flex-grow min-w-0">
        <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-1 line-clamp-2">
          {item.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
          {item.brand} • {item.category}
        </p>
        
        {/* Rating */}
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(item.rating || 4.5)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            ({item.reviews || 123})
          </span>
        </div>
        
        {/* Price */}
        <div className="flex items-center space-x-3 mb-4">
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            ${item.price.toFixed(2)}
          </span>
          {item.originalPrice && item.originalPrice > item.price && (
            <>
              <span className="text-lg text-gray-500 line-through">
                ${item.originalPrice.toFixed(2)}
              </span>
              <span className="text-sm text-green-600 font-medium">
                Save ${(item.originalPrice - item.price).toFixed(2)}
              </span>
            </>
          )}
        </div>
        
        {/* Quantity Controls */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-600 dark:text-gray-400">Qty:</label>
            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
              <button
                onClick={() => handleQuantityChange(item.quantity - 1)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                disabled={isRemoving}
              >
                <FiMinus className="w-4 h-4" />
              </button>
              <span className="px-3 py-2 text-sm font-medium min-w-[3rem] text-center">
                {item.quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(item.quantity + 1)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                disabled={isRemoving}
              >
                <FiPlus className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={handleMoveToWishlist}
              disabled={isMovingToWishlist}
              className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiHeart className="w-4 h-4" />
              <span className="text-sm">Save for later</span>
            </motion.button>
            
            <motion.button
              onClick={handleRemove}
              disabled={isRemoving}
              className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiTrash2 className="w-4 h-4" />
              <span className="text-sm">Delete</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem;
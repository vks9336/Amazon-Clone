import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiShoppingCart, FiTrash2, FiHeart, FiMinus, FiPlus, FiArrowRight } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

const CartSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } = useCart();
  const { addToWishlist } = useWishlist();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleMoveToWishlist = (item) => {
    addToWishlist(item);
    removeFromCart(item.id);
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      onClose();
      navigate('/checkout');
    }, 1000);
  };

  const handleViewFullCart = () => {
    onClose();
    navigate('/cart');
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const subtotal = getTotalPrice();
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-96 bg-white dark:bg-gray-800 shadow-xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <FiShoppingCart className="w-6 h-6 text-orange-500" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Shopping Cart</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <FiX className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <FiShoppingCart className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Your cart is empty</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">Add some items to get started!</p>
                  <button
                    onClick={onClose}
                    className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      {/* Product Image */}
                      <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden">
                        <img
                          src={item.image || 'https://via.placeholder.com/64x64'}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-grow min-w-0">
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm line-clamp-2 mb-1">
                          {item.name}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{item.brand}</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                          ${item.price.toFixed(2)}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-2 mb-2">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="w-6 h-6 border border-gray-300 dark:border-gray-600 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                          >
                            <FiMinus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-medium w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="w-6 h-6 border border-gray-300 dark:border-gray-600 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                          >
                            <FiPlus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => handleMoveToWishlist(item)}
                            className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <FiHeart className="w-3 h-3" />
                            <span className="text-xs">Save</span>
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <FiTrash2 className="w-3 h-3" />
                            <span className="text-xs">Delete</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-200 dark:border-gray-700 p-6 space-y-4">
                {/* Summary */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal ({getTotalItems()} items):</span>
                    <span className="text-gray-900 dark:text-white">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Shipping:</span>
                    <span className="text-gray-900 dark:text-white">
                      {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Tax:</span>
                    <span className="text-gray-900 dark:text-white">${tax.toFixed(2)}</span>
                  </div>
                </div>

                {/* Total */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">Total:</span>
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <motion.button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isCheckingOut ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span>Proceed to Checkout</span>
                      <FiArrowRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>

                {/* View Cart Link */}
                <button
                  onClick={handleViewFullCart}
                  className="w-full py-2 text-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors border border-gray-300 dark:border-gray-600 rounded-lg"
                >
                  View Full Cart
                </button>

                {/* Continue Shopping */}
                <button
                  onClick={onClose}
                  className="w-full py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
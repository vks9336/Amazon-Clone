import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingCart, FiHeart, FiTrash2, FiMinus, FiPlus, FiArrowLeft, FiLock, FiTruck, FiShield } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useLoyalty } from '../context/LoyaltyContext';

const Cart = () => {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, getTotalPrice, getTotalItems, clearCart } = useCart();
  const { addToWishlist } = useWishlist();
  const { points, getPointsValue } = useLoyalty();
  
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [savedForLater, setSavedForLater] = useState([]);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleMoveToWishlist = (item) => {
    addToWishlist(item);
    removeFromCart(item.id);
  };

  const handleSaveForLater = (item) => {
    setSavedForLater(prev => [...prev, item]);
    removeFromCart(item.id);
  };

  const handleMoveToCart = (item) => {
    // Add back to cart logic would go here
    setSavedForLater(prev => prev.filter(i => i.id !== item.id));
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      navigate('/checkout');
    }, 1000);
  };

  const subtotal = getTotalPrice();
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-12">
              <FiShoppingCart className="w-24 h-24 text-gray-300 dark:text-gray-600 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Your Amazon Cart is empty
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
                Discover millions of products and find what you love
              </p>
              <div className="space-y-4">
                <Link 
                  to="/"
                  className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-3 px-8 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Continue Shopping
                </Link>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  <p>• Free shipping on orders over $50</p>
                  <p>• Secure checkout with Amazon Pay</p>
                  <p>• Easy returns within 30 days</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
              >
                <FiArrowLeft className="w-5 h-5" />
                <span>Continue Shopping</span>
              </button>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Shopping Cart ({getTotalItems()} items)
            </h1>
            <button
              onClick={clearCart}
              className="text-red-600 hover:text-red-700 font-medium transition-colors"
            >
              Clear Cart
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-start space-x-4">
                      {/* Product Image */}
                      <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-lg flex-shrink-0 flex items-center justify-center">
                        <img
                          src={item.image || 'https://via.placeholder.com/96x96'}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-grow min-w-0">
                        <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-2">
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
                            ({item.reviews || 123} reviews)
                          </span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center space-x-4 mb-4">
                          <span className="text-xl font-bold text-gray-900 dark:text-white">
                            ${item.price.toFixed(2)}
                          </span>
                          {item.originalPrice && item.originalPrice > item.price && (
                            <span className="text-lg text-gray-500 line-through">
                              ${item.originalPrice.toFixed(2)}
                            </span>
                          )}
                          {item.originalPrice && item.originalPrice > item.price && (
                            <span className="text-sm text-green-600 font-medium">
                              Save ${(item.originalPrice - item.price).toFixed(2)}
                            </span>
                          )}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <label className="text-sm text-gray-600 dark:text-gray-400">Qty:</label>
                            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                              >
                                <FiMinus className="w-4 h-4" />
                              </button>
                              <span className="px-3 py-2 text-sm font-medium min-w-[3rem] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                              >
                                <FiPlus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center space-x-4">
                            <button
                              onClick={() => handleMoveToWishlist(item)}
                              className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <FiHeart className="w-4 h-4" />
                              <span className="text-sm">Save for later</span>
                            </button>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <FiTrash2 className="w-4 h-4" />
                              <span className="text-sm">Delete</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Saved for Later */}
            {savedForLater.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Saved for Later ({savedForLater.length} items)
                </h3>
                <div className="space-y-3">
                  {savedForLater.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded flex-shrink-0"></div>
                      <div className="flex-grow">
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                          {item.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <button
                        onClick={() => handleMoveToCart(item)}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        Move to Cart
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-8"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Order Summary
              </h2>
              
              {/* Summary Details */}
              <div className="space-y-3 mb-6">
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
                {points > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Loyalty Points Available:</span>
                    <span>${getPointsValue().toFixed(2)}</span>
                  </div>
                )}
              </div>
              
              {/* Total */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-gray-900 dark:text-white">Total:</span>
                  <span className="text-gray-900 dark:text-white">${total.toFixed(2)}</span>
                </div>
              </div>
              
              {/* Checkout Button */}
              <motion.button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-3 px-4 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 shadow-lg hover:shadow-xl"
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
                    <FiShoppingCart className="w-5 h-5" />
                    <span>Proceed to Checkout</span>
                  </>
                )}
              </motion.button>
              
              {/* Security Notice */}
              <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center space-x-2 text-green-700 dark:text-green-400">
                  <FiShield className="w-5 h-5" />
                  <span className="text-sm font-medium">Secure Checkout</span>
                </div>
                <p className="text-xs text-green-600 dark:text-green-500 mt-1">
                  Your payment information is encrypted and secure
                </p>
              </div>

              {/* Shipping Info */}
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center space-x-2 text-blue-700 dark:text-blue-400">
                  <FiTruck className="w-5 h-5" />
                  <span className="text-sm font-medium">Free Shipping</span>
                </div>
                <p className="text-xs text-blue-600 dark:text-blue-500 mt-1">
                  Get free shipping on orders over $50
                </p>
              </div>

              {/* Continue Shopping */}
              <button
                onClick={() => navigate('/')}
                className="w-full mt-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
              >
                Continue Shopping
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
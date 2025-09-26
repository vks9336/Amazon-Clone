import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCreditCard, FiLock, FiTruck, FiUser, FiMail, FiPhone, FiMapPin, FiCheck, FiArrowRight, FiShield } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useLoyalty } from '../../context/LoyaltyContext';

const EnhancedCheckout = () => {
  const { cartItems, clearCart } = useCart();
  const { points, redeemPoints, getPointsValue } = useLoyalty();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isGuest, setIsGuest] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'US'
    },
    payment: {
      method: 'card',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      nameOnCard: '',
      billingAddress: 'same'
    },
    shipping: {
      method: 'standard',
      sameAsBilling: true
    },
    loyalty: {
      usePoints: false,
      pointsToUse: 0
    }
  });

  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const steps = [
    { id: 1, title: 'Account', icon: FiUser },
    { id: 2, title: 'Address', icon: FiMapPin },
    { id: 3, title: 'Payment', icon: FiCreditCard },
    { id: 4, title: 'Review', icon: FiCheck }
  ];

  const shippingMethods = [
    { id: 'standard', name: 'Standard Shipping', price: 0, days: '5-7 business days' },
    { id: 'express', name: 'Express Shipping', price: 9.99, days: '2-3 business days' },
    { id: 'overnight', name: 'Overnight Shipping', price: 19.99, days: '1 business day' }
  ];

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: FiCreditCard },
    { id: 'paypal', name: 'PayPal', icon: FiCreditCard },
    { id: 'apple', name: 'Apple Pay', icon: FiCreditCard },
    { id: 'google', name: 'Google Pay', icon: FiCreditCard }
  ];

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingCost = shippingMethods.find(m => m.id === formData.shipping.method)?.price || 0;
  const tax = (subtotal + shippingCost) * 0.08; // 8% tax
  const pointsDiscount = formData.loyalty.usePoints ? formData.loyalty.pointsToUse * 0.01 : 0;
  const total = subtotal + shippingCost + tax - pointsDiscount;

  // Address autocomplete simulation
  const handleAddressChange = (value) => {
    setFormData(prev => ({
      ...prev,
      address: { ...prev.address, street: value }
    }));

    // Simulate address suggestions
    if (value.length > 3) {
      const suggestions = [
        `${value} St, New York, NY 10001`,
        `${value} Ave, Los Angeles, CA 90210`,
        `${value} Blvd, Chicago, IL 60601`
      ];
      setAddressSuggestions(suggestions);
    } else {
      setAddressSuggestions([]);
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Clear cart and redeem points
    clearCart();
    if (formData.loyalty.usePoints) {
      redeemPoints(formData.loyalty.pointsToUse);
    }
    
    setIsProcessing(false);
    setOrderComplete(true);
  };

  const maxPointsToUse = Math.min(points, Math.floor(total * 100));

  if (orderComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4"
      >
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 max-w-md w-full text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <FiCheck className="w-8 h-8 text-white" />
          </motion.div>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Order Placed Successfully!</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Your order has been confirmed and will be processed shortly.
          </p>
          
          <div className="space-y-3">
            <button
              onClick={() => window.location.href = '/orders'}
              className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors"
            >
              View Order Details
            </button>
            <button
              onClick={() => window.location.href = '/'}
              className="w-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Progress Steps */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <motion.div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep >= step.id
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  }`}
                  animate={{ scale: currentStep === step.id ? 1.1 : 1 }}
                >
                  <step.icon className="w-5 h-5" />
                </motion.div>
                <span className={`ml-2 text-sm font-medium ${
                  currentStep >= step.id
                    ? 'text-orange-500'
                    : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <FiArrowRight className="w-4 h-4 text-gray-400 mx-4" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <AnimatePresence mode="wait">
                {/* Step 1: Account */}
                {currentStep === 1 && (
                  <motion.div
                    key="account"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Account Information</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4 mb-6">
                        <button
                          onClick={() => setIsGuest(false)}
                          className={`flex-1 py-3 px-4 rounded-lg border ${
                            !isGuest
                              ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-500'
                              : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          <FiUser className="w-5 h-5 mx-auto mb-2" />
                          <span className="block text-sm font-medium">Sign In</span>
                        </button>
                        <button
                          onClick={() => setIsGuest(true)}
                          className={`flex-1 py-3 px-4 rounded-lg border ${
                            isGuest
                              ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-500'
                              : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          <FiMail className="w-5 h-5 mx-auto mb-2" />
                          <span className="block text-sm font-medium">Guest Checkout</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            First Name
                          </label>
                          <input
                            type="text"
                            value={formData.firstName}
                            onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Last Name
                          </label>
                          <input
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Address */}
                {currentStep === 2 && (
                  <motion.div
                    key="address"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Shipping Address</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Street Address
                        </label>
                        <input
                          type="text"
                          value={formData.address.street}
                          onChange={(e) => handleAddressChange(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="123 Main Street"
                        />
                        
                        {/* Address Suggestions */}
                        {addressSuggestions.length > 0 && (
                          <div className="mt-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-lg">
                            {addressSuggestions.map((suggestion, index) => (
                              <button
                                key={index}
                                onClick={() => {
                                  setFormData(prev => ({ ...prev, address: { ...prev.address, street: suggestion } }));
                                  setAddressSuggestions([]);
                                }}
                                className="w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                              >
                                {suggestion}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            City
                          </label>
                          <input
                            type="text"
                            value={formData.address.city}
                            onChange={(e) => setFormData(prev => ({ ...prev, address: { ...prev.address, city: e.target.value } }))}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            State
                          </label>
                          <select
                            value={formData.address.state}
                            onChange={(e) => setFormData(prev => ({ ...prev, address: { ...prev.address, state: e.target.value } }))}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          >
                            <option value="">Select State</option>
                            <option value="CA">California</option>
                            <option value="NY">New York</option>
                            <option value="TX">Texas</option>
                            <option value="FL">Florida</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            ZIP Code
                          </label>
                          <input
                            type="text"
                            value={formData.address.zipCode}
                            onChange={(e) => setFormData(prev => ({ ...prev, address: { ...prev.address, zipCode: e.target.value } }))}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Payment */}
                {currentStep === 3 && (
                  <motion.div
                    key="payment"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Payment Information</h3>
                    
                    <div className="space-y-6">
                      {/* Payment Methods */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                          Payment Method
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {paymentMethods.map((method) => (
                            <button
                              key={method.id}
                              onClick={() => setFormData(prev => ({ ...prev, payment: { ...prev.payment, method: method.id } }))}
                              className={`p-3 rounded-lg border ${
                                formData.payment.method === method.id
                                  ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-500'
                                  : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'
                              }`}
                            >
                              <method.icon className="w-5 h-5 mx-auto mb-1" />
                              <span className="text-sm font-medium">{method.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Card Details */}
                      {formData.payment.method === 'card' && (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Card Number
                            </label>
                            <input
                              type="text"
                              placeholder="1234 5678 9012 3456"
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Expiry Date
                              </label>
                              <input
                                type="text"
                                placeholder="MM/YY"
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                CVV
                              </label>
                              <input
                                type="text"
                                placeholder="123"
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Loyalty Points */}
                      {points > 0 && (
                        <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <FiShield className="w-5 h-5 text-orange-500" />
                              <span className="font-medium text-gray-900 dark:text-white">Loyalty Points</span>
                            </div>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {points} points available (${getPointsValue().toFixed(2)})
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              checked={formData.loyalty.usePoints}
                              onChange={(e) => setFormData(prev => ({ 
                                ...prev, 
                                loyalty: { ...prev.loyalty, usePoints: e.target.checked }
                              }))}
                              className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300">Use loyalty points</span>
                          </div>
                          
                          {formData.loyalty.usePoints && (
                            <div className="mt-3">
                              <input
                                type="range"
                                min="0"
                                max={maxPointsToUse}
                                value={formData.loyalty.pointsToUse}
                                onChange={(e) => setFormData(prev => ({ 
                                  ...prev, 
                                  loyalty: { ...prev.loyalty, pointsToUse: parseInt(e.target.value) }
                                }))}
                                className="w-full"
                              />
                              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-1">
                                <span>0 points</span>
                                <span>{formData.loyalty.pointsToUse} points (${(formData.loyalty.pointsToUse * 0.01).toFixed(2)})</span>
                                <span>{maxPointsToUse} points</span>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Review */}
                {currentStep === 4 && (
                  <motion.div
                    key="review"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Review Your Order</h3>
                    
                    <div className="space-y-6">
                      {/* Order Summary */}
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3">Order Summary</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                            <span className="text-gray-900 dark:text-white">${subtotal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                            <span className="text-gray-900 dark:text-white">${shippingCost.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Tax</span>
                            <span className="text-gray-900 dark:text-white">${tax.toFixed(2)}</span>
                          </div>
                          {formData.loyalty.usePoints && (
                            <div className="flex justify-between text-green-600">
                              <span>Loyalty Points Discount</span>
                              <span>-${pointsDiscount.toFixed(2)}</span>
                            </div>
                          )}
                          <div className="border-t border-gray-300 dark:border-gray-600 pt-2 flex justify-between font-semibold">
                            <span className="text-gray-900 dark:text-white">Total</span>
                            <span className="text-gray-900 dark:text-white">${total.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Security Notice */}
                      <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                        <div className="flex items-center space-x-2">
                          <FiLock className="w-5 h-5 text-green-500" />
                          <span className="text-sm text-green-700 dark:text-green-300">
                            Your payment information is secure and encrypted
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className={`px-6 py-2 rounded-lg ${
                    currentStep === 1
                      ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  Previous
                </button>
                
                {currentStep < steps.length ? (
                  <button
                    onClick={handleNext}
                    className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? 'Processing...' : 'Place Order'}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Order Summary</h3>
              
              {/* Cart Items */}
              <div className="space-y-3 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{item.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Shipping Method */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Shipping Method</h4>
                <div className="space-y-2">
                  {shippingMethods.map((method) => (
                    <label key={method.id} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="shipping"
                        value={method.id}
                        checked={formData.shipping.method === method.id}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          shipping: { ...prev.shipping, method: e.target.value }
                        }))}
                        className="text-orange-500 focus:ring-orange-500"
                      />
                      <div className="flex-1">
                        <span className="text-sm text-gray-900 dark:text-white">{method.name}</span>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{method.days}</p>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {method.price === 0 ? 'Free' : `$${method.price}`}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Totals */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                  <span className="text-gray-900 dark:text-white">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                  <span className="text-gray-900 dark:text-white">${shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Tax</span>
                  <span className="text-gray-900 dark:text-white">${tax.toFixed(2)}</span>
                </div>
                {formData.loyalty.usePoints && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Loyalty Points</span>
                    <span>-${pointsDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-semibold text-lg border-t border-gray-200 dark:border-gray-700 pt-2">
                  <span className="text-gray-900 dark:text-white">Total</span>
                  <span className="text-gray-900 dark:text-white">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedCheckout;
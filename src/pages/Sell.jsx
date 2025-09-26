import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTrendingUp, FiDollarSign, FiUsers, FiShield, FiCheckCircle, FiArrowRight, FiUpload, FiPackage, FiBarChart, FiStar, FiClock, FiGlobe, FiTruck, FiHeadphones } from 'react-icons/fi';

const Sell = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [registrationStep, setRegistrationStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: 'individual',
    email: '',
    phone: '',
    address: '',
    taxId: '',
    bankAccount: '',
    productCategory: '',
    monthlyVolume: ''
  });

  const sellerPlans = [
    {
      id: 'individual',
      name: 'Individual Seller',
      price: 0,
      fee: '$0.99 per item sold',
      features: [
        'Sell up to 40 items per month',
        'Basic seller tools',
        'Standard customer support',
        'Access to seller forums'
      ],
      popular: false
    },
    {
      id: 'professional',
      name: 'Professional Seller',
      price: 39.99,
      fee: 'No per-item fees',
      features: [
        'Unlimited items',
        'Advanced seller tools',
        'Priority customer support',
        'Bulk listing tools',
        'Inventory management',
        'Sales analytics'
      ],
      popular: true
    }
  ];

  const benefits = [
    {
      icon: <FiGlobe className="w-8 h-8" />,
      title: 'Global Reach',
      description: 'Access to millions of customers worldwide'
    },
    {
      icon: <FiTruck className="w-8 h-8" />,
      title: 'Fulfillment Options',
      description: 'Use FBA or fulfill orders yourself'
    },
    {
      icon: <FiShield className="w-8 h-8" />,
      title: 'Secure Payments',
      description: 'Safe and reliable payment processing'
    },
    {
      icon: <FiBarChart className="w-8 h-8" />,
      title: 'Analytics & Insights',
      description: 'Detailed sales and performance data'
    },
    {
      icon: <FiHeadphones className="w-8 h-8" />,
      title: '24/7 Support',
      description: 'Round-the-clock seller support'
    },
    {
      icon: <FiTrendingUp className="w-8 h-8" />,
      title: 'Growth Tools',
      description: 'Marketing and advertising solutions'
    }
  ];

  const successStories = [
    {
      name: 'Sarah Johnson',
      business: 'Handmade Jewelry Store',
      revenue: '$50K/month',
      story: 'Started selling handmade jewelry and now runs a successful business with 10 employees.',
      image: 'https://via.placeholder.com/80x80?text=SJ'
    },
    {
      name: 'Mike Chen',
      business: 'Electronics Reseller',
      revenue: '$200K/month',
      story: 'Turned his electronics hobby into a thriving business selling refurbished devices.',
      image: 'https://via.placeholder.com/80x80?text=MC'
    },
    {
      name: 'Emily Rodriguez',
      business: 'Home Decor Store',
      revenue: '$75K/month',
      story: 'Built a successful home decor business from her garage, now ships nationwide.',
      image: 'https://via.placeholder.com/80x80?text=ER'
    }
  ];

  const registrationSteps = [
    {
      step: 1,
      title: 'Business Information',
      description: 'Tell us about your business'
    },
    {
      step: 2,
      title: 'Tax Information',
      description: 'Provide tax details'
    },
    {
      step: 3,
      title: 'Bank Account',
      description: 'Set up payment method'
    },
    {
      step: 4,
      title: 'Product Information',
      description: 'Tell us what you sell'
    }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNextStep = () => {
    if (registrationStep < 4) {
      setRegistrationStep(registrationStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (registrationStep > 1) {
      setRegistrationStep(registrationStep - 1);
    }
  };

  const handleSubmitRegistration = () => {
    alert('Registration submitted successfully! You will receive an email confirmation shortly.');
    setRegistrationStep(1);
    setFormData({
      businessName: '',
      businessType: 'individual',
      email: '',
      phone: '',
      address: '',
      taxId: '',
      bankAccount: '',
      productCategory: '',
      monthlyVolume: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                <FiTrendingUp className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Sell on Amazon
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Start your online business today. Join millions of sellers who trust Amazon to grow their business and reach customers worldwide.
            </p>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex space-x-1 mb-8"
        >
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'overview'
                ? 'bg-blue-600 dark:bg-orange-500 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('plans')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'plans'
                ? 'bg-blue-600 dark:bg-orange-500 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            Seller Plans
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'register'
                ? 'bg-blue-600 dark:bg-orange-500 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            Get Started
          </button>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-8"
            >
              {/* Benefits Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="text-blue-600 dark:text-orange-500 mb-4">
                      {benefit.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {benefit.description}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Success Stories */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                  Success Stories
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {successStories.map((story, index) => (
                    <motion.div
                      key={story.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="text-center"
                    >
                      <img
                        src={story.image}
                        alt={story.name}
                        className="w-20 h-20 rounded-full mx-auto mb-4"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/80x80?text=No+Image';
                        }}
                      />
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {story.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {story.business}
                      </p>
                      <p className="text-lg font-bold text-green-600 dark:text-green-400 mb-2">
                        {story.revenue}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {story.story}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-orange-500 mb-2">
                    2M+
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">Active Sellers</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-orange-500 mb-2">
                    $100B+
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">Annual Sales</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-orange-500 mb-2">
                    190+
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">Countries</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-orange-500 mb-2">
                    350M+
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">Products</p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'plans' && (
            <motion.div
              key="plans"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {sellerPlans.map((plan, index) => (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className={`relative bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 ${
                      plan.popular ? 'ring-2 ring-blue-600 dark:ring-orange-500' : ''
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <span className="bg-blue-600 dark:bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                          Most Popular
                        </span>
                      </div>
                    )}
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {plan.name}
                      </h3>
                      <div className="mb-2">
                        <span className="text-4xl font-bold text-gray-900 dark:text-white">
                          ${plan.price}
                        </span>
                        <span className="text-gray-600 dark:text-gray-400">/month</span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">
                        {plan.fee}
                      </p>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-3">
                          <FiCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                        plan.popular
                          ? 'bg-blue-600 dark:bg-orange-500 text-white hover:bg-blue-700 dark:hover:bg-orange-600'
                          : 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      Choose {plan.name}
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'register' && (
            <motion.div
              key="register"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                  Seller Registration
                </h2>

                {/* Progress Steps */}
                <div className="flex items-center justify-between mb-8">
                  {registrationSteps.map((step, index) => (
                    <div key={step.step} className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        registrationStep >= step.step
                          ? 'bg-blue-600 dark:bg-orange-500 text-white'
                          : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                      }`}>
                        {step.step}
                      </div>
                      <div className="ml-3">
                        <p className={`text-sm font-medium ${
                          registrationStep >= step.step
                            ? 'text-gray-900 dark:text-white'
                            : 'text-gray-600 dark:text-gray-400'
                        }`}>
                          {step.title}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          {step.description}
                        </p>
                      </div>
                      {index < registrationSteps.length - 1 && (
                        <div className={`w-16 h-0.5 mx-4 ${
                          registrationStep > step.step
                            ? 'bg-blue-600 dark:bg-orange-500'
                            : 'bg-gray-200 dark:bg-gray-600'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>

                {/* Form Content */}
                <div className="space-y-6">
                  {registrationStep === 1 && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Business Name *
                        </label>
                        <input
                          type="text"
                          value={formData.businessName}
                          onChange={(e) => handleInputChange('businessName', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Business Type *
                        </label>
                        <select
                          value={formData.businessType}
                          onChange={(e) => handleInputChange('businessType', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        >
                          <option value="individual">Individual</option>
                          <option value="business">Business</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        />
                      </div>
                    </div>
                  )}

                  {registrationStep === 2 && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Tax ID / SSN *
                        </label>
                        <input
                          type="text"
                          value={formData.taxId}
                          onChange={(e) => handleInputChange('taxId', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Business Address *
                        </label>
                        <textarea
                          value={formData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        />
                      </div>
                    </div>
                  )}

                  {registrationStep === 3 && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Bank Account Number *
                        </label>
                        <input
                          type="text"
                          value={formData.bankAccount}
                          onChange={(e) => handleInputChange('bankAccount', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        />
                      </div>
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                        <p className="text-sm text-blue-800 dark:text-blue-200">
                          <strong>Security Note:</strong> Your bank account information is encrypted and secure. We use industry-standard encryption to protect your financial data.
                        </p>
                      </div>
                    </div>
                  )}

                  {registrationStep === 4 && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Primary Product Category *
                        </label>
                        <select
                          value={formData.productCategory}
                          onChange={(e) => handleInputChange('productCategory', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        >
                          <option value="">Select Category</option>
                          <option value="electronics">Electronics</option>
                          <option value="home">Home & Kitchen</option>
                          <option value="fashion">Fashion</option>
                          <option value="books">Books</option>
                          <option value="toys">Toys & Games</option>
                          <option value="beauty">Beauty & Personal Care</option>
                          <option value="sports">Sports & Outdoors</option>
                          <option value="automotive">Automotive</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Expected Monthly Sales Volume *
                        </label>
                        <select
                          value={formData.monthlyVolume}
                          onChange={(e) => handleInputChange('monthlyVolume', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        >
                          <option value="">Select Volume</option>
                          <option value="0-1000">$0 - $1,000</option>
                          <option value="1000-5000">$1,000 - $5,000</option>
                          <option value="5000-10000">$5,000 - $10,000</option>
                          <option value="10000-50000">$10,000 - $50,000</option>
                          <option value="50000+">$50,000+</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  <button
                    onClick={handlePrevStep}
                    disabled={registrationStep === 1}
                    className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>
                  {registrationStep < 4 ? (
                    <button
                      onClick={handleNextStep}
                      className="px-6 py-2 bg-blue-600 dark:bg-orange-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-orange-600 transition-colors flex items-center space-x-2"
                    >
                      <span>Next</span>
                      <FiArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmitRegistration}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                    >
                      <FiCheckCircle className="w-4 h-4" />
                      <span>Submit Registration</span>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Sell;
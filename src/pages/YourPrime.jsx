import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTruck, FiVideo, FiMusic, FiBook, FiPlay, FiShield, FiStar, FiGift, FiDownload, FiClock, FiUsers, FiCreditCard } from 'react-icons/fi';

const YourPrime = () => {
  const [activeTab, setActiveTab] = useState('benefits');
  const [isPrimeMember, setIsPrimeMember] = useState(true);
  const [membershipType, setMembershipType] = useState('annual'); // annual, monthly, student

  const primeBenefits = [
    {
      icon: <FiTruck className="w-8 h-8" />,
      title: "Free Two-Day Shipping",
      description: "Get free two-day shipping on millions of items with no minimum order.",
      status: "active"
    },
    {
      icon: <FiVideo className="w-8 h-8" />,
      title: "Prime Video",
      description: "Stream thousands of movies and TV shows, including Prime Originals.",
      status: "active"
    },
    {
      icon: <FiMusic className="w-8 h-8" />,
      title: "Prime Music",
      description: "Access over 2 million songs ad-free with Prime Music.",
      status: "active"
    },
    {
      icon: <FiBook className="w-8 h-8" />,
      title: "Prime Reading",
      description: "Borrow books, magazines, and comics from the Prime Reading library.",
      status: "active"
    },
    {
      icon: <FiPlay className="w-8 h-8" />,
      title: "Prime Gaming",
      description: "Get free games, in-game content, and a Twitch channel subscription.",
      status: "active"
    },
    {
      icon: <FiGift className="w-8 h-8" />,
      title: "Prime Day Deals",
      description: "Get exclusive access to Prime Day deals and early access to Lightning Deals.",
      status: "active"
    }
  ];

  const membershipPlans = [
    {
      type: 'annual',
      name: 'Prime Annual',
      price: 139,
      period: 'year',
      savings: 'Save $40',
      features: ['All Prime benefits', 'Free shipping', 'Prime Video', 'Prime Music', 'Prime Reading', 'Prime Gaming'],
      popular: true
    },
    {
      type: 'monthly',
      name: 'Prime Monthly',
      price: 14.99,
      period: 'month',
      savings: null,
      features: ['All Prime benefits', 'Free shipping', 'Prime Video', 'Prime Music', 'Prime Reading', 'Prime Gaming'],
      popular: false
    },
    {
      type: 'student',
      name: 'Prime Student',
      price: 69,
      period: 'year',
      savings: '50% off',
      features: ['All Prime benefits', 'Free shipping', 'Prime Video', 'Prime Music', 'Prime Reading', 'Prime Gaming'],
      popular: false
    }
  ];

  const recentActivity = [
    {
      type: 'shipping',
      title: 'Free shipping used',
      description: 'Order #ORD-001 delivered with Prime shipping',
      date: '2024-01-15',
      icon: <FiTruck className="w-5 h-5" />
    },
    {
      type: 'video',
      title: 'Prime Video watched',
      description: 'The Boys Season 4, Episode 3',
      date: '2024-01-14',
      icon: <FiVideo className="w-5 h-5" />
    },
    {
      type: 'music',
      title: 'Prime Music played',
      description: 'Added 5 songs to your playlist',
      date: '2024-01-13',
      icon: <FiMusic className="w-5 h-5" />
    },
    {
      type: 'reading',
      title: 'Prime Reading accessed',
      description: 'Downloaded "The Silent Patient"',
      date: '2024-01-12',
      icon: <FiBook className="w-5 h-5" />
    }
  ];

  const stats = {
    ordersWithPrimeShipping: 24,
    moviesWatched: 156,
    songsPlayed: 2847,
    booksRead: 12,
    gamesClaimed: 8,
    moneySaved: 89.50
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
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-orange-500 rounded-full flex items-center justify-center">
              <FiStar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Your Prime Membership
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {isPrimeMember ? 'Active membership' : 'Join Prime today'}
              </p>
            </div>
          </div>

          {isPrimeMember && (
            <div className="bg-gradient-to-r from-blue-600 to-orange-500 rounded-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold mb-2">Prime Annual Membership</h2>
                  <p className="text-blue-100">Renews on January 15, 2025</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">$139</p>
                  <p className="text-blue-100">per year</p>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex space-x-1 mb-8"
        >
          <button
            onClick={() => setActiveTab('benefits')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'benefits'
                ? 'bg-blue-600 dark:bg-orange-500 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            Benefits
          </button>
          <button
            onClick={() => setActiveTab('activity')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'activity'
                ? 'bg-blue-600 dark:bg-orange-500 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            Activity
          </button>
          <button
            onClick={() => setActiveTab('manage')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'manage'
                ? 'bg-blue-600 dark:bg-orange-500 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            Manage
          </button>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'benefits' && (
            <motion.div
              key="benefits"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              {/* Benefits Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {primeBenefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="text-blue-600 dark:text-orange-500">
                        {benefit.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {benefit.title}
                        </h3>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          benefit.status === 'active' 
                            ? 'text-green-600 bg-green-100 dark:bg-green-900/20' 
                            : 'text-gray-600 bg-gray-100 dark:bg-gray-900/20'
                        }`}>
                          {benefit.status === 'active' ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {benefit.description}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Your Prime Usage
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-orange-500 mb-2">
                      {stats.ordersWithPrimeShipping}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Orders Shipped</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-orange-500 mb-2">
                      {stats.moviesWatched}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Movies Watched</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-orange-500 mb-2">
                      {stats.songsPlayed}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Songs Played</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-orange-500 mb-2">
                      {stats.booksRead}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Books Read</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-orange-500 mb-2">
                      {stats.gamesClaimed}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Games Claimed</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-2">
                      ${stats.moneySaved}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Money Saved</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'activity' && (
            <motion.div
              key="activity"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <motion.div
                      key={activity.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <div className="text-blue-600 dark:text-orange-500">
                        {activity.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {activity.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {activity.description}
                        </p>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(activity.date).toLocaleDateString()}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'manage' && (
            <motion.div
              key="manage"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              {/* Membership Plans */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Membership Plans
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {membershipPlans.map((plan) => (
                    <motion.div
                      key={plan.type}
                      whileHover={{ scale: 1.02 }}
                      className={`relative p-6 rounded-lg border-2 transition-colors ${
                        plan.popular
                          ? 'border-blue-600 dark:border-orange-500 bg-blue-50 dark:bg-orange-900/10'
                          : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                      }`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <span className="bg-blue-600 dark:bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                            Popular
                          </span>
                        </div>
                      )}
                      <div className="text-center mb-6">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {plan.name}
                        </h4>
                        <div className="mb-2">
                          <span className="text-3xl font-bold text-gray-900 dark:text-white">
                            ${plan.price}
                          </span>
                          <span className="text-gray-600 dark:text-gray-400">/{plan.period}</span>
                        </div>
                        {plan.savings && (
                          <p className="text-green-600 dark:text-green-400 text-sm font-medium">
                            {plan.savings}
                          </p>
                        )}
                      </div>
                      <ul className="space-y-3 mb-6">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <FiShield className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
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
                        {plan.type === membershipType ? 'Current Plan' : 'Select Plan'}
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Account Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Payment Method
                  </h3>
                  <div className="flex items-center space-x-3 mb-4">
                    <FiCreditCard className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">•••• •••• •••• 1234</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Expires 12/25</p>
                    </div>
                  </div>
                  <button className="text-blue-600 dark:text-orange-500 hover:text-blue-700 dark:hover:text-orange-600 text-sm font-medium">
                    Update Payment Method
                  </button>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Membership Settings
                  </h3>
                  <div className="space-y-3">
                    <button className="w-full text-left text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                      Cancel Membership
                    </button>
                    <button className="w-full text-left text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                      Pause Membership
                    </button>
                    <button className="w-full text-left text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                      Share Prime Benefits
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default YourPrime;
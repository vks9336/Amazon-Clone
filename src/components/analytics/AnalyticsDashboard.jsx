import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowUp, FiArrowDown, FiUsers, FiShoppingCart, FiCreditCard, FiEye, FiHeart, FiStar } from 'react-icons/fi';

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [analyticsData, setAnalyticsData] = useState({
    overview: {
      totalSales: 125430,
      totalOrders: 1847,
      totalUsers: 3241,
      conversionRate: 3.2,
      averageOrderValue: 67.89,
      pageViews: 45678,
      bounceRate: 42.1,
      cartAbandonment: 68.5
    },
    sales: {
      daily: [1200, 1500, 1800, 2200, 1900, 2400, 2100],
      weekly: [12000, 15000, 18000, 22000, 19000, 24000, 21000],
      monthly: [120000, 150000, 180000, 220000, 190000, 240000, 210000]
    },
    topProducts: [
      { name: 'iPhone 15 Pro', sales: 234, revenue: 234000 },
      { name: 'MacBook Air M2', sales: 156, revenue: 187200 },
      { name: 'Sony WH-1000XM5', sales: 189, revenue: 75222 },
      { name: 'Nintendo Switch OLED', sales: 267, revenue: 93450 },
      { name: 'Samsung Galaxy S23', sales: 198, revenue: 237600 }
    ],
    userBehavior: {
      pageViews: 45678,
      uniqueVisitors: 12345,
      sessionDuration: 245, // seconds
      pagesPerSession: 3.7,
      newUsers: 2341,
      returningUsers: 10004
    },
    traffic: {
      organic: 45.2,
      direct: 23.1,
      social: 15.8,
      email: 8.9,
      paid: 7.0
    }
  });

  const getSalesData = () => {
    switch (timeRange) {
      case '7d': return analyticsData.sales.daily;
      case '30d': return analyticsData.sales.weekly;
      case '90d': return analyticsData.sales.monthly;
      default: return analyticsData.sales.daily;
    }
  };

  const getSalesLabel = () => {
    switch (timeRange) {
      case '7d': return 'Daily Sales';
      case '30d': return 'Weekly Sales';
      case '90d': return 'Monthly Sales';
      default: return 'Daily Sales';
    }
  };

  const StatCard = ({ title, value, change, icon: Icon, color = 'blue' }) => {
    const colorClasses = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      orange: 'bg-orange-500',
      purple: 'bg-purple-500',
      red: 'bg-red-500'
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
            <div className="flex items-center mt-2">
              {change > 0 ? (
                <FiArrowUp className="w-4 h-4 text-green-500 mr-1" />
              ) : (
                <FiArrowDown className="w-4 h-4 text-red-500 mr-1" />
              )}
              <span className={`text-sm ${change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {change > 0 ? '+' : ''}{change}%
              </span>
            </div>
          </div>
          <div className={`p-3 rounded-full ${colorClasses[color]} text-white`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </motion.div>
    );
  };

  const Chart = ({ data, label, color = 'blue' }) => {
    const maxValue = Math.max(...data);
    const colorClasses = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      orange: 'bg-orange-500',
      purple: 'bg-purple-500'
    };

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{label}</h3>
        <div className="flex items-end space-x-2 h-32">
          {data.map((value, index) => (
            <motion.div
              key={index}
              initial={{ height: 0 }}
              animate={{ height: `${(value / maxValue) * 100}%` }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`flex-1 ${colorClasses[color]} rounded-t`}
            />
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
          {data.map((_, index) => (
            <span key={index}>Day {index + 1}</span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Analytics Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Monitor your e-commerce performance</p>
        </div>

        {/* Time Range Selector */}
        <div className="mb-6">
          <div className="flex space-x-2">
            {['7d', '30d', '90d'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  timeRange === range
                    ? 'bg-orange-500 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {range === '7d' ? 'Last 7 Days' : range === '30d' ? 'Last 30 Days' : 'Last 90 Days'}
              </button>
            ))}
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Sales"
            value={`$${analyticsData.overview.totalSales.toLocaleString()}`}
            change={12.5}
            icon={FiCreditCard}
            color="green"
          />
          <StatCard
            title="Total Orders"
            value={analyticsData.overview.totalOrders.toLocaleString()}
            change={8.3}
            icon={FiShoppingCart}
            color="blue"
          />
          <StatCard
            title="Total Users"
            value={analyticsData.overview.totalUsers.toLocaleString()}
            change={15.2}
            icon={FiUsers}
            color="purple"
          />
          <StatCard
            title="Conversion Rate"
            value={`${analyticsData.overview.conversionRate}%`}
            change={-2.1}
            icon={FiTrendingUp}
            color="orange"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Chart
            data={getSalesData()}
            label={getSalesLabel()}
            color="blue"
          />
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Traffic Sources</h3>
            <div className="space-y-4">
              {Object.entries(analyticsData.traffic).map(([source, percentage]) => (
                <div key={source} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">{source}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-orange-500 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Products and User Behavior */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Products */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Products</h3>
            <div className="space-y-4">
              {analyticsData.topProducts.map((product, index) => (
                <motion.div
                  key={product.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{product.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{product.sales} sales</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900 dark:text-white">${product.revenue.toLocaleString()}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Revenue</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* User Behavior */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">User Behavior</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FiEye className="w-5 h-5 text-blue-500" />
                  <span className="text-gray-600 dark:text-gray-400">Page Views</span>
                </div>
                <span className="font-semibold text-gray-900 dark:text-white">{analyticsData.userBehavior.pageViews.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FiUsers className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600 dark:text-gray-400">Unique Visitors</span>
                </div>
                <span className="font-semibold text-gray-900 dark:text-white">{analyticsData.userBehavior.uniqueVisitors.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FiHeart className="w-5 h-5 text-red-500" />
                  <span className="text-gray-600 dark:text-gray-400">Session Duration</span>
                </div>
                <span className="font-semibold text-gray-900 dark:text-white">{analyticsData.userBehavior.sessionDuration}s</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FiStar className="w-5 h-5 text-yellow-500" />
                  <span className="text-gray-600 dark:text-gray-400">Pages per Session</span>
                </div>
                <span className="font-semibold text-gray-900 dark:text-white">{analyticsData.userBehavior.pagesPerSession}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
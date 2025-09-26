import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPackage, FiTruck, FiCheckCircle, FiClock, FiRefreshCw, FiSearch, FiFilter, FiDownload, FiEye, FiStar, FiMessageSquare } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const ReturnsOrders = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('orders');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock order data
  const orders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'delivered',
      total: 89.99,
      items: [
        { id: 1, name: 'Wireless Bluetooth Headphones', quantity: 1, price: 49.99, image: '/api/placeholder/100/100' },
        { id: 2, name: 'USB-C Charging Cable', quantity: 2, price: 19.99, image: '/api/placeholder/100/100' }
      ],
      tracking: 'TRK123456789',
      deliveryDate: '2024-01-18'
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      status: 'shipped',
      total: 156.50,
      items: [
        { id: 3, name: 'Smart Watch Series 5', quantity: 1, price: 156.50, image: '/api/placeholder/100/100' }
      ],
      tracking: 'TRK987654321',
      deliveryDate: '2024-01-20'
    },
    {
      id: 'ORD-003',
      date: '2024-01-05',
      status: 'processing',
      total: 234.99,
      items: [
        { id: 4, name: 'Gaming Laptop', quantity: 1, price: 234.99, image: '/api/placeholder/100/100' }
      ],
      tracking: null,
      deliveryDate: '2024-01-25'
    }
  ];

  const returns = [
    {
      id: 'RET-001',
      orderId: 'ORD-001',
      date: '2024-01-20',
      status: 'approved',
      reason: 'Defective item',
      items: [
        { id: 1, name: 'Wireless Bluetooth Headphones', quantity: 1, price: 49.99, image: '/api/placeholder/100/100' }
      ],
      refundAmount: 49.99,
      refundMethod: 'Original payment method'
    },
    {
      id: 'RET-002',
      orderId: 'ORD-002',
      date: '2024-01-18',
      status: 'processing',
      reason: 'Changed mind',
      items: [
        { id: 3, name: 'Smart Watch Series 5', quantity: 1, price: 156.50, image: '/api/placeholder/100/100' }
      ],
      refundAmount: 156.50,
      refundMethod: 'Store credit'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'shipped': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      case 'processing': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'cancelled': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      case 'approved': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered': return <FiCheckCircle className="w-4 h-4" />;
      case 'shipped': return <FiTruck className="w-4 h-4" />;
      case 'processing': return <FiClock className="w-4 h-4" />;
      case 'cancelled': return <FiRefreshCw className="w-4 h-4" />;
      case 'approved': return <FiCheckCircle className="w-4 h-4" />;
      default: return <FiPackage className="w-4 h-4" />;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const filteredReturns = returns.filter(ret => {
    const matchesSearch = ret.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ret.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = filterStatus === 'all' || ret.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Returns & Orders
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your orders and manage returns
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search orders or returns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              >
                <option value="all">All Status</option>
                <option value="delivered">Delivered</option>
                <option value="shipped">Shipped</option>
                <option value="processing">Processing</option>
                <option value="cancelled">Cancelled</option>
                <option value="approved">Approved</option>
              </select>
              <button className="px-4 py-3 bg-blue-600 dark:bg-orange-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-orange-600 transition-colors flex items-center gap-2">
                <FiFilter className="w-4 h-4" />
                Filter
              </button>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex space-x-1 mb-6"
        >
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'orders'
                ? 'bg-blue-600 dark:bg-orange-500 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('returns')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'returns'
                ? 'bg-blue-600 dark:bg-orange-500 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            Returns ({returns.length})
          </button>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'orders' && (
            <motion.div
              key="orders"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-4"
            >
              {filteredOrders.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
                  <FiPackage className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No orders found</h3>
                  <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or filter criteria.</p>
                </div>
              ) : (
                filteredOrders.map((order) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                      <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                        <div className="flex-shrink-0">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                            {getStatusIcon(order.status)}
                            <span className="ml-2 capitalize">{order.status}</span>
                          </span>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Order #{order.id}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Placed on {new Date(order.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-lg font-semibold text-gray-900 dark:text-white">${order.total}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
                            <FiEye className="w-5 h-5" />
                          </button>
                          <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
                            <FiDownload className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-3">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/100x100?text=No+Image';
                            }}
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 dark:text-white">{item.name}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Qty: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-900 dark:text-white">${item.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Actions */}
                    <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      {order.tracking && (
                        <button className="px-4 py-2 bg-blue-600 dark:bg-orange-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-orange-600 transition-colors text-sm">
                          Track Package
                        </button>
                      )}
                      <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm">
                        Return Items
                      </button>
                      <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm">
                        Write Review
                      </button>
                      <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm">
                        Buy Again
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          )}

          {activeTab === 'returns' && (
            <motion.div
              key="returns"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-4"
            >
              {filteredReturns.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
                  <FiRefreshCw className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No returns found</h3>
                  <p className="text-gray-600 dark:text-gray-400">You haven't made any returns yet.</p>
                </div>
              ) : (
                filteredReturns.map((returnItem) => (
                  <motion.div
                    key={returnItem.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                      <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                        <div className="flex-shrink-0">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(returnItem.status)}`}>
                            {getStatusIcon(returnItem.status)}
                            <span className="ml-2 capitalize">{returnItem.status}</span>
                          </span>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Return #{returnItem.id}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            From Order #{returnItem.orderId} • {new Date(returnItem.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">${returnItem.refundAmount}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{returnItem.refundMethod}</p>
                      </div>
                    </div>

                    {/* Return Items */}
                    <div className="space-y-3">
                      {returnItem.items.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/100x100?text=No+Image';
                            }}
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 dark:text-white">{item.name}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Reason: {returnItem.reason}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-900 dark:text-white">${item.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Return Actions */}
                    <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <button className="px-4 py-2 bg-blue-600 dark:bg-orange-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-orange-600 transition-colors text-sm">
                        Track Return
                      </button>
                      <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm">
                        Contact Support
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ReturnsOrders;
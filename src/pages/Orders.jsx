import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiFilter, FiEye, FiPackage } from 'react-icons/fi';
import { useOrder } from '../context/OrderContext';
import OrderTracking from '../components/order/OrderTracking';

const Orders = () => {
  const { orders, getOrdersByStatus } = useOrder();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  // Mock orders for demonstration
  const mockOrders = [
    {
      id: 1,
      orderNumber: 'ORD-1234567890',
      status: 'delivered',
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-18T14:20:00Z',
      trackingNumber: 'TRK-ABC123XYZ',
      items: [
        { name: 'Apple AirPods Pro', quantity: 1, price: 249.99 },
        { name: 'iPhone Case', quantity: 2, price: 19.99 }
      ],
      subtotal: 289.97,
      shipping: 9.99,
      tax: 23.20,
      total: 323.16,
      shippingAddress: {
        name: 'John Doe',
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'United States'
      },
      notes: [
        { id: 1, text: 'Package delivered successfully', createdAt: '2024-01-18T14:20:00Z' }
      ]
    },
    {
      id: 2,
      orderNumber: 'ORD-0987654321',
      status: 'shipped',
      createdAt: '2024-01-20T09:15:00Z',
      updatedAt: '2024-01-22T11:45:00Z',
      trackingNumber: 'TRK-DEF456GHI',
      items: [
        { name: 'Samsung Galaxy S23 Ultra', quantity: 1, price: 1199.99 }
      ],
      subtotal: 1199.99,
      shipping: 0.00,
      tax: 96.00,
      total: 1295.99,
      shippingAddress: {
        name: 'Jane Smith',
        street: '456 Oak Ave',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90210',
        country: 'United States'
      }
    },
    {
      id: 3,
      orderNumber: 'ORD-1122334455',
      status: 'processing',
      createdAt: '2024-01-25T16:20:00Z',
      updatedAt: '2024-01-25T16:20:00Z',
      trackingNumber: 'TRK-GHI789JKL',
      items: [
        { name: 'MacBook Air Laptop', quantity: 1, price: 1099.00 },
        { name: 'Wireless Mouse', quantity: 1, price: 79.99 }
      ],
      subtotal: 1178.99,
      shipping: 15.99,
      tax: 95.52,
      total: 1290.50,
      shippingAddress: {
        name: 'Mike Johnson',
        street: '789 Pine Rd',
        city: 'Chicago',
        state: 'IL',
        zipCode: '60601',
        country: 'United States'
      }
    }
  ];

  const displayOrders = mockOrders.length > 0 ? mockOrders : orders;

  const filteredOrders = displayOrders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'confirmed':
        return 'Confirmed';
      case 'processing':
        return 'Processing';
      case 'shipped':
        return 'Shipped';
      case 'delivered':
        return 'Delivered';
      case 'cancelled':
        return 'Cancelled';
      default:
        return 'Unknown';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Orders</h1>
          <p className="text-gray-600">
            Track and manage your recent orders
          </p>
        </div>

        {displayOrders.length > 0 ? (
          <>
            {/* Controls */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="flex-1">
                  <div className="relative">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search orders..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Status Filter */}
                <div className="flex gap-4">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Orders List */}
            <div className="space-y-4">
              <AnimatePresence>
                {filteredOrders.map((order, index) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-lg shadow-sm p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Order #{order.orderNumber}</h3>
                        <p className="text-sm text-gray-500">Placed on {formatDate(order.createdAt)}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                          {getStatusText(order.status)}
                        </span>
                        <button
                          onClick={() => handleViewOrder(order)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                        >
                          <FiEye />
                          <span>View Details</span>
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Items</p>
                        <p className="font-medium">{order.items.length} item{order.items.length !== 1 ? 's' : ''}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Total</p>
                        <p className="font-medium">${order.total.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Tracking</p>
                        <p className="font-mono text-sm">{order.trackingNumber}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {order.status === 'shipped' && (
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
                          <FiPackage />
                          <span>Track Package</span>
                        </button>
                      )}
                      
                      {order.status === 'delivered' && (
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          Leave Review
                        </button>
                      )}
                      
                      <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                        Reorder
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* No Results */}
            {filteredOrders.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📦</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search terms or filters.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('all');
                  }}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </>
        ) : (
          /* Empty Orders */
          <div className="text-center py-12">
            <div className="text-gray-400 text-8xl mb-6">📦</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">No orders yet</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              You haven't placed any orders yet. Start shopping to see your orders here!
            </p>
            <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Start Shopping
            </button>
          </div>
        )}

        {/* Order Details Modal */}
        <AnimatePresence>
          {showOrderDetails && selectedOrder && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
                  <button
                    onClick={() => setShowOrderDetails(false)}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>
                
                <OrderTracking order={selectedOrder} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Orders;

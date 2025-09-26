import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTruck, FiPackage, FiCheckCircle, FiClock, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';

const LiveOrderTracking = ({ orderId }) => {
  const [orderStatus, setOrderStatus] = useState({
    id: orderId,
    status: 'processing',
    estimatedDelivery: '2024-01-15',
    trackingNumber: 'TRK123456789',
    carrier: 'Amazon Logistics',
    currentLocation: 'Distribution Center - Los Angeles, CA',
    progress: 25,
    timeline: [
      {
        id: 1,
        status: 'ordered',
        title: 'Order Placed',
        description: 'Your order has been received and is being processed',
        timestamp: '2024-01-10 14:30',
        completed: true
      },
      {
        id: 2,
        status: 'processing',
        title: 'Processing',
        description: 'Your order is being prepared for shipment',
        timestamp: '2024-01-11 09:15',
        completed: true
      },
      {
        id: 3,
        status: 'shipped',
        title: 'Shipped',
        description: 'Your order has been shipped and is on its way',
        timestamp: '2024-01-12 16:45',
        completed: false
      },
      {
        id: 4,
        status: 'out-for-delivery',
        title: 'Out for Delivery',
        description: 'Your order is out for delivery',
        timestamp: '2024-01-15 08:00',
        completed: false
      },
      {
        id: 5,
        status: 'delivered',
        title: 'Delivered',
        description: 'Your order has been delivered',
        timestamp: '2024-01-15 14:30',
        completed: false
      }
    ],
    items: [
      {
        id: 1,
        name: 'iPhone 15 Pro',
        quantity: 1,
        price: 999,
        image: 'https://via.placeholder.com/60x60'
      },
      {
        id: 2,
        name: 'AirPods Pro',
        quantity: 1,
        price: 249,
        image: 'https://via.placeholder.com/60x60'
      }
    ],
    deliveryAddress: {
      name: 'John Doe',
      street: '123 Main Street',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210',
      phone: '(555) 123-4567'
    }
  });

  const [isLiveTracking, setIsLiveTracking] = useState(false);
  const [driverLocation, setDriverLocation] = useState({
    lat: 34.0522,
    lng: -118.2437,
    lastUpdate: new Date()
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate progress updates
      setOrderStatus(prev => {
        const newProgress = Math.min(prev.progress + Math.random() * 5, 100);
        let newStatus = prev.status;
        
        if (newProgress >= 25 && prev.status === 'processing') {
          newStatus = 'shipped';
        } else if (newProgress >= 50 && prev.status === 'shipped') {
          newStatus = 'out-for-delivery';
        } else if (newProgress >= 100 && prev.status === 'out-for-delivery') {
          newStatus = 'delivered';
        }
        
        return {
          ...prev,
          progress: newProgress,
          status: newStatus
        };
      });

      // Simulate driver location updates
      if (isLiveTracking) {
        setDriverLocation(prev => ({
          lat: prev.lat + (Math.random() - 0.5) * 0.001,
          lng: prev.lng + (Math.random() - 0.5) * 0.001,
          lastUpdate: new Date()
        }));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isLiveTracking]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'ordered':
        return <FiPackage className="w-5 h-5" />;
      case 'processing':
        return <FiClock className="w-5 h-5" />;
      case 'shipped':
        return <FiTruck className="w-5 h-5" />;
      case 'out-for-delivery':
        return <FiTruck className="w-5 h-5" />;
      case 'delivered':
        return <FiCheckCircle className="w-5 h-5" />;
      default:
        return <FiPackage className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ordered':
        return 'text-blue-500 bg-blue-100 dark:bg-blue-900/20';
      case 'processing':
        return 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20';
      case 'shipped':
        return 'text-purple-500 bg-purple-100 dark:bg-purple-900/20';
      case 'out-for-delivery':
        return 'text-orange-500 bg-orange-100 dark:bg-orange-900/20';
      case 'delivered':
        return 'text-green-500 bg-green-100 dark:bg-green-900/20';
      default:
        return 'text-gray-500 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Order Tracking</h2>
          <p className="text-gray-600 dark:text-gray-400">Order #{orderStatus.id}</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(orderStatus.status)}`}>
            {orderStatus.status.replace('-', ' ').toUpperCase()}
          </div>
          <button
            onClick={() => setIsLiveTracking(!isLiveTracking)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isLiveTracking
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
          >
            {isLiveTracking ? 'Stop Live Tracking' : 'Start Live Tracking'}
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
          <span className="text-sm text-gray-600 dark:text-gray-400">{Math.round(orderStatus.progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${orderStatus.progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Timeline */}
        <div className="lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Order Timeline</h3>
          <div className="space-y-4">
            {orderStatus.timeline.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-start space-x-4 p-4 rounded-lg ${
                  step.completed
                    ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                    : 'bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600'
                }`}
              >
                <div className={`p-2 rounded-full ${
                  step.completed
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                }`}>
                  {getStatusIcon(step.status)}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white">{step.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{step.description}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">{step.timestamp}</p>
                </div>
                {step.completed && (
                  <FiCheckCircle className="w-5 h-5 text-green-500" />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Order Details */}
        <div className="space-y-6">
          {/* Tracking Info */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">Tracking Information</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Tracking Number:</span>
                <span className="text-gray-900 dark:text-white font-mono">{orderStatus.trackingNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Carrier:</span>
                <span className="text-gray-900 dark:text-white">{orderStatus.carrier}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Estimated Delivery:</span>
                <span className="text-gray-900 dark:text-white">{orderStatus.estimatedDelivery}</span>
              </div>
            </div>
          </div>

          {/* Current Location */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">Current Location</h4>
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <FiMapPin className="w-4 h-4" />
              <span>{orderStatus.currentLocation}</span>
            </div>
            {isLiveTracking && (
              <div className="mt-2 text-xs text-green-600 dark:text-green-400">
                Live tracking active • Last update: {driverLocation.lastUpdate.toLocaleTimeString()}
              </div>
            )}
          </div>

          {/* Delivery Address */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">Delivery Address</h4>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <div className="font-medium text-gray-900 dark:text-white">{orderStatus.deliveryAddress.name}</div>
              <div>{orderStatus.deliveryAddress.street}</div>
              <div>{orderStatus.deliveryAddress.city}, {orderStatus.deliveryAddress.state} {orderStatus.deliveryAddress.zipCode}</div>
              <div className="flex items-center space-x-2 mt-2">
                <FiPhone className="w-4 h-4" />
                <span>{orderStatus.deliveryAddress.phone}</span>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">Order Items</h4>
            <div className="space-y-3">
              {orderStatus.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{item.name}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Qty: {item.quantity}</div>
                  </div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    ${item.price}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Support */}
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">Need Help?</h4>
            <div className="space-y-2">
              <button className="flex items-center space-x-2 text-sm text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300">
                <FiPhone className="w-4 h-4" />
                <span>Call Support</span>
              </button>
              <button className="flex items-center space-x-2 text-sm text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300">
                <FiMail className="w-4 h-4" />
                <span>Email Support</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveOrderTracking;
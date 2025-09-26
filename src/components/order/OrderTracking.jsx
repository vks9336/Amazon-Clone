import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPackage, FiTruck, FiCheckCircle, FiClock, FiXCircle, FiMapPin } from 'react-icons/fi';

const OrderTracking = ({ order }) => {
  const [showDetails, setShowDetails] = useState(false);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <FiClock className="w-5 h-5 text-yellow-500" />;
      case 'confirmed':
        return <FiCheckCircle className="w-5 h-5 text-blue-500" />;
      case 'processing':
        return <FiPackage className="w-5 h-5 text-blue-500" />;
      case 'shipped':
        return <FiTruck className="w-5 h-5 text-blue-500" />;
      case 'delivered':
        return <FiCheckCircle className="w-5 h-5 text-green-500" />;
      case 'cancelled':
        return <FiXCircle className="w-5 h-5 text-red-500" />;
      default:
        return <FiClock className="w-5 h-5 text-gray-500" />;
    }
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
        return 'Order Pending';
      case 'confirmed':
        return 'Order Confirmed';
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

  const getEstimatedDelivery = (status, createdAt) => {
    const orderDate = new Date(createdAt);
    const estimatedDate = new Date(orderDate);
    
    switch (status) {
      case 'pending':
      case 'confirmed':
        estimatedDate.setDate(estimatedDate.getDate() + 7);
        break;
      case 'processing':
        estimatedDate.setDate(estimatedDate.getDate() + 5);
        break;
      case 'shipped':
        estimatedDate.setDate(estimatedDate.getDate() + 3);
        break;
      case 'delivered':
        return 'Delivered';
      case 'cancelled':
        return 'N/A';
      default:
        estimatedDate.setDate(estimatedDate.getDate() + 7);
    }
    
    return estimatedDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getProgressPercentage = (status) => {
    switch (status) {
      case 'pending':
        return 20;
      case 'confirmed':
        return 40;
      case 'processing':
        return 60;
      case 'shipped':
        return 80;
      case 'delivered':
        return 100;
      case 'cancelled':
        return 0;
      default:
        return 0;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
    >
      {/* Order Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Order #{order.orderNumber}</h3>
          <p className="text-sm text-gray-500">Placed on {formatDate(order.createdAt)}</p>
        </div>
        <div className="flex items-center space-x-2">
          {getStatusIcon(order.status)}
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
            {getStatusText(order.status)}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <span>Order Progress</span>
          <span>{getProgressPercentage(order.status)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-blue-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${getProgressPercentage(order.status)}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Order Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Shipping Address</h4>
          <div className="text-sm text-gray-600">
            <p>{order.shippingAddress?.name}</p>
            <p>{order.shippingAddress?.street}</p>
            <p>{order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.zipCode}</p>
            <p>{order.shippingAddress?.country}</p>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Order Summary</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <p>Items: {order.items?.length || 0}</p>
            <p>Subtotal: ${order.subtotal?.toFixed(2) || '0.00'}</p>
            <p>Shipping: ${order.shipping?.toFixed(2) || '0.00'}</p>
            <p>Tax: ${order.tax?.toFixed(2) || '0.00'}</p>
            <p className="font-semibold text-gray-900">Total: ${order.total?.toFixed(2) || '0.00'}</p>
          </div>
        </div>
      </div>

      {/* Tracking Information */}
      {order.status === 'shipped' && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <FiTruck className="w-5 h-5 text-blue-600" />
            <h4 className="font-medium text-blue-900">Tracking Information</h4>
          </div>
          <p className="text-sm text-blue-800">
            Tracking Number: <span className="font-mono font-semibold">{order.trackingNumber}</span>
          </p>
          <p className="text-sm text-blue-700 mt-1">
            Your package is on its way! Expected delivery: {getEstimatedDelivery(order.status, order.createdAt)}
          </p>
        </div>
      )}

      {/* Estimated Delivery */}
      {order.status !== 'delivered' && order.status !== 'cancelled' && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <FiMapPin className="w-5 h-5 text-gray-600" />
            <h4 className="font-medium text-gray-900">Estimated Delivery</h4>
          </div>
          <p className="text-sm text-gray-700">
            {getEstimatedDelivery(order.status, order.createdAt)}
          </p>
        </div>
      )}

      {/* Order Items */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Order Items</h4>
        <div className="space-y-3">
          {order.items?.map((item, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 text-xs">Img</span>
              </div>
              <div className="flex-grow">
                <h5 className="font-medium text-gray-900">{item.name}</h5>
                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">${item.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        {order.status === 'pending' && (
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            Cancel Order
          </button>
        )}
        
        {order.status === 'shipped' && (
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Track Package
          </button>
        )}
        
        {order.status === 'delivered' && (
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Leave Review
          </button>
        )}
        
        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
          View Invoice
        </button>
        
        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
          Reorder
        </button>
      </div>

      {/* Order Notes */}
      {order.notes && order.notes.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="font-medium text-gray-900 mb-3">Order Notes</h4>
          <div className="space-y-2">
            {order.notes.map((note, index) => (
              <div key={index} className="p-3 bg-yellow-50 rounded-lg">
                <p className="text-sm text-gray-700">{note.text}</p>
                <p className="text-xs text-gray-500 mt-1">{formatDate(note.createdAt)}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default OrderTracking;
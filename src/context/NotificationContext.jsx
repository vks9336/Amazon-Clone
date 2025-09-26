import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiBell, FiShoppingCart, FiHeart, FiTag, FiTruck, FiCheckCircle } from 'react-icons/fi';

const NotificationContext = createContext();

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      const newNotification = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        read: false,
        ...action.payload
      };
      return {
        ...state,
        notifications: [newNotification, ...state.notifications].slice(0, 50) // Keep last 50
      };
      
    case 'MARK_AS_READ':
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          notification.id === action.payload
            ? { ...notification, read: true }
            : notification
        )
      };
      
    case 'MARK_ALL_AS_READ':
      return {
        ...state,
        notifications: state.notifications.map(notification => ({
          ...notification,
          read: true
        }))
      };
      
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(notification => 
          notification.id !== action.payload
        )
      };
      
    case 'CLEAR_ALL_NOTIFICATIONS':
      return { ...state, notifications: [] };
      
    default:
      return state;
  }
};

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, {
    notifications: JSON.parse(localStorage.getItem('notifications')) || []
  });

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(state.notifications));
  }, [state.notifications]);

  const addNotification = (notification) => {
    dispatch({ type: 'ADD_NOTIFICATION', payload: notification });
  };

  const markAsRead = (id) => {
    dispatch({ type: 'MARK_AS_READ', payload: id });
  };

  const markAllAsRead = () => {
    dispatch({ type: 'MARK_ALL_AS_READ' });
  };

  const removeNotification = (id) => {
    dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
  };

  const clearAllNotifications = () => {
    dispatch({ type: 'CLEAR_ALL_NOTIFICATIONS' });
  };

  const getUnreadCount = () => {
    return state.notifications.filter(notification => !notification.read).length;
  };

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      // Random notifications for demo
      const notificationTypes = [
        {
          type: 'deal',
          title: 'Flash Sale!',
          message: 'Up to 50% off on Electronics',
          icon: FiTag,
          color: 'text-red-500',
          bgColor: 'bg-red-50'
        },
        {
          type: 'shipping',
          title: 'Order Shipped',
          message: 'Your order #12345 is on its way',
          icon: FiTruck,
          color: 'text-blue-500',
          bgColor: 'bg-blue-50'
        },
        {
          type: 'recommendation',
          title: 'Recommended for You',
          message: 'Based on your browsing history',
          icon: FiHeart,
          color: 'text-pink-500',
          bgColor: 'bg-pink-50'
        }
      ];

      if (Math.random() < 0.1) { // 10% chance every 10 seconds
        const randomType = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
        addNotification(randomType);
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <NotificationContext.Provider value={{
      ...state,
      addNotification,
      markAsRead,
      markAllAsRead,
      removeNotification,
      clearAllNotifications,
      getUnreadCount
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

// Notification Bell Component
export const NotificationBell = ({ className = '' }) => {
  const { getUnreadCount } = useNotification();
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = getUnreadCount();

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-800 transition-colors"
      >
        <FiBell className="w-6 h-6" />
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </motion.span>
        )}
      </button>

      {/* Notification Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
          >
            <NotificationDropdown onClose={() => setIsOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Notification Dropdown Component
const NotificationDropdown = ({ onClose }) => {
  const { notifications, markAsRead, markAllAsRead, removeNotification } = useNotification();

  const getIcon = (type) => {
    switch (type) {
      case 'deal': return FiTag;
      case 'shipping': return FiTruck;
      case 'recommendation': return FiHeart;
      case 'cart': return FiShoppingCart;
      default: return FiBell;
    }
  };

  const getColors = (type) => {
    switch (type) {
      case 'deal': return { color: 'text-red-500', bgColor: 'bg-red-50' };
      case 'shipping': return { color: 'text-blue-500', bgColor: 'bg-blue-50' };
      case 'recommendation': return { color: 'text-pink-500', bgColor: 'bg-pink-50' };
      case 'cart': return { color: 'text-green-500', bgColor: 'bg-green-50' };
      default: return { color: 'text-gray-500', bgColor: 'bg-gray-50' };
    }
  };

  return (
    <div className="max-h-96 overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Notifications</h3>
          <div className="flex space-x-2">
            <button
              onClick={markAllAsRead}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Mark all read
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <FiX className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="divide-y divide-gray-100">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <FiBell className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No notifications yet</p>
          </div>
        ) : (
          notifications.slice(0, 10).map((notification) => {
            const Icon = getIcon(notification.type);
            const { color, bgColor } = getColors(notification.type);
            
            return (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`p-4 hover:bg-gray-50 transition-colors ${
                  !notification.read ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-full ${bgColor}`}>
                    <Icon className={`w-4 h-4 ${color}`} />
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-900">
                        {notification.title}
                      </h4>
                      <button
                        onClick={() => removeNotification(notification.id)}
                        className="p-1 text-gray-400 hover:text-gray-600"
                      >
                        <FiX className="w-3 h-3" />
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {notification.message}
                    </p>
                    <div className="text-xs text-gray-400 mt-2">
                      {new Date(notification.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Footer */}
      {notifications.length > 0 && (
        <div className="p-4 border-t border-gray-200">
          <button className="w-full text-sm text-blue-600 hover:text-blue-800">
            View all notifications
          </button>
        </div>
      )}
    </div>
  );
};
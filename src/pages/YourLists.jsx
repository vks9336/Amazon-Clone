import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiEdit3, FiTrash2, FiShare2, FiHeart, FiShoppingCart, FiEye, FiMoreVertical, FiLock, FiUsers, FiGift } from 'react-icons/fi';
import { useWishlist } from '../context/WishlistContext';

const YourLists = () => {
  const { wishlistItems } = useWishlist();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Mock lists data
  const lists = [
    {
      id: 1,
      name: 'Wishlist',
      type: 'wishlist',
      privacy: 'private',
      itemCount: wishlistItems.length,
      createdDate: '2024-01-01',
      lastUpdated: '2024-01-15',
      items: wishlistItems.slice(0, 3), // Show first 3 items
      description: 'My main wishlist for items I want to buy'
    },
    {
      id: 2,
      name: 'Birthday Gift Ideas',
      type: 'gift',
      privacy: 'shared',
      itemCount: 8,
      createdDate: '2024-01-10',
      lastUpdated: '2024-01-14',
      items: [
        { id: 1, name: 'Wireless Headphones', price: 99.99, image: '/api/placeholder/100/100' },
        { id: 2, name: 'Smart Watch', price: 199.99, image: '/api/placeholder/100/100' },
        { id: 3, name: 'Gaming Mouse', price: 79.99, image: '/api/placeholder/100/100' }
      ],
      description: 'Gift ideas for upcoming birthdays'
    },
    {
      id: 3,
      name: 'Home Office Setup',
      type: 'shopping',
      privacy: 'private',
      itemCount: 12,
      createdDate: '2024-01-05',
      lastUpdated: '2024-01-12',
      items: [
        { id: 4, name: 'Standing Desk', price: 299.99, image: '/api/placeholder/100/100' },
        { id: 5, name: 'Ergonomic Chair', price: 199.99, image: '/api/placeholder/100/100' },
        { id: 6, name: 'Monitor Stand', price: 49.99, image: '/api/placeholder/100/100' }
      ],
      description: 'Everything needed for a productive home office'
    },
    {
      id: 4,
      name: 'Holiday Shopping',
      type: 'holiday',
      privacy: 'shared',
      itemCount: 15,
      createdDate: '2023-12-01',
      lastUpdated: '2023-12-20',
      items: [
        { id: 7, name: 'Christmas Decorations', price: 29.99, image: '/api/placeholder/100/100' },
        { id: 8, name: 'Gift Wrapping Paper', price: 12.99, image: '/api/placeholder/100/100' },
        { id: 9, name: 'Holiday Lights', price: 19.99, image: '/api/placeholder/100/100' }
      ],
      description: 'Holiday shopping list for the family'
    }
  ];

  const getListIcon = (type) => {
    switch (type) {
      case 'wishlist': return <FiHeart className="w-5 h-5" />;
      case 'gift': return <FiGift className="w-5 h-5" />;
      case 'shopping': return <FiShoppingCart className="w-5 h-5" />;
      case 'holiday': return <FiGift className="w-5 h-5" />;
      default: return <FiHeart className="w-5 h-5" />;
    }
  };

  const getPrivacyIcon = (privacy) => {
    return privacy === 'private' ? <FiLock className="w-4 h-4" /> : <FiUsers className="w-4 h-4" />;
  };

  const filteredLists = lists.filter(list => {
    const matchesSearch = list.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         list.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || list.type === activeTab;
    return matchesSearch && matchesTab;
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
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Your Lists
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Organize your shopping with custom lists
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 dark:bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-orange-600 transition-colors flex items-center space-x-2"
            >
              <FiPlus className="w-5 h-5" />
              <span>Create List</span>
            </motion.button>
          </div>

          {/* Search */}
          <div className="max-w-md">
            <input
              type="text"
              placeholder="Search your lists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
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
            onClick={() => setActiveTab('all')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'all'
                ? 'bg-blue-600 dark:bg-orange-500 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            All Lists ({lists.length})
          </button>
          <button
            onClick={() => setActiveTab('wishlist')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'wishlist'
                ? 'bg-blue-600 dark:bg-orange-500 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            Wishlists
          </button>
          <button
            onClick={() => setActiveTab('gift')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'gift'
                ? 'bg-blue-600 dark:bg-orange-500 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            Gift Lists
          </button>
          <button
            onClick={() => setActiveTab('shopping')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'shopping'
                ? 'bg-blue-600 dark:bg-orange-500 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            Shopping Lists
          </button>
        </motion.div>

        {/* Lists Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredLists.map((list, index) => (
            <motion.div
              key={list.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              {/* List Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="text-blue-600 dark:text-orange-500">
                      {getListIcon(list.type)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {list.name}
                      </h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                        <span>{list.itemCount} items</span>
                        <span>•</span>
                        <div className="flex items-center space-x-1">
                          {getPrivacyIcon(list.privacy)}
                          <span className="capitalize">{list.privacy}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                    <FiMoreVertical className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {list.description}
                </p>
              </div>

              {/* List Items Preview */}
              <div className="p-6">
                <div className="space-y-3 mb-4">
                  {list.items.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/100x100?text=No+Image';
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {item.name}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          ${item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                  {list.items.length > 3 && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                      +{list.items.length - 3} more items
                    </p>
                  )}
                </div>

                {/* List Actions */}
                <div className="flex space-x-2">
                  <Link
                    to={`/list/${list.id}`}
                    className="flex-1 bg-blue-600 dark:bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 dark:hover:bg-orange-600 transition-colors text-sm font-medium text-center flex items-center justify-center space-x-2"
                  >
                    <FiEye className="w-4 h-4" />
                    <span>View</span>
                  </Link>
                  <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <FiShare2 className="w-4 h-4" />
                  </button>
                  <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <FiEdit3 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* List Footer */}
              <div className="px-6 py-3 bg-gray-50 dark:bg-gray-700 rounded-b-lg">
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Updated {new Date(list.lastUpdated).toLocaleDateString()}</span>
                  <span>Created {new Date(list.createdDate).toLocaleDateString()}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredLists.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <FiHeart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No lists found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {searchQuery ? 'Try adjusting your search criteria.' : 'Create your first list to get started.'}
            </p>
            {!searchQuery && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowCreateModal(true)}
                className="bg-blue-600 dark:bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-orange-600 transition-colors flex items-center space-x-2 mx-auto"
              >
                <FiPlus className="w-5 h-5" />
                <span>Create Your First List</span>
              </motion.button>
            )}
          </motion.div>
        )}

        {/* Create List Modal */}
        <AnimatePresence>
          {showCreateModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => setShowCreateModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Create New List
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      List Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter list name"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description
                    </label>
                    <textarea
                      placeholder="Describe your list (optional)"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Privacy
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors">
                      <option value="private">Private</option>
                      <option value="shared">Shared</option>
                    </select>
                  </div>
                </div>
                <div className="flex space-x-3 mt-6">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 px-4 py-2 bg-blue-600 dark:bg-orange-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-orange-600 transition-colors">
                    Create List
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default YourLists;
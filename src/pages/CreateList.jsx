import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiPlus, FiTrash2, FiSearch, FiHeart, FiGift, FiShoppingCart, FiUsers, FiLock, FiArrowLeft, FiSave } from 'react-icons/fi';
import { products } from '../lib/mockData';

const CreateList = () => {
  const navigate = useNavigate();
  const [listData, setListData] = useState({
    name: '',
    description: '',
    privacy: 'private',
    type: 'wishlist'
  });
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const listTypes = [
    {
      id: 'wishlist',
      name: 'Wishlist',
      icon: <FiHeart className="w-5 h-5" />,
      description: 'Items you want to buy'
    },
    {
      id: 'gift',
      name: 'Gift List',
      icon: <FiGift className="w-5 h-5" />,
      description: 'Gift ideas for others'
    },
    {
      id: 'shopping',
      name: 'Shopping List',
      icon: <FiShoppingCart className="w-5 h-5" />,
      description: 'Items to purchase'
    }
  ];

  const privacyOptions = [
    {
      id: 'private',
      name: 'Private',
      icon: <FiLock className="w-4 h-4" />,
      description: 'Only you can see this list'
    },
    {
      id: 'shared',
      name: 'Shared',
      icon: <FiUsers className="w-4 h-4" />,
      description: 'Share with family and friends'
    }
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInputChange = (field, value) => {
    setListData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddItem = (product) => {
    if (!selectedItems.find(item => item.id === product.id)) {
      setSelectedItems(prev => [...prev, product]);
    }
  };

  const handleRemoveItem = (productId) => {
    setSelectedItems(prev => prev.filter(item => item.id !== productId));
  };

  const handleSaveList = async () => {
    if (!listData.name.trim()) {
      alert('Please enter a list name');
      return;
    }

    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      alert('List created successfully!');
      navigate('/lists');
    }, 1000);
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
          <div className="flex items-center space-x-4 mb-6">
            <button
              onClick={() => navigate('/lists')}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
            >
              <FiArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Create a List
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Build your perfect shopping list
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - List Settings */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                List Settings
              </h2>

              {/* List Name */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  List Name *
                </label>
                <input
                  type="text"
                  value={listData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter list name"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>

              {/* List Description */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={listData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe your list (optional)"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>

              {/* List Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  List Type
                </label>
                <div className="space-y-2">
                  {listTypes.map((type) => (
                    <label key={type.id} className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <input
                        type="radio"
                        name="type"
                        value={type.id}
                        checked={listData.type === type.id}
                        onChange={(e) => handleInputChange('type', e.target.value)}
                        className="text-blue-600 dark:text-orange-500 focus:ring-blue-500 dark:focus:ring-orange-500"
                      />
                      <div className="text-blue-600 dark:text-orange-500">
                        {type.icon}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {type.name}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {type.description}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Privacy Settings */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Privacy
                </label>
                <div className="space-y-2">
                  {privacyOptions.map((option) => (
                    <label key={option.id} className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <input
                        type="radio"
                        name="privacy"
                        value={option.id}
                        checked={listData.privacy === option.id}
                        onChange={(e) => handleInputChange('privacy', e.target.value)}
                        className="text-blue-600 dark:text-orange-500 focus:ring-blue-500 dark:focus:ring-orange-500"
                      />
                      <div className="text-gray-600 dark:text-gray-400">
                        {option.icon}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {option.name}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {option.description}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Selected Items Count */}
              <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Selected Items
                  </span>
                  <span className="text-lg font-bold text-blue-600 dark:text-orange-500">
                    {selectedItems.length}
                  </span>
                </div>
              </div>

              {/* Save Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSaveList}
                disabled={isSaving || !listData.name.trim()}
                className="w-full bg-blue-600 dark:bg-orange-500 text-white py-3 px-4 rounded-lg hover:bg-blue-700 dark:hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
              >
                {isSaving ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <FiSave className="w-5 h-5" />
                    <span>Create List</span>
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* Right Column - Product Selection */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Add Items to Your List
              </h2>

              {/* Search */}
              <div className="mb-6">
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                </div>
              </div>

              {/* Selected Items */}
              {selectedItems.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Selected Items ({selectedItems.length})
                  </h3>
                  <div className="space-y-3">
                    {selectedItems.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-lg"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/100x100?text=No+Image';
                          }}
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {item.name}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            ${item.price}
                          </p>
                        </div>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="p-2 text-red-600 hover:text-red-700 dark:hover:text-red-500 transition-colors"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Product Grid */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Available Products
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                  {filteredProducts.map((product) => {
                    const isSelected = selectedItems.find(item => item.id === product.id);
                    return (
                      <motion.div
                        key={product.id}
                        whileHover={{ scale: 1.02 }}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          isSelected
                            ? 'border-blue-600 dark:border-orange-500 bg-blue-50 dark:bg-orange-900/10'
                            : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                        }`}
                        onClick={() => handleAddItem(product)}
                      >
                        <div className="flex items-center space-x-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded-lg"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/100x100?text=No+Image';
                            }}
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 dark:text-white truncate">
                              {product.name}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {product.brand}
                            </p>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">
                              ${product.price}
                            </p>
                          </div>
                          <div className="text-blue-600 dark:text-orange-500">
                            <FiPlus className="w-5 h-5" />
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CreateList;
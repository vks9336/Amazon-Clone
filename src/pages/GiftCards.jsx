import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGift, FiCreditCard, FiMail, FiDownload, FiEye, FiShoppingCart, FiStar, FiCalendar, FiDollarSign, FiTrendingUp, FiUsers, FiHeart } from 'react-icons/fi';

const GiftCards = () => {
  const [activeTab, setActiveTab] = useState('purchase');
  const [selectedAmount, setSelectedAmount] = useState(25);
  const [selectedDesign, setSelectedDesign] = useState('classic');
  const [deliveryMethod, setDeliveryMethod] = useState('email');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [message, setMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const giftCardAmounts = [25, 50, 100, 150, 200, 500];
  
  const giftCardDesigns = [
    {
      id: 'classic',
      name: 'Classic',
      preview: '🎁',
      description: 'Simple and elegant design'
    },
    {
      id: 'birthday',
      name: 'Birthday',
      preview: '🎂',
      description: 'Perfect for birthdays'
    },
    {
      id: 'holiday',
      name: 'Holiday',
      preview: '🎄',
      description: 'Festive holiday theme'
    },
    {
      id: 'thankyou',
      name: 'Thank You',
      preview: '🙏',
      description: 'Express gratitude'
    },
    {
      id: 'congratulations',
      name: 'Congratulations',
      preview: '🎉',
      description: 'Celebrate achievements'
    }
  ];

  const deliveryMethods = [
    {
      id: 'email',
      name: 'Email Delivery',
      icon: <FiMail className="w-5 h-5" />,
      description: 'Instant delivery via email',
      time: 'Instant'
    },
    {
      id: 'print',
      name: 'Print at Home',
      icon: <FiDownload className="w-5 h-5" />,
      description: 'Download and print yourself',
      time: 'Instant'
    },
    {
      id: 'mail',
      name: 'Physical Mail',
      icon: <FiCalendar className="w-5 h-5" />,
      description: 'Shipped to recipient',
      time: '3-5 business days'
    }
  ];

  // Mock gift card data
  const myGiftCards = [
    {
      id: 1,
      code: 'GC-1234-5678-9012',
      amount: 50,
      balance: 50,
      status: 'active',
      purchasedDate: '2024-01-10',
      expiresDate: '2025-01-10',
      design: 'classic',
      sender: 'John Doe'
    },
    {
      id: 2,
      code: 'GC-9876-5432-1098',
      amount: 100,
      balance: 75,
      status: 'active',
      purchasedDate: '2024-01-05',
      expiresDate: '2025-01-05',
      design: 'birthday',
      sender: 'Jane Smith'
    },
    {
      id: 3,
      code: 'GC-5555-6666-7777',
      amount: 25,
      balance: 0,
      status: 'used',
      purchasedDate: '2023-12-20',
      expiresDate: '2024-12-20',
      design: 'holiday',
      sender: 'Mike Johnson'
    }
  ];

  const popularGiftCards = [
    {
      id: 1,
      name: 'Amazon Gift Card',
      description: 'The perfect gift for any occasion',
      image: 'https://via.placeholder.com/200x120?text=Amazon+Gift+Card',
      rating: 4.8,
      reviews: 12500,
      featured: true
    },
    {
      id: 2,
      name: 'Prime Video Gift Card',
      description: 'Stream unlimited movies and TV shows',
      image: 'https://via.placeholder.com/200x120?text=Prime+Video',
      rating: 4.6,
      reviews: 8900,
      featured: false
    },
    {
      id: 3,
      name: 'Audible Gift Card',
      description: 'Listen to audiobooks and podcasts',
      image: 'https://via.placeholder.com/200x120?text=Audible',
      rating: 4.7,
      reviews: 5600,
      featured: false
    },
    {
      id: 4,
      name: 'Kindle Gift Card',
      description: 'Buy e-books and digital content',
      image: 'https://via.placeholder.com/200x120?text=Kindle',
      rating: 4.5,
      reviews: 4200,
      featured: false
    }
  ];

  const handlePurchaseGiftCard = async () => {
    if (!recipientEmail || !recipientName) {
      alert('Please fill in recipient details');
      return;
    }

    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      alert('Gift card purchased successfully!');
      // Reset form
      setRecipientEmail('');
      setRecipientName('');
      setMessage('');
    }, 2000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'used': return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
      case 'expired': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
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
                <FiGift className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Gift Cards
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Give the perfect gift with Amazon Gift Cards. Choose from various designs and amounts, delivered instantly or shipped to your recipient.
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
            onClick={() => setActiveTab('purchase')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'purchase'
                ? 'bg-blue-600 dark:bg-orange-500 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            Purchase Gift Card
          </button>
          <button
            onClick={() => setActiveTab('my-cards')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'my-cards'
                ? 'bg-blue-600 dark:bg-orange-500 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            My Gift Cards ({myGiftCards.length})
          </button>
          <button
            onClick={() => setActiveTab('popular')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'popular'
                ? 'bg-blue-600 dark:bg-orange-500 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            Popular Cards
          </button>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'purchase' && (
            <motion.div
              key="purchase"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {/* Purchase Form */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Purchase Gift Card
                </h2>

                {/* Amount Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Select Amount
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {giftCardAmounts.map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setSelectedAmount(amount)}
                        className={`p-3 border rounded-lg font-medium transition-colors ${
                          selectedAmount === amount
                            ? 'border-blue-600 dark:border-orange-500 bg-blue-50 dark:bg-orange-900/10 text-blue-600 dark:text-orange-500'
                            : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500'
                        }`}
                      >
                        ${amount}
                      </button>
                    ))}
                  </div>
                  <div className="mt-3">
                    <input
                      type="number"
                      placeholder="Custom amount"
                      min="1"
                      max="2000"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      onChange={(e) => setSelectedAmount(parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>

                {/* Design Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Choose Design
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {giftCardDesigns.map((design) => (
                      <button
                        key={design.id}
                        onClick={() => setSelectedDesign(design.id)}
                        className={`p-4 border rounded-lg text-left transition-colors ${
                          selectedDesign === design.id
                            ? 'border-blue-600 dark:border-orange-500 bg-blue-50 dark:bg-orange-900/10'
                            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{design.preview}</span>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {design.name}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {design.description}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Delivery Method */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Delivery Method
                  </label>
                  <div className="space-y-2">
                    {deliveryMethods.map((method) => (
                      <label key={method.id} className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <input
                          type="radio"
                          name="delivery"
                          value={method.id}
                          checked={deliveryMethod === method.id}
                          onChange={(e) => setDeliveryMethod(e.target.value)}
                          className="text-blue-600 dark:text-orange-500 focus:ring-blue-500 dark:focus:ring-orange-500"
                        />
                        <div className="text-gray-600 dark:text-gray-400">
                          {method.icon}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 dark:text-white">
                            {method.name}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {method.description} • {method.time}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Recipient Details */}
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Recipient Name *
                    </label>
                    <input
                      type="text"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      placeholder="Enter recipient's name"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Recipient Email *
                    </label>
                    <input
                      type="email"
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                      placeholder="Enter recipient's email"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Personal Message (Optional)
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Add a personal message..."
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                  </div>
                </div>

                {/* Purchase Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePurchaseGiftCard}
                  disabled={isProcessing || !recipientEmail || !recipientName}
                  className="w-full bg-blue-600 dark:bg-orange-500 text-white py-3 px-4 rounded-lg hover:bg-blue-700 dark:hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                >
                  {isProcessing ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <FiCreditCard className="w-5 h-5" />
                      <span>Purchase Gift Card - ${selectedAmount}</span>
                    </>
                  )}
                </motion.button>
              </div>

              {/* Preview */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Gift Card Preview
                </h2>
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-6 text-white text-center">
                  <div className="text-4xl mb-4">
                    {giftCardDesigns.find(d => d.id === selectedDesign)?.preview}
                  </div>
                  <h3 className="text-xl font-bold mb-2">Amazon Gift Card</h3>
                  <div className="text-3xl font-bold mb-4">${selectedAmount}</div>
                  <div className="text-sm opacity-90 mb-4">
                    {giftCardDesigns.find(d => d.id === selectedDesign)?.name} Design
                  </div>
                  {message && (
                    <div className="bg-white/20 rounded-lg p-3 text-sm">
                      "{message}"
                    </div>
                  )}
                </div>
                <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                  <p>• Never expires</p>
                  <p>• Redeemable on millions of items</p>
                  <p>• Instant delivery via {deliveryMethods.find(d => d.id === deliveryMethod)?.name}</p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'my-cards' && (
            <motion.div
              key="my-cards"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  My Gift Cards
                </h2>
                <div className="space-y-4">
                  {myGiftCards.map((card, index) => (
                    <motion.div
                      key={card.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                            <FiGift className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">
                              Gift Card #{card.id}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              From: {card.sender}
                            </p>
                          </div>
                        </div>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(card.status)}`}>
                          {card.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Original Amount</p>
                          <p className="font-semibold text-gray-900 dark:text-white">${card.amount}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Current Balance</p>
                          <p className="font-semibold text-gray-900 dark:text-white">${card.balance}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Purchased</p>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {new Date(card.purchasedDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Expires</p>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {new Date(card.expiresDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                            {card.code}
                          </span>
                          <button className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
                            <FiEye className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex space-x-2">
                          <button className="px-3 py-1 bg-blue-600 dark:bg-orange-500 text-white rounded text-sm hover:bg-blue-700 dark:hover:bg-orange-600 transition-colors">
                            Use Now
                          </button>
                          <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <FiDownload className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'popular' && (
            <motion.div
              key="popular"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {popularGiftCards.map((card, index) => (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  >
                    {card.featured && (
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-t-lg text-center">
                        FEATURED
                      </div>
                    )}
                    <div className="p-4">
                      <div className="aspect-video mb-4">
                        <img
                          src={card.image}
                          alt={card.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                        {card.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {card.description}
                      </p>
                      <div className="flex items-center space-x-1 mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <FiStar
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(card.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300 dark:text-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-600 dark:text-gray-400 ml-1">
                          {card.rating} ({card.reviews.toLocaleString()})
                        </span>
                      </div>
                      <button className="w-full bg-blue-600 dark:bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 dark:hover:bg-orange-600 transition-colors text-sm font-medium">
                        View Details
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GiftCards;
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageCircle, FiX, FiSend, FiUser, FiMessageSquare, FiPhone, FiMail } from 'react-icons/fi';

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatMode, setChatMode] = useState('ai'); // 'ai', 'human', 'phone'
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateBotResponse(text);
      const botMessage = {
        id: Date.now() + 1,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const generateBotResponse = (userText) => {
    const responses = {
      greeting: [
        "Hello! How can I assist you today?",
        "Hi there! What can I help you with?",
        "Welcome! I'm here to help with any questions you have."
      ],
      product: [
        "I'd be happy to help you find the perfect product! What are you looking for?",
        "Let me help you with product information. What specific item interests you?",
        "I can provide details about our products. What would you like to know?"
      ],
      order: [
        "I can help you with your order. Do you have an order number?",
        "Let me assist you with order-related questions. What do you need help with?",
        "I'm here to help with your order. What's the issue you're experiencing?"
      ],
      shipping: [
        "I can help you with shipping information. What's your order number?",
        "Let me check your shipping status. When did you place your order?",
        "I'll help you track your package. Do you have a tracking number?"
      ],
      return: [
        "I can help you with returns and exchanges. What item would you like to return?",
        "Let me assist you with the return process. Do you have your order number?",
        "I'll help you start a return. What's the reason for the return?"
      ],
      default: [
        "I understand. Let me help you with that. Can you provide more details?",
        "That's a great question! Let me get you the right information.",
        "I'm here to help! Could you tell me more about what you need?",
        "I can assist you with that. What specific information are you looking for?"
      ]
    };

    const text = userText.toLowerCase();
    
    if (text.includes('hello') || text.includes('hi') || text.includes('hey')) {
      return responses.greeting[Math.floor(Math.random() * responses.greeting.length)];
    } else if (text.includes('product') || text.includes('item') || text.includes('buy')) {
      return responses.product[Math.floor(Math.random() * responses.product.length)];
    } else if (text.includes('order') || text.includes('purchase')) {
      return responses.order[Math.floor(Math.random() * responses.order.length)];
    } else if (text.includes('shipping') || text.includes('delivery') || text.includes('track')) {
      return responses.shipping[Math.floor(Math.random() * responses.shipping.length)];
    } else if (text.includes('return') || text.includes('refund') || text.includes('exchange')) {
      return responses.return[Math.floor(Math.random() * responses.return.length)];
    } else {
      return responses.default[Math.floor(Math.random() * responses.default.length)];
    }
  };

  const quickReplies = [
    "Track my order",
    "Return an item",
    "Product questions",
    "Shipping info",
    "Account help"
  ];

  const handleQuickReply = (reply) => {
    handleSendMessage(reply);
  };

  const connectToHuman = () => {
    setChatMode('human');
    const humanMessage = {
      id: Date.now(),
      text: "Connecting you to a human agent... Please wait a moment.",
      sender: 'bot',
      timestamp: new Date(),
      type: 'system'
    };
    setMessages(prev => [...prev, humanMessage]);
  };

  const requestCallback = () => {
    setChatMode('phone');
    const phoneMessage = {
      id: Date.now(),
      text: "We'll call you back within 5 minutes. Please provide your phone number.",
      sender: 'bot',
      timestamp: new Date(),
      type: 'system'
    };
    setMessages(prev => [...prev, phoneMessage]);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-full shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 z-50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isOpen ? 180 : 0 }}
      >
        {isOpen ? <FiX className="w-6 h-6" /> : <FiMessageCircle className="w-6 h-6" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-20 right-4 w-80 h-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50 flex flex-col"
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="font-semibold">Live Support</span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={connectToHuman}
                    className="p-1 hover:bg-blue-800 rounded"
                    title="Connect to Human"
                  >
                    <FiUser className="w-4 h-4" />
                  </button>
                  <button
                    onClick={requestCallback}
                    className="p-1 hover:bg-blue-800 rounded"
                    title="Request Callback"
                  >
                    <FiPhone className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-xs ${
                    message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.sender === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                    }`}>
                      {message.sender === 'user' ? <FiUser className="w-4 h-4" /> : <FiMessageSquare className="w-4 h-4" />}
                    </div>
                    <div className={`px-3 py-2 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    }`}>
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <FiMessageSquare className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Quick Replies */}
              {messages.length === 1 && (
                <div className="space-y-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Quick replies:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickReplies.map((reply, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickReply(reply)}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <button
                  onClick={() => handleSendMessage(inputText)}
                  className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FiSend className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LiveChat;
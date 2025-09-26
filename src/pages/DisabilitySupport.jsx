import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShield, FiEye, FiVolume2, FiMousePointer, FiType, FiMonitor, FiHeadphones, FiPhone, FiMail, FiMessageSquare, FiVideo, FiDownload, FiBook, FiUsers, FiCheckCircle, FiArrowRight } from 'react-icons/fi';

const DisabilitySupport = () => {
  const [activeTab, setActiveTab] = useState('accessibility');
  const [selectedSupportType, setSelectedSupportType] = useState('general');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    issue: '',
    description: '',
    urgency: 'medium'
  });

  const accessibilityFeatures = [
    {
      icon: <FiEye className="w-8 h-8" />,
      title: 'Visual Accessibility',
      features: [
        'High contrast mode',
        'Screen reader support',
        'Text size adjustment',
        'Color blind friendly design',
        'Focus indicators'
      ]
    },
    {
      icon: <FiVolume2 className="w-8 h-8" />,
      title: 'Audio Accessibility',
      features: [
        'Audio descriptions',
        'Voice navigation',
        'Sound notifications',
        'Volume controls',
        'Audio transcripts'
      ]
    },
    {
      icon: <FiMousePointer className="w-8 h-8" />,
      title: 'Motor Accessibility',
      features: [
        'Large click targets',
        'Keyboard navigation',
        'Voice commands',
        'Gesture alternatives',
        'Customizable controls'
      ]
    },
    {
      icon: <FiMonitor className="w-8 h-8" />,
      title: 'Cognitive Accessibility',
      features: [
        'Clear navigation',
        'Simple language',
        'Consistent layout',
        'Error prevention',
        'Helpful instructions'
      ]
    }
  ];

  const supportOptions = [
    {
      id: 'general',
      name: 'General Accessibility Support',
      description: 'Questions about accessibility features and settings',
      icon: <FiShield className="w-6 h-6" />,
      responseTime: '24 hours'
    },
    {
      id: 'technical',
      name: 'Technical Support',
      description: 'Help with accessibility tools and assistive technology',
      icon: <FiMonitor className="w-6 h-6" />,
      responseTime: '12 hours'
    },
    {
      id: 'account',
      name: 'Account Accessibility',
      description: 'Account modifications for accessibility needs',
      icon: <FiUsers className="w-6 h-6" />,
      responseTime: '48 hours'
    },
    {
      id: 'urgent',
      name: 'Urgent Support',
      description: 'Critical accessibility issues affecting your ability to use our services',
      icon: <FiShield className="w-6 h-6" />,
      responseTime: '2 hours'
    }
  ];

  const contactMethods = [
    {
      id: 'phone',
      name: 'Phone Support',
      description: 'Speak directly with our accessibility specialists',
      icon: <FiPhone className="w-6 h-6" />,
      availability: '24/7',
      number: '1-800-AMAZON-ACCESS',
      popular: true
    },
    {
      id: 'chat',
      name: 'Live Chat',
      description: 'Real-time text chat with support agents',
      icon: <FiMessageSquare className="w-6 h-6" />,
      availability: '24/7',
      action: 'Start Chat',
      popular: true
    },
    {
      id: 'email',
      name: 'Email Support',
      description: 'Detailed written support via email',
      icon: <FiMail className="w-6 h-6" />,
      availability: '24/7',
      action: 'Send Email'
    },
    {
      id: 'video',
      name: 'Video Call',
      description: 'Face-to-face support with screen sharing',
      icon: <FiVideo className="w-6 h-6" />,
      availability: 'Business Hours',
      action: 'Schedule Call'
    }
  ];

  const resources = [
    {
      title: 'Accessibility Guide',
      description: 'Complete guide to using Amazon with assistive technology',
      type: 'PDF',
      icon: <FiDownload className="w-5 h-5" />,
      size: '2.3 MB'
    },
    {
      title: 'Screen Reader Tutorial',
      description: 'Step-by-step tutorial for screen reader users',
      type: 'Video',
      icon: <FiVideo className="w-5 h-5" />,
      size: '15 min'
    },
    {
      title: 'Keyboard Shortcuts',
      description: 'Complete list of keyboard shortcuts for navigation',
      type: 'PDF',
      icon: <FiType className="w-5 h-5" />,
      size: '1.1 MB'
    },
    {
      title: 'Accessibility FAQ',
      description: 'Frequently asked questions about accessibility',
      type: 'Web Page',
      icon: <FiBook className="w-5 h-5" />,
      size: 'Online'
    }
  ];

  const handleInputChange = (field, value) => {
    setContactForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmitSupport = () => {
    alert('Your support request has been submitted. You will receive a response within the specified timeframe.');
    setContactForm({
      name: '',
      email: '',
      phone: '',
      issue: '',
      description: '',
      urgency: 'medium'
    });
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
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <FiShield className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Disability Customer Support
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              We're committed to making Amazon accessible to everyone. Our dedicated accessibility support team is here to help you navigate our platform and resolve any accessibility-related issues you may encounter.
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
            onClick={() => setActiveTab('accessibility')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'accessibility'
                ? 'bg-blue-600 dark:bg-orange-500 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            Accessibility Features
          </button>
          <button
            onClick={() => setActiveTab('support')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'support'
                ? 'bg-blue-600 dark:bg-orange-500 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            Get Support
          </button>
          <button
            onClick={() => setActiveTab('resources')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'resources'
                ? 'bg-blue-600 dark:bg-orange-500 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            Resources
          </button>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'accessibility' && (
            <motion.div
              key="accessibility"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-8"
            >
              {/* Accessibility Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {accessibilityFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="text-purple-600 dark:text-purple-400">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {feature.title}
                      </h3>
                    </div>
                    <ul className="space-y-2">
                      {feature.features.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center space-x-2">
                          <FiCheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>

              {/* Quick Settings */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                  Quick Accessibility Settings
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <button className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-center">
                    <FiEye className="w-6 h-6 text-gray-600 dark:text-gray-400 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-900 dark:text-white">High Contrast</p>
                  </button>
                  <button className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-center">
                    <FiVolume2 className="w-6 h-6 text-gray-600 dark:text-gray-400 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Audio Descriptions</p>
                  </button>
                  <button className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-center">
                    <FiType className="w-6 h-6 text-gray-600 dark:text-gray-400 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Keyboard Nav</p>
                  </button>
                  <button className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-center">
                    <FiMonitor className="w-6 h-6 text-gray-600 dark:text-gray-400 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Text Size</p>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'support' && (
            <motion.div
              key="support"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-8"
            >
              {/* Support Types */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                  Choose Support Type
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {supportOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setSelectedSupportType(option.id)}
                      className={`p-4 border rounded-lg text-left transition-colors ${
                        selectedSupportType === option.id
                          ? 'border-blue-600 dark:border-orange-500 bg-blue-50 dark:bg-orange-900/10'
                          : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                      }`}
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="text-blue-600 dark:text-orange-500">
                          {option.icon}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            {option.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Response time: {option.responseTime}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {option.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Methods */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                  Contact Methods
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {contactMethods.map((method) => (
                    <motion.div
                      key={method.id}
                      whileHover={{ scale: 1.02 }}
                      className={`p-4 border rounded-lg transition-colors ${
                        method.popular
                          ? 'border-blue-600 dark:border-orange-500 bg-blue-50 dark:bg-orange-900/10'
                          : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                      }`}
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="text-blue-600 dark:text-orange-500">
                          {method.icon}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            {method.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Available: {method.availability}
                          </p>
                        </div>
                        {method.popular && (
                          <span className="bg-blue-600 dark:bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                            Popular
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {method.description}
                      </p>
                      <button className="w-full bg-blue-600 dark:bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 dark:hover:bg-orange-600 transition-colors text-sm font-medium">
                        {method.number || method.action}
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Support Form */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                  Submit Support Request
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      value={contactForm.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={contactForm.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Issue Type *
                  </label>
                  <select
                    value={contactForm.issue}
                    onChange={(e) => handleInputChange('issue', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  >
                    <option value="">Select Issue Type</option>
                    <option value="screen-reader">Screen Reader Issues</option>
                    <option value="keyboard-nav">Keyboard Navigation</option>
                    <option value="visual-access">Visual Accessibility</option>
                    <option value="audio-access">Audio Accessibility</option>
                    <option value="motor-access">Motor Accessibility</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={contactForm.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={4}
                    placeholder="Please describe your accessibility issue in detail..."
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Urgency Level
                  </label>
                  <select
                    value={contactForm.urgency}
                    onChange={(e) => handleInputChange('urgency', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  >
                    <option value="low">Low - Can wait 24-48 hours</option>
                    <option value="medium">Medium - Need help within 24 hours</option>
                    <option value="high">High - Need help within 12 hours</option>
                    <option value="urgent">Urgent - Critical issue affecting usage</option>
                  </select>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmitSupport}
                  disabled={!contactForm.name || !contactForm.email || !contactForm.issue || !contactForm.description}
                  className="w-full bg-blue-600 dark:bg-orange-500 text-white py-3 px-4 rounded-lg hover:bg-blue-700 dark:hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                >
                  <FiMessageSquare className="w-5 h-5" />
                  <span>Submit Support Request</span>
                </motion.button>
              </div>
            </motion.div>
          )}

          {activeTab === 'resources' && (
            <motion.div
              key="resources"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-8"
            >
              {/* Resources Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {resources.map((resource, index) => (
                  <motion.div
                    key={resource.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="text-blue-600 dark:text-orange-500 mt-1">
                        {resource.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {resource.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-3">
                          {resource.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500 dark:text-gray-500">
                            {resource.type} • {resource.size}
                          </span>
                          <button className="text-blue-600 dark:text-orange-500 hover:text-blue-700 dark:hover:text-orange-600 text-sm font-medium flex items-center space-x-1">
                            <span>Download</span>
                            <FiArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Additional Information */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                  Additional Information
                </h2>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-600 dark:border-orange-500 pl-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Accessibility Standards
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Our platform follows WCAG 2.1 AA guidelines and is regularly tested with various assistive technologies including screen readers, voice recognition software, and alternative input devices.
                    </p>
                  </div>
                  <div className="border-l-4 border-green-600 pl-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Continuous Improvement
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      We regularly gather feedback from users with disabilities and work with accessibility experts to improve our platform. Your input helps us make Amazon more accessible for everyone.
                    </p>
                  </div>
                  <div className="border-l-4 border-purple-600 pl-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Training & Support
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Our support team receives specialized training in accessibility and assistive technology. We're here to help you get the most out of your Amazon experience.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DisabilitySupport;
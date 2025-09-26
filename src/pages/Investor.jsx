import React from 'react';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiDollarSign, FiUsers, FiGlobe } from 'react-icons/fi';

const Investor = () => {
  const financialData = [
    {
      title: "Revenue",
      value: "$574.8B",
      change: "+13.2%",
      period: "2024 Q3",
      icon: FiDollarSign,
      color: "from-green-400 to-emerald-500"
    },
    {
      title: "Net Income",
      value: "$9.9B",
      change: "+241%",
      period: "2024 Q3",
      icon: FiTrendingUp,
      color: "from-blue-400 to-cyan-500"
    },
    {
      title: "Active Customers",
      value: "200M+",
      change: "+8.5%",
      period: "Worldwide",
      icon: FiUsers,
      color: "from-purple-400 to-pink-500"
    },
    {
      title: "Market Presence",
      value: "190+",
      change: "Countries",
      period: "Global Reach",
      icon: FiGlobe,
      color: "from-orange-400 to-red-500"
    }
  ];

  const reports = [
    {
      title: "Q3 2024 Earnings Report",
      date: "October 25, 2024",
      type: "Earnings",
      description: "Third quarter financial results and business updates"
    },
    {
      title: "Annual Report 2023",
      date: "March 15, 2024",
      type: "Annual",
      description: "Comprehensive overview of Amazon's performance and strategy"
    },
    {
      title: "Sustainability Report 2024",
      date: "September 10, 2024",
      type: "Sustainability",
      description: "Progress on environmental and social initiatives"
    },
    {
      title: "Proxy Statement 2024",
      date: "April 20, 2024",
      type: "Governance",
      description: "Corporate governance and shareholder information"
    }
  ];

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 text-center">
            Investor Relations
          </h1>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Stay informed about Amazon's financial performance and strategic initiatives
          </p>
          
          {/* Financial Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Financial Highlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {financialData.map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center mb-4`}>
                    <item.icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
                  <div className="text-2xl font-bold text-gray-800 mb-1">{item.value}</div>
                  <div className="text-sm text-gray-600 mb-1">{item.change}</div>
                  <div className="text-xs text-gray-500">{item.period}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recent Reports */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Recent Reports</h2>
            <div className="space-y-4">
              {reports.map((report, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors duration-200 border border-gray-200"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{report.title}</h3>
                      <p className="text-gray-600 mb-2">{report.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{report.date}</span>
                        <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded text-xs font-medium">
                          {report.type}
                        </span>
                      </div>
                    </div>
                    <button className="mt-4 md:mt-0 bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-200">
                      Download PDF
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Investor Contact</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Investor Relations Team</h3>
                <div className="space-y-2 text-gray-600">
                  <p><strong>Email:</strong> ir@amazon.com</p>
                  <p><strong>Phone:</strong> +1 (206) 266-1000</p>
                  <p><strong>Address:</strong> 410 Terry Avenue North, Seattle, WA 98109</p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Stock Information</h3>
                <div className="space-y-2 text-gray-600">
                  <p><strong>Ticker Symbol:</strong> AMZN</p>
                  <p><strong>Exchange:</strong> NASDAQ</p>
                  <p><strong>Market Cap:</strong> $1.5T</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Investor;
import React from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiUser, FiArrowRight } from 'react-icons/fi';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Future of E-commerce: Trends to Watch in 2024",
      excerpt: "Discover the latest trends shaping the future of online shopping and how they're transforming the customer experience.",
      author: "Sarah Johnson",
      date: "December 15, 2024",
      category: "Technology",
      image: "bg-gradient-to-br from-blue-400 to-purple-500"
    },
    {
      id: 2,
      title: "Sustainable Shopping: How Amazon is Going Green",
      excerpt: "Learn about our commitment to sustainability and the steps we're taking to reduce our environmental impact.",
      author: "Michael Chen",
      date: "December 10, 2024",
      category: "Sustainability",
      image: "bg-gradient-to-br from-green-400 to-emerald-500"
    },
    {
      id: 3,
      title: "Customer Stories: How Amazon Changed Lives",
      excerpt: "Read inspiring stories from customers around the world whose lives have been positively impacted by Amazon.",
      author: "Emily Rodriguez",
      date: "December 5, 2024",
      category: "Customer Stories",
      image: "bg-gradient-to-br from-pink-400 to-red-500"
    },
    {
      id: 4,
      title: "Innovation Spotlight: Amazon's Latest Technologies",
      excerpt: "Explore the cutting-edge technologies Amazon is developing to enhance the shopping experience.",
      author: "David Kim",
      date: "November 28, 2024",
      category: "Innovation",
      image: "bg-gradient-to-br from-orange-400 to-yellow-500"
    },
    {
      id: 5,
      title: "Small Business Success: Partnering with Amazon",
      excerpt: "How small businesses are thriving by partnering with Amazon and reaching customers worldwide.",
      author: "Lisa Thompson",
      date: "November 20, 2024",
      category: "Business",
      image: "bg-gradient-to-br from-indigo-400 to-blue-500"
    },
    {
      id: 6,
      title: "Prime Day 2024: Record-Breaking Results",
      excerpt: "A look back at Prime Day 2024 and the incredible success stories from sellers and customers.",
      author: "James Wilson",
      date: "November 15, 2024",
      category: "Events",
      image: "bg-gradient-to-br from-purple-400 to-pink-500"
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
            Amazon Blog
          </h1>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Stay updated with the latest news, insights, and stories from Amazon
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className={`h-48 ${post.image} flex items-center justify-center`}>
                  <div className="text-white text-4xl font-bold">
                    {post.title.charAt(0)}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-3 text-sm text-gray-500">
                    <span className="flex items-center space-x-1">
                      <FiCalendar size={14} />
                      <span>{post.date}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <FiUser size={14} />
                      <span>{post.author}</span>
                    </span>
                  </div>
                  
                  <span className="inline-block bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-medium mb-3">
                    {post.category}
                  </span>
                  
                  <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <button className="flex items-center space-x-2 text-orange-500 hover:text-orange-600 transition-colors duration-200 font-medium">
                    <span>Read More</span>
                    <FiArrowRight size={16} />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
          
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <button className="bg-gradient-to-r from-orange-400 to-orange-500 text-white font-bold py-3 px-8 rounded-lg hover:from-orange-500 hover:to-orange-600 transition-colors duration-200">
              Load More Posts
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Blog;
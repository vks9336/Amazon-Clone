import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowDown, FiArrowRight } from 'react-icons/fi';

const MegaMenu = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  const categories = [
    {
      name: 'Electronics',
      icon: '📱',
      subcategories: [
        { name: 'Smartphones', href: '/category/smartphones' },
        { name: 'Laptops', href: '/category/laptops' },
        { name: 'Tablets', href: '/category/tablets' },
        { name: 'Audio', href: '/category/audio' },
        { name: 'Cameras', href: '/category/cameras' },
        { name: 'Gaming', href: '/category/gaming' }
      ],
      featured: [
        { name: 'iPhone 15 Pro', href: '/product/iphone-15-pro' },
        { name: 'MacBook Air M2', href: '/product/macbook-air-m2' },
        { name: 'AirPods Pro', href: '/product/airpods-pro' }
      ]
    },
    {
      name: 'Fashion',
      icon: '👕',
      subcategories: [
        { name: "Men's Clothing", href: '/category/mens-clothing' },
        { name: "Women's Clothing", href: '/category/womens-clothing' },
        { name: 'Shoes', href: '/category/shoes' },
        { name: 'Accessories', href: '/category/accessories' },
        { name: 'Jewelry', href: '/category/jewelry' },
        { name: 'Watches', href: '/category/watches' }
      ],
      featured: [
        { name: 'Nike Air Max', href: '/product/nike-air-max' },
        { name: 'Levi\'s Jeans', href: '/product/levis-jeans' },
        { name: 'Rolex Watch', href: '/product/rolex-watch' }
      ]
    },
    {
      name: 'Home & Garden',
      icon: '🏠',
      subcategories: [
        { name: 'Furniture', href: '/category/furniture' },
        { name: 'Kitchen', href: '/category/kitchen' },
        { name: 'Bedding', href: '/category/bedding' },
        { name: 'Bath', href: '/category/bath' },
        { name: 'Garden', href: '/category/garden' },
        { name: 'Tools', href: '/category/tools' }
      ],
      featured: [
        { name: 'IKEA Sofa', href: '/product/ikea-sofa' },
        { name: 'KitchenAid Mixer', href: '/product/kitchenaid-mixer' },
        { name: 'Weber Grill', href: '/product/weber-grill' }
      ]
    },
    {
      name: 'Sports & Outdoors',
      icon: '⚽',
      subcategories: [
        { name: 'Fitness', href: '/category/fitness' },
        { name: 'Outdoor Gear', href: '/category/outdoor-gear' },
        { name: 'Sports Equipment', href: '/category/sports-equipment' },
        { name: 'Cycling', href: '/category/cycling' },
        { name: 'Water Sports', href: '/category/water-sports' },
        { name: 'Winter Sports', href: '/category/winter-sports' }
      ],
      featured: [
        { name: 'Peloton Bike', href: '/product/peloton-bike' },
        { name: 'Patagonia Jacket', href: '/product/patagonia-jacket' },
        { name: 'Yeti Cooler', href: '/product/yeti-cooler' }
      ]
    },
    {
      name: 'Books & Media',
      icon: '📚',
      subcategories: [
        { name: 'Books', href: '/category/books' },
        { name: 'Movies & TV', href: '/category/movies-tv' },
        { name: 'Music', href: '/category/music' },
        { name: 'Video Games', href: '/category/video-games' },
        { name: 'Magazines', href: '/category/magazines' },
        { name: 'Educational', href: '/category/educational' }
      ],
      featured: [
        { name: 'Best Sellers', href: '/category/best-sellers' },
        { name: 'New Releases', href: '/category/new-releases' },
        { name: 'Award Winners', href: '/category/award-winners' }
      ]
    }
  ];

  return (
    <div className="relative">
      {/* Category Links */}
      <div className="flex space-x-6">
        {categories.map((category) => (
          <div
            key={category.name}
            className="relative"
            onMouseEnter={() => setActiveCategory(category.name)}
            onMouseLeave={() => setActiveCategory(null)}
          >
            <Link
              to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="flex items-center space-x-1 text-white hover:text-yellow-300 transition-colors py-2"
            >
              <span className="text-lg">{category.icon}</span>
              <span className="font-medium">{category.name}</span>
              <FiArrowDown className="w-4 h-4" />
            </Link>

            {/* Mega Menu Dropdown */}
            <AnimatePresence>
              {activeCategory === category.name && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 mt-2"
                >
                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-6">
                      {/* Subcategories */}
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Shop by Category</h3>
                        <ul className="space-y-2">
                          {category.subcategories.map((subcategory) => (
                            <li key={subcategory.name}>
                              <Link
                                to={subcategory.href}
                                className="text-gray-600 hover:text-blue-600 transition-colors flex items-center justify-between group"
                              >
                                <span>{subcategory.name}</span>
                                <FiArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Featured Products */}
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Featured Products</h3>
                        <ul className="space-y-2">
                          {category.featured.map((product) => (
                            <li key={product.name}>
                              <Link
                                to={product.href}
                                className="text-gray-600 hover:text-blue-600 transition-colors flex items-center justify-between group"
                              >
                                <span>{product.name}</span>
                                <FiArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* View All Link */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <Link
                        to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1"
                      >
                        <span>View All {category.name}</span>
                        <FiArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MegaMenu;
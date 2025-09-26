import React from 'react';
import { motion } from 'framer-motion';

const LoadingSkeleton = ({ 
  type = 'card', 
  count = 1, 
  className = '',
  height = 'auto',
  width = '100%'
}) => {
  const skeletonVariants = {
    animate: {
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return (
          <div className={`bg-white rounded-lg shadow-sm overflow-hidden ${className}`}>
            <div className="h-48 bg-gray-200 animate-pulse"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse"></div>
              <div className="h-3 bg-gray-200 rounded w-1/4 animate-pulse"></div>
            </div>
          </div>
        );

      case 'list':
        return (
          <div className={`bg-white rounded-lg shadow-sm p-4 ${className}`}>
            <div className="flex space-x-4">
              <div className="w-16 h-16 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="flex-grow space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
              </div>
            </div>
          </div>
        );

      case 'text':
        return (
          <div className={`space-y-2 ${className}`}>
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
          </div>
        );

      case 'image':
        return (
          <div 
            className={`bg-gray-200 rounded-lg animate-pulse ${className}`}
            style={{ height, width }}
          ></div>
        );

      case 'button':
        return (
          <div 
            className={`bg-gray-200 rounded-lg animate-pulse ${className}`}
            style={{ height: height || '40px', width: width || '120px' }}
          ></div>
        );

      case 'avatar':
        return (
          <div 
            className={`bg-gray-200 rounded-full animate-pulse ${className}`}
            style={{ height, width }}
          ></div>
        );

      case 'table':
        return (
          <div className={`bg-white rounded-lg shadow-sm overflow-hidden ${className}`}>
            <div className="p-4 border-b border-gray-200">
              <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
            </div>
            <div className="divide-y divide-gray-200">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="p-4 flex space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded animate-pulse"></div>
                  <div className="flex-grow space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                  </div>
                  <div className="h-8 bg-gray-200 rounded w-20 animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'page':
        return (
          <div className={`space-y-6 ${className}`}>
            <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="h-48 bg-gray-200 animate-pulse"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div 
            className={`bg-gray-200 rounded animate-pulse ${className}`}
            style={{ height, width }}
          ></div>
        );
    }
  };

  if (count === 1) {
    return renderSkeleton();
  }

  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          variants={skeletonVariants}
          animate="animate"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {renderSkeleton()}
        </motion.div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
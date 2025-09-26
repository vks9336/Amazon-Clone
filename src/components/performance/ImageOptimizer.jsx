import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiImage, FiSave, FiEye, FiX } from 'react-icons/fi';

const ImageOptimizer = ({ 
  src, 
  alt, 
  width, 
  height, 
  quality = 80, 
  format = 'webp',
  lazy = true,
  placeholder = true,
  className = '',
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isInView, setIsInView] = useState(!lazy);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const imgRef = useRef(null);
  const observerRef = useRef(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || isInView) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observerRef.current?.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [lazy, isInView]);

  // Generate optimized image URL
  const getOptimizedSrc = () => {
    if (!src) return '';
    
    // In a real app, you'd use a service like Cloudinary, ImageKit, or Next.js Image
    // For demo purposes, we'll simulate optimization
    const params = new URLSearchParams({
      w: width?.toString() || 'auto',
      h: height?.toString() || 'auto',
      q: quality.toString(),
      f: format,
      fit: 'cover'
    });
    
    return `${src}?${params.toString()}`;
  };

  // Generate placeholder
  const getPlaceholder = () => {
    if (!placeholder) return '';
    
    const svg = `
      <svg width="${width || 300}" height="${height || 200}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f3f4f6"/>
        <rect x="50%" y="50%" width="50" height="50" fill="#e5e7eb" transform="translate(-25, -25)"/>
        <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#9ca3af" font-family="Arial" font-size="12">
          Loading...
        </text>
      </svg>
    `;
    
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  };

  const handleLoad = () => {
    setIsLoaded(true);
    setIsError(false);
  };

  const handleError = () => {
    setIsError(true);
    setIsLoaded(false);
  };

  const handleClick = () => {
    setShowFullscreen(true);
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(getOptimizedSrc());
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = alt || 'image';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <>
      <div
        ref={imgRef}
        className={`relative overflow-hidden ${className}`}
        style={{ width, height }}
        {...props}
      >
        {/* Placeholder */}
        <AnimatePresence>
          {!isLoaded && !isError && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
            >
              <div className="animate-pulse">
                <FiImage className="w-8 h-8 text-gray-400" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error State */}
        <AnimatePresence>
          {isError && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center"
            >
              <div className="text-center">
                <FiImage className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500 dark:text-gray-400">Failed to load</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actual Image */}
        {isInView && (
          <motion.img
            src={getOptimizedSrc()}
            alt={alt}
            onLoad={handleLoad}
            onError={handleError}
            onClick={handleClick}
            className={`w-full h-full object-cover cursor-pointer transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ width, height }}
            loading={lazy ? 'lazy' : 'eager'}
            decoding="async"
          />
        )}

        {/* Hover Overlay */}
        <motion.div
          className="absolute inset-0 bg-black bg-opacity-0 flex items-center justify-center opacity-0 hover:opacity-100 hover:bg-opacity-20 transition-all duration-300"
          whileHover={{ opacity: 1 }}
        >
          <div className="flex space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDownload();
              }}
              className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <FiSave className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowFullscreen(true);
              }}
              className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <FiEye className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {showFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
            onClick={() => setShowFullscreen(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={getOptimizedSrc()}
                alt={alt}
                className="max-w-full max-h-full object-contain"
              />
              <button
                onClick={() => setShowFullscreen(false)}
                className="absolute top-4 right-4 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <FiX className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Lazy Loaded Component
export const LazyComponent = ({ children, fallback = null, threshold = 0.1 }) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div ref={ref}>
      {isInView ? children : fallback}
    </div>
  );
};

// Performance Monitor
export const PerformanceMonitor = ({ children }) => {
  const [metrics, setMetrics] = useState({
    renderTime: 0,
    memoryUsage: 0,
    componentCount: 0
  });

  useEffect(() => {
    const startTime = performance.now();
    
    const measurePerformance = () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      // Memory usage (if available)
      const memoryUsage = performance.memory ? 
        Math.round(performance.memory.usedJSHeapSize / 1024 / 1024) : 0;
      
      // Component count (approximate)
      const componentCount = document.querySelectorAll('[data-react-component]').length;
      
      setMetrics({
        renderTime: Math.round(renderTime),
        memoryUsage,
        componentCount
      });
    };

    // Measure after render
    const timeoutId = setTimeout(measurePerformance, 100);
    
    return () => clearTimeout(timeoutId);
  }, [children]);

  return (
    <div className="relative">
      {children}
      
      {/* Performance Overlay (only in development) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 bg-black bg-opacity-75 text-white p-2 rounded text-xs z-50">
          <div>Render: {metrics.renderTime}ms</div>
          <div>Memory: {metrics.memoryUsage}MB</div>
          <div>Components: {metrics.componentCount}</div>
        </div>
      )}
    </div>
  );
};

// Virtual Scroller for large lists
export const VirtualScroller = ({ 
  items, 
  itemHeight, 
  containerHeight, 
  renderItem,
  overscan = 5 
}) => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef(null);

  const visibleStart = Math.floor(scrollTop / itemHeight);
  const visibleEnd = Math.min(
    visibleStart + Math.ceil(containerHeight / itemHeight),
    items.length - 1
  );

  const startIndex = Math.max(0, visibleStart - overscan);
  const endIndex = Math.min(items.length - 1, visibleEnd + overscan);

  const visibleItems = items.slice(startIndex, endIndex + 1);
  const totalHeight = items.length * itemHeight;
  const offsetY = startIndex * itemHeight;

  const handleScroll = (e) => {
    setScrollTop(e.target.scrollTop);
  };

  return (
    <div
      ref={containerRef}
      className="overflow-auto"
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div
          style={{
            transform: `translateY(${offsetY}px)`,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0
          }}
        >
          {visibleItems.map((item, index) => (
            <div
              key={startIndex + index}
              style={{ height: itemHeight }}
            >
              {renderItem(item, startIndex + index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageOptimizer;
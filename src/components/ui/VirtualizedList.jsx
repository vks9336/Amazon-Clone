import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';

const VirtualizedList = ({
  items,
  itemHeight = 100,
  containerHeight = 400,
  renderItem,
  overscan = 5,
  className = ''
}) => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef();

  const visibleRange = useMemo(() => {
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const endIndex = Math.min(
      items.length - 1,
      Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
    );
    return { startIndex, endIndex };
  }, [scrollTop, itemHeight, containerHeight, items.length, overscan]);

  const visibleItems = useMemo(() => {
    const result = [];
    for (let i = visibleRange.startIndex; i <= visibleRange.endIndex; i++) {
      if (items[i]) {
        result.push({
          index: i,
          item: items[i],
          top: i * itemHeight
        });
      }
    }
    return result;
  }, [items, visibleRange, itemHeight]);

  const totalHeight = items.length * itemHeight;

  const handleScroll = (e) => {
    setScrollTop(e.target.scrollTop);
  };

  return (
    <div
      ref={containerRef}
      className={`overflow-auto ${className}`}
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        {visibleItems.map(({ index, item, top }) => (
          <motion.div
            key={index}
            style={{
              position: 'absolute',
              top,
              left: 0,
              right: 0,
              height: itemHeight
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            {renderItem(item, index)}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default VirtualizedList;
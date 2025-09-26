import React, { memo } from 'react';
import ProductCard from './ProductCard';

const MemoizedProductCard = memo(ProductCard, (prevProps, nextProps) => {
  // Custom comparison function for better performance
  return (
    prevProps.product.id === nextProps.product.id &&
    prevProps.product.name === nextProps.product.name &&
    prevProps.product.price === nextProps.product.price &&
    prevProps.product.rating === nextProps.product.rating &&
    prevProps.product.reviewCount === nextProps.product.reviewCount &&
    prevProps.viewMode === nextProps.viewMode
  );
});

MemoizedProductCard.displayName = 'MemoizedProductCard';

export default MemoizedProductCard;
import React from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../lib/mockData';
import ProductCarousel from '../components/product/ProductCarousel';

const CategoryPage = () => {
  const { category } = useParams();
  const categoryName = category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  // Filter products by category (case-insensitive)
  const categoryProducts = products.filter(product => 
    product.category.toLowerCase() === categoryName.toLowerCase()
  );
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{categoryName}</h1>
      
      {categoryProducts.length > 0 ? (
        <ProductCarousel products={categoryProducts} />
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 text-xl">No products found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;

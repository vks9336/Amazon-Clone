import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiStar, FiSend } from 'react-icons/fi';

const ReviewForm = ({ productId, onSubmit, onCancel }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0 || !content.trim()) {
      alert('Please provide a rating and review content');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({
        productId,
        rating,
        title: title.trim(),
        content: content.trim(),
        date: new Date().toISOString()
      });
      setRating(0);
      setContent('');
      setTitle('');
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <button
        key={index}
        type="button"
        onClick={() => setRating(index + 1)}
        onMouseEnter={() => setHoveredRating(index + 1)}
        onMouseLeave={() => setHoveredRating(0)}
        className="focus:outline-none"
      >
        <FiStar
          className={`w-8 h-8 transition-colors ${
            index < (hoveredRating || rating)
              ? 'text-yellow-400 fill-current'
              : 'text-gray-300 hover:text-yellow-300'
          }`}
        />
      </button>
    ));
  };

  const getRatingText = (rating) => {
    const texts = {
      1: 'Poor',
      2: 'Fair',
      3: 'Good',
      4: 'Very Good',
      5: 'Excellent'
    };
    return texts[rating] || '';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg p-6 border border-gray-200"
    >
      <h3 className="text-xl font-bold text-gray-900 mb-4">Write a Review</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Overall Rating *
          </label>
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              {renderStars()}
            </div>
            {rating > 0 && (
              <span className="text-sm text-gray-600 ml-2">
                {getRatingText(rating)}
              </span>
            )}
          </div>
        </div>

        {/* Review Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Review Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Summarize your review in a few words"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            maxLength={100}
          />
          <div className="text-xs text-gray-500 mt-1">
            {title.length}/100 characters
          </div>
        </div>

        {/* Review Content */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Review *
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your experience with this product..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="6"
            required
          />
          <div className="text-xs text-gray-500 mt-1">
            {content.length}/1000 characters
          </div>
        </div>

        {/* Review Guidelines */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2">Review Guidelines</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Be honest and objective in your review</li>
            <li>• Focus on the product, not the seller or shipping</li>
            <li>• Avoid personal information or inappropriate content</li>
            <li>• Use proper grammar and spelling</li>
          </ul>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <motion.button
            type="submit"
            disabled={isSubmitting || rating === 0 || !content.trim()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FiSend />
            <span>{isSubmitting ? 'Submitting...' : 'Submit Review'}</span>
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default ReviewForm;
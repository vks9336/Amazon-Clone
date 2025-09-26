import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiStar, FiFilter, FiArrowUp, FiArrowDown } from 'react-icons/fi';
import Review from './Review';
import ReviewForm from './ReviewForm';

const ReviewsSection = ({ productId, productName }) => {
  const [reviews, setReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [filterRating, setFilterRating] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAllReviews, setShowAllReviews] = useState(false);

  // Mock reviews data
  const mockReviews = [
    {
      id: 1,
      userName: 'John Doe',
      rating: 5,
      title: 'Excellent product!',
      content: 'This product exceeded my expectations. The quality is outstanding and it arrived quickly. I would definitely recommend it to others.',
      date: '2024-01-15',
      verifiedPurchase: true,
      helpful: 12,
      upvotes: 15,
      downvotes: 0,
      userVote: null
    },
    {
      id: 2,
      userName: 'Sarah Wilson',
      rating: 4,
      title: 'Good value for money',
      content: 'Overall satisfied with the purchase. The product works as described, though it took a bit longer to arrive than expected.',
      date: '2024-01-10',
      verifiedPurchase: true,
      helpful: 8,
      upvotes: 10,
      downvotes: 2,
      userVote: null
    },
    {
      id: 3,
      userName: 'Mike Johnson',
      rating: 3,
      title: 'Average quality',
      content: 'The product is okay but not exceptional. It does what it\'s supposed to do but I\'ve seen better quality for similar products.',
      date: '2024-01-08',
      verifiedPurchase: false,
      helpful: 5,
      upvotes: 6,
      downvotes: 4,
      userVote: null
    },
    {
      id: 4,
      userName: 'Emily Brown',
      rating: 5,
      title: 'Perfect!',
      content: 'Absolutely love this product! The quality is amazing and it\'s exactly what I was looking for. Will definitely buy again.',
      date: '2024-01-05',
      verifiedPurchase: true,
      helpful: 20,
      upvotes: 25,
      downvotes: 1,
      userVote: null
    },
    {
      id: 5,
      userName: 'David Lee',
      rating: 2,
      title: 'Disappointed',
      content: 'The product didn\'t meet my expectations. It arrived damaged and the quality is not what was advertised.',
      date: '2024-01-03',
      verifiedPurchase: true,
      helpful: 3,
      upvotes: 4,
      downvotes: 8,
      userVote: null
    }
  ];

  useEffect(() => {
    setReviews(mockReviews);
  }, []);

  const filteredAndSortedReviews = reviews
    .filter(review => {
      if (filterRating === 'all') return true;
      return review.rating === parseInt(filterRating);
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date) - new Date(a.date);
        case 'oldest':
          return new Date(a.date) - new Date(b.date);
        case 'highest':
          return b.rating - a.rating;
        case 'lowest':
          return a.rating - b.rating;
        case 'most_helpful':
          return b.helpful - a.helpful;
        default:
          return 0;
      }
    });

  const displayedReviews = showAllReviews 
    ? filteredAndSortedReviews 
    : filteredAndSortedReviews.slice(0, 3);

  const handleAddReview = (reviewData) => {
    const newReview = {
      id: Date.now(),
      userName: 'Current User', // In real app, get from auth context
      ...reviewData,
      verifiedPurchase: true,
      helpful: 0,
      upvotes: 0,
      downvotes: 0,
      userVote: null
    };
    setReviews(prev => [newReview, ...prev]);
    setShowReviewForm(false);
  };

  const handleEditReview = (reviewId, newContent) => {
    setReviews(prev => 
      prev.map(review => 
        review.id === reviewId 
          ? { ...review, content: newContent }
          : review
      )
    );
  };

  const handleDeleteReview = (reviewId) => {
    setReviews(prev => prev.filter(review => review.id !== reviewId));
  };

  const handleReportReview = (reviewId) => {
    alert('Review reported. Thank you for your feedback.');
  };

  const handleVoteReview = (reviewId, voteType) => {
    setReviews(prev => 
      prev.map(review => {
        if (review.id === reviewId) {
          const currentVote = review.userVote;
          let newUpvotes = review.upvotes;
          let newDownvotes = review.downvotes;
          let newUserVote = voteType;

          // Remove previous vote if exists
          if (currentVote === 'up') newUpvotes--;
          if (currentVote === 'down') newDownvotes--;

          // Add new vote
          if (voteType === 'up') {
            newUpvotes++;
            if (currentVote === 'up') newUserVote = null; // Toggle off
          } else if (voteType === 'down') {
            newDownvotes++;
            if (currentVote === 'down') newUserVote = null; // Toggle off
          }

          return {
            ...review,
            upvotes: newUpvotes,
            downvotes: newDownvotes,
            userVote: newUserVote
          };
        }
        return review;
      })
    );
  };

  const getRatingStats = () => {
    const totalReviews = reviews.length;
    if (totalReviews === 0) return { average: 0, distribution: {} };

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const average = totalRating / totalReviews;

    const distribution = reviews.reduce((acc, review) => {
      acc[review.rating] = (acc[review.rating] || 0) + 1;
      return acc;
    }, {});

    return { average, distribution, totalReviews };
  };

  const stats = getRatingStats();

  return (
    <div className="space-y-6">
      {/* Reviews Header */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
          <button
            onClick={() => setShowReviewForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Write a Review
          </button>
        </div>

        {/* Rating Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {stats.average.toFixed(1)}
            </div>
            <div className="flex justify-center mb-2">
              {Array.from({ length: 5 }, (_, index) => (
                <FiStar
                  key={index}
                  className={`w-5 h-5 ${
                    index < Math.floor(stats.average)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <p className="text-gray-600">
              Based on {stats.totalReviews} review{stats.totalReviews !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map(rating => {
              const count = stats.distribution[rating] || 0;
              const percentage = stats.totalReviews > 0 ? (count / stats.totalReviews) * 100 : 0;
              
              return (
                <div key={rating} className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600 w-8">{rating}</span>
                  <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-8">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center space-x-2">
            <FiFilter className="text-gray-400" />
            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <FiArrowUp className="text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="highest">Highest Rating</option>
              <option value="lowest">Lowest Rating</option>
              <option value="most_helpful">Most Helpful</option>
            </select>
          </div>
        </div>
      </div>

      {/* Review Form Modal */}
      <AnimatePresence>
        {showReviewForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <ReviewForm
                productId={productId}
                productName={productName}
                onSubmit={handleAddReview}
                onCancel={() => setShowReviewForm(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reviews List */}
      <div className="space-y-4">
        <AnimatePresence>
          {displayedReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
            >
              <Review
                review={review}
                onEdit={handleEditReview}
                onDelete={handleDeleteReview}
                onReport={handleReportReview}
                onVote={handleVoteReview}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Show More/Less Button */}
      {filteredAndSortedReviews.length > 3 && (
        <div className="text-center">
          <button
            onClick={() => setShowAllReviews(!showAllReviews)}
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            {showAllReviews 
              ? `Show Less (${filteredAndSortedReviews.length - 3} fewer)` 
              : `Show All ${filteredAndSortedReviews.length} Reviews`
            }
          </button>
        </div>
      )}

      {/* No Reviews Message */}
      {filteredAndSortedReviews.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No reviews yet</h3>
          <p className="text-gray-600 mb-6">
            Be the first to share your thoughts about this product!
          </p>
          <button
            onClick={() => setShowReviewForm(true)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Write the First Review
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewsSection;
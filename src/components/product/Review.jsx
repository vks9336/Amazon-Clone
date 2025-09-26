import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiStar, FiThumbsUp, FiThumbsDown, FiFlag, FiEdit, FiTrash2 } from 'react-icons/fi';

const Review = ({ review, onEdit, onDelete, onReport, onVote }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(review.content);
  const [showFullContent, setShowFullContent] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    onEdit(review.id, editContent);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditContent(review.content);
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FiStar
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const shouldTruncate = review.content.length > 200;
  const displayContent = showFullContent || !shouldTruncate 
    ? review.content 
    : review.content.substring(0, 200) + '...';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg p-6 border border-gray-200"
    >
      {/* Review Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
            {review.userName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{review.userName}</h4>
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {renderStars(review.rating)}
              </div>
              <span className="text-sm text-gray-500">
                {formatDate(review.date)}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onVote(review.id, 'up')}
            className={`p-1 rounded ${
              review.userVote === 'up' ? 'text-blue-600 bg-blue-100' : 'text-gray-400 hover:text-blue-600'
            }`}
          >
            <FiThumbsUp />
          </button>
          <span className="text-sm text-gray-600">{review.upvotes}</span>
          <button
            onClick={() => onVote(review.id, 'down')}
            className={`p-1 rounded ${
              review.userVote === 'down' ? 'text-red-600 bg-red-100' : 'text-gray-400 hover:text-red-600'
            }`}
          >
            <FiThumbsDown />
          </button>
          <span className="text-sm text-gray-600">{review.downvotes}</span>
        </div>
      </div>

      {/* Review Content */}
      <div className="mb-4">
        {isEditing ? (
          <div className="space-y-3">
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="4"
            />
            <div className="flex space-x-2">
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save
              </button>
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-gray-700 leading-relaxed">{displayContent}</p>
            {shouldTruncate && (
              <button
                onClick={() => setShowFullContent(!showFullContent)}
                className="text-blue-600 hover:text-blue-800 text-sm mt-2"
              >
                {showFullContent ? 'Show less' : 'Read more'}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Review Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">
            Verified Purchase: {review.verifiedPurchase ? 'Yes' : 'No'}
          </span>
          {review.helpful && (
            <span className="text-sm text-green-600 font-medium">
              {review.helpful} people found this helpful
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={handleEdit}
            className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50"
            title="Edit review"
          >
            <FiEdit />
          </button>
          <button
            onClick={() => onDelete(review.id)}
            className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50"
            title="Delete review"
          >
            <FiTrash2 />
          </button>
          <button
            onClick={() => onReport(review.id)}
            className="p-2 text-gray-400 hover:text-orange-600 rounded-lg hover:bg-orange-50"
            title="Report review"
          >
            <FiFlag />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Review;
import React, { createContext, useContext, useReducer } from 'react';

const RecentlyViewedContext = createContext();

const recentlyViewedReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_RECENTLY_VIEWED':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        // Move to front if already exists
        return {
          ...state,
          items: [
            { ...action.payload, viewedAt: Date.now() },
            ...state.items.filter(item => item.id !== action.payload.id)
          ].slice(0, 20) // Keep only last 20 items
        };
      }
      return {
        ...state,
        items: [
          { ...action.payload, viewedAt: Date.now() },
          ...state.items
        ].slice(0, 20)
      };
      
    case 'REMOVE_FROM_RECENTLY_VIEWED':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
      
    case 'CLEAR_RECENTLY_VIEWED':
      return { ...state, items: [] };
      
    default:
      return state;
  }
};

export const RecentlyViewedProvider = ({ children }) => {
  const [state, dispatch] = useReducer(recentlyViewedReducer, {
    items: JSON.parse(localStorage.getItem('recentlyViewed')) || []
  });

  // Sync with localStorage
  React.useEffect(() => {
    localStorage.setItem('recentlyViewed', JSON.stringify(state.items));
  }, [state.items]);

  const addToRecentlyViewed = (product) => {
    dispatch({ type: 'ADD_TO_RECENTLY_VIEWED', payload: product });
  };

  const removeFromRecentlyViewed = (id) => {
    dispatch({ type: 'REMOVE_FROM_RECENTLY_VIEWED', payload: id });
  };

  const clearRecentlyViewed = () => {
    dispatch({ type: 'CLEAR_RECENTLY_VIEWED' });
  };

  const getRecentlyViewed = (limit = 10) => {
    return state.items.slice(0, limit);
  };

  const getRecommendations = (currentProductId, limit = 5) => {
    // Simple recommendation logic based on category and brand
    const currentProduct = state.items.find(item => item.id === currentProductId);
    if (!currentProduct) return [];

    return state.items
      .filter(item => 
        item.id !== currentProductId && 
        (item.category === currentProduct.category || item.brand === currentProduct.brand)
      )
      .slice(0, limit);
  };

  const getTrendingProducts = (limit = 5) => {
    // Simple trending logic based on view frequency
    const viewCounts = {};
    state.items.forEach(item => {
      viewCounts[item.id] = (viewCounts[item.id] || 0) + 1;
    });

    return state.items
      .sort((a, b) => viewCounts[b.id] - viewCounts[a.id])
      .slice(0, limit);
  };

  return (
    <RecentlyViewedContext.Provider value={{
      ...state,
      addToRecentlyViewed,
      removeFromRecentlyViewed,
      clearRecentlyViewed,
      getRecentlyViewed,
      getRecommendations,
      getTrendingProducts
    }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
};

export const useRecentlyViewed = () => {
  const context = useContext(RecentlyViewedContext);
  if (!context) {
    throw new Error('useRecentlyViewed must be used within a RecentlyViewedProvider');
  }
  return context;
};
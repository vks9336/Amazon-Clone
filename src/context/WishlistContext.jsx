import React, { createContext, useContext, useReducer } from 'react';

const WishlistContext = createContext();

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_WISHLIST':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return state; // Already in wishlist
      }
      return { ...state, items: [...state.items, action.payload] };
      
    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
      
    case 'CLEAR_WISHLIST':
      return { ...state, items: [] };
      
    case 'MOVE_TO_CART':
      // Remove from wishlist and add to cart (this would need cart context)
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
      
    default:
      return state;
  }
};

export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, {
    items: JSON.parse(localStorage.getItem('wishlist')) || []
  });

  // Sync with localStorage
  React.useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(state.items));
  }, [state.items]);

  const addToWishlist = (product) => {
    dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
  };

  const removeFromWishlist = (id) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: id });
  };

  const clearWishlist = () => {
    dispatch({ type: 'CLEAR_WISHLIST' });
  };

  const isInWishlist = (id) => {
    return state.items.some(item => item.id === id);
  };

  const getWishlistCount = () => {
    return state.items.length;
  };

  return (
    <WishlistContext.Provider value={{
      ...state,
      addToWishlist,
      removeFromWishlist,
      clearWishlist,
      isInWishlist,
      getWishlistCount
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
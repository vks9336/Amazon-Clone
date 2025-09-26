import React, { createContext, useContext, useReducer, useCallback } from 'react';

const CacheContext = createContext();

const cacheReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CACHE':
      return {
        ...state,
        [action.key]: {
          data: action.data,
          timestamp: Date.now(),
          ttl: action.ttl || 300000 // 5 minutes default
        }
      };
      
    case 'CLEAR_CACHE':
      return {};
      
    case 'REMOVE_CACHE':
      const newState = { ...state };
      delete newState[action.key];
      return newState;
      
    default:
      return state;
  }
};

export const CacheProvider = ({ children }) => {
  const [cache, dispatch] = useReducer(cacheReducer, {});

  const setCache = useCallback((key, data, ttl = 300000) => {
    dispatch({ type: 'SET_CACHE', key, data, ttl });
  }, []);

  const getCache = useCallback((key) => {
    const cached = cache[key];
    if (!cached) return null;
    
    // Check if cache is expired
    if (Date.now() - cached.timestamp > cached.ttl) {
      dispatch({ type: 'REMOVE_CACHE', key });
      return null;
    }
    
    return cached.data;
  }, [cache]);

  const clearCache = useCallback(() => {
    dispatch({ type: 'CLEAR_CACHE' });
  }, []);

  const removeCache = useCallback((key) => {
    dispatch({ type: 'REMOVE_CACHE', key });
  }, []);

  const isCached = useCallback((key) => {
    const cached = cache[key];
    if (!cached) return false;
    
    // Check if cache is expired
    if (Date.now() - cached.timestamp > cached.ttl) {
      dispatch({ type: 'REMOVE_CACHE', key });
      return false;
    }
    
    return true;
  }, [cache]);

  const getCacheStats = useCallback(() => {
    const keys = Object.keys(cache);
    const totalSize = keys.reduce((size, key) => {
      return size + JSON.stringify(cache[key]).length;
    }, 0);
    
    return {
      count: keys.length,
      totalSize: Math.round(totalSize / 1024), // KB
      keys: keys
    };
  }, [cache]);

  return (
    <CacheContext.Provider value={{
      setCache,
      getCache,
      clearCache,
      removeCache,
      isCached,
      getCacheStats
    }}>
      {children}
    </CacheContext.Provider>
  );
};

export const useCache = () => {
  const context = useContext(CacheContext);
  if (!context) {
    throw new Error('useCache must be used within a CacheProvider');
  }
  return context;
};
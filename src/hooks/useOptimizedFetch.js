import { useState, useEffect, useCallback } from 'react';
import { useCache } from '../context/CacheContext';

const useOptimizedFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { getCache, setCache, isCached } = useCache();

  const {
    cacheKey = url,
    cacheTTL = 300000, // 5 minutes
    enableCache = true,
    retryCount = 3,
    retryDelay = 1000
  } = options;

  const fetchData = useCallback(async (retryAttempt = 0) => {
    // Check cache first
    if (enableCache && isCached(cacheKey)) {
      const cachedData = getCache(cacheKey);
      setData(cachedData);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      // Cache the result
      if (enableCache) {
        setCache(cacheKey, result, cacheTTL);
      }
      
      setData(result);
    } catch (err) {
      setError(err);
      
      // Retry logic
      if (retryAttempt < retryCount) {
        setTimeout(() => {
          fetchData(retryAttempt + 1);
        }, retryDelay * Math.pow(2, retryAttempt)); // Exponential backoff
      }
    } finally {
      setLoading(false);
    }
  }, [url, options, cacheKey, cacheTTL, enableCache, retryCount, retryDelay, getCache, setCache, isCached]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch };
};

export default useOptimizedFetch;
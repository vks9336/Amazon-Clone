import React, { createContext, useContext, useReducer, useEffect } from 'react';

const LoyaltyContext = createContext();

const loyaltyReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_POINTS':
      return {
        ...state,
        points: state.points + action.payload,
        totalEarned: state.totalEarned + action.payload
      };
      
    case 'REDEEM_POINTS':
      return {
        ...state,
        points: Math.max(0, state.points - action.payload),
        totalRedeemed: state.totalRedeemed + action.payload
      };
      
    case 'ADD_BADGE':
      return {
        ...state,
        badges: [...state.badges, action.payload]
      };
      
    case 'UPDATE_LEVEL':
      return {
        ...state,
        level: action.payload.level,
        levelName: action.payload.name,
        nextLevelPoints: action.payload.nextLevelPoints
      };
      
    case 'ADD_REFERRAL':
      return {
        ...state,
        referrals: state.referrals + 1,
        referralCode: action.payload
      };
      
    case 'LOAD_DATA':
      return {
        ...state,
        ...action.payload
      };
      
    default:
      return state;
  }
};

export const LoyaltyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(loyaltyReducer, {
    points: 0,
    totalEarned: 0,
    totalRedeemed: 0,
    level: 1,
    levelName: 'Bronze',
    nextLevelPoints: 100,
    badges: [],
    referrals: 0,
    referralCode: '',
    dailyStreak: 0,
    lastActivity: null
  });

  // Load data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('loyaltyData');
    if (savedData) {
      dispatch({ type: 'LOAD_DATA', payload: JSON.parse(savedData) });
    }
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('loyaltyData', JSON.stringify(state));
  }, [state]);

  // Calculate level based on points
  const calculateLevel = (points) => {
    if (points < 100) return { level: 1, name: 'Bronze', nextLevelPoints: 100 };
    if (points < 500) return { level: 2, name: 'Silver', nextLevelPoints: 500 };
    if (points < 1000) return { level: 3, name: 'Gold', nextLevelPoints: 1000 };
    if (points < 2500) return { level: 4, name: 'Platinum', nextLevelPoints: 2500 };
    if (points < 5000) return { level: 5, name: 'Diamond', nextLevelPoints: 5000 };
    return { level: 6, name: 'Elite', nextLevelPoints: null };
  };

  // Update level when points change
  useEffect(() => {
    const newLevel = calculateLevel(state.points);
    if (newLevel.level !== state.level) {
      dispatch({ type: 'UPDATE_LEVEL', payload: newLevel });
      
      // Award level badge
      const levelBadge = {
        id: `level_${newLevel.level}`,
        name: `${newLevel.name} Member`,
        description: `Reached ${newLevel.name} level`,
        icon: '🏆',
        earnedAt: new Date().toISOString(),
        type: 'level'
      };
      
      if (!state.badges.find(badge => badge.id === levelBadge.id)) {
        dispatch({ type: 'ADD_BADGE', payload: levelBadge });
      }
    }
  }, [state.points, state.level]);

  const addPoints = (points, reason = 'Purchase') => {
    dispatch({ type: 'ADD_POINTS', payload: points });
    
    // Check for special badges
    checkSpecialBadges(points, reason);
  };

  const redeemPoints = (points) => {
    if (points <= state.points) {
      dispatch({ type: 'REDEEM_POINTS', payload: points });
      return true;
    }
    return false;
  };

  const checkSpecialBadges = (points, reason) => {
    const badges = [];
    
    // First purchase badge
    if (reason === 'Purchase' && state.totalEarned === points) {
      badges.push({
        id: 'first_purchase',
        name: 'First Purchase',
        description: 'Made your first purchase',
        icon: '🎉',
        earnedAt: new Date().toISOString(),
        type: 'milestone'
      });
    }
    
    // Big spender badge
    if (points >= 100) {
      badges.push({
        id: 'big_spender',
        name: 'Big Spender',
        description: 'Earned 100+ points in a single purchase',
        icon: '💰',
        earnedAt: new Date().toISOString(),
        type: 'achievement'
      });
    }
    
    // Loyal customer badge
    if (state.totalEarned >= 1000) {
      badges.push({
        id: 'loyal_customer',
        name: 'Loyal Customer',
        description: 'Earned 1000+ total points',
        icon: '💎',
        earnedAt: new Date().toISOString(),
        type: 'loyalty'
      });
    }
    
    // Add new badges
    badges.forEach(badge => {
      if (!state.badges.find(b => b.id === badge.id)) {
        dispatch({ type: 'ADD_BADGE', payload: badge });
      }
    });
  };

  const generateReferralCode = () => {
    const code = 'REF' + Math.random().toString(36).substr(2, 6).toUpperCase();
    dispatch({ type: 'ADD_REFERRAL', payload: code });
    return code;
  };

  const getPointsValue = () => {
    return state.points * 0.01; // 1 point = $0.01
  };

  const getLevelProgress = () => {
    const currentLevel = calculateLevel(state.points);
    const previousLevel = calculateLevel(state.points - (state.points % 100));
    
    if (currentLevel.nextLevelPoints === null) {
      return 100; // Max level reached
    }
    
    const progress = ((state.points - previousLevel.nextLevelPoints) / 
                     (currentLevel.nextLevelPoints - previousLevel.nextLevelPoints)) * 100;
    
    return Math.min(100, Math.max(0, progress));
  };

  const getLevelBenefits = () => {
    const benefits = {
      1: ['5% points bonus', 'Free shipping on orders over $25'],
      2: ['10% points bonus', 'Free shipping on orders over $20', 'Priority customer support'],
      3: ['15% points bonus', 'Free shipping on all orders', 'Exclusive deals', 'Early access to sales'],
      4: ['20% points bonus', 'Free express shipping', 'Personal shopping assistant', 'VIP customer support'],
      5: ['25% points bonus', 'Free same-day delivery', 'Exclusive products', 'Birthday rewards'],
      6: ['30% points bonus', 'Concierge service', 'Exclusive events', 'Custom products']
    };
    
    return benefits[state.level] || [];
  };

  return (
    <LoyaltyContext.Provider value={{
      ...state,
      addPoints,
      redeemPoints,
      generateReferralCode,
      getPointsValue,
      getLevelProgress,
      getLevelBenefits,
      calculateLevel
    }}>
      {children}
    </LoyaltyContext.Provider>
  );
};

export const useLoyalty = () => {
  const context = useContext(LoyaltyContext);
  if (!context) {
    throw new Error('useLoyalty must be used within a LoyaltyProvider');
  }
  return context;
};
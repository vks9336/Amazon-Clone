import React, { createContext, useContext, useReducer } from 'react';

const OrderContext = createContext();

const orderReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_ORDER':
      const newOrder = {
        id: Date.now(),
        orderNumber: `ORD-${Date.now()}`,
        ...action.payload,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        trackingNumber: `TRK-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
      };
      return { ...state, orders: [newOrder, ...state.orders] };
      
    case 'UPDATE_ORDER_STATUS':
      return {
        ...state,
        orders: state.orders.map(order =>
          order.id === action.payload.id
            ? { ...order, status: action.payload.status, updatedAt: new Date().toISOString() }
            : order
        )
      };
      
    case 'CANCEL_ORDER':
      return {
        ...state,
        orders: state.orders.map(order =>
          order.id === action.payload
            ? { ...order, status: 'cancelled', updatedAt: new Date().toISOString() }
            : order
        )
      };
      
    case 'ADD_ORDER_NOTE':
      return {
        ...state,
        orders: state.orders.map(order =>
          order.id === action.payload.id
            ? { 
                ...order, 
                notes: [...(order.notes || []), {
                  id: Date.now(),
                  text: action.payload.note,
                  createdAt: new Date().toISOString()
                }]
              }
            : order
        )
      };
      
    default:
      return state;
  }
};

export const OrderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(orderReducer, {
    orders: JSON.parse(localStorage.getItem('orders')) || []
  });

  // Sync with localStorage
  React.useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(state.orders));
  }, [state.orders]);

  const createOrder = (orderData) => {
    dispatch({ type: 'CREATE_ORDER', payload: orderData });
  };

  const updateOrderStatus = (orderId, status) => {
    dispatch({ type: 'UPDATE_ORDER_STATUS', payload: { id: orderId, status } });
  };

  const cancelOrder = (orderId) => {
    dispatch({ type: 'CANCEL_ORDER', payload: orderId });
  };

  const addOrderNote = (orderId, note) => {
    dispatch({ type: 'ADD_ORDER_NOTE', payload: { id: orderId, note } });
  };

  const getOrderById = (orderId) => {
    return state.orders.find(order => order.id === orderId);
  };

  const getOrdersByStatus = (status) => {
    return state.orders.filter(order => order.status === status);
  };

  const getRecentOrders = (limit = 5) => {
    return state.orders.slice(0, limit);
  };

  return (
    <OrderContext.Provider value={{
      ...state,
      createOrder,
      updateOrderStatus,
      cancelOrder,
      addOrderNote,
      getOrderById,
      getOrdersByStatus,
      getRecentOrders
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};
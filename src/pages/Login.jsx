import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    // In a real app, this would be an API call
    // For demo purposes, we'll simulate a successful login
    login({ id: 1, name: 'John Doe', email });
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto mt-12 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Sign in</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold py-3 rounded-md hover:from-blue-700 hover:to-blue-900 transition-colors"
          >
            Continue
          </motion.button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            By continuing, you agree to Amazon's{' '}
            <Link to="/conditions" className="text-blue-600 hover:underline">Conditions of Use</Link> and{' '}
            <Link to="/privacy" className="text-blue-600 hover:underline">Privacy Notice</Link>.
          </p>
        </div>
        
        <div className="mt-8 pt-6 border-t">
          <p className="text-center text-gray-600 mb-4">New to Amazon?</p>
          <Link 
            to="/register"
            className="block w-full bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 font-bold py-3 rounded-md text-center hover:from-gray-300 hover:to-gray-400 transition-colors"
          >
            Create your Amazon account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

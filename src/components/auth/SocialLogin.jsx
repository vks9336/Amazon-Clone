import React from 'react';
import { motion } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaApple, FaMicrosoft } from 'react-icons/fa';

const SocialLogin = ({ onSocialLogin, isLoading = false, className = '' }) => {
  const handleGoogleLogin = async () => {
    try {
      // Simulate Google OAuth
      const mockUser = {
        id: 'google_' + Date.now(),
        name: 'John Doe',
        email: 'john.doe@gmail.com',
        avatar: 'https://via.placeholder.com/40',
        provider: 'google'
      };
      
      onSocialLogin(mockUser);
    } catch (error) {
      console.error('Google login failed:', error);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      // Simulate Facebook OAuth
      const mockUser = {
        id: 'facebook_' + Date.now(),
        name: 'Jane Smith',
        email: 'jane.smith@facebook.com',
        avatar: 'https://via.placeholder.com/40',
        provider: 'facebook'
      };
      
      onSocialLogin(mockUser);
    } catch (error) {
      console.error('Facebook login failed:', error);
    }
  };

  const handleAppleLogin = async () => {
    try {
      // Simulate Apple OAuth
      const mockUser = {
        id: 'apple_' + Date.now(),
        name: 'Apple User',
        email: 'user@icloud.com',
        avatar: 'https://via.placeholder.com/40',
        provider: 'apple'
      };
      
      onSocialLogin(mockUser);
    } catch (error) {
      console.error('Apple login failed:', error);
    }
  };

  const handleMicrosoftLogin = async () => {
    try {
      // Simulate Microsoft OAuth
      const mockUser = {
        id: 'microsoft_' + Date.now(),
        name: 'Microsoft User',
        email: 'user@outlook.com',
        avatar: 'https://via.placeholder.com/40',
        provider: 'microsoft'
      };
      
      onSocialLogin(mockUser);
    } catch (error) {
      console.error('Microsoft login failed:', error);
    }
  };

  const socialButtons = [
    {
      name: 'Google',
      icon: FcGoogle,
      handler: handleGoogleLogin,
      className: 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300',
      iconClassName: 'text-blue-500'
    },
    {
      name: 'Facebook',
      icon: FaFacebook,
      handler: handleFacebookLogin,
      className: 'bg-blue-600 hover:bg-blue-700 text-white',
      iconClassName: 'text-white'
    },
    {
      name: 'Apple',
      icon: FaApple,
      handler: handleAppleLogin,
      className: 'bg-black hover:bg-gray-900 text-white',
      iconClassName: 'text-white'
    },
    {
      name: 'Microsoft',
      icon: FaMicrosoft,
      handler: handleMicrosoftLogin,
      className: 'bg-blue-500 hover:bg-blue-600 text-white',
      iconClassName: 'text-white'
    }
  ];

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-600" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {socialButtons.map((button, index) => {
          const Icon = button.icon;
          
          return (
            <motion.button
              key={button.name}
              onClick={button.handler}
              disabled={isLoading}
              className={`flex items-center justify-center px-4 py-3 rounded-lg font-medium transition-all duration-200 ${button.className} ${
                isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'
              }`}
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Icon className={`w-5 h-5 ${button.iconClassName}`} />
              <span className="ml-2 text-sm font-medium">{button.name}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Privacy Notice */}
      <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
        By continuing, you agree to our{' '}
        <a href="/terms" className="text-orange-500 hover:text-orange-600">
          Terms of Service
        </a>{' '}
        and{' '}
        <a href="/privacy" className="text-orange-500 hover:text-orange-600">
          Privacy Policy
        </a>
      </div>
    </div>
  );
};

export default SocialLogin;
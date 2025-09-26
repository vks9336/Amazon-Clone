import React, { createContext, useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiVolume2, FiVolumeX, FiEye, FiEyeOff, FiEdit3, FiMonitor } from 'react-icons/fi';

const AccessibilityContext = createContext();

export const AccessibilityProvider = ({ children }) => {
  const [preferences, setPreferences] = useState({
    reducedMotion: false,
    highContrast: false,
    largeText: false,
    screenReader: false,
    keyboardNavigation: false,
    focusVisible: true,
    audioDescriptions: false,
    colorBlind: 'none' // none, protanopia, deuteranopia, tritanopia
  });

  const [announcements, setAnnouncements] = useState([]);
  const [focusManager, setFocusManager] = useState({
    trapFocus: false,
    restoreFocus: null
  });

  // Load saved preferences
  useEffect(() => {
    const saved = localStorage.getItem('accessibility-preferences');
    if (saved) {
      setPreferences(JSON.parse(saved));
    }
  }, []);

  // Save preferences
  useEffect(() => {
    localStorage.setItem('accessibility-preferences', JSON.stringify(preferences));
  }, [preferences]);

  // Apply accessibility styles
  useEffect(() => {
    const root = document.documentElement;
    
    // Reduced motion
    if (preferences.reducedMotion) {
      root.style.setProperty('--motion-duration', '0s');
      root.style.setProperty('--motion-delay', '0s');
    } else {
      root.style.removeProperty('--motion-duration');
      root.style.removeProperty('--motion-delay');
    }

    // High contrast
    if (preferences.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Large text
    if (preferences.largeText) {
      root.style.fontSize = '1.2em';
    } else {
      root.style.fontSize = '';
    }

    // Color blind support
    if (preferences.colorBlind !== 'none') {
      root.classList.add(`colorblind-${preferences.colorBlind}`);
    } else {
      root.classList.remove('colorblind-protanopia', 'colorblind-deuteranopia', 'colorblind-tritanopia');
    }
  }, [preferences]);

  // Announce messages to screen readers
  const announce = (message, priority = 'polite') => {
    const announcement = {
      id: Date.now(),
      message,
      priority,
      timestamp: new Date()
    };
    
    setAnnouncements(prev => [...prev, announcement]);
    
    // Remove after 5 seconds
    setTimeout(() => {
      setAnnouncements(prev => prev.filter(a => a.id !== announcement.id));
    }, 5000);
  };

  // Update preferences
  const updatePreference = (key, value) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  // Toggle preference
  const togglePreference = (key) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Focus management
  const trapFocus = (element) => {
    setFocusManager(prev => ({ ...prev, trapFocus: true }));
    
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    const handleTabKey = (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };
    
    element.addEventListener('keydown', handleTabKey);
    firstElement?.focus();
    
    return () => {
      element.removeEventListener('keydown', handleTabKey);
      setFocusManager(prev => ({ ...prev, trapFocus: false }));
    };
  };

  const restoreFocus = (element) => {
    setFocusManager(prev => ({ ...prev, restoreFocus: element }));
  };

  return (
    <AccessibilityContext.Provider value={{
      preferences,
      updatePreference,
      togglePreference,
      announce,
      trapFocus,
      restoreFocus,
      focusManager
    }}>
      {children}
      
      {/* Screen Reader Announcements */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcements.map(announcement => (
          <div key={announcement.id}>
            {announcement.message}
          </div>
        ))}
      </div>
      
      {/* Accessibility Panel */}
      <AccessibilityPanel />
    </AccessibilityContext.Provider>
  );
};

const AccessibilityPanel = () => {
  const { preferences, updatePreference, togglePreference } = useContext(AccessibilityContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 left-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
        aria-label="Open accessibility settings"
      >
        <FiEye className="w-5 h-5" />
      </button>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            className="fixed left-4 bottom-20 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-80 z-50"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Accessibility Settings
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                aria-label="Close accessibility settings"
              >
                <FiEyeOff className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Reduced Motion */}
              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-700 dark:text-gray-300">
                  Reduce Motion
                </label>
                <button
                  onClick={() => togglePreference('reducedMotion')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    preferences.reducedMotion ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                  aria-label={`${preferences.reducedMotion ? 'Disable' : 'Enable'} reduced motion`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      preferences.reducedMotion ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* High Contrast */}
              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-700 dark:text-gray-300">
                  High Contrast
                </label>
                <button
                  onClick={() => togglePreference('highContrast')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    preferences.highContrast ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                  aria-label={`${preferences.highContrast ? 'Disable' : 'Enable'} high contrast`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      preferences.highContrast ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Large Text */}
              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-700 dark:text-gray-300">
                  Large Text
                </label>
                <button
                  onClick={() => togglePreference('largeText')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    preferences.largeText ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                  aria-label={`${preferences.largeText ? 'Disable' : 'Enable'} large text`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      preferences.largeText ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Focus Visible */}
              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-700 dark:text-gray-300">
                  Focus Indicators
                </label>
                <button
                  onClick={() => togglePreference('focusVisible')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    preferences.focusVisible ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                  aria-label={`${preferences.focusVisible ? 'Disable' : 'Enable'} focus indicators`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      preferences.focusVisible ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Color Blind Support */}
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                  Color Blind Support
                </label>
                <select
                  value={preferences.colorBlind}
                  onChange={(e) => updatePreference('colorBlind', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="none">None</option>
                  <option value="protanopia">Protanopia (Red-blind)</option>
                  <option value="deuteranopia">Deuteranopia (Green-blind)</option>
                  <option value="tritanopia">Tritanopia (Blue-blind)</option>
                </select>
              </div>

              {/* Keyboard Shortcuts */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Keyboard Shortcuts
                </h4>
                <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                  <div><kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">Tab</kbd> Navigate</div>
                  <div><kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">Enter</kbd> Activate</div>
                  <div><kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">Esc</kbd> Close</div>
                  <div><kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">Space</kbd> Toggle</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Accessible Button Component
export const AccessibleButton = ({ 
  children, 
  onClick, 
  disabled = false,
  ariaLabel,
  ariaDescribedBy,
  className = '',
  ...props 
}) => {
  const { announce } = useContext(AccessibilityContext);

  const handleClick = () => {
    if (ariaLabel) {
      announce(`Button activated: ${ariaLabel}`);
    }
    onClick?.();
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      className={`px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Accessible Input Component
export const AccessibleInput = ({ 
  label,
  error,
  helpText,
  required = false,
  className = '',
  ...props 
}) => {
  const id = `input-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = `${id}-error`;
  const helpId = `${id}-help`;

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
        {required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
      </label>
      
      <input
        id={id}
        aria-describedby={`${error ? errorId : ''} ${helpText ? helpId : ''}`.trim()}
        aria-invalid={error ? 'true' : 'false'}
        aria-required={required}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          error 
            ? 'border-red-500 dark:border-red-500' 
            : 'border-gray-300 dark:border-gray-600'
        } bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${className}`}
        {...props}
      />
      
      {error && (
        <div id={errorId} className="text-sm text-red-600 dark:text-red-400" role="alert">
          {error}
        </div>
      )}
      
      {helpText && (
        <div id={helpId} className="text-sm text-gray-600 dark:text-gray-400">
          {helpText}
        </div>
      )}
    </div>
  );
};

// Skip Link Component
export const SkipLink = ({ href, children }) => {
  return (
    <a
      href={href}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-lg z-50"
    >
      {children}
    </a>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
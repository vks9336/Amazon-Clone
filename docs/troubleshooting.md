# 🔧 Troubleshooting Guide

## 🚨 Common Issues

### **Development Server Issues**

#### **Port Already in Use**
```bash
# Error: Port 5173 is already in use
# Solution:
npm run dev:force  # Kills existing processes and restarts
```

#### **Module Not Found Errors**
```bash
# Clear cache and reinstall
rm -rf node_modules/.vite
rm -rf node_modules
npm install
```

#### **WebSocket Connection Failed**
See [WebSocket Troubleshooting Guide](../WEBSOCKET-TROUBLESHOOTING.md)

### **Build Issues**

#### **Build Fails with Memory Error**
```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

#### **Import Errors**
```bash
# Check for typos in import paths
# Ensure file extensions are correct
# Verify case sensitivity (important on Linux/Mac)
```

### **Runtime Issues**

#### **React Router Issues**
```jsx
// Ensure BrowserRouter wraps your app
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      {/* Your app content */}
    </BrowserRouter>
  );
}
```

#### **Context Provider Issues**
```jsx
// Ensure context providers are properly nested
<AuthProvider>
  <CartProvider>
    <App />
  </CartProvider>
</AuthProvider>
```

## 🐛 Debugging Tips

### **Console Debugging**
```javascript
// Use console.group for organized logging
console.group('User Actions');
console.log('User clicked:', target);
console.log('Current state:', state);
console.groupEnd();

// Use console.table for arrays/objects
console.table(products);
```

### **React DevTools**
1. Install React Developer Tools browser extension
2. Use Components tab to inspect component state
3. Use Profiler tab to identify performance issues

### **Network Issues**
```javascript
// Check network requests in browser DevTools
// Look for failed API calls
// Verify CORS settings
```

## ⚡ Performance Issues

### **Slow Loading**
```jsx
// Use React.lazy for code splitting
const ProductDetails = lazy(() => import('./ProductDetails'));

// Wrap with Suspense
<Suspense fallback={<Loading />}>
  <ProductDetails />
</Suspense>
```

### **Memory Leaks**
```jsx
// Clean up event listeners
useEffect(() => {
  const handleScroll = () => { /* ... */ };
  window.addEventListener('scroll', handleScroll);
  
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []);

// Clean up timeouts/intervals
useEffect(() => {
  const timer = setTimeout(() => { /* ... */ }, 1000);
  
  return () => {
    clearTimeout(timer);
  };
}, []);
```

### **Large Bundle Size**
```bash
# Analyze bundle size
npm run build
npx vite-bundle-analyzer dist

# Use dynamic imports
const LazyComponent = lazy(() => import('./LazyComponent'));
```

## 🔍 Error Tracking

### **Error Boundaries**
```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
```

### **Logging Errors**
```javascript
// Set up global error handler
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  // Send to error tracking service
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  // Send to error tracking service
});
```

## 🔧 Quick Fixes

### **Clear All Caches**
```bash
# Clear all possible caches
rm -rf node_modules/.vite
rm -rf node_modules/.cache
rm -rf dist
npm run dev:clean
```

### **Reset to Known Good State**
```bash
# Reset Git to last working commit
git stash
git reset --hard HEAD~1
npm install
npm run dev
```

### **Environment Issues**
```bash
# Check Node.js version
node --version  # Should be 18+

# Check npm version
npm --version

# Update dependencies
npm update
```

## 📞 Getting Help

### **Before Asking for Help**
1. ✅ Check this troubleshooting guide
2. ✅ Search existing GitHub issues
3. ✅ Try the quick fixes above
4. ✅ Check browser console for errors

### **When Reporting Issues**
Include:
- 🖥️ Operating system and version
- 🌐 Browser and version
- 📦 Node.js and npm versions
- 🔍 Steps to reproduce
- ❌ Error messages (full stack trace)
- 📸 Screenshots if relevant

### **Useful Commands for Issue Reports**
```bash
# System info
node --version
npm --version
git --version

# Project info
npm list --depth=0
cat package.json | grep version

# Browser info (paste from browser console)
navigator.userAgent
```
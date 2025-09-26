# WebSocket HMR Troubleshooting Guide

## 🚨 Issue Description
You're seeing WebSocket connection errors in the browser console:
```
WebSocket connection to 'ws://localhost:5173/?token=...' failed
[vite] failed to connect to websocket
```

## ✅ Quick Solutions

### 1. **Try Different HMR Port (Recommended)**
The current configuration uses a separate port for HMR:
```bash
npm run dev
```
- Server: `http://127.0.0.1:5173/`
- HMR WebSocket: `ws://127.0.0.1:24678/`

### 2. **Disable HMR Completely (If issues persist)**
```bash
npm run dev:no-hmr
```
This runs without hot module replacement (you'll need to manually refresh).

### 3. **Clean Cache and Restart**
```bash
npm run dev:force
```

### 4. **Debug WebSocket Connection**
```bash
npm run dev:ws-debug
```

## 🔧 Manual Fixes

### Option A: Use Different Port
Edit `vite.config.js`:
```js
server: {
  hmr: {
    port: 24678, // Different port
    clientPort: 24678,
  },
  host: '127.0.0.1',
  port: 5173,
}
```

### Option B: Disable WebSocket Entirely
Edit `vite.config.js`:
```js
server: {
  hmr: false, // Disables HMR
  host: 'localhost',
  port: 5173,
}
```

## 🔍 Common Causes

1. **Port Conflicts**: Another process using port 5173
2. **Firewall/Antivirus**: Blocking WebSocket connections
3. **Browser Extensions**: Interfering with WebSocket
4. **Corporate Network**: Proxy/firewall restrictions
5. **Multiple Dev Servers**: Conflicting Vite instances

## 🛠️ Troubleshooting Steps

### Step 1: Check Running Processes
```bash
# Kill existing Vite processes
pkill -f vite

# Check what's using port 5173
lsof -ti:5173
```

### Step 2: Clear All Caches
```bash
# Clear Vite cache
rm -rf node_modules/.vite

# Clear browser cache (recommended)
```

### Step 3: Try Different Browser
- Test in incognito/private mode
- Disable all browser extensions
- Try different browser entirely

### Step 4: Network Configuration
```bash
# Try binding to different host
host: '0.0.0.0'  # All interfaces
host: 'localhost'  # Localhost only
host: '127.0.0.1'  # IP address
```

## ⚡ Impact of WebSocket Issues

### What Still Works:
- ✅ Application loads and functions normally
- ✅ Manual browser refresh works
- ✅ All routes and features work
- ✅ Production build works perfectly

### What Doesn't Work:
- ❌ Hot Module Replacement (auto-refresh on file changes)
- ❌ Live CSS updates
- ❌ Component state preservation during updates

## 🎯 Production Note

**This issue ONLY affects development.** Your production build (`npm run build`) is completely unaffected and will work perfectly.

## 🆘 If Nothing Works

Use the fallback configuration:
```bash
npm run dev:no-hmr
```

This disables HMR entirely but your app will work perfectly - you'll just need to manually refresh the browser when you make changes.
# WebSocket/HMR Troubleshooting Guide

## Issue Description
WebSocket connection failures prevent Vite's Hot Module Replacement (HMR) from working properly. The application still functions normally, but changes won't automatically refresh in the browser.

## Quick Fixes

### Option 1: Try Different WebSocket Port
```bash
npm run dev
```
The main config now uses port 24678 for WebSocket connections.

### Option 2: Disable HMR (Recommended if WebSocket issues persist)
```bash
npm run dev:no-hmr
```
This disables HMR but provides a stable development environment.

### Option 3: Force Clean Restart
```bash
npm run dev:force
```
Kills existing processes, clears cache, and restarts.

### Option 4: Clean Cache Only
```bash
npm run dev:clean
```
Clears Vite cache and restarts normally.

## Detailed Troubleshooting Steps

### 1. Check for Port Conflicts
```bash
# Check if port 5173 is in use
lsof -ti:5173

# Check if WebSocket port 24678 is in use  
lsof -ti:24678

# Kill processes using these ports
pkill -f vite
```

### 2. Clear All Caches
```bash
# Clear Vite cache
rm -rf node_modules/.vite

# Clear browser cache (manually in browser)
# Clear npm cache (if needed)
npm cache clean --force
```

### 3. Browser-Related Issues
- **Disable browser extensions** temporarily
- **Try incognito/private mode**
- **Check browser console** for additional errors
- **Try a different browser**

### 4. Network/Firewall Issues
- **Check firewall settings** - ensure ports 5173 and 24678 are allowed
- **Disable VPN** temporarily if using one
- **Check antivirus software** - some block WebSocket connections
- **Corporate networks** - may have WebSocket restrictions

### 5. macOS-Specific Issues
```bash
# Check if Little Snitch or similar tools are blocking connections
# Verify system preferences > Security & Privacy > Firewall settings
```

## Configuration Options

### Current Main Config (vite.config.js)
- HTTP Server: localhost:5173
- WebSocket: localhost:24678
- Fallback configuration with separate ports

### Alternative Config (vite.config.no-hmr.js)
- Disables HMR completely
- More stable for problematic environments
- Manual refresh required for changes

## Testing WebSocket Connection

### Manual Test
```bash
# Start the dev server
npm run dev

# In another terminal, test WebSocket
curl -v \
  --include \
  --no-buffer \
  --header "Connection: Upgrade" \
  --header "Upgrade: websocket" \
  --header "Sec-WebSocket-Key: SGVsbG8sIHdvcmxkIQ==" \
  --header "Sec-WebSocket-Version: 13" \
  http://localhost:24678/
```

## Impact Assessment

### What Works:
✅ Application loads and functions normally  
✅ All routes and navigation work  
✅ Build process works perfectly  
✅ Production deployment unaffected  

### What's Affected:
❌ Automatic refresh on file changes  
❌ Hot module replacement  
⚠️ Manual browser refresh required for changes  

## Production Impact: None
This is purely a development environment issue and has **zero impact** on:
- Production builds
- Application functionality
- User experience
- Performance

## Workarounds

### 1. Manual Refresh Workflow
- Make changes to code
- Save files
- Manually refresh browser (Cmd+R / Ctrl+R)

### 2. Use Preview Mode
```bash
# Build and preview (closer to production)
npm run build
npm run preview
```

### 3. IDE Integration
Many IDEs have auto-reload extensions that can work independently of Vite HMR.

## When to Use Each Command

| Command | Use Case |
|---------|----------|
| `npm run dev` | Normal development (tries WebSocket on port 24678) |
| `npm run dev:no-hmr` | **Recommended** if WebSocket issues persist |
| `npm run dev:force` | After system changes, port conflicts |
| `npm run dev:clean` | After dependency updates |

## Getting Help

If none of these solutions work:
1. Check the [Vite documentation](https://vite.dev/config/server-options.html#server-hmr)
2. Search [Vite GitHub issues](https://github.com/vitejs/vite/issues)
3. The application still works perfectly - only auto-refresh is affected
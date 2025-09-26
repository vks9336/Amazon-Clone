// PWA Utility Functions
export class PWAManager {
  constructor() {
    this.deferredPrompt = null;
    this.isInstalled = false;
    this.isOnline = navigator.onLine;
    
    this.init();
  }

  init() {
    this.registerServiceWorker();
    this.setupInstallPrompt();
    this.setupOnlineStatus();
    this.requestNotificationPermission();
  }

  // Register Service Worker
  async registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('Service Worker registered successfully:', registration);
        
        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New content is available
              this.showUpdateNotification();
            }
          });
        });
      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    }
  }

  // Setup install prompt
  setupInstallPrompt() {
    window.addEventListener('beforeinstallprompt', (e) => {
      console.log('PWA install prompt triggered');
      e.preventDefault();
      this.deferredPrompt = e;
      this.showInstallButton();
    });

    // Check if already installed
    window.addEventListener('appinstalled', () => {
      console.log('PWA was installed');
      this.isInstalled = true;
      this.hideInstallButton();
    });
  }

  // Setup online/offline status
  setupOnlineStatus() {
    window.addEventListener('online', () => {
      console.log('App is online');
      this.isOnline = true;
      this.showOnlineNotification();
      this.syncOfflineData();
    });

    window.addEventListener('offline', () => {
      console.log('App is offline');
      this.isOnline = false;
      this.showOfflineNotification();
    });
  }

  // Request notification permission
  async requestNotificationPermission() {
    if ('Notification' in window && Notification.permission === 'default') {
      try {
        const permission = await Notification.requestPermission();
        console.log('Notification permission:', permission);
      } catch (error) {
        console.error('Notification permission request failed:', error);
      }
    }
  }

  // Show install button
  showInstallButton() {
    const installButton = document.getElementById('pwa-install-button');
    if (installButton) {
      installButton.style.display = 'block';
    }
  }

  // Hide install button
  hideInstallButton() {
    const installButton = document.getElementById('pwa-install-button');
    if (installButton) {
      installButton.style.display = 'none';
    }
  }

  // Install PWA
  async installPWA() {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      const { outcome } = await this.deferredPrompt.userChoice;
      console.log('PWA install outcome:', outcome);
      
      if (outcome === 'accepted') {
        this.isInstalled = true;
        this.hideInstallButton();
      }
      
      this.deferredPrompt = null;
    }
  }

  // Show update notification
  showUpdateNotification() {
    if ('serviceWorker' in navigator) {
      const updateNotification = document.createElement('div');
      updateNotification.className = 'pwa-update-notification';
      updateNotification.innerHTML = `
        <div class="pwa-update-content">
          <span>New version available!</span>
          <button onclick="window.location.reload()">Update</button>
        </div>
      `;
      document.body.appendChild(updateNotification);
      
      // Auto-hide after 10 seconds
      setTimeout(() => {
        updateNotification.remove();
      }, 10000);
    }
  }

  // Show online notification
  showOnlineNotification() {
    this.showNotification('You are back online!', 'success');
  }

  // Show offline notification
  showOfflineNotification() {
    this.showNotification('You are offline. Some features may be limited.', 'warning');
  }

  // Show notification
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `pwa-notification pwa-notification-${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }

  // Sync offline data
  async syncOfflineData() {
    if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
      try {
        const registration = await navigator.serviceWorker.ready;
        
        // Sync cart data
        await registration.sync.register('cart-sync');
        
        // Sync wishlist data
        await registration.sync.register('wishlist-sync');
        
        console.log('Offline data sync initiated');
      } catch (error) {
        console.error('Offline data sync failed:', error);
      }
    }
  }

  // Send push notification
  async sendPushNotification(title, body, data = {}) {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      try {
        const registration = await navigator.serviceWorker.ready;
        await registration.showNotification(title, {
          body,
          icon: '/icon-192x192.png',
          badge: '/icon-192x192.png',
          data,
          actions: [
            {
              action: 'view',
              title: 'View',
              icon: '/icon-192x192.png'
            },
            {
              action: 'dismiss',
              title: 'Dismiss',
              icon: '/icon-192x192.png'
            }
          ]
        });
      } catch (error) {
        console.error('Push notification failed:', error);
      }
    }
  }

  // Check if PWA is installed
  isPWAInstalled() {
    return window.matchMedia('(display-mode: standalone)').matches ||
           window.navigator.standalone ||
           document.referrer.includes('android-app://');
  }

  // Get PWA status
  getPWAStatus() {
    return {
      isInstalled: this.isPWAInstalled(),
      isOnline: this.isOnline,
      hasServiceWorker: 'serviceWorker' in navigator,
      hasNotifications: 'Notification' in window,
      hasPushManager: 'PushManager' in window,
      hasBackgroundSync: 'serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype
    };
  }
}

// Initialize PWA Manager
export const pwaManager = new PWAManager();

// PWA Install Button Component
export const PWAInstallButton = () => {
  const handleInstall = async () => {
    await pwaManager.installPWA();
  };

  return (
    <button
      id="pwa-install-button"
      onClick={handleInstall}
      className="fixed bottom-20 right-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg shadow-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 z-50 hidden"
      style={{ display: 'none' }}
    >
      <div className="flex items-center space-x-2">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
        <span>Install App</span>
      </div>
    </button>
  );
};

// PWA Status Component
export const PWAStatus = () => {
  const status = pwaManager.getPWAStatus();

  return (
    <div className="pwa-status">
      <div className="text-xs text-gray-500 space-y-1">
        <div>PWA Installed: {status.isInstalled ? '✅' : '❌'}</div>
        <div>Online: {status.isOnline ? '✅' : '❌'}</div>
        <div>Service Worker: {status.hasServiceWorker ? '✅' : '❌'}</div>
        <div>Notifications: {status.hasNotifications ? '✅' : '❌'}</div>
      </div>
    </div>
  );
};
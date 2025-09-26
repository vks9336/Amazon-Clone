const CACHE_NAME = 'amazon-clone-v1';
const STATIC_CACHE = 'static-cache-v1';
const DYNAMIC_CACHE = 'dynamic-cache-v1';

// Files to cache for offline functionality
const STATIC_FILES = [
  '/',
  '/index.html',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json',
  '/icon-192x192.png',
  '/icon-512x512.png'
];

// Install event - cache static files
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Caching static files');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle API requests
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      caches.open(DYNAMIC_CACHE).then((cache) => {
        return fetch(request)
          .then((response) => {
            // Cache successful API responses
            if (response.status === 200) {
              cache.put(request, response.clone());
            }
            return response;
          })
          .catch(() => {
            // Return cached data if network fails
            return cache.match(request);
          });
      })
    );
    return;
  }

  // Handle static files
  if (request.method === 'GET') {
    event.respondWith(
      caches.match(request)
        .then((response) => {
          if (response) {
            return response;
          }
          
          return fetch(request)
            .then((response) => {
              // Don't cache non-successful responses
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }

              // Cache the response
              const responseToCache = response.clone();
              caches.open(DYNAMIC_CACHE)
                .then((cache) => {
                  cache.put(request, responseToCache);
                });

              return response;
            })
            .catch(() => {
              // Return offline page for navigation requests
              if (request.destination === 'document') {
                return caches.match('/index.html');
              }
            });
        })
    );
  }
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('Background sync triggered:', event.tag);
  
  if (event.tag === 'cart-sync') {
    event.waitUntil(syncCartData());
  }
  
  if (event.tag === 'wishlist-sync') {
    event.waitUntil(syncWishlistData());
  }
});

// Push notification handling
self.addEventListener('push', (event) => {
  console.log('Push notification received');
  
  const options = {
    body: event.data ? event.data.text() : 'New notification from Amazon Clone',
    icon: '/icon-192x192.png',
    badge: '/icon-192x192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View',
        icon: '/icon-192x192.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icon-192x192.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Amazon Clone', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event);
  
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Helper functions
async function syncCartData() {
  try {
    const cartData = await getStoredCartData();
    if (cartData && cartData.length > 0) {
      // Sync cart data to server
      await fetch('/api/cart/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartData)
      });
      console.log('Cart data synced successfully');
    }
  } catch (error) {
    console.error('Cart sync failed:', error);
  }
}

async function syncWishlistData() {
  try {
    const wishlistData = await getStoredWishlistData();
    if (wishlistData && wishlistData.length > 0) {
      // Sync wishlist data to server
      await fetch('/api/wishlist/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(wishlistData)
      });
      console.log('Wishlist data synced successfully');
    }
  } catch (error) {
    console.error('Wishlist sync failed:', error);
  }
}

async function getStoredCartData() {
  // This would typically read from IndexedDB
  return JSON.parse(localStorage.getItem('cart') || '[]');
}

async function getStoredWishlistData() {
  // This would typically read from IndexedDB
  return JSON.parse(localStorage.getItem('wishlist') || '[]');
}
// Service Worker for Push Notifications
const CACHE_NAME = 'stocksim-v1';

// Install event
self.addEventListener('install', (event) => {
  console.log('[SW] Service Worker installing.');
  self.skipWaiting();
});

// Activate event
self.addEventListener('activate', (event) => {
  console.log('[SW] Service Worker activating.');
  event.waitUntil(clients.claim());
});

// Push notification event
self.addEventListener('push', (event) => {
  console.log('[SW] Push received:', event);
  
  let data = {
    title: 'StockSim Pro',
    body: 'You have a new notification',
    icon: '/favicon.ico',
    badge: '/favicon.ico',
    tag: 'stocksim-notification',
    data: { url: '/' }
  };

  if (event.data) {
    try {
      data = { ...data, ...event.data.json() };
    } catch (e) {
      data.body = event.data.text();
    }
  }

  const options = {
    body: data.body,
    icon: data.icon || '/favicon.ico',
    badge: data.badge || '/favicon.ico',
    tag: data.tag || 'stocksim-notification',
    data: data.data || { url: '/' },
    vibrate: [100, 50, 100],
    actions: data.actions || []
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Notification click event
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification clicked:', event);
  event.notification.close();

  const urlToOpen = event.notification.data?.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // Try to focus an existing window
        for (const client of clientList) {
          if (client.url.includes(self.location.origin) && 'focus' in client) {
            client.navigate(urlToOpen);
            return client.focus();
          }
        }
        // Open a new window if none exists
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
  );
});

// Handle notification close
self.addEventListener('notificationclose', (event) => {
  console.log('[SW] Notification closed:', event);
});

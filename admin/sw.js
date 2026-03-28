const CACHE_NAME = 'miguel-pro-admin-v1';

self.addEventListener('install', (event) => {
    console.log('SW Admin: Instalado');
});

self.addEventListener('activate', (event) => {
    console.log('SW Admin: Ativo');
});


self.addEventListener('fetch', (event) => {
    
    event.respondWith(fetch(event.request));
});


self.addEventListener('push', function(event) {
    console.log('Push recebido!');

    const title = 'Novo Agendamento!';
    const options = {
        body: 'Você recebeu um novo agendamento no sistema.',
        icon: './icon-192x192.png', 
        badge: './icon-192x192.png',
        vibrate: [200, 100, 200],
        data: {
            url: '/'
        }
    };

    
    const notificationPromise = self.registration.showNotification(title, options);

  
    const messagePromise = self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
        windowClients.forEach(client => {
            client.postMessage({ type: 'PLAY_SOUND' });
        });
    });

    event.waitUntil(Promise.all([notificationPromise, messagePromise]));
});


self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('/')
    );
});

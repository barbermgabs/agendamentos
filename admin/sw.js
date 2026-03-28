const CACHE_NAME = 'miguel-pro-admin-v1';


self.addEventListener('install', (event) => {
  console.log('SW Admin: Instalado');
});


self.addEventListener('activate', (event) => {
  console.log('SW Admin: Ativo');
});


self.addEventListener('fetch', (event) => {

  event.respondWith(fetch(event.request));

  // Ouvir o evento de Push (quando o servidor envia a notificação)
self.addEventListener('push', function(event) {
    const title = 'Novo Agendamento!';
    const options = {
        body: 'Você recebeu um novo agendamento no sistema.',
        icon: '/icon.png', // coloque o caminho do seu ícone
        vibrate: [200, 100, 200]
    };

    // 1. Mostra a notificação visual no sistema
    event.waitUntil(self.registration.showNotification(title, options));

    // 2. Manda um comando para a aba aberta tocar o som
    event.waitUntil(
        self.clients.matchAll({ type: 'window' }).then(windowClients => {
            windowClients.forEach(client => {
                client.postMessage({ type: 'PLAY_SOUND' });
            });
        })
    );
});
});

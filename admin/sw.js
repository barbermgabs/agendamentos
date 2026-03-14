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
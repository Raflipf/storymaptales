// Nama cache untuk data statis dan dinamis
const STATIC_CACHE = "static-cache-v1";
const DYNAMIC_CONTENT_CACHE = "dynamic-cache-v1";
const CACHE_TTL = 3600; // Waktu kadaluarsa cache dalam detik (1 jam)

// Menangani event install untuk cache awal
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      // Menyimpan file statis yang diperlukan, seperti HTML, CSS, JS
      return cache.addAll([
        "/",
        "/index.html",
        "/styles.css",
        "/app.js",
        "/offline.html", // Halaman offline jika tidak ada jaringan
        "/images/offline-image.png", // Contoh gambar offline
      ]);
    })
  );
});

// Menangani event activate untuk pembersihan cache lama
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [STATIC_CACHE, DYNAMIC_CONTENT_CACHE];
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (!cacheWhitelist.includes(key)) {
            return caches.delete(key); // Menghapus cache yang tidak relevan
          }
        })
      );
    })
  );
  self.clients.claim(); // Memastikan service worker aktif untuk semua klien
});

self.addEventListener("fetch", (event) => {
  // Cegah caching untuk gambar tertentu agar selalu diambil dari server
  if (
    event.request.url.includes(".jpg") ||
    event.request.url.includes(".jpeg") ||
    event.request.url.includes(".png") ||
    event.request.url.includes(".blob")
  ) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          return response; // Ambil gambar terbaru dari server
        })
        .catch(() => {
          // Jika offline, coba ambil gambar dari cache sebagai fallback
          return caches.match(event.request);
        })
    );
    return;
  }

  // Gunakan strategi network-first untuk request ke endpoint API cerita
  if (event.request.url.includes("/stories")) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const clonedResponse = response.clone();
          caches.open(DYNAMIC_CONTENT_CACHE).then((cache) => {
            cache.put(event.request, clonedResponse); // Simpan response ke dalam cache
          });
          return response;
        })
        .catch(() => {
          return caches.match(event.request);
        })
    );
    return;
  }

  // Caching untuk request lainnya (seperti halaman statis)
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse; // Ambil dari cache jika ada
      }
      return fetch(event.request)
        .then((response) => {
          const clonedResponse = response.clone();
          caches.open(DYNAMIC_CONTENT_CACHE).then((cache) => {
            cache.put(event.request, clonedResponse); // Simpan response ke dalam cache
          });
          return response;
        })
        .catch(() => {
          if (event.request.mode === "navigate") {
            return caches.match("/offline.html"); // Halaman offline jika tidak ada jaringan
          }
        });
    })
  );
});

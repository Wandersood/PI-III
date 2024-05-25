const CURRENT_CACHES = {
  prefetch: "prefetch-cache-v1", //Cache que armazena os arquivos que são baixados no momento da instalação
  runtime: "runtime-cache-v1", //Cache que armazena os arquivos que são requisitados
};

let isLoggedIn = false; //Estado de autenticação do react
let token = null;

const ARQUIVOS_CACHE = ["index.html", "offline.html"];
const NOME_CACHE = "static-cache-v1";

//Função que deleta o node modules do cache
async function deleteNodeModulesFromCache() {
  const cache = await caches.open(CURRENT_CACHES.runtime);
  const requests = await cache.keys();
  await Promise.all(
    requests.map((request) => {
      if (request.url.includes("node_modules")) {
        return cache.delete(request);
      }
    })
  );
}
//Verifica se o usuário está logado e busca o token no indexedDB
self.addEventListener("message", async (event) => {
  if (event.data.type === "IS_LOGGED_IN") {
    isLoggedIn = event.data.payload;

    if (isLoggedIn) {
      const request = indexedDB.open("auth", 1);
      request.onsuccess = function (event) {
        const db = event.target.result;
        const transaction = db.transaction(["tokens"], "readonly");
        const objectStore = transaction.objectStore("tokens");
        const request = objectStore.get("adminToken");
        request.onsuccess = function (event) {
          token = event.target.result;
        };
      };
    } else {
      token = null;
    }
  }
});

//Instala o service worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(NOME_CACHE).then((cache) => {
      console.log("Cache aberto");
      return cache.addAll(ARQUIVOS_CACHE);
    })
  );
});

//Fetch do service worker, com injeção de token no header
self.addEventListener("fetch", (event) => {
  event.respondWith(
    (async () => {
      try {
        let fetchRequest = event.request;

        if (isLoggedIn && token) {
          const headers = new Headers(event.request.headers);
          headers.append("Authorization", `Bearer ${token}`);

          fetchRequest = new Request(event.request, {
            method: event.request.method,
            headers: headers,
            body: event.request.body,
          });
        }

        const fetchResponse = await fetch(fetchRequest);
        const cache = await caches.open(CURRENT_CACHES.runtime);
        cache.put(event.request, fetchResponse.clone());
        return fetchResponse;
      } catch (error) {
        try {
          const cachedResponse = await caches.match(event.request);
          if (cachedResponse) {
            return cachedResponse;
          }
        } catch (error) {
          const cacheResponse = await caches.match("offline.html");
          return cacheResponse;
        }
      }
    })()
  );
});

//Ativação do service worker
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map((cacheName) => {
          if (!Object.values(CURRENT_CACHES).includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
      await deleteNodeModulesFromCache();
    })()
  );
});

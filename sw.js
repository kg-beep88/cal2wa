const CACHE = "kg-cal2wa-clean-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./config.js",
  "./manifest.webmanifest",
  "./sw.js",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil((async ()=>{
    const keys = await caches.keys();
    await Promise.all(keys.map(k => k === CACHE ? Promise.resolve() : caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  const accept = req.headers.get("accept") || "";
  const isHTML = req.mode === "navigate" || accept.includes("text/html") || url.pathname.endsWith("/index.html");

  if (isHTML) {
    e.respondWith((async ()=>{
      try{
        const fresh = await fetch(req);
        const cache = await caches.open(CACHE);
        cache.put(req, fresh.clone());
        return fresh;
      }catch{
        return (await caches.match(req)) || caches.match("./index.html");
      }
    })());
    return;
  }

  e.respondWith((async ()=>{
    const cached = await caches.match(req);
    if(cached) return cached;
    const resp = await fetch(req);
    const cache = await caches.open(CACHE);
    cache.put(req, resp.clone());
    return resp;
  })());
});

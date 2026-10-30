// 오프라인·빠른 시작용 서비스 워커.
// 화면(HTML)은 늘 네트워크 먼저 (새 버전이 바로 반영되게), 실패하면 저장해 둔 것.
// 빌드 파일(/assets/, 이름에 해시)과 아이콘·글꼴은 저장해 둔 것 먼저.
const CACHE = "neon-rain-v1";
const SHELL = ["/", "/manifest.webmanifest", "/icons/icon-192.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

function cacheFirst(req) {
  return caches.match(req).then(
    (hit) =>
      hit ||
      fetch(req).then((res) => {
        if (res.ok || res.type === "opaque") {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
        }
        return res;
      }),
  );
}

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put("/", copy));
          return res;
        })
        .catch(() => caches.match("/")),
    );
    return;
  }
  if (url.origin === location.origin && (url.pathname.startsWith("/assets/") || url.pathname.startsWith("/icons/"))) {
    e.respondWith(cacheFirst(req));
    return;
  }
  // 글꼴 (Pretendard, jsDelivr)
  if (url.hostname === "cdn.jsdelivr.net" && url.pathname.includes("/pretendard")) {
    e.respondWith(cacheFirst(req));
  }
});

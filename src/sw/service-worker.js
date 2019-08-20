//可以设置多个cache,来存储不同的资源
var expectedCaches = ["static-v2"]

const route = ["/welcome", "/addDevice", "/controller", "/devicelist", "login"]

self.addEventListener("install", event => {
  const preCache = async () => {
    const cache = await caches.open(expectedCaches[0])
    fetch("/welcome").then(res => {
      route.forEach(item => {
        cache.put(item, res.clone())
      })
    })
    return cache.addAll(self.__precacheManifest.map(item => item.url))
  }
  event.waitUntil(preCache())
})

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(async function(cacheName) {
          if (expectedCaches.includes(cacheName) === false) {
            return caches.delete(cacheName)
          } else {
            return
          }
        })
      ).catch(e => {
        console.log(e)
      })
    })
  )
})

function updateCache(url) {
  return fetch(url).then(res => {
    caches.open("static-v1").then(cache => {
      cache.put(url, res)
      console.log(`cache ${url} is updated`)
    })
    return res
  })
}

//规则：
//返回缓存,并更新缓存
//对于没有缓存的请求直接发送请求
self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        console.log(`${event.request.url} from sw.js`)
        updateCache(event.request)
      }
      return response || fetch(event.request)
    })
  )
})

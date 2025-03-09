addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  
  // Rewrite the hostname to Agoda's
  url.hostname = 'www.agoda.com'
  
  // Create a new headers object from the incoming headers
  const newHeaders = new Headers(request.headers)
  newHeaders.set("Host", "www.agoda.com")
  
  // Force a modern desktop User-Agent
  newHeaders.set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36")
  
  // Set a Referer header, which Agoda might require
  newHeaders.set("Referer", "https://www.agoda.com/")
  
  // Optionally remove Accept-Encoding if needed
  newHeaders.delete("Accept-Encoding")
  
  const modifiedRequest = new Request(url.toString(), {
    method: request.method,
    headers: newHeaders,
    body: request.body,
    redirect: 'follow'
  })
  
  return await fetch(modifiedRequest)
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  
  // Change the hostname to Agoda's
  url.hostname = 'www.agoda.com'
  
  // Create a new Headers object from the original request headers and override the Host header.
  const newHeaders = new Headers(request.headers)
  newHeaders.set("Host", "www.agoda.com")
  
  // Create a new Request with the modified URL and headers.
  const modifiedRequest = new Request(url.toString(), {
    method: request.method,
    headers: newHeaders,
    body: request.body,
    redirect: 'follow'
  })
  
  // Fetch and return the response.
  return await fetch(modifiedRequest)
}

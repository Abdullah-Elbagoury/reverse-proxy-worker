addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // Create a URL object from the incoming request URL
  const url = new URL(request.url)
  
  // Change the hostname to your target website (e.g., Agoda)
  url.hostname = 'www.agoda.com'
  
  // Create a new request with the modified URL
  const modifiedRequest = new Request(url.toString(), {
    method: request.method,
    headers: request.headers,
    body: request.body,
    redirect: 'follow'
  })
  
  // Forward the request and return the response
  return await fetch(modifiedRequest)
}

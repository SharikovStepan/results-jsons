self.addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  if (request.method === 'POST') {
    const data = await request.json()
    // Тут логика обработки файла
    return new Response('OK')
  }
  return new Response('Not Found', { status: 404 })
}

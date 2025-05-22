addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  if (request.method === 'POST') {
    const data = await request.json()
    
    // Отправляем данные в GitHub Actions
    await fetch(`https://api.github.com/repos/SharikovStepan/results-jsons/dispatches`, {
      method: 'POST',
      headers: {
        'Authorization': 'token ${{ secrets.GH_TOKEN }}',
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent':'telegram-bot'
      },
      body: JSON.stringify({
        event_type: 'telegram_file',
        client_payload: {
          file_name: data.message.document.file_name,
          file_content: JSON.stringify(data)
        }
      })
    })
    
    return new Response('OK')
  }
  return new Response('Not Found', { status: 404 })
}
